//TODO: Fix isComplete not updating when editing a goal
import React, {useState, useRef} from 'react';

export function DisplayGoals(user, deleteGoal, saveGoal){
    const [editingGoal, setEditingGoal] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const descriptionRef = useRef();
    const targetTimeRef = useRef();
    const raceTypeRef = useRef();
    const isCompletedRef = useRef();
    const [raceType, setRaceType] = useState('');

    const handleEdit = (goalName) => {
        setEditingGoal(goalName);
    }

    const handleCancel = () => {
        setEditingGoal(null);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }


    const filteredGoals = user.goals.filter(goal =>
        goal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (goalName) => {
        const goalDescription = descriptionRef.current.value;
        const targetTime = targetTimeRef.current.value;
        const raceType = raceTypeRef.current.value;
        const isCompleted = isCompletedRef.current.checked;

        saveGoal(goalName, goalDescription, targetTime, raceType, isCompleted);
        setEditingGoal(null);

        // Update isCompletedRef
        isCompletedRef.current.checked = isCompleted;
    }
    //TODO: Tidy this up
    if (filteredGoals.length === 0){
        return (
            <>
                <h2>Goals</h2>
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange}/>
                <div>
                    <h3>No Goals found</h3>
                </div>
            </>
        )
    } else {
        return (
            <div>
                <h2>Goals</h2>
                <input type="text" placeholder="Search via name" value={searchTerm} onChange={handleSearchChange}/>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Target Time</th>
                        <th>Race Type</th>
                        <th>Completed?</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredGoals.map(goal => {
                        let displayRaceType = goal.raceType === 'halfIronman' ? 'half ironman' : goal.raceType;
                        if (editingGoal === goal.name) {
                            return (
                                <tr key={goal.name}>
                                    <td><input defaultValue={goal.name}/></td>
                                    <td><input ref={descriptionRef} defaultValue={goal.description}/></td>
                                    <td><input ref={targetTimeRef} defaultValue={goal.targetTime}/></td>
                                    <td><select ref={raceTypeRef} defaultValue={raceType}
                                                onChange={(e) => setRaceType(e.target.value)} required>
                                        <option value="sprint">Sprint</option>
                                        <option value="olympic">Olympic</option>
                                        <option value="halfIronman">Half Ironman</option>
                                        <option value="ironman">Ironman</option>
                                    </select></td>
                                    <td><input ref={isCompletedRef} type="checkbox" defaultChecked={goal.isCompleted}/>
                                    </td>
                                    <td>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSave(goal.name)}>Save</button>
                                    </td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={goal.name}>
                                    <td>{goal.name}</td>
                                    <td>{goal.description}</td>
                                    <td>{goal.targetTime}</td>
                                    <td>{displayRaceType}</td>
                                    <td>{goal.isCompleted.toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(goal.name)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className={"deleteButton"}
                                                onClick={() => deleteGoal(goal.name)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}