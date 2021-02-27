function createLoadingElement() {
  const element = document.createElement("div");
  element.setAttribute("id", "loading");
  element.append(document.createTextNode("LOADING"));
  return element;
}

function createTextElement(text=null, className=null) {
  const textElement = document.createElement("span");
  if (text != null) {
    textElement.append(document.createTextNode(text));
  }
  if(className != null) {
    textElement.setAttribute("class", className);
  }
  return textElement;
}

function createStop(stop) {
  const stopElement = document.createElement("div");
  stopElement.setAttribute("class", "stop");

  stopElement.append(createTextElement(null, (stop.isRealtime ? "realtime-icon" : "realtime-icon hidden")));
  stopElement.append(createTextElement(formatTime(stop.arrival), "arrival-time"));
  stopElement.append(createTextElement(formatTime(stop.departure), "departure-time"));
  stopElement.append(createTextElement(null, "bus-icon"));
  stopElement.append(createTextElement(stop.name, "bus-name"));
  stopElement.append(createTextElement(stop.destination, "destination"));
  return stopElement;
}

function createStopList(stops, header) {
  const listElement = document.createElement("div");
  stops.forEach(stop => listElement.append(createStop(stop)));
  return listElement;
}

function createRouteSelector(routes, selectedIndex, selectedCallback=null) {
  const selector = document.createElement("select");
  selector.setAttribute("id", "destination");
  routes.forEach((destination, index) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", index);
    if(selectedIndex === index) {
      optionElement.setAttribute("selected", true);
    }
    optionElement.append(document.createTextNode(destination["name"]));
    selector.append(optionElement);
  });
  if(selectedCallback !== null) {
    selector.addEventListener("change", selectedCallback);
  }
  return selector;
}
