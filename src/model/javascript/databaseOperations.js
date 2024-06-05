import "core-js/stable/structured-clone";

export default class databaseOperations {
    constructor() {
        this.dbName = "TriathlonApp"
        this.storeName = "TriathlonAppData"
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(this.storeName, {autoIncrement: true, keyPath: "entryId"});
            }
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve()
            }

        })
    }

    async addData(data) {
        try{
            let jsonData = JSON.stringify(data)
            let currentTime = new Date().getTime()
            let dataWithTime = {data: jsonData, time: currentTime}

            const transaction = this.db.transaction([this.storeName], "readwrite")
            const store = transaction.objectStore(this.storeName)
            await store.add(dataWithTime)
        } catch (error) {
            throw new Error(`Failed to add data: ${error}`)
        }

    }

    async getData(key) {

        return new Promise((resolve, reject) => {
            // Start a read-only transaction
                const transaction = this.db.transaction([this.storeName], "readonly");const store = transaction.objectStore(this.storeName);

                // Retrieve data by key
                const request = store.get(key)

                // Event handler for successful retrieval
                request.onsuccess = (event) => {
                    // Resolve the promise with the retrieved data
                    resolve(event.target.result);
                };
            });

    }
}
