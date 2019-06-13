function createLoadingElement() {
  const element = document.createElement("div");
  element.setAttribute("id", "loading");
  element.append(document.createTextNode("LOADING"));
  return element;
}

function createBusIcon() {
  const element = document.createElement("div");
  element.setAttribute("class", "bus-icon");
  return element;
}

function createTextElement(text, className=null) {
  const textElement = document.createElement("span");
  textElement.append(document.createTextNode(text));
  if(className !== null) {
    textElement.setAttribute("class", className);
  }
  return textElement;
}

function createTimeElement(seconds, realtime) {
    const timeElement = document.createElement("div");
    timeElement.setAttribute("class", "time");
    const icon = document.createElement("div");
    icon.setAttribute("class", realtime ? "pulse-icon" : "pulse-icon hidden");
    const time  = formatTime(seconds);
    const text = document.createElement("div");
    text.append(document.createTextNode(time));
    timeElement.append(icon);
    timeElement.append(text);
    return timeElement;
}

function createStop(stop) {
  const stopElement = document.createElement("div");
  stopElement.setAttribute("class", "stop");
  stopElement.append(createTimeElement(stop["seconds"], stop["realtime"]));
  stopElement.append(createBusIcon());
  stopElement.append(createTextElement(stop["name"], "bus-name"));
  stopElement.append(createTextElement(stop["destination"], "destination"));
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
