import RacePart from "./RacePart";

interface TriathlonData {
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
}

export default class Triathlon {
    name: string;
    date: string;
    location: string;
    type: string;
    raceParts: RacePart[];

    constructor(name: string, date: string, location: string, type: string) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.type = type;
        this.raceParts = [];
    }

    addRacePart(type: string, distance: number, startTimeInMinutes: number, endTimeInMinutes: number): void {
        this.isValidateRacePartType(type);
        const newRacePart = new RacePart(type, distance, startTimeInMinutes, endTimeInMinutes);
        this.raceParts.push(newRacePart);
    }

    getRacePartViaType(type: string): RacePart | undefined {
        return this.raceParts.find(racePart => racePart.type === type);
    }

    editRacePart(racePart: RacePart, type: string, distance: number, startTimeInMinutes: number, endTimeInMinutes: number): void {
        racePart.type = type;
        racePart.distanceInKm = distance;
        racePart.startTimeInMinutes = startTimeInMinutes;
        racePart.endTimeInMinutes = endTimeInMinutes;
    }

    deleteRacePart(racePart: RacePart): void {
        const index = this.raceParts.indexOf(racePart);
        if (index !== -1) {
            this.raceParts.splice(index, 1);
        }
    }

    isValidateRacePartType(type: string): void {
        if (type !== 'swim' && type !== 'bike' && type !== 'run') {
            throw new Error('Type must be swim, bike, or run');
        }
    }

    getAllTriathlonData(): TriathlonData {
        const result: TriathlonData = {
            name: this.name,
            date: this.date,
            location: this.location,
            type: this.type,
            raceParts: []
        };

        if (this.raceParts.length > 0) {
            result.raceParts = this.raceParts.map(racePart => ({
                type: racePart.type,
                distance: racePart.distanceInKm,
                startTime: racePart.startTimeInMinutes,
                endTime: racePart.endTimeInMinutes
            }));
        }

        return result;
    }

    getTotalDistance(): number {
        return this.raceParts.reduce((total, racePart) => total + Number(racePart.distanceInKm), 0);
    }

    getTotalTime(): number {
        return this.raceParts.reduce((totalTime, racePart) => Math.max(totalTime, racePart.endTimeInMinutes), 0);
    }
}
