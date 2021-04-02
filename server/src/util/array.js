module.exports.getUniqueArray = (array = [], compareProps = []) => {

    let modifiedArray = [];

    if (compareProps.length === 0 && array.length > 0) {
        compareProps.push(...Object.keys(array[0]));
    }

    array.map(item => {

        if (modifiedArray.length === 0) {
            modifiedArray.push(item);
        } else {

            if (!modifiedArray.some(item2 =>
                compareProps.every(eachProps => item2[eachProps] === item[eachProps])
            )) { modifiedArray.push(item); }
        }
    });
    return modifiedArray;
}