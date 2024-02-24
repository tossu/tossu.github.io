function acquisitionCostResult(sellPrice, buyPrice, percent) {
    const value = sellPrice - (sellPrice * percent);
    const taxPercent = value > 30_000 ? 0.34 : 0.3;
    const tax = value * taxPercent;

    const normalTax = (sellPrice - buyPrice) > 30_000 ? 0.34 : 0.3;
    const normalTaxValue = (sellPrice - buyPrice) * normalTax; 

    const acquisitionCostResult = `${sellPrice}€ - ( ${sellPrice}€ * ${percent} ) = ${value}€\n${value}€ * ${taxPercent} = ${tax}€`;
    const normalTaxResult = `(${sellPrice}€ - ${buyPrice}€) * ${normalTax} = ${normalTaxValue}€`;

    if (buyPrice != null) {
        return acquisitionCostResult + "\n\n" + normalTaxResult;
    }

    return acquisitionCostResult;
}


function acquisitionCostValues() {
    const sellPriceElement = document.getElementById("acquisition-cost-sell-price");
    const overTenYearsElement = document.getElementById("acquisition-cost-over-ten-years");
    const buyPriceElement = document.getElementById("acquisition-cost-buy-price");
    return {
        sellPrice: parseFloat(sellPriceElement.value),
        buyPrice: parseFloat(buyPriceElement.value) || undefined,
        percent: overTenYearsElement.checked ? 0.4 : 0.2,
    }
}

function acquisitionCost() {
    const { sellPrice, buyPrice, percent } = acquisitionCostValues();
    const result = acquisitionCostResult(sellPrice, buyPrice, percent);
    const resultElement = document.getElementById("acquisition-cost-result");
    resultElement.innerHTML = result;
}