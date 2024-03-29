import { formatTime } from './utils.js';
function createTextElement(text, className) {
    const element = document.createElement("div");
    element.append(document.createTextNode(text || ""));
    element.setAttribute("class", className || "");
    return element;
}
function createStop(stop) {
    const stopElement = createTextElement(null, "stop");
    const elements = [
        createTextElement("", stop.isRealtime ? "realtime-icon realtime" : "realtime-icon hidden"),
        createTextElement(formatTime(stop.arrival), "arrival-time"),
        createTextElement(formatTime(stop.departure), "departure-time"),
        createTextElement(stop.name, "bus-name"),
        createTextElement(stop.destination, "destination")
    ];
    elements.forEach(element => stopElement.append(element));
    return stopElement;
}
function createOptionElement(text, value, selected) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", value + "");
    if (selected) {
        optionElement.setAttribute("selected", "true");
    }
    optionElement.append(document.createTextNode(text));
    return optionElement;
}
function createSelectElement(options, selectedIndex, selectedCallback = null) {
    const selector = document.createElement("select");
    options.forEach((option, index) => {
        selector.append(createOptionElement(option, index, (selectedIndex === index)));
    });
    if (selectedCallback !== null) {
        selector.addEventListener("change", selectedCallback);
    }
    return selector;
}
export { createTextElement, createStop, createOptionElement, createSelectElement };
