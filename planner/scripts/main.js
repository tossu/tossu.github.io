
function onSubmit() {
    const category = document.getElementById("category");
    const newCategory = document.getElementById("new_category");
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
    // TODO: Helper functions for adding / removing class
    const newCategoryContainer = document.getElementById("new-category-container");
    const newCategoryInput = document.getElementById("new_category");
    if (e.value === "_new") {
        newCategoryContainer.setAttribute("class", "d-flex flex-column");
        newCategoryInput.removeAttribute("disabled");
    } else {
        newCategoryContainer.setAttribute("class", "d-flex flex-column hidden");
        newCategoryInput.setAttribute("disabled", true);
    }
}

function getMonth() {
    const months = [
        "Tammikuu",
        "Helmikuu",
        "Maaliskuu",
        "Huhtikuu",
        "Toukokuu",
        "Kesäkuu",
        "Heinäkuu",
        "Elokuu",
        "Syyskuu",
        "Lokakuu",
        "Marraskuu",
        "Joulukuu"
    ]
    const now = new Date();
    const month = now.getMonth();
    return months[month];
}

window.kuukausi = getMonth;


function seppoTaalasmaa() {

    const planned = {
        "kiinteät": (655/2) + 25 + 10 + 8,
        "ruoka": 250,
        "terveys": 10
    }
    
    const expenses = {
        "ruoka": [
            { price: 10, "description": "hampurilaiset", date: "2024-02-14T19:37:34.515Z" },
            { price: 8, "description": "muffinssi aineet", date: "2024-02-14T19:37:34.515Z" }
        ],
        "kiinteät": [
            { price: (655/2), "description": "vuokra", date: "2024-02-14T19:37:34.515Z" }
        ]
    }
    
    const categories = Object.keys(planned);
    return categories.map(category => {
        const categoryExpenses = expenses[category] || [];
        const expensesSum = categoryExpenses.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price;
        }, 0);
        return { categoryName: category, sum: expensesSum, planned: planned[category] }
    })
}

window.seppo = seppoTaalasmaa;


function createCategoryElement (category) {
    const { categoryName, sum, planned } = category;

    const categoryElement = document.createElement("div");
    categoryElement.setAttribute("class", "category");

    const labelElement = document.createElement("div");
    labelElement.setAttribute("class", "label");
    const labelTextElement = document.createTextNode(categoryName);
    labelElement.append(labelTextElement);

    const plannedBarElement = document.createElement("div");
    


    /*
            <div class="category">
            <div class="label">
                Terveys
            </div>
            <div class="bar" style="--percentage: 100%; --color: #f3f3f3;">
                <div>500</div>
                <div>Budjetoitu</div>
            </div>
            <div class="bar" style="--percentage: 40%; --color: pink;">
                <div>200</div>
                <div>Toteutunut</div>
            </div>
        </div>
    */
}


function init() {

}

window.onload = () => {
    init();
};