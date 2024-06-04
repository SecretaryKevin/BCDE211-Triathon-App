import React, { useState } from "react";

export function AddTriathlonForm({ addTriathlon }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(type)
        addTriathlon(name, date, location, type);
        setName('');
        setDate('');
        setLocation('');
        setType('');
    };

    return (
        <>
            <div className="form-container">
        <h2>Add new Triathlon Record</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </label>
                    <br/>
                    <label>
                        Date:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                    </label>
                    <br/>
                    <label>
                        Location:
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required/>
                    </label>
                    <br/>
                    <label>
                        Type:
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="">Select type</option>
                            <option value="sprint">Sprint</option>
                            <option value="olympic">Olympic</option>
                            <option value="halfIronman">Half Ironman</option>
                            <option value="ironman">Ironman</option>
                        </select>
                    </label>
                    <br/>
                    <h2>Race Parts</h2>
                    <h3>Swimming</h3>
                    <label>
                        Distance in km:
                        <input type="number"/>
                    </label>
                    <label>
                        Start Time in minutes:
                        <input type="number"/>
                    </label>
                    <label>
                        End Time in minutes:
                        <input type="number"/>
                    </label>
                    <h3>Cycling</h3>
                    <label>
                        Distance in km:
                        <input type="number"/>
                    </label>
                    <label>
                        Start Time in minutes:
                        <input type="number"/>
                    </label>
                    <label>
                        End Time in minutes:
                        <input type="number"/>
                    </label>
                    <h3>Running</h3>
                    <label>
                        Distance in km:
                        <input type="number"/>
                    </label>
                    <label>
                        Start Time in minutes:
                        <input type="number"/>
                    </label>
                    <label>
                        End Time in minutes:
                        <input type="number"/>
                    </label>
                    <input type="submit" value="Add Triathlon"/>
                </form>
            </div>
        </>
    );
}
