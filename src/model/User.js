import Goal from './Goal'
import Triathlon from './Triathlon'

export default class User {
    constructor(identifier, firstname, lastname, dateOfBirth) {
        this.identifier = identifier
        this.firstname = firstname
        this.lastname = lastname
        this.dateOfBirth = dateOfBirth
        this.triathlons = []
        this.goals = []
    }

    addGoal(goalName, goalDescription, targetTime, raceType) {
        let newGoal = new Goal(goalName, goalDescription, targetTime, raceType)
        this.goals.push(newGoal)
    }

    getGoalViaName(goalName) {
        return this.goals.find(goal => goal.name === goalName)
    }

    editGoal(goal, goalName, goalDescription, targetTime, raceType) {
        goal.name = goalName
        goal.description = goalDescription
        goal.targetTime = targetTime
        goal.raceType = raceType
    }

    deleteGoal(goal) {
        let index = this.goals.indexOf(goal)
        this.goals.splice(index, 1)
    }

    completeGoal(goal) {
        goal.isCompleted = true
    }

    addTriathlon(triathlonName, triathlonDate, triathlonLocation, triathlonType) {
        this.isValidateTriathlonType(triathlonType)
        let newTriathlon = new Triathlon(triathlonName, triathlonDate, triathlonLocation, triathlonType)
        this.triathlons.push(newTriathlon)
    }

    isValidateTriathlonType(type) {
        // throw exception if type is not sprint, olympic, halfIronman or ironman
        if (type !== 'sprint' && type !== 'olympic' && type !== 'halfIronman' && type !== 'ironman') {
            throw new Error('Type must be sprint, olympic, halfIronman or ironman')
        }
    }

    getTriathlonViaName(triathlonName) {
        return this.triathlons.find(triathlon => triathlon.name === triathlonName)
    }

    editTriathlon(triathlon, triathlonName, triathlonDate, triathlonLocation, triathlonType) {
        triathlon.name = triathlonName
        triathlon.date = triathlonDate
        triathlon.location = triathlonLocation
        triathlon.type = triathlonType
    }

    deleteTriathlon(triathlon) {
        let index = this.triathlons.indexOf(triathlon)
        this.triathlons.splice(index, 1)
    }

    getAllUserData() {
        let result
        // Pushing identifier, firstname, lastname, and dateOfBirth
        result = {
            identifier: this.identifier,
            firstname: this.firstname,
            lastname: this.lastname,
            dateOfBirth: `${this.dateOfBirth.getFullYear()}-${this.dateOfBirth.getMonth() + 1}-${this.dateOfBirth.getDate()}`
        }

        // Pushing triathlons data
        let triathlons = [];
        for (let triathlon of this.triathlons) {
            triathlons.push(triathlon.getAllTriathlonData());
        }
        result.triathlons = triathlons

        // Pushing goals data
        let goals = [];
        for (let goal of this.goals) {
            goals.push({
                name: goal.name,
                description: goal.description,
                targetTime: goal.targetTime,
                raceType: goal.raceType,
                racePart: goal.racePart,
                isCompleted: goal.isCompleted
            });
        }
        result.goals = goals;

        return result;
    }

}