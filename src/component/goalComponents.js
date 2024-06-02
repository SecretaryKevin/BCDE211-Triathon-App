import * as PropTypes from "prop-types";

function DisplayGoal(props) {
    return (
        <div className={"card"}>
            <h3>{props.goal.name}</h3>
            <p>Description: {props.goal.description}</p>
            <p>Target Time: {props.goal.target}</p>
            <p>Race type: {props.goal.raceType}</p>
            <p>Completed: {props.goal.isCompleted ? "Completed" : "Not Completed"}</p>
            <button className={"button"} onClick={editGoal}>Edit</button>
            <button className = "button deleteButton" onClick={deleteGoal}>Delete</button>
        </div>
    )
}

DisplayGoal.propTypes = {goal: PropTypes.any};

export function displayGoals(user) {
    return (
        <div className={"card-container"}>
            {user.goals.map(goal => (
                <DisplayGoal goal={goal}/>
            ))}
        </div>
    );
}

function editGoal() {
    return undefined
}

function deleteGoal() {
    return undefined
}
