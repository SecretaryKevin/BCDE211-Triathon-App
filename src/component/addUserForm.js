// src/component/AddUserForm.js
import React, { useState } from 'react';

export function AddUserForm({ addUser }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addUser({ firstname, lastname, dateOfBirth });
        setFirstname('');
        setLastname('');
        setDateOfBirth('');

    };

    return (
        <div id={"userForm"}>
        <div className="formContainer">
            <h2>Add new User</h2>
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            </label>
            <label>
                Date of Birth:
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
            </label>
            <input type="submit" value="Add User" />
        </form>
        </div>
        </div>
    );
}