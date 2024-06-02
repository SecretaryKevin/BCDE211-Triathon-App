import * as PropTypes from "prop-types";

function DisplayTriathlon(props) {
    let date = new Date(props.triathlon.date);
    return (
        <div className={"card"}>
            <h3>{props.triathlon.name}</h3>
            <p>Date: {date.toLocaleDateString()}</p>
            <p>Where: {props.triathlon.location}</p>
            <p>Type: {props.triathlon.type}</p>
            <button className = {"button"} onClick={editTriathlon}>Edit</button>
            <button className = "button deleteButton" onClick={deleteTriathlon}>Delete</button>
        </div>
    )
}
DisplayTriathlon.propTypes = {triathlon: PropTypes.any};

export function displayTriathlons(user) {
    return (
        <div className={"card-container"}>
            {user.triathlons.map(triathlon => (
                <DisplayTriathlon triathlon={triathlon} />
            ))}
        </div>
    );
}

function editTriathlon() {
    return undefined
}

function deleteTriathlon() {
    return undefined
}