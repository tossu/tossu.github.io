const TIETONIEKANTIE1 = "LINKKI:207525";
const YLIOPPILASKYLA1 = "LINKKI:207532";
const KESKUSTA6 = "LINKKI:207455";
const PRISMA1 = "LINKKI:207466";
const MATTILANNIEMI = "LINKKI:207644";
const SCHAUMANIN_LINNA1 = "LINKKI:207693";

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
]

function locationSelected(e) {
  const selectedLocationIndex = e.target.value;
  const selectedLocation = LOCATIONS[selectedLocationIndex];
  localStorage.setItem("destinationIndex", selectedLocationIndex);
  showLocation(selectedLocation);
}

async function showLocation(route) {
  const listElement = document.getElementById("list");
  removeChildren(listElement);
  listElement.append(createLoadingElement());
  const stops = await fetchStops(route.stops);
  removeChildren(listElement);
  stops.forEach(stop => listElement.append(createStop(stop)));
}

window.onload = () => {
  const selectedLocationIndex = parseInt(localStorage.getItem("destinationIndex")) || 0;

  const appElement = document.getElementById("app");
  appElement.append(createLocationSelector(LOCATIONS, selectedLocationIndex, locationSelected));
  const appList = document.createElement("div");
  appList.setAttribute("id", "list");
  appElement.append(appList);

  showLocation(LOCATIONS[selectedLocationIndex]);
}
