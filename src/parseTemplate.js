/**
 * Простая функция-шаблонизатор.
 * @param {string} template
 * @param {object} data
 */
const parseTemplate = (template, data) => {
    if (!template) return '';
    if (!data) return template;

    let templateString = template;

    for (let item in data) {
        if (data.hasOwnProperty(item)) {
            const replacement = new RegExp('{' + item + '}', 'g');

            templateString = templateString.replace(replacement, data[item]);
        }
    }

    return templateString;

};

export default parseTemplate;