"use strict";

console.log("=== Modded Minecraft Expedition Log ===");

// Basic site and expedition information
const siteName = "Modded Minecraft Expedition Log";
const worldVersion = "1.20.1";
let currentLocationIndex = 0;
const expeditionActive = true;

// Convert a string value into a number
const rawDangerLevel = "7";
const dangerLevel = Number(rawDangerLevel);

console.log("Site name:", siteName);
console.log("Minecraft version:", worldVersion);
console.log("Expedition active:", expeditionActive);
console.log("Converted danger level:", dangerLevel);
console.log("Type of dangerLevel:", typeof dangerLevel);

// Locations stored as an array of objects
const locations = [
    {
        name: "Overworld Base",
        biome: "Forest",
        dangerLevel: 2,
        visited: true
    },
    {
        name: "Ancient Ruins",
        biome: "Dark Forest",
        dangerLevel: 7,
        visited: true
    },
    {
        name: "Mountain Cave",
        biome: "Mountains",
        dangerLevel: 9,
        visited: false
    }
];

// Access an array element and object properties
console.log("First saved location:", locations[0].name);
console.log("First location biome:", locations[0].biome);

// Meaningful decision for an expedition
if (dangerLevel >= 8 && expeditionActive === true) {
    console.log("Travel decision: High danger. Better gear is recommended before exploring.");
} else if (dangerLevel >= 5 && expeditionActive === true) {
    console.log("Travel decision: Moderate danger. The area can be explored, but be careful.");
} else {
    console.log("Travel decision: Low danger. This should be a normal exploration area.");
}

// Function that estimates Minecraft travel time
function estimateTravelTime(distanceBlocks, blocksPerMinute) {
    const minutes = distanceBlocks / blocksPerMinute;
    return Number(minutes.toFixed(1));
}

// Call the function with two different sets of arguments
const shortTripMinutes = estimateTravelTime(900, 180);
const longTripMinutes = estimateTravelTime(2400, 200);

console.log("Estimated time for the 900-block trip:", shortTripMinutes, "minutes");
console.log("Estimated time for the 2400-block trip:", longTripMinutes, "minutes");

// Loop through all saved locations
console.log("--- Saved Expedition Locations ---");

for (const location of locations) {
    console.log(
        location.name +
        " | Biome: " + location.biome +
        " | Danger: " + location.dangerLevel +
        " | Visited: " + location.visited
    );
}

// Update a value declared with let
currentLocationIndex = 1;

console.log("Current selected location:", locations[currentLocationIndex].name);
console.log("=== JavaScript finished without errors ===");


const statusCard = document.querySelector("#expedition-status");
const locationSelect = document.querySelector("#location-select");
const alertButton = document.querySelector("#toggle-alert");
const addLogButton = document.querySelector("#add-log-entry");
const expeditionLog = document.querySelector("#expedition-log");

locationSelect.addEventListener("change", function () {
    const selectedOption =
        locationSelect.options[locationSelect.selectedIndex];

    const selectedLocation = selectedOption.value;
    const selectedDanger =
        selectedOption.getAttribute("data-danger");

    statusCard.textContent =
        "Current location: " +
        selectedLocation +
        " | Danger level: " +
        selectedDanger;

    statusCard.setAttribute(
        "data-location",
        selectedLocation
    );
});

alertButton.addEventListener("click", function () {
    statusCard.classList.toggle("is-alert");

    if (statusCard.classList.contains("is-alert")) {
        alertButton.textContent = "Remove Danger Highlight";
    } else {
        alertButton.textContent = "Toggle Danger Highlight";
    }
});

addLogButton.addEventListener("click", function () {
    const selectedOption =
        locationSelect.options[locationSelect.selectedIndex];

    const item = document.createElement("li");

    item.textContent =
        selectedOption.value +
        " added to the expedition log (danger " +
        selectedOption.dataset.danger +
        ").";

    expeditionLog.append(item);
});

const scoutForm = document.querySelector("#scout-form");
const scoutName = document.querySelector("#scout-name");
const scoutBiome = document.querySelector("#scout-biome");
const scoutDanger = document.querySelector("#scout-danger");
const scoutDate = document.querySelector("#scout-date");
const scoutNotes = document.querySelector("#scout-notes");
const scoutBuild = document.querySelector("#scout-build");
const scoutFormMessage = document.querySelector("#scout-form-message");

const scoutNameError = document.querySelector("#scout-name-error");
const scoutBiomeError = document.querySelector("#scout-biome-error");
const scoutDangerError = document.querySelector("#scout-danger-error");
const scoutDateError = document.querySelector("#scout-date-error");
const scoutNotesError = document.querySelector("#scout-notes-error");

function clearScoutErrors() {
    scoutNameError.textContent = "";
    scoutBiomeError.textContent = "";
    scoutDangerError.textContent = "";
    scoutDateError.textContent = "";
    scoutNotesError.textContent = "";
    scoutFormMessage.textContent = "";
}

scoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearScoutErrors();

    const locationName = scoutName.value.trim();
    const biome = scoutBiome.value;
    const dangerLevel = Number(scoutDanger.value);
    const scoutedOn = scoutDate.value;
    const notes = scoutNotes.value.trim();
    const wouldBuildHere = scoutBuild.checked;

    let isValid = true;

    if (locationName.length < 2) {
        scoutNameError.textContent =
            "Enter a location name with at least 2 characters.";
        isValid = false;
    }

    if (biome === "") {
        scoutBiomeError.textContent =
            "Choose the biome for this location.";
        isValid = false;
    }

    if (
        scoutDanger.value === "" ||
        dangerLevel < 1 ||
        dangerLevel > 10
    ) {
        scoutDangerError.textContent =
            "Danger level must be between 1 and 10.";
        isValid = false;
    }

    if (scoutedOn === "") {
        scoutDateError.textContent =
            "Choose the date this location was scouted.";
        isValid = false;
    } else {
        const selectedDate = new Date(scoutedOn + "T00:00:00");
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            scoutDateError.textContent =
                "The scouting date cannot be in the future.";
            isValid = false;
        }
    }

    if (dangerLevel >= 8 && notes.length < 10) {
        scoutNotesError.textContent =
            "High-danger locations need a short note explaining the risk.";
        isValid = false;
    }

    if (!isValid) {
        scoutFormMessage.textContent =
            "Fix the highlighted form problems and try again.";
        return;
    }

    const scoutReport = {
        locationName: locationName,
        biome: biome,
        dangerLevel: dangerLevel,
        scoutedOn: scoutedOn,
        notes: notes,
        wouldBuildHere: wouldBuildHere
    };

    console.log("Scout report:", scoutReport);

    scoutFormMessage.textContent =
        "Scout report saved successfully.";
});

scoutName.addEventListener("input", function () {
    scoutNameError.textContent = "";
    scoutFormMessage.textContent = "";
});

scoutBiome.addEventListener("change", function () {
    scoutBiomeError.textContent = "";
    scoutFormMessage.textContent = "";
});

scoutDanger.addEventListener("input", function () {
    scoutDangerError.textContent = "";
    scoutNotesError.textContent = "";
    scoutFormMessage.textContent = "";
});

scoutDate.addEventListener("change", function () {
    scoutDateError.textContent = "";
    scoutFormMessage.textContent = "";
});

scoutNotes.addEventListener("input", function () {
    scoutNotesError.textContent = "";
    scoutFormMessage.textContent = "";
});

