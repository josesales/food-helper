
export const toSingular = str => {
    if (str) {
        if (str.substring(str.length - 3) == 'ies') {
            str = str.slice(0, -3) + 'y';
        } else if (str[str.length - 1] == 's') {
            str = str.slice(0, -1);
        }
    }
    return str;
}