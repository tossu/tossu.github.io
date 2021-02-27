function createLoadingElement() {
  return createElement({ id: "loading", text: "LOADING" });
}

function createElement({ type, text, className, id }) {
  const element = document.createElement(type || "div");
  if (text != null) {
    element.append(document.createTextNode(text));
  }
  if (className != null) {
    element.setAttribute("class", className);
  }
  if (id != null) {
    element.setAttribute("id", id);
  }
  return element;
}

function createStop(stop) {
  const stopElement = createElement({ className: "stop" });
  const elements = [
    createElement({ className: (stop.isRealtime ? "realtime-icon" : "realtime-icon hidden") }),
    createElement({ className: "arrival-time", text: formatTime(stop.arrival) }),
    createElement({ className: "departure-time", text: formatTime(stop.departure) }),
    createElement({ className: "bus-icon" }),
    createElement({ className: "bus-name", text: stop.name }),
    createElement({ className: "destination", text: stop.destination })
  ]
  elements.forEach(element => stopElement.append(element));
  return stopElement;
}

function createOptionElement(text, value, selected) {
  const optionElement = document.createElement("option");
  optionElement.setAttribute("value", value);
  if (selected) {
    optionElement.setAttribute("selected", true);
  }
  optionElement.append(document.createTextNode(text));
  return optionElement;
}

function createLocationSelector(locations, selectedIndex, selectedCallback=null) {
  const selector = createElement({ type: "select", id: "location" });
  locations.forEach(({ name }, index) => {
    selector.append(createOptionElement(name, index, (selectedIndex === index)));
  });
  if(selectedCallback !== null) {
    selector.addEventListener("change", selectedCallback);
  }
  return selector;
}
