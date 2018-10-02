import React from 'react'
import PlayIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const ActivityItem = props => {
    
    return (
        <div className="activity-card">
            <div className="activity-card-context">
                <h3>{props.title}</h3>
                <h4>{props.description}</h4>
            </div>
            <div className="activity-card-btns">
                <Button variant="fab" className="btn-stop"> <DeleteIcon /> </Button>
                <Button variant="fab" className="btn-stop"> <PlayIcon /> </Button>
            </div>
        </div>
    )
}

export default ActivityItem