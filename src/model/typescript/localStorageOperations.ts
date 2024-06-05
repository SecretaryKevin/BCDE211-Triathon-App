interface DataWithTime {
    data: string;
    time: number;
}

export function saveToLocalStorage(data: any): void {
    // Converts data to JSON and saves it to local storage with the current time
    const jsonData = JSON.stringify(data);
    const currentTime = new Date().getTime();
    const dataWithTime: DataWithTime = { data: jsonData, time: currentTime };
    localStorage.setItem("triathlonAppData", JSON.stringify(dataWithTime));
}

export function loadFromLocalStorage(): any {
    // Retrieves data from local storage and converts it back to JSON
    const data = localStorage.getItem("triathlonAppData");
    if (data === null) {
        throw new Error("No data in local storage");
    }

    const parsedData: DataWithTime = JSON.parse(data);
    return JSON.parse(parsedData.data);
}
