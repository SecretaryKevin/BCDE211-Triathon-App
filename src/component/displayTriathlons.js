import React, { useState, useRef } from "react";

export function DisplayTriathlons(user, deleteTriathlon, saveTriathlon) {
    const [editingTriathlon, setEditingTriathlon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const nameRef = useRef();
    const dateRef = useRef();
    const locationRef = useRef();
    const typeRef = useRef();

    const handleEdit = (triathlonName) => {
        setEditingTriathlon(triathlonName);
    };

    const handleCancel = () => {
        setEditingTriathlon(null);
    };

    const handleSave = (triathlonName) => {
        const updatedName = nameRef.current.value;
        const updatedDate = dateRef.current.value;
        const updatedLocation = locationRef.current.value;
        const updatedType = typeRef.current.value;
        saveTriathlon(triathlonName, updatedName, updatedDate, updatedLocation, updatedType);
        setEditingTriathlon(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTriathlons = user.triathlons.filter(triathlon =>
        triathlon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h2>Triathlons</h2>
            <input type="text" placeholder="Search via Name" value={searchTerm} onChange={handleSearchChange} />
            {filteredTriathlons.length === 0 ? (
                <div>
                    <h3>No Triathlons found</h3>
                </div>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Total race parts on record</th>
                        <th>Total Time in hours</th>
                        <th>Total Distance in Km</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTriathlons.map((triathlon) => {
                        const date = new Date(triathlon.date);
                        return editingTriathlon === triathlon.name ? (
                            <tr key={triathlon.name}>
                                <td><input ref={nameRef} defaultValue={triathlon.name} /></td>
                                <td><input ref={dateRef} type="date" defaultValue={triathlon.date.split('T')[0]} /></td>
                                <td><input ref={locationRef} defaultValue={triathlon.location} /></td>
                                <td>
                                    <select ref={typeRef} defaultValue={triathlon.type}>
                                        <option value="sprint">Sprint</option>
                                        <option value="olympic">Olympic</option>
                                        <option value="halfIronman">Half Ironman</option>
                                        <option value="ironman">Ironman</option>
                                    </select>
                                </td>
                                <td>{triathlon.raceParts.length}</td>
                                {displayTotalTime(triathlon)}
                                {displayTotalDistance(triathlon)}
                                <td>
                                    <button onClick={handleCancel}>Cancel</button>
                                </td>
                                <td>
                                    <button onClick={() => handleSave(triathlon.name)}>Save</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={triathlon.name}>
                                <td>{triathlon.name}</td>
                                <td>{date.toLocaleDateString()}</td>
                                <td>{triathlon.location}</td>
                                <td>{triathlon.type}</td>
                                <td>{triathlon.raceParts.length}</td>
                                {displayTotalTime(triathlon)}
                                {displayTotalDistance(triathlon)}
                                <td>
                                    <button onClick={() => handleEdit(triathlon.name)}>Edit</button>
                                </td>
                                <td>
                                    <button className="deleteButton" onClick={() => deleteTriathlon(triathlon.name)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </>
    );
}

function displayTotalTime(triathlon) {
    let totalTime = triathlon.getTotalTime() / 60
    return totalTime === 0 ? (
        <td>No time on record</td>
    ) : (
        <td>{totalTime.toFixed(2)} Hours</td>
    );
}

function displayTotalDistance(triathlon) {
    let totalDistance = triathlon.getTotalDistance();
    return totalDistance === 0 ? (
        <td>No Distances on record</td>
    ) : (
        <td>{totalDistance} Km</td>
    );
}
