import React from "react";

export function footerButtons(clearData, LoadMockData) {
    return (
        <>
        <div className={"footerButtons"}>
            <button onClick={clearData}>Clear All Data</button>
            <button onClick={LoadMockData}>Load Mock Data</button>
        </div>
        <br/>
        </>
    )
}