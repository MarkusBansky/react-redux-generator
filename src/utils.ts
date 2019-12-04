import chalk from "chalk";

export const toFirstUpperLetter = (text: string) => {
    return text[0].toUpperCase().concat(text.slice(1));
};

export const checkIfObjectIsEmpty = (name: string, element?: any) => {
    let date = new Date();
    if (element === undefined || element === null) {
        console.log(name + ' empty: ' + chalk.redBright(true) + ' - ' + date + ' ' + date.getMilliseconds() + 'ms');
        return;
    } else if (Array.isArray(element) && element.length === 0) {
        console.log(name + ' empty: ' + chalk.redBright(true) + ' - ' + date + ' ' + date.getMilliseconds() + 'ms');
        return;
    }
    console.log(name + ' not empty: ' + chalk.greenBright(false) + ' - ' + date + ' ' + date.getMilliseconds() + 'ms');
};