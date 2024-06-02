import RacePart from "./RacePart";

export default class Triathlon {
    constructor(name, date, location, type) {
        this.name = name
        this.date = date
        this.location = location
        this.type = type
        this.raceParts = []
    }

    addRacePart(type, distance, startTimeInMinutes, endTimeInMinutes) {
        this.isValidateRacePartType(type)
        let newRacePart = new RacePart(type, distance, startTimeInMinutes, endTimeInMinutes)
        this.raceParts.push(newRacePart)
    }

    getRacePartViaType(type) {
        return this.raceParts.find(racePart => racePart.type === type)
    }

    editRacePart(racePart, type, distance, startTimeInMinutes, endTimeInMinutes) {
        racePart.type = type
        racePart.distanceInKm = distance
        racePart.startTimeInMinutes = startTimeInMinutes
        racePart.endTimeInMinutes = endTimeInMinutes
    }

    deleteRacePart(racePart) {
        let index = this.raceParts.indexOf(racePart)
        this.raceParts.splice(index, 1)
    }


    isValidateRacePartType(type) {
        // throw exception if type is not swim, bike or run
        if (type !== 'swim' && type !== 'bike' && type !== 'run') {
            throw new Error('Type must be swim, bike or run')
        }
    }

    getAllTriathlonData() {
        let result = {
            name: this.name,
            date: this.date,
            location: this.location,
            type: this.type
        }
        if (this.raceParts.length === 0) {
            result.raceParts = []
        } else {
            let raceParts = []
            for (let racePart of this.raceParts) {
                raceParts.push({
                    type: racePart.type,
                    distance: racePart.distanceInKm,
                    startTime: racePart.startTimeInMinutes,
                    endTime: racePart.endTimeInMinutes
                })
            }
            result.raceParts = raceParts
        }
        return result
    }

    getTotalDistance() {
        let totalDistance = 0
        for (let racePart of this.raceParts) {
            totalDistance += racePart.distanceInKm
        }
        return totalDistance
    }
    getTotalTime() {
        let totalTime = 0
        for (let racePart of this.raceParts) {
            if (racePart.endTimeInMinutes > totalTime) {
                totalTime = racePart.endTimeInMinutes
            }
        }
        return totalTime
    }
}
