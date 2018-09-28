const graphql = require('graphql')

// mongoose schemas
const User = require('../models/User')
const Activity = require('../models/Activity')
const GlobalActivity = require('../models/GlobalActivity')
const CurrentAction = require('../models/CurrentActions')
const HistoricalAction = require('../models/HistoricalActions')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLSchema
} = graphql

// GraphQL User Schema
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        activities: {
            type: new GraphQLList(ActivityType),
            resolve(parent, args) {
                return Activity.find({userId: parent.id})
            }
        },
        currentActions: {
            type: new GraphQLList(CurrentActionType),
            resolve(parent, args) {
                return CurrentAction.find({userId: parent.id})
            }
        },
        historicalActions: {
            type: new GraphQLList(HistoricalActionType),
            resolve(parent, args) {
                return HistoricalAction.find({userId: parent.id})
            }
        }
    })
})

//GraphQL Activity Schema
const ActivityType = new GraphQLObjectType({
    name: "Activity",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findOne({id: parent.userId})
            }
        },
        currentActions: {
            type: new GraphQLList( CurrentActionType ),
            resolve(parent, args){
                return CurrentAction.find({ activityId: parent.id })
            }
        },
        historicalActions: {
            type: HistoricalActionType,
            resolve(parent, args) {
                return HistoricalAction.find({ activityId: parent.id})
            }
        }
    })
})

// GraphQL CurrentAction Schema
const CurrentActionType = new GraphQLObjectType({
    name: "CurrentAction",
    fields: () => ({
        id: { type: GraphQLID },
        startDate: { type: GraphQLString },
        startTime: { type: GraphQLString },
        activityTitle: { type: GraphQLString },
        description: { type: GraphQLString },
        activity: {
            type: ActivityType,
            resolve(parent, args) {
                return Actvity.findOne({ id: parent.activityId })
            }
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findOne({ id: parent.userId })
            }
        }
    })
})

// GraphQL Historical Actions Schema
const HistoricalActionType = new GraphQLObjectType({
    name: "HistoricalAction",
    fields: () => ({
        id: { type: GraphQLID },
        startDate: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endDate: { type: GraphQLString },
        endTime: { type: GraphQLString },
        description: { type: GraphQLString },
        activityTitle: { type: GraphQLString },
        activity: {
            type: ActivityType,
            resolve(parent, args) {
                return Activity.findOne({id: parent.activityId})
            }
        },
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.findOne({id: parent.userId})
            }
        }
    })
})

const GlobalActivityType = new GraphQLObjectType({
    name: "GlobalActiviy",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString }
    })
})

const RootQeury = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {id: { type: GraphQLID }},
            resolve(parent,args) {
                return User.findOne({id: args.id})
            }
        },
        activity: {
            type: ActivityType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return Activity.findOne({id: args.id})
            }
        },
        currentAction: {
            type: ActionType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return Action.findOne({id: args.id})
            }
        },
        historicalAction: {
            type: HistoricalActionType,
            args: {id: { type: GraphQLID }},
            resolve(parent, arsg) {
                return HistoricalAction.findOne({id: args.id})
            }
        },
        globalActivity: {
            type: GlobalActivityType,
            args: {title: { type: GraphQLString }},
            resolve(parent, args) {
                return GlobalActivity.findOne({title: args.title})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find()
            }
        },
        activities: {
            type: new GraphQLList(ActivityType),
            resolve(parent, args) {
                return Activity.find()
            }
        },
        currentActions: {
            type: new GraphQLList(CurrentActionType),
            resolve(parent, args) {
                return CurrentAction.find()
            }
        },
        historicalActions: {
            type: new GraphQLList(HistoricalActionType),
            resolve(parent, args){
                return HistoricalAction.find()
            }
        },
        globalActivities: {
            type: new GraphQLList(GlobalActivityType),
            resolve(parent, args) {
                return GlobalActivity.find()
            }
        }
    }
})