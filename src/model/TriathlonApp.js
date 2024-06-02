import User from "./User";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorageOperations";
import databaseOperations from "./databaseOperations";

export default class TriathlonApp {
    constructor() {
        this.allMyUsers = []
        this.nextUserIdentifier = 1
        this.lastDeletedUser = null
        this.database = new databaseOperations()
    }

    addUser(firstname, lastname, dateOfBirth) {
        let newUser = new User(this.nextUserIdentifier, firstname, lastname, dateOfBirth)
        this.allMyUsers.push(newUser)
        this.nextUserIdentifier++
    }


    editUser(user, firstname, lastname, dateOfBirth) {
        user.firstname = firstname
        user.lastname = lastname
        user.dateOfBirth = dateOfBirth
    }

    deleteUser(user) {
        let index = this.allMyUsers.indexOf(user)
        this.lastDeletedUser = user
        this.allMyUsers.splice(index, 1)
    }

    revertDeletedUser() {
        if (this.lastDeletedUser !== null) {
            this.allMyUsers.push(this.lastDeletedUser)
            this.lastDeletedUser = null
        }
        else {
            throw new Error("No user to revert")
        }
    }

    getUserViaIdentifier(Identifier) {
        return this.allMyUsers.find(user => user.identifier === Identifier)
    }

    sortUsersViaName() {
        this.allMyUsers.sort((a, b) => {
            if (a.firstname < b.firstname) {
                return -1
            }
            if (a.firstname > b.firstname) {
                return 1
            }
            return 0
        })
    }

    getAllAppData() {
        //gets all data in a form ready for json
        let result = []
        for (let user of this.allMyUsers) {
            result.push(user.getAllUserData())
        }
        return result
    }

    saveAppDataLocally() {
        saveToLocalStorage(this.getAllAppData())
    }

    loadAppDataLocally() {
        this.loadAppData(loadFromLocalStorage())
    }

    async saveToDatabase() {
        await this.database.init()
        await this.database.addData(this.getAllAppData())
    }

    async loadFromDatabase(){
        await this.database.init()
        let databaseData = await this.database.getData(1)
        let parsedData = JSON.parse(databaseData.data);
        this.loadAppData(parsedData)
    }


    loadAppData(data) {
        this.allMyUsers = [] // clearing any existing data
        data.forEach(user => {
            this.allMyUsers.push(new User(user.identifier, user.firstname, user.lastname, new Date(user.dateOfBirth)))
            let currentUser = this.getUserViaIdentifier(user.identifier)

            if (user.goals.length > 0) {
                user.goals.forEach(goal => {
                    currentUser.addGoal(goal.name, goal.description, goal.targetTime, goal.raceType)
                })
            }
            if (user.triathlons.length > 0) {
                user.triathlons.forEach(triathlon => {
                    currentUser.addTriathlon(triathlon.name, triathlon.date, triathlon.location, triathlon.type)
                    if (triathlon.raceParts.length > 0) {
                        let newTriathlon = currentUser.getTriathlonViaName(triathlon.name)
                        triathlon.raceParts.forEach(racePart => {
                                newTriathlon.addRacePart(racePart.type, racePart.distance, racePart.startTime, racePart.endTime)
                            }
                        )
                    }
                })
            }else{
                currentUser.triathlons = []
            }
        })
        this.nextUserIdentifier = this.allMyUsers.length + 1 //correcting the next identifier
    }
}