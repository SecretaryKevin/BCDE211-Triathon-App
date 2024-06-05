import React, {useState} from "react";

export function RacePartForm({user, addRacePart}) {
    const [triathlon, setTriathlon] = useState('')
    const [type, setType] = useState('')
    const [distance, setDistance] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        addRacePart(triathlon, type, distance, startTime, endTime)
        setTriathlon('')
        setType('')
        setDistance('')
        setStartTime('')
        setEndTime('')
    }
    console.log(user)
    return (
        <>
        {(user.triathlons.length !== 0) ? (
                <div className="formContainer">
                    <h2>Add new Race part Record</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Triathlon to assign to:
                            <select value={triathlon} onChange={(e) => setTriathlon(e.target.value)} required>
                                <option value="" disabled>Select a triathlon</option>
                                {user.triathlons.map((triathlon) => (
                                    <option key={triathlon.name} value={triathlon.name}>
                                        {triathlon.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Type:
                            <select value={type} onChange={(e) => setType(e.target.value)} required>
                                <option value="" disabled>Select a type</option>
                                <option value="swim">Swim</option>
                                <option value="bike">Bike</option>
                                <option value="run">Run</option>
                            </select>
                        </label>
                        <label>
                            Distance in Km:
                            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} required/>
                        </label>
                        <label>
                            Start Time in minutes:
                            <input type="number" value={startTime} onChange={(e) => setStartTime(e.target.value)} required/>
                        </label>
                        <label>
                            End Time in minutes:
                            <input type="number" value={endTime} onChange={(e) => setEndTime(e.target.value)} required/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) :(
                <>
                    <h3>Can't assign Race Parts if No Triathlons Exist</h3>
                </>
        )}
        </>)
}