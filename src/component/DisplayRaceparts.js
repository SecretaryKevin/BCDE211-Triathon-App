import React, {useState} from "react";

export function displayRaceParts(user) {
    return (
        <>
            <h2>Race Parts</h2>
            {user.triathlons === 0 || user.triathlons.every(triathlon => triathlon.raceParts.length === 0 )?(
                <h3>No Race parts found</h3>
            ):(
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>Triathlon Assigned to</th>
                            <th>Type</th>
                            <th>Distance in Km</th>
                            <th>Part Start Time in minutes</th>
                            <th>Part End Time in minutes</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {user.triathlons.map((triathlon) => (
                            triathlon.raceParts.map((part) => (
                                <tr>
                                    <td>{triathlon.name}</td>
                                    <td>{part.type}</td>
                                    <td>{part.distanceInKm}</td>
                                    <td>{part.startTimeInMinutes}</td>
                                    <td>{part.endTimeInMinutes}</td>
                                    <td><button>Edit</button></td>
                                    <td><button className={"deleteButton"}>Delete</button></td>
                                </tr>
                            ))
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}