import React, { useState } from "react";

export function DisplayRaceParts({ user, deleteRacePart, saveRacePart }) {
    const [editingRacePart, setEditingRacePart] = useState(null);
    const [updatedType, setUpdatedType] = useState('');
    const [updatedDistance, setUpdatedDistance] = useState('');
    const [updatedStartTime, setUpdatedStartTime] = useState('');
    const [updatedEndTime, setUpdatedEndTime] = useState('');

    const handleEdit = (triathlonName, racePart) => {
        setUpdatedType(racePart.type);
        setUpdatedDistance(racePart.distanceInKm);
        setUpdatedStartTime(racePart.startTimeInMinutes);
        setUpdatedEndTime(racePart.endTimeInMinutes);
        setEditingRacePart({ triathlonName, racePart });
    };

    const handleCancel = () => {
        setEditingRacePart(null);
    };

    const handleSave = (triathlonName, racePart) => {
        saveRacePart(triathlonName, racePart, updatedType, updatedDistance, updatedStartTime, updatedEndTime);
        setEditingRacePart(null);
    };
    return (
        <>
            <h2>Race Parts</h2>
            {user.triathlons.length === 0 || user.triathlons.every(triathlon => triathlon.raceParts.length === 0) ? (
                <h3>No Race parts found</h3>
            ) : (
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
                        triathlon.raceParts.map((racePart) => (
                            editingRacePart && editingRacePart.triathlonName === triathlon.name && editingRacePart.racePart.type === racePart.type && editingRacePart.racePart.distanceInKm === racePart.distanceInKm && editingRacePart.racePart.startTimeInMinutes === racePart.startTimeInMinutes && editingRacePart.racePart.endTimeInMinutes === racePart.endTimeInMinutes ? (
                                <tr key={triathlon.name + racePart.type}>
                                    <td>{triathlon.name}</td>
                                    <td>
                                        <select value={updatedType} onChange={(e) => setUpdatedType(e.target.value)} required>
                                            <option value="" disabled>Select a type</option>
                                            <option value="swim">Swim</option>
                                            <option value="bike">Bike</option>
                                            <option value="run">Run</option>
                                        </select>
                                    </td>
                                    <td><input type="number" value={updatedDistance} onChange={(e) => setUpdatedDistance(e.target.value)}/></td>
                                    <td><input type="number" value={updatedStartTime} onChange={(e) => setUpdatedStartTime(e.target.value)}/></td>
                                    <td><input type="number" value={updatedEndTime} onChange={(e) => setUpdatedEndTime(e.target.value)}/></td>
                                    <td><button onClick={handleCancel}>Cancel</button></td>
                                    <td><button onClick={() => handleSave(triathlon.name, racePart)}>Save</button></td>
                                </tr>
                            ) : (
                                <tr key={triathlon.name + racePart.type}>
                                    <td>{triathlon.name}</td>
                                    <td>{racePart.type}</td>
                                    <td>{racePart.distanceInKm}</td>
                                    <td>{racePart.startTimeInMinutes}</td>
                                    <td>{racePart.endTimeInMinutes}</td>
                                    <td><button onClick={() => handleEdit(triathlon.name, racePart)}>Edit</button></td>
                                    <td><button className="deleteButton" onClick={() => deleteRacePart(triathlon.name, racePart)}>Delete</button></td>
                                </tr>
                            )
                        ))
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}