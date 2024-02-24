function rentOrOwnResult(price, rent, managementCharge) {

    const landlordFees = (rent - managementCharge) * 12;
    const percentage = Math.round((landlordFees / price * 100) * 100) / 100;

    const result = `((${rent}€ - ${managementCharge}€) * 12kk ) / ${price}€ = ${percentage}%`

    return result + "\n\n" + `Omistusasunto kannattaa kun korko on alle ${percentage}%`;
}


function rentOrOwnValues() {
    const apartmentPriceElement = document.getElementById("rent-or-own-house-price");
    const rentElement = document.getElementById("rent-or-own-rent");
    const managementChargeElement = document.getElementById("rent-or-own-rent-management-charge");

    return {
        price: apartmentPriceElement.value,
        rent: rentElement.value,
        managementCharge: managementChargeElement.value
    }

}

function rentOrOwn() {
    const { price, rent, managementCharge } = rentOrOwnValues();
    const result = rentOrOwnResult(price, rent, managementCharge);
    const resultElement = document.getElementById("rent-or-own-result");
    resultElement.innerHTML = result;
}