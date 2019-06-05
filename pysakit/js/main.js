const TIETONIEKANTIE1 = "LINKKI:207525";
const YLIOPPILASKYLA1 = "LINKKI:207532";
const KESKUSTA6 = "LINKKI:207455";
const PRISMA1 = "LINKKI:207466";
const MATTILANNIEMI = "LINKKI:207644";

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
    "name": "Mattilanniemi",
    "stops": [MATTILANNIEMI]
  }
]

function routeSelected(e) {
  const selectedIndex = e.target.value;
  const selected = ROUTES[selectedIndex];
  selectRoute(selected);
}

function selectRoute(route) {
  fetchStops(route["stops"])
    .then(list => {
      const listElement = document.getElementById("list");
      while(listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
      }
      listElement.append(createStopList(list));
    }
  );
}

window.onload = () => {
  const appElement = document.getElementById("app");
  appElement.append(createRouteSelector(ROUTES, routeSelected));

  const appList = document.createElement("div");
  appList.setAttribute("id", "list");
  appElement.append(appList);

  selectRoute(ROUTES[0]);
}
