export default class RacePart {
    type: string;
    distanceInKm: number;
    startTimeInMinutes: number;
    endTimeInMinutes: number;

    constructor(type: string, distanceInKm: number, startTimeInMinutes: number, endTimeInMinutes: number) {
        this.type = type;
        this.distanceInKm = distanceInKm;
        this.startTimeInMinutes = startTimeInMinutes;
        this.endTimeInMinutes = endTimeInMinutes;
    }
}
