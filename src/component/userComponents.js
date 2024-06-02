// userComponents.js



import React, { useState } from "react";
import {displayGoals} from "./goalComponents";
import {displayTriathlons} from "./triathlonComponents";

function UserDetail({ user, onBackClick, deleteUser, setSelectedUser }) {
    // Display the details of the user here
    // Call onBackClick when the back button is clicked
    const handleDeleteUser = (userId) => {
        deleteUser(userId);
        setSelectedUser(null);
    };
    return (
        <div className="user-details">
            <div className={"basic-info-container"}>
                <div className="card">
                    <h1>{user.firstname} {user.lastname}</h1>
                    <p>Birthday: {user.dateOfBirth.toLocaleDateString()}</p>
                    <button className="button">Edit Basic Info</button>
                    <button className="button deleteButton" onClick={() => handleDeleteUser(user.id)}>
                        Delete User
                    </button>
                </div>
            </div>
            <h3 className="section-title">Triathlons</h3>
            {displayTriathlons(user)}
            <h3 className="section-title">Goals</h3>
            {displayGoals(user)}
            <button className="button" onClick={onBackClick}>Back</button>
        </div>

    );
}


function DisplayUser({user, onUserClick}) {
    return (
        <div className={"card"}>
            <h3>{user.firstname} {user.lastname}</h3>
            <p>Birthday: {user.dateOfBirth.toLocaleDateString()}</p>
            <p># of triathlons: {user.triathlons.length}</p>
            <p># of goals: {user.goals.length}</p>
            <button className={"button"} onClick={() => onUserClick(user)}>Details</button>
        </div>
    );
}


function AddUser({
                     onBackClick, onAddUser
                 }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleAddUser = () => {
        // Check if all fields are filled
        if (!firstname || !lastname || !dateOfBirth) {
            alert("All fields are required.");
            return;
        }

        // Check if firstname and lastname contain only letters
        const nameRegex = /^[A-Za-z]+$/;
        if (!firstname.match(nameRegex) || !lastname.match(nameRegex)) {
            alert("First name and last name should contain only letters.");
            return;
        }

        // Check if dateOfBirth is a valid date
        const dob = new Date(dateOfBirth);
        if (isNaN(dob)) {
            alert("Please enter a valid date.");
            return;
        }

        // If all checks pass, proceed with adding the user
        onAddUser({firstname, lastname, dob });
        setFirstname('');
        setLastname('');
        setDateOfBirth('');
    };

    return (
        <div className="addUserCard">
            <h2>Add User</h2>
            <input type="text" placeholder="First Name" value={firstname} onChange={e => setFirstname(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastname} onChange={e => setLastname(e.target.value)}/>
            <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}/>
            <button className="button" onClick={handleAddUser}>Add User</button>
            <button className="button" onClick={onBackClick}>Back to list</button>
        </div>
    );
}

export function UserList({users, onAddUser, onDeleteUser}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingUser, setIsAddingUser] = useState(false);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleBackClick = () => {
        setSelectedUser(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddUserClick = () => {
        setIsAddingUser(true);
    };

    const handleAddUser = (user) => {
        // Request the controller to add the user
        onAddUser(user);
        setIsAddingUser(false);
    };
    const filteredUsers = users.filter(user =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedUser) {
        return <UserDetail user={selectedUser} onBackClick={handleBackClick} deleteUser={onDeleteUser} setSelectedUser={setSelectedUser} />
    } else if (isAddingUser) {
        return <AddUser onBackClick={() => setIsAddingUser(false)} onAddUser={handleAddUser} />;
    } else {
        return (
            <div>
                <h1>Users</h1>
                <div className="search-container">
                    <label>Search:</label>
                    <input type="text" placeholder="Users name" value={searchTerm} onChange={handleSearchChange}/>
                </div>
                <div className="card-container">
                    {filteredUsers.map(user => <DisplayUser key={user.identifier} user={user}
                                                            onUserClick={handleUserClick}/>)}
                    <div className="card">
                        <h3>Add User</h3>
                        <button className={"button"} onClick={handleAddUserClick}>Add User</button>
                    </div>
                </div>
            </div>
        );
    }
}