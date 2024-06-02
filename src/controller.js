// Controller.js
import TriathlonApp from "./model/TriathlonApp";
import {UserList} from "./component/userComponents";
export default class Controller {

    constructor() {
        this.model = new TriathlonApp();
        this.loadData();
        this.container = document.getElementById('root');
        this.root = this.container._reactRoot;
    }


    mainDisplay() {
        this.root.render(
            <>
                <header>
                    <h1>Triathlon App</h1>
                </header>
                <main>
                    <UserList users={this.model.allMyUsers} onAddUser={this.AddUser.bind(this)} onDeleteUser={this.deleteUser.bind(this)} />
                </main>
            </>
        );
    }

    loadData() {
        // if local storage is empty, load data from database
        // if database is empty load from default data js file then save to local storage and database
        console.log("Loading data")
        this.model.loadAppDataLocally()
        if (this.model.allMyUsers.length === 0) {
            console.log("No data in local storage, loading from database")
            this.model.loadFromDatabase()
            if (this.model.allMyUsers.length === 0) {
                console.log("No data in database, loading default data")
                this.loadDefaultData()
                this.model.saveToDatabase()
                this.model.saveAppDataLocally()
            }
        }
        console.log("Data loaded")
    }

    loadDefaultData() {
        // load default data
        console.log("Loading default data")
        this.model.addUser("John", "Doe", new Date(1920, 1, 12))
        this.model.addUser("Jane", "Doe", new Date(1980, 8, 20))
        this.model.addUser("Bob", "Smith", new Date(1978, 7, 13))
        this.model.addUser("Alice", "Smith", new Date(2002, 3, 14))
        //load Triathlons
        let user = this.model.getUserViaIdentifier(1)
        user.addTriathlon("Ironman", new Date(2022, 2, 2), "Melbourne", "ironman")
        user.addTriathlon("Olympic", new Date(2022, 3, 3), "Sydney", "olympic")
        user = this.model.getUserViaIdentifier(2)
        user.addTriathlon("Sprint", new Date(2022, 4, 4), "Brisbane", "sprint")
        user = this.model.getUserViaIdentifier(3)
        user.addTriathlon("Half Ironman", new Date(2022, 5, 5), "Gold Coast", "halfIronman")
        user.addTriathlon("Sprint", new Date(2022, 6, 6), "Sunshine Coast", "sprint")
        //load Triathlon Parts
        user = this.model.getUserViaIdentifier(1)
        let triathlon = user.getTriathlonViaName("Ironman")
        triathlon.addRacePart("swim", 3.8, 0, 60)
        triathlon.addRacePart("bike", 180, 60, 480)
        triathlon.addRacePart("run", 42.2, 480, 600)
        triathlon = user.getTriathlonViaName("Olympic")
        triathlon.addRacePart("swim", 1.5, 0, 30)
        triathlon.addRacePart("bike", 40, 30, 90)
        triathlon.addRacePart("run", 10, 90, 120)

        user = this.model.getUserViaIdentifier(2)
        triathlon = user.getTriathlonViaName("Sprint")
        triathlon.addRacePart("swim", 0.75, 0, 15)
        triathlon.addRacePart("bike", 20, 15, 45)
        triathlon.addRacePart("run", 5, 45, 60)

        user = this.model.getUserViaIdentifier(3)
        triathlon = user.getTriathlonViaName("Half Ironman")
        triathlon.addRacePart("swim", 1.9, 0, 30)
        triathlon.addRacePart("bike", 90, 30, 180)
        triathlon.addRacePart("run", 21.1, 180, 240)

        // load goals
        user = this.model.getUserViaIdentifier(1)
        user.addGoal("Ironman", "Complete Ironman", 720, "ironman")
        user.addGoal("Olympic", "Complete Olympic", 120, "olympic")
        user = this.model.getUserViaIdentifier(2)
        user.addGoal("Sprint", "Complete Sprint", 60, "sprint")
        user = this.model.getUserViaIdentifier(3)
        user.addGoal("Half Ironman", "Complete Half Ironman", 300, "halfIronman")
        user.addGoal("Sprint", "Complete Sprint", 60, "sprint")
    }

    saveData() {
        // save data to local storage and database
        this.model.saveAppDataLocally()
        this.model.saveToDatabase()
    }

    AddUser(user) {
        // add user to model then save data
        let formatedFirstName = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1).toLowerCase()
        let formatedLastName = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1).toLowerCase()

        this.model.addUser(formatedFirstName,formatedLastName, user.dob);
        this.saveData()
    }

    deleteUser(userID) {
        // delete user from model then save data
        this.model.deleteUser(this.model.getUserViaIdentifier(userID))
        this.saveData()
    }
}
