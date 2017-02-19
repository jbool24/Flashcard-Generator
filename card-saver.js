const fs = require('fs');

// ES6 Constructor Example
class CardSaver {
    constructor(savedCardsFile = "./cards.json") {
        this.cardsFile = savedCardsFile;
        this._checkForFile();
    }

    _checkForFile() {
        this._cardsFileExists(this.cardsFile, (exists) => {
          if (!exists) this._seedFile();
        });
    }

    _cardsFileExists(filePath, cb) {
        fs.access(filePath, (err) => {
            if (err && err.code === 'ENOENT') {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    _seedFile() {
        const dummyData = {
            cards: [],
            _lastUpdated: Date.now()
        };

        fs.writeFile(this.cardsFile, JSON.stringify(dummyData), (err) => {
            if (err)
                console.log("Bad Seed");
            }
        );
    }
    // Function appends to file
    save(data, cb) {
        data._lastUpdated = Date.now();
        const cards = JSON.stringify(data);
        fs.writeFile(this.cardsFile, cards, err => cb(err));
    }

    // Return JSON data
    getData() {
        try {
            return require(this.cardsFile);
        } catch (err) {
            console.log(err);
        }

    }
}
module.exports = CardSaver;
