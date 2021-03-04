
//it calculates the weigh average = value1 * weight1 + value2 * weight2 ... / value1 + value 2 ...
exports.weightedAverage = weightedValues => {

    //weightValues = {weight: value}
    let numerator = 0;
    let denominator = 0

    for (const weight in weightedValues) {
        numerator += weight * weightedValues[weight];
        denominator += weightedValues[weight];
    }

    const average = numerator / denominator;

    return Math.ceil(average);
}