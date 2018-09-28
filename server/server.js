const express = require("express");
const mongoose = require("mongoose")
const server = express();

const graphQLHTTP = require('express')
const schema = require('./schema/schema')



server.use(express.json())
server.use("/graphql", graphQLHTTP({
                                    schema,
                                    graphiql: true
}))

mongoose.connect('mongodb://localhost:27017/au', {vuseNewUrlParser: truev})
    .then(() => console.log("connected to Au Database"))
    .catch(err => console.error(err))

server.listen(8080, () => {
    console.log('Server is listening on PORT: 8080')
})
