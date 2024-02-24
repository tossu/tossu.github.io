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

function createExpenseRowExpand() {
    /* 
    <div class="expand hidden p-1" style="background-color: #f3f3f3;">
    <form onsubmit="javascript:event.preventDefault();">
        <div class="d-flex flex-column">
            <label for="category">Kategoria</label>
            <select id="category" name="category" onchange="onCategorySelected(this)" required>
                <option value="ruoka">Ruoka</option>
                <option value="terveys">Terveys</option>
            </select>
        </div>

        <div class="d-flex flex-column">
            <label for="price">Hinta</label>
            <input type="number" min=0 id="price" step=".01" required value="30" />
        </div>

        <div class="d-flex flex-column">
            <label for="description">Selite</label>
            <textarea id="description">Ruoka hesburger</textarea>
        </div>

        <div class="d-flex justify-content-between">
            <button type="submit" class="button">Tallenna</button>
            <button type="button" class="button" onclick="javascript:deleteExpense(this)">Poista</button>
        </div>
    </form>
</div> */

}

function createExpenseElement(value, description, category) {
    const expenseRowElement = createExpenseRow(value, description, category);

    const container = document.createElement("div");
    container.setAttribute("class", "d-flex flex-column p-1");
    container.append(expenseRowElement);

    return container;
}


function init() {
    const planned = {
        1: { name: "asuminen", value: Math.floor((655 / 2) + 25 + 10 + 8) },
        2: { name: "ravintola", value: 250 },
        3: { name: "Terveys", value: 10 }
    }

    const expensesList = document.getElementById("expenses");

    expensesList.append(createExpenseElement(100, "KISSE"));

    // removeChildren(expensesList);
}

window.addEventListener("load", (event) => {
    init();
});