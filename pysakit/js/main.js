const TIETONIEKANTIE1 = "LINKKI:207525";
const YLIOPPILASKYLA1 = "LINKKI:207532";
const KESKUSTA6 = "LINKKI:207455";
const PRISMA1 = "LINKKI:207466";
const MATTILANNIEMI = "LINKKI:207644";
const SCHAUMANIN_LINNA1 = "LINKKI:207693";

const ROUTES = [
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

function routeSelected(e) {
  const selectedIndex = e.target.value;
  const selected = ROUTES[selectedIndex];
  localStorage.setItem("destinationIndex", selectedIndex);
  selectRoute(selected);
}

function selectRoute(route) {
  const listElement = document.getElementById("list");
  removeChildren(listElement);
  listElement.append(createLoadingElement());

  fetchStops(route["stops"])
    .then(list => {
      removeChildren(listElement);
      listElement.append(createStopList(list));
    }
  );
}

window.onload = () => {
  const selectedIndex = parseInt(localStorage.getItem("destinationIndex")) || 0;

  const appElement = document.getElementById("app");
  appElement.append(createRouteSelector(ROUTES, selectedIndex, routeSelected));

  const appList = document.createElement("div");
  appList.setAttribute("id", "list");
  appElement.append(appList);

  selectRoute(ROUTES[selectedIndex]);
}
