const translate = require('translate');

const translateString = async (text, translateTo) => await translate(text, translateTo);

module.exports = {
    translateString,
};
