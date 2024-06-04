//TODO: add edit and delete buttons
export function displayTriathlons(user) {
    if (user.triathlons.length === 0) {
        return (
            <>
            <h2>Triathlons</h2>
            <div>
                <h3>No Triathlons found</h3>
            </div>
        </>
        )
    } else {
        return (
            <div>
                <h2>Triathlons</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user.triathlons.map(triathlon => {
                        const date = new Date(triathlon.date);
                        return (
                            <tr key={triathlon.name}>
                                <td>{triathlon.name}</td>
                                <td>{date.toLocaleDateString()}</td>
                                <td>{triathlon.location}</td>
                                <td>{triathlon.type}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}