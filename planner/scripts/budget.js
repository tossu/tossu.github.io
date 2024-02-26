function deleteCategory(e) {
    // TODO: Varoita montako kulua katoaa.
    confirm("Haluatko varmasti poistaa tämän?");
}

function createExpandButtons() {
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "button");
    submitButton.innerHTML = "Tallenna";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button"),
    deleteButton.setAttribute("onclick", "javascript:deleteCategory(this)");
    deleteButton.innerHTML = "Poista";

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex justify-content-between");

    container.append(submitButton);
    container.append(deleteButton);

    return container;
}

function createExpandValueElement(value) {
    const expandValueLabelElement = document.createElement("label");
    const expandNameLabelTextElement = document.createTextNode("Budjetoitu kulu");
    expandValueLabelElement.append(expandNameLabelTextElement);

    const expandValueInputElement = document.createElement("input");
    expandValueInputElement.setAttribute("type", "number");
    expandValueInputElement.setAttribute("min", 0);
    expandValueInputElement.setAttribute("step", ".01");
    expandValueInputElement.setAttribute("required", true);
    expandValueInputElement.setAttribute("value", value);

    const expandValueElement = document.createElement("div");
    expandValueElement.setAttribute("class", "d-flex flex-column");

    expandValueElement.append(expandValueLabelElement);
    expandValueElement.append(expandValueInputElement);

    return expandValueElement;
}

function createExpandNameElement(name) {
    const expandNameLabelElement = document.createElement("label");
    const expandNameLabelTextElement = document.createTextNode("Nimi");
    expandNameLabelElement.append(expandNameLabelTextElement);

    const expandNameInputElement = document.createElement("input");
    expandNameInputElement.setAttribute("type", "text");
    expandNameInputElement.setAttribute("pattern", "[A-ZÄÖÅa-zäöå0-9]+");
    expandNameInputElement.setAttribute("required", true);
    expandNameInputElement.setAttribute("value", name);

    const expandNameElement = document.createElement("div");
    expandNameElement.setAttribute("class", "d-flex flex-column");

    expandNameElement.append(expandNameLabelElement);
    expandNameElement.append(expandNameInputElement);

    return expandNameElement;
}

function createExpandElement(name, value) {
    const formElement = document.createElement("form");
    formElement.setAttribute("onsubmit", "javascript:event.preventDefault();");

    const expandNameElement = createExpandNameElement(name);
    formElement.append(expandNameElement);

    const expandValueElement = createExpandValueElement(value);
    formElement.append(expandValueElement);

    const expandButtons = createExpandButtons();
    formElement.append(expandButtons);

    const expandElement = document.createElement("div");
    expandElement.setAttribute("class", "expand hidden p-1");
    expandElement.setAttribute("style", "background-color: #f3f3f3;");
    expandElement.append(formElement);

    return expandElement;
}

function createRowElement(name, value) {
    const nameElement = document.createElement("div");
    const nameTextElement = document.createTextNode(name);
    nameElement.append(nameTextElement);

    const rightContainer = document.createElement("div");
    rightContainer.setAttribute("class", "d-flex justify-content-between");

    const valueElement = document.createElement("div");
    const valueTextElement = document.createTextNode(value);
    valueElement.append(valueTextElement);

    const iconElement = document.createElement("div");
    iconElement.setAttribute("class", "ml-1")
    const icon = document.createElement("i");
    icon.setAttribute("style", "color: #f2f2f2;")
    icon.setAttribute("class", "fa fa-chevron-down");
    iconElement.append(icon);

    rightContainer.append(valueElement);
    rightContainer.append(iconElement);

    const rowElement = document.createElement("div");
    rowElement.setAttribute("class", "d-flex justify-content-between p-1 budget-name");
    rowElement.setAttribute("onclick", "javascript:expandToggle(this)");
    rowElement.append(nameElement);
    rowElement.append(rightContainer);

    return rowElement;
}

function createBudgetElement(id, name, value) {
    const rowElement = createRowElement(name,value);
    const expandElement = createExpandElement(name, value);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column");
    container.append(rowElement);
    container.append(expandElement);

    return container;
}

function init() {
    const planned = {
        1: { name: "asuminen", value: Math.floor((655 / 2) + 25 + 10 + 8) },
        2: { name: "ravintola", value: 250 },
        3: { name: "Terveys", value: 10 }
    }

    const budgetListElement = document.getElementById("budget-list");

    removeChildren(budgetListElement);

    for (const [id, value] of Object.entries(planned)) {
        const element = createBudgetElement(id, value.name, value.value);
        budgetListElement.append(element);
    }

}

window.addEventListener("load", (event) => {
    init();
});