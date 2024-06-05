export default class Goal {
    name: string;
    description: string;
    targetTime: number;
    raceType: string;
    racePart: string | null;
    isCompleted: boolean;

    constructor(name: string, description: string, targetTimeInMinutes: number, raceType: string, racePart: string | null = null) {
        this.name = name;
        this.description = description;
        this.targetTime = targetTimeInMinutes;
        this.raceType = raceType;
        this.racePart = racePart;
        this.isCompleted = false;
    }
}
