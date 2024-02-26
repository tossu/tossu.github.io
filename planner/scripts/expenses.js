function deleteExpense(e) {
    // TODO: Varoita montako kulua katoaa.
    confirm("Haluatko varmasti poistaa tämän?");
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


function createExpenseRow(value, description, category) {
    const valueElement = document.createElement("div");
    const valueElementText = document.createTextNode(value);
    valueElement.append(valueElementText);

    const textElement = document.createElement("div");
    const textElementText = document.createTextNode(description ? description : category);
    textElement.append(textElementText);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex justify-content-between");
    container.setAttribute("onclick", "javascript:expandToggle(this)");
    container.append(valueElement);
    container.append(textElement);

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
    expandElement.setAttribute("class", "expand hidden p-1");
    expandElement.setAttribute("style", "background-color: #f3f3f3");
    expandElement.append(formElement);
    return expandElement;
}

function createExpenseElement(value, description, categoryName, categories) {
    const expenseRowElement = createExpenseRow(value, description, categoryName);
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
            category: 1,
            price: 200,
        },
        {
            category: 3,
            price: 10,
            description: "LOL"
        }
    ]

    const expensesList = document.getElementById("expenses");

    removeChildren(expensesList);

    for (const [id, expense] of Object.entries(expenses)) {
        const { category, price, description } = expense;
        const catagoryName = categories.find(value => value.id == category).name;
        const element = createExpenseElement(price, description, catagoryName, categories);
        expensesList.append(element);
    }
}

window.addEventListener("load", (event) => {
    init();
});