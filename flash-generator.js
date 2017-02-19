/**
 * A Simple Generator for a FlashCard study application
 */


// Javascript Contructors Example
const BasicCard = function BasicCard(front, back) {
    if (!(this instanceof BasicCard)) {
        return new BasicCard(front, back);
    }

    this.__back = back;
    this.__front = front;

    this.getFront = () => this.__front;
    this.getBack = () => this.__back;
}
BasicCard.prototype.saveCard = function() {
    const CardSaver = require('./card-saver');
    const cs = new CardSaver();

    const card = this;
    const data = cs.getData();

    data.cards.push(card);
    console.log(JSON.stringify(data));
    cs.save(data, console.log);
};

const ClozeCard = function ClozeCard(text, cloze) {
    if (!(this instanceof ClozeCard)) {
        return new ClozeCard(text, cloze);
    }

    this.__fullText = text;
    this.__cloze = cloze;

    this.validate = function validate() {
        if (this.__fullText.includes(this.__cloze) === false) {
            console.log('Error: Cannot be found in the input text');
            return false;
        }
        return true;
    };

    this.getClozePortion = function deletedPortion() {
        return this.__cloze;
    };

    this.getPartialText = function getPartialText() {
        return this.__fullText.replace(cloze, '...');
    };

    this.getFullText = function getFullText() {
        return this.__fullText;
    };
}
module.exports = {
    BasicCard,
    ClozeCard
};
