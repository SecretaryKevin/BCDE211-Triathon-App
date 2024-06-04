//TODO: Fix render not liking changing between the 2 returns

import React, { useState } from 'react';
import TriathlonApp from "./model/TriathlonApp";
import {header} from "./component/header";
import {AddUserForm} from "./component/addUserForm";
import {displayTriathlons} from "./component/displayTriathlons";
import {AddTriathlonForm} from "./component/addTriathlonForm";
import {DisplayGoals} from "./component/displayGoals";
import {AddGoalForm} from "./component/addGoalForm";

export default function Controller() {
    const [model, setModel] = useState(new TriathlonApp());
    const [update, setUpdate] = useState(false);

    const loadData = () => {
        try{
            model.loadAppDataLocally()
        } catch (error) {
            model.loadFromDatabase()
        }
    }

    const saveData = () => {
        model.saveAppDataLocally()
        model.saveToDatabase().then(() => {
            setUpdate(prevState => !prevState); // Trigger a re-render
        })
    }

    const addGoal = (name, description, targetTimeInMinutes, raceType) => {
        model.allMyUsers[0].addGoal(name, description, targetTimeInMinutes, raceType)
        saveData()
    }

    const deleteGoal = (goalName) => {
        model.allMyUsers[0].deleteGoal(goalName)
        saveData()
    }

    const saveGoal = (goalName, goalDescription, targetTime, raceType, isCompleted) => {
        console.log(goalName, goalDescription, targetTime, raceType, isCompleted)
        let goal = model.allMyUsers[0].getGoalViaName(goalName)
        console.log(goal)
        model.allMyUsers[0].editGoal(goal, goalName, goalDescription, targetTime, raceType, isCompleted)
        console.log(goal)
        saveData()
    }

    const addTriathlon = (name, date, location, type) => {
        model.allMyUsers[0].addTriathlon(name, new Date(date), location, type)
        saveData()
    }

    const addUser = (userData) => {
        model.addUser(userData.firstname, userData.lastname, new Date(userData.dateOfBirth))
        saveData()
    }

    const clearData = () => {
        // clear all data
        model.allMyUsers = []
        saveData()
    }


    loadData()
    if (model.allMyUsers.length === 0) {
        return (
            <>
                {header()}
                <AddUserForm addUser={addUser} />
            </>
        )
    } else {
        return (
            <div>
                {header()}
                <h1>Welcome, {model.allMyUsers[0].firstname} {model.allMyUsers[0].lastname}</h1>
                {displayTriathlons(model.allMyUsers[0])}
                <AddTriathlonForm addTriathlon={addTriathlon} />
                {DisplayGoals(model.allMyUsers[0], deleteGoal, saveGoal)}
                <AddGoalForm addGoal={addGoal} />
                <button onClick={clearData}>Clear All Data</button>
            </div>
        )
    }
}