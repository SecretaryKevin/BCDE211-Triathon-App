//TODO: Fix render not liking changing between the 2 returns

import React, { useState } from 'react';
import TriathlonApp from "./model/TriathlonApp";
import {header} from "./component/header";
import {DisplayTriathlons} from "./component/displayTriathlons";
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

    const deleteTriathlon = (triathlonName) =>{
        user.deleteTriathlon(user.getTriathlonViaName(triathlonName))
        saveData()
    }

    const saveTriathlon = (triathlonName, updatedName, updatedDate, updatedLocation, updatedType) => {
        let triathlon = user.getTriathlonViaName(triathlonName)
        user.editTriathlon(triathlon, updatedName, updatedDate, updatedLocation, updatedType)
        saveData()
    }


    const clearData = () => {
        // clear all data
        model.allMyUsers = []
        saveData()
    }


    loadData()
    if (model.allMyUsers.length === 0){
        // due to time restrains not allowing for change in user
        model.addUser("Test", "User", new Date(2002, 3,3))
        saveData()
    }

    let user = model.allMyUsers[0]
    return (
        <>
            {header()}
            <h1>Welcome, User</h1>
            {DisplayTriathlons(user, deleteTriathlon, saveTriathlon )}
            <AddTriathlonForm addTriathlon={addTriathlon}/>
            {DisplayGoals(user, deleteGoal, saveGoal)}
            <AddGoalForm addGoal={addGoal}/>
            <button onClick={clearData}>Clear All Data</button>
            </>
        )
}