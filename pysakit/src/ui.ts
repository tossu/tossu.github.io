import { formatTime } from './utils.js';
import { Arrival } from './fetch.js';

function createTextElement(text: string, className: string): HTMLDivElement {
    const element = document.createElement("div");
    element.append(document.createTextNode(text || ""));
    element.setAttribute("class", className || "");
    return element;
}

function arrivalTimeClass(isRealtime: boolean, arrival: Date, departure: Date): string {
    // if arrival or departune are different then is is realtime
    if (arrival < departure) {
        return "arrival-time realtime early";
    }
    if (departure < arrival) {
        return "arrival-time realtime late";
    }
    if (isRealtime) {
        return "arrival-time realtime";
    }
    return "arrival-time";
}

function createStop(stop: Arrival): HTMLDivElement {
    const stopElement: HTMLDivElement = createTextElement(null, "stop");
    const elements = [
        createTextElement(formatTime(stop.arrival), arrivalTimeClass(stop.isRealtime, stop.arrival, stop.departure)),
        createTextElement(formatTime(stop.departure), "departure-time"),
        createTextElement(stop.name, "bus-name"),
        createTextElement(stop.destination, "destination")
    ];
    elements.forEach(element => stopElement.append(element));
    return stopElement;
}

function createOptionElement(text: string, value: number, selected: boolean): HTMLOptionElement {
    const optionElement: HTMLOptionElement = document.createElement("option");
    optionElement.setAttribute("value", value + "");
    if (selected) {
        optionElement.setAttribute("selected", "true");
    }
    optionElement.append(document.createTextNode(text));
    return optionElement;
}

function createSelectElement(options: string[], selectedIndex: number, selectedCallback: (e: Event) => void = null): HTMLSelectElement {
    const selector: HTMLSelectElement = document.createElement("select");
    options.forEach((option: string, index: number) => {
        selector.append(createOptionElement(option, index, (selectedIndex === index)));
    });
    if (selectedCallback !== null) {
        selector.addEventListener("change", selectedCallback);
    }
    return selector;
}

export { createTextElement, createStop, createOptionElement, createSelectElement };