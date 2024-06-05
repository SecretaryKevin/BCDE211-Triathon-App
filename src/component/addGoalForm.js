import React, {useState} from "react";
export function AddGoalForm({addGoal}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetTime, setTargetTime] = useState('');
    const [raceType, setRaceType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addGoal(name, description, targetTime, raceType);
        setName('');
        setDescription('');
        setTargetTime('');
        setRaceType('');
    };


return (
    <>
        <div className="formContainer">
            <h2>Add new Goal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>
                <br/>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </label>
                <br/>
                <label>
                    Target Time (in Minutes):
                    <input type="number" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} required/>
                </label>
                <br/>
                <label>
                    Type:
                    <select value={raceType} onChange={(e) => setRaceType(e.target.value)} required>
                        <option value="">Select type</option>
                        <option value="sprint">Sprint</option>
                        <option value="olympic">Olympic</option>
                        <option value="halfIronman">Half Ironman</option>
                        <option value="ironman">Ironman</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Add Goal"/>
            </form>
        </div>
    </>
);

}