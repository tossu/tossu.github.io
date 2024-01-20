import { removeChildren } from './utils.js';
import { createSelectElement, createStop } from './ui.js';
import { fetchStops } from './fetch.js';

interface Location {
    name: string;
    stops: number[];
};

const TIETONIEKANTIE1: number = 207525;
const YLIOPPILASKYLA1: number = 207532;
const KESKUSTA6: number = 207455;
const PRISMA1: number = 207466;
const MATTILANNIEMI: number = 207644;
const SCHAUMANIN_LINNA1: number = 207693;
const URHONKATU: number = 207477;

const LOCATION_STORAGE_KEY: string = "selectedLocationIndex";

const LOCATIONS: Location[] = [
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

const LOCATION_NAMES: string[] = LOCATIONS.map(x => x.name);

function locationSelected(e: Event): void {
    const target = e.target as HTMLSelectElement;
    const selectedLocationIndex: number = parseInt(target.value);
    const selectedLocation: Location = LOCATIONS[selectedLocationIndex];
    localStorage.setItem(LOCATION_STORAGE_KEY, selectedLocationIndex + "");
    showLocation(selectedLocation);
}

async function showLocation(location: Location): Promise<void> {
    const listElement: HTMLElement = document.getElementById("list");
    removeChildren(listElement);
    const busArrivals = await fetchStops(location.stops);
    busArrivals.forEach(arrival => listElement.append(createStop(arrival)));
}

window.onload = () => {
    const selectedLocationIndex: number = parseInt(localStorage.getItem(LOCATION_STORAGE_KEY)) || 0;
    const selectedLocation: Location = LOCATIONS[selectedLocationIndex];

    const locationSelectElement = createSelectElement(LOCATION_NAMES, selectedLocationIndex, locationSelected);

    const listElement: HTMLDivElement = document.createElement("div");
    listElement.setAttribute("id", "list");

    const app: HTMLElement = document.getElementById("app");
    app.append(locationSelectElement);
    app.append(listElement);

    showLocation(selectedLocation);
}
