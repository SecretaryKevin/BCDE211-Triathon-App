import User from "./User";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorageOperations";
import DatabaseOperations, { DataWithTime } from "./databaseOperations";

interface AppData {
    identifier: number;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    goals: Array<{
        name: string;
        description: string;
        targetTime: number;
        raceType: string;
    }>;
    triathlons: Array<{
        name: string;
        date: string;
        location: string;
        type: string;
        raceParts: Array<{
            type: string;
            distance: number;
            startTime: number;
            endTime: number;
        }>;
    }>;
}

export default class TriathlonApp {
    private allMyUsers: User[];
    private nextUserIdentifier: number;
    private lastDeletedUser: User | null;
    private database: DatabaseOperations;

    constructor() {
        this.allMyUsers = [];
        this.nextUserIdentifier = 1;
        this.lastDeletedUser = null;
        this.database = new DatabaseOperations();
    }

    addUser(firstname: string, lastname: string, dateOfBirth: Date): void {
        const newUser = new User(this.nextUserIdentifier, firstname, lastname, dateOfBirth);
        this.allMyUsers.push(newUser);
        this.nextUserIdentifier++;
    }

    editUser(user: User, firstname: string, lastname: string, dateOfBirth: Date): void {
        user.firstname = firstname;
        user.lastname = lastname;
        user.dateOfBirth = dateOfBirth;
    }

    deleteUser(user: User): void {
        const index = this.allMyUsers.indexOf(user);
        if (index !== -1) {
            this.lastDeletedUser = user;
            this.allMyUsers.splice(index, 1);
        }
    }

    revertDeletedUser(): void {
        if (this.lastDeletedUser !== null) {
            this.allMyUsers.push(this.lastDeletedUser);
            this.lastDeletedUser = null;
        } else {
            throw new Error("No user to revert");
        }
    }

    getUserViaIdentifier(identifier: number): User | undefined {
        return this.allMyUsers.find(user => user.identifier === identifier);
    }

    sortUsersViaName(): void {
        this.allMyUsers.sort((a, b) => a.firstname.localeCompare(b.firstname));
    }

    getAllAppData(): AppData[] {
        return this.allMyUsers.map(user => user.getAllUserData());
    }

    saveAppDataLocally(): void {
        saveToLocalStorage(this.getAllAppData());
    }

    loadAppDataLocally(): void {
        this.loadAppData(loadFromLocalStorage());
    }

    async saveToDatabase(): Promise<void> {
        await this.database.init();
        await this.database.addData(this.getAllAppData());
    }

    async loadFromDatabase(): Promise<void> {
        await this.database.init();
        const databaseData = await this.database.getData(1) as DataWithTime;
        const parsedData: AppData[] = JSON.parse(databaseData.data);
        this.loadAppData(parsedData);
    }

    loadAppData(data: AppData[]): void {
        this.allMyUsers = []; // clearing any existing data

        data.forEach(user => {
            const newUser = new User(user.identifier, user.firstname, user.lastname, new Date(user.dateOfBirth));
            this.allMyUsers.push(newUser);
            const currentUser = this.getUserViaIdentifier(user.identifier);

            if (currentUser) {
                user.goals.forEach(goal => {
                    currentUser.addGoal(goal.name, goal.description, goal.targetTime, goal.raceType);
                });

                user.triathlons.forEach(triathlon => {
                    currentUser.addTriathlon(triathlon.name, triathlon.date, triathlon.location, triathlon.type);
                    const newTriathlon = currentUser.getTriathlonViaName(triathlon.name);

                    if (newTriathlon) {
                        triathlon.raceParts.forEach(racePart => {
                            newTriathlon.addRacePart(racePart.type, racePart.distance, racePart.startTime, racePart.endTime);
                        });
                    }
                });
            }
        });

        this.nextUserIdentifier = this.allMyUsers.length + 1; // correcting the next identifier
    }
}
