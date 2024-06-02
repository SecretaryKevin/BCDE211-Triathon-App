export function saveToLocalStorage(data) {
    // Converts data to JSON and saves it to local storage with the current time
    let jsonData = JSON.stringify(data);
    let currentTime = new Date().getTime();
    let dataWithTime = {data: jsonData, time: currentTime};
    localStorage.setItem("triathlonAppData", JSON.stringify(dataWithTime));
}

export function loadFromLocalStorage() {
    // Retrieves data from local storage and converts it back to JSON
    let data = localStorage.getItem("triathlonAppData");
    if (data === null) {
        throw new Error("No data in local storage");
    }
    let parsedData = JSON.parse(data);
    return JSON.parse(parsedData.data);
}
