export default class Goal {
    constructor(name, description, targetTimeInMinutes, raceType, racePart = null) {
        this.name = name
        this.description = description
        this.targetTime = targetTimeInMinutes
        this.raceType = raceType
        this.racePart = racePart
        this.isCompleted = false
    }
}