
function compoundAnnualGrowthRateResult(start, end, years) {
    const percentage = (Math.pow((end/start), (1.0/years)) - 1)*100;
    const value = Math.floor(percentage * 100) / 100;
    return `Vuosittainen tuotto on ${value}%`;
}


function compoundAnnualGrowthRateValues() {
    const startElement = document.getElementById("compound-annual-growth-rate-start-price");
    const endElement = document.getElementById("compound-annual-growth-rate-end-price");
    const yearsElement = document.getElementById("compound-annual-growth-rate-years");

    return {
        start: parseFloat(startElement.value),
        end: parseFloat(endElement.value),
        years: parseFloat(yearsElement.value)
    }

}

function compoundAnnualGrowthRate() {
    const { start, end, years } = compoundAnnualGrowthRateValues();
    const result = compoundAnnualGrowthRateResult(start, end, years);
    const resultElement = document.getElementById("compound-annual-growth-rate-result");
    resultElement.innerHTML = result;
}