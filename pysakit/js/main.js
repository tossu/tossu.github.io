const TIETONIEKANTIE1 = "LINKKI:207525";
const YLIOPPILASKYLA1 = "LINKKI:207532";
const KESKUSTA6 = "LINKKI:207455";
const PRISMA1 = "LINKKI:207466";
const MATTILANNIEMI = "LINKKI:207644";
const SCHAUMANIN_LINNA1 = "LINKKI:207693";

const LOCATION_STORAGE_KEY = "locationIndex";

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
  }
];

const LOCATION_NAMES = LOCATIONS.map(x => x.name);

function locationSelected(e) {
  const selectedLocationIndex = e.target.value;
  const selectedLocation = LOCATIONS[selectedLocationIndex];
  localStorage.setItem(LOCATION_STORAGE_KEY, selectedLocationIndex);
  showLocation(selectedLocation);
}

async function showLocation(route) {
  const listElement = document.getElementById("list");
  removeChildren(listElement);
  const stops = await fetchStops(route.stops);
  stops.forEach(stop => listElement.append(createStop(stop)));
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
}
