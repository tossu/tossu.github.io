function deleteCategory() {
    // TODO: Varoita montako kulua katoaa.
    confirm("Haluatko varmasti poistaa tämän?");
}

function toggleCategory(e) {
    const budgetId = e.dataset.budgetId;
    if (budgetId == null) {
        return;
    }
    const expandElement = document.querySelector("[data-budget-expand-id='1234']");
    if (expandElement == null) {
        return;
    }
    expandElement.classList.toggle("hidden");
}