//TODO: Fix render not liking changing between the 2 returns

import React, { useState } from 'react';
import TriathlonApp from "./model/typescript/TriathlonApp";
import {header} from "./component/header";
import {DisplayTriathlons} from "./component/displayTriathlons";
import {AddTriathlonForm} from "./component/addTriathlonForm";
import {DisplayGoals} from "./component/displayGoals";
import {AddGoalForm} from "./component/addGoalForm";
import {DisplayRaceParts} from "./component/DisplayRaceparts";
import {RacePartForm} from "./component/racePartForm";
import {footerButtons} from "./component/footerButtons";

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
        let goal = model.allMyUsers[0].getGoalViaName(goalName)
        model.allMyUsers[0].editGoal(goal, goalName, goalDescription, targetTime, raceType, isCompleted)
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

    const addRacePart = (triathlonName, type, distance, startTime, endTime)=>{
        let triathlon = user.getTriathlonViaName(triathlonName)
        triathlon.addRacePart(type, distance, startTime, endTime)
        saveData()
    }

    const deleteRacePart = (triathlonName, racePart) => {
        let triathlon = user.getTriathlonViaName(triathlonName)
        triathlon.deleteRacePart(racePart)
        saveData()
    }
    const sortTriathlonsByDate = () => {
        user.sortTriathlonsByDate()
        saveData()
    }

    const saveRacePart = (triathlonName, racePart, updatedType, updatedDistance, updatedStartTime, updatedEndTime) => {
        let triathlon = user.getTriathlonViaName(triathlonName)
        triathlon.editRacePart(racePart, updatedType, updatedDistance, updatedStartTime, updatedEndTime)
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

    function loadMockData() {
        return undefined
    }

    return (
        <>
            {header()}
            <h1>Welcome, User</h1>
            {DisplayTriathlons(user, deleteTriathlon, saveTriathlon, sortTriathlonsByDate)}
            <AddTriathlonForm addTriathlon={addTriathlon}/>
            <div className={"divider"}></div>
            <DisplayRaceParts user={user} deleteRacePart={deleteRacePart} saveRacePart={saveRacePart}/>
            <RacePartForm user={user} addRacePart={addRacePart}/>
            <div className={"divider"}></div>
            {DisplayGoals(user, deleteGoal, saveGoal)}
            <AddGoalForm addGoal={addGoal}/>
            <div className={"divider"}></div>
            {footerButtons(clearData, loadMockData)}
        </>
    )
}