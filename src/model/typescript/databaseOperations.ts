import 'core-js/stable/structured-clone';

export interface DataWithTime {
    data: string;
    time: number;
    entryId?: number;
}

export default class DatabaseOperations {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | undefined;

    constructor() {
        this.dbName = "TriathlonApp";
        this.storeName = "TriathlonAppData";
    }

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore(this.storeName, {autoIncrement: true, keyPath: "entryId"});
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onerror = (event) => {
                reject(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
            };
        });
    }

    async addData(data: any): Promise<void> {
        if (!this.db) {
            throw new Error("Database is not initialized");
        }

        try {
            const jsonData = JSON.stringify(data);
            const currentTime = new Date().getTime();
            const dataWithTime: DataWithTime = {data: jsonData, time: currentTime};

            const transaction = this.db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            await store.add(dataWithTime);
        } catch (error) {
            throw new Error(`Failed to add data: ${error}`);
        }
    }

    async getData(key: number): Promise<DataWithTime> {
        if (!this.db) {
            throw new Error("Database is not initialized");
        }

        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database is not initialized");
                return;
            }

            const transaction = this.db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);

            const request = store.get(key);

            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result);
            };

            request.onerror = (event) => {
                reject(`Failed to get data: ${(event.target as IDBRequest).error}`);
            };
        });
    }
}
