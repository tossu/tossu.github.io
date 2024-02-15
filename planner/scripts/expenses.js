function showAddExpenseModal() {
    const element = document.getElementById("add-expense-modal");
    element.classList.remove("hidden");
}

function hideAddExpenseModal() {
    const element = document.getElementById("add-expense-modal");
    element.classList.add("hidden");
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