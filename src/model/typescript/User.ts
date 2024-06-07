import Goal from './Goal';
import Triathlon from './Triathlon';

interface UserData {
    identifier: number;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
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
    goals: Array<{
        name: string;
        description: string;
        targetTime: number;
        raceType: string;
        racePart: string | null;
        isCompleted: boolean;
    }>;
}

export default class User {
    identifier: number;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    triathlons: Triathlon[];
    goals: Goal[];

    constructor(identifier: number, firstname: string, lastname: string, dateOfBirth: Date) {
        this.identifier = identifier;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.triathlons = [];
        this.goals = [];
    }

    addGoal(goalName: string, goalDescription: string, targetTime: number, raceType: string): void {
        const newGoal = new Goal(goalName, goalDescription, targetTime, raceType);
        this.goals.push(newGoal);
    }

    getGoalViaName(goalName: string): Goal | undefined {
        return this.goals.find(goal => goal.name === goalName);
    }

    editGoal(goal: Goal, goalName: string, goalDescription: string, targetTime: number, raceType: string, isCompleted: boolean): void {
        goal.name = goalName;
        goal.description = goalDescription;
        goal.targetTime = targetTime;
        goal.raceType = raceType;
        goal.isCompleted = isCompleted;
    }

    deleteGoal(goal: Goal): void {
        const index = this.goals.indexOf(goal);
        if (index !== -1) {
            this.goals.splice(index, 1);
        }
    }

    addTriathlon(triathlonName: string, triathlonDate: string, triathlonLocation: string, triathlonType: string): void {
        this.isValidateTriathlonType(triathlonType);
        const newTriathlon = new Triathlon(triathlonName, triathlonDate, triathlonLocation, triathlonType);
        this.triathlons.push(newTriathlon);
    }

    isValidateTriathlonType(type: string): void {
        if (type !== 'sprint' && type !== 'olympic' && type !== 'halfIronman' && type !== 'ironman') {
            throw new Error('Type must be sprint, olympic, halfIronman or ironman');
        }
    }

    getTriathlonViaName(triathlonName: string): Triathlon | undefined {
        return this.triathlons.find(triathlon => triathlon.name === triathlonName);
    }

    sortTriathlonsByDate(): void {
        this.triathlons.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
    }

    editTriathlon(triathlon: Triathlon, triathlonName: string, triathlonDate: string, triathlonLocation: string, triathlonType: string): void {
        triathlon.name = triathlonName;
        triathlon.date = triathlonDate;
        triathlon.location = triathlonLocation;
        triathlon.type = triathlonType;
    }

    deleteTriathlon(triathlon: Triathlon): void {
        const index = this.triathlons.indexOf(triathlon);
        if (index !== -1) {
            this.triathlons.splice(index, 1);
        }
    }

    getAllUserData(): UserData {
        const result: UserData = {
            identifier: this.identifier,
            firstname: this.firstname,
            lastname: this.lastname,
            dateOfBirth: `${this.dateOfBirth.getFullYear()}-${this.dateOfBirth.getMonth() + 1}-${this.dateOfBirth.getDate()}`,
            triathlons: this.triathlons.map(triathlon => triathlon.getAllTriathlonData()),
            goals: this.goals.map(goal => ({
                name: goal.name,
                description: goal.description,
                targetTime: goal.targetTime,
                raceType: goal.raceType,
                racePart: goal.racePart,
                isCompleted: goal.isCompleted
            }))
        };

        return result;
    }
}
