import { removeChildren } from './utils.js';
import { createSelectElement, createStop } from './ui.js';
import { fetchStops } from './fetch.js';
;
const TIETONIEKANTIE1 = 207525;
const YLIOPPILASKYLA1 = 207532;
const KESKUSTA6 = 207455;
const PRISMA1 = 207466;
const MATTILANNIEMI = 207644;
const SCHAUMANIN_LINNA1 = 207693;
const URHONKATU = 207477;
const LOCATION_STORAGE_KEY = "selectedLocationIndex";
const LOCATIONS = [
    {
        "name": "Kortepohja",
        "stops": [TIETONIEKANTIE1, YLIOPPILASKYLA1]
    },
    {
        "name": "Keskusta 6",
        "stops": [KESKUSTA6]
    },
    {
        "name": "Prisma 1",
        "stops": [PRISMA1]
    },
    {
        "name": "Schaumanin linna 1",
        "stops": [SCHAUMANIN_LINNA1]
    },
    {
        "name": "Mattilanniemi",
        "stops": [MATTILANNIEMI]
    },
    {
        "name": "Urhonkatu",
        "stops": [URHONKATU]
    }
];
const LOCATION_NAMES = LOCATIONS.map(x => x.name);
function locationSelected(e) {
    const target = e.target;
    const selectedLocationIndex = parseInt(target.value);
    const selectedLocation = LOCATIONS[selectedLocationIndex];
    localStorage.setItem(LOCATION_STORAGE_KEY, selectedLocationIndex + "");
    showLocation(selectedLocation);
}
async function showLocation(location) {
    const listElement = document.getElementById("list");
    removeChildren(listElement);
    const busArrivals = await fetchStops(location.stops);
    busArrivals.forEach(arrival => listElement.append(createStop(arrival)));
}
window.onload = () => {
    const selectedLocationIndex = parseInt(localStorage.getItem(LOCATION_STORAGE_KEY)) || 0;
    const selectedLocation = LOCATIONS[selectedLocationIndex];
    const locationSelectElement = createSelectElement(LOCATION_NAMES, selectedLocationIndex, locationSelected);
    const listElement = document.createElement("div");
    listElement.setAttribute("id", "list");
    const app = document.getElementById("app");
    app.append(locationSelectElement);
    app.append(listElement);
    showLocation(selectedLocation);
};
