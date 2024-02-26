function expandToggle(e) {
    // this expects parent element to have .expand class element that this will toggle visible/hidden
    const parentElement = e.parentElement;
    if (parentElement == null) {
        return;
    }
    const findExpandElement = parentElement.getElementsByClassName("expand");
    if (findExpandElement.length === 0) {
        return;
    }
    const expandElement = findExpandElement[0];
    expandElement.classList.toggle("hidden");
}

function showElement(id) {
    const element = document.getElementById(id);
    element.classList.remove("hidden");
}

function hideElement(id) {
    const element = document.getElementById(id);
    element.classList.add("hidden");
}

function epoch() {
    return Math.round((new Date).getTime() / 1000);
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}