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

function showAddExpenseModal(id) {
    const element = document.getElementById(id);
    element.classList.remove("hidden");
}

function hideAddExpenseModal(id) {
    const element = document.getElementById(id);
    element.classList.add("hidden");
}