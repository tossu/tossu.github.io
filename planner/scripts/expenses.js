function deleteExpense(e) {
    // TODO: Varoita montako kulua katoaa.
    confirm("Haluatko varmasti poistaa tämän?");
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function onSubmit() {
    const category = document.getElementById("category");
    const newCategory = document.getElementById("new-category");
    const price = document.getElementById("price");
    const description = document.getElementById("description");


    console.log({
        category: category.value,
        newCategory: newCategory.value || undefined,
        price: parseFloat(price.value),
        description: description.value
    })
}

function onCategorySelected(e) {
    const newCategoryContainer = document.getElementById("new-category-container");
    const newCategoryInput = document.getElementById("new-category");
    if (e.value === "_new") {
        newCategoryContainer.classList.remove("hidden");
        newCategoryInput.removeAttribute("disabled");
        newCategoryInput.value = "";
    } else {
        newCategoryContainer.classList.add("hidden");
        newCategoryInput.setAttribute("disabled", true);
        newCategoryInput.value = "";
    }
}


function createExpenseRowValue(value) {
    const valueElement = document.createElement("div");
    const valueElementBold = document.createElement("b");
    const valueElementText = document.createTextNode(`-${value}€`);
    valueElementBold.append(valueElementText);
    valueElement.append(valueElementBold);

    const icons = document.createElement("div");
    icons.setAttribute("class", "ml-1");
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-ellipsis-v");
    icons.append(icon);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-row");
    container.append(valueElement);
    container.append(icons);

    return container;
}

function createExpenseRowText(description, category) {
    const descriptionElement = document.createElement("div");
    const descriptionElementText = document.createTextNode(description ? description : category);
    descriptionElement.append(descriptionElementText);

    const categoryElement = document.createElement("small");
    const categoryElementText = document.createTextNode(category);
    categoryElement.append(categoryElementText);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column");
    container.append(descriptionElement);
    // container.append(categoryElement);

    return container;
}


function createExpenseRow(id, date, value, description, category) {
    const dateElement = document.createElement("div");
    const dateElemenText = document.createTextNode(formatDate(date));
    dateElement.append(dateElemenText);


    const asd = createExpenseRowValue(value);

    const dsa = createExpenseRowText(description, category);

    /* const textElement = document.createElement("div");
    const textElementText = document.createTextNode(description ? description : category);
    textElement.append(textElementText); */

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex justify-content-between");
    container.setAttribute("style", "border-bottom: 1px solid #eaeaea; padding: 1em; padding-top: 0em;")
    container.setAttribute("onclick", "javascript:expandToggle(this)");

    container.append(dateElement);
    container.append(dsa);
    container.append(asd);

    return container;
}

function createExpandCategoryElement(selectedCategory, categories) {
    console.log(categories);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column");

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", "category");
    const labelElementText = document.createTextNode("Kategoria");
    labelElement.append(labelElementText);

    const selectElement = document.createElement("select");
    selectElement.setAttribute("id", "category");
    selectElement.setAttribute("name", "category");
    selectElement.setAttribute("onchange", "onCategorySelected(this)");
    selectElement.setAttribute("required", true);
    selectElement.setAttribute("value", selectedCategory);

    categories.forEach(category => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", category.id);
        if (category.id === selectedCategory) {
            optionElement.setAttribute("selected", true);
        }
        const optionElementText = document.createTextNode(category.name);
        optionElement.append(optionElementText);
        selectElement.append(optionElement);
    });

    container.append(labelElement);
    container.append(selectElement);

    return container;
}

function createExpandPriceElement(price) {
    const label = document.createElement("label");
    label.setAttribute("for", "price");
    const labelText = document.createTextNode("Hinta");
    label.append(labelText);

    const input = document.createElement("input");
    input.setAttribute("id", "price");
    input.setAttribute("type", "number");
    input.setAttribute("min", 0);
    input.setAttribute("step", "0.1");
    input.setAttribute("value", price);
    input.setAttribute("required", true);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column");
    container.append(label);
    container.append(input);
    return container;
}

function createExpandDescriptionElement(description) {
    const label = document.createElement("label");
    label.setAttribute("for", "description");
    const labelText = document.createTextNode("Selite");
    label.append(labelText);

    const textarea = document.createElement("textarea");
    textarea.setAttribute("id", "description");
    const textareaText = document.createTextNode(description);
    textarea.append(textareaText);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column");
    container.append(label);
    container.append(textarea);
    return container;
}

function createExpandButtons() {
    const saveButton = document.createElement("button");
    const saveButtonText = document.createTextNode("Tallenna");
    saveButton.append(saveButtonText);
    saveButton.setAttribute("type", "submit");
    saveButton.setAttribute("class", "button");


    const deleteButton = document.createElement("button");
    const deleteButtonText = document.createTextNode("Poista");
    deleteButton.append(deleteButtonText);
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "button");
    deleteButton.setAttribute("onclick", "javascript:deleteExpense(this)")

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex justify-content-between");
    container.append(saveButton);
    container.append(deleteButton);
    return container;
}


function createExpenseRowExpand(categories = []) {
    const categoryElement = createExpandCategoryElement("koire", categories);
    const priceElement = createExpandPriceElement(30);
    const descriptionElement = createExpandDescriptionElement("LOLOL");
    const buttons = createExpandButtons();

    const formElement = document.createElement("form");
    formElement.setAttribute("onsubmit", "javascript:event.preventDefault();");
    formElement.append(categoryElement);
    formElement.append(priceElement);
    formElement.append(descriptionElement);
    formElement.append(buttons);

    const expandElement = document.createElement("div");
    expandElement.setAttribute("class", "expand hidden");
    expandElement.setAttribute("style", "background-color: #f3f3f3");
    expandElement.append(formElement);
    return expandElement;
}

function createExpenseElement(id, date, value, description, categoryName, categories) {
    const expenseRowElement = createExpenseRow(id, date, value, description, categoryName);
    const expandElement = createExpenseRowExpand(categories);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column p-1");
    container.append(expenseRowElement);
    container.append(expandElement);

    return container;
}


function init() {

    const categories = [
        { id: 1, name: "asuminen" },
        { id: 2, name: "ravintola" },
        { id: 3, name: "terveys" }
    ]

    const expenses = [
        {
            id: (new Date()).getTime() / 1000,
            date: new Date(),
            category: 1,
            price: 200,
        },
        {
            id: (new Date()).getTime() / 1000 + 1,
            date: new Date(),
            category: 3,
            price: 10,
            description: "Kaljaa"
        },
        {
            id: (new Date()).getTime() / 1000 + 1,
            date: new Date(),
            category: 3,
            price: 42,
            description: "Olutta"
        },
        {
            id: (new Date()).getTime() / 1000 + 1,
            date: new Date(),
            category: 3,
            price: 666,
            description: "Kaljaa"
        },
        {
            id: (new Date()).getTime() / 1000 + 1,
            date: new Date(),
            category: 3,
            price: 10,
            description: "Viiniä"
        }
    ]

    const expensesList = document.getElementById("expenses");

    removeChildren(expensesList);

    for (const [_, expense] of Object.entries(expenses)) {
        const { id, date, category, price, description } = expense;
        const catagoryName = categories.find(value => value.id == category).name;
        const element = createExpenseElement(id, date, price, description, catagoryName, categories);
        expensesList.append(element);
    }
}

window.addEventListener("load", (event) => {
    init();
});