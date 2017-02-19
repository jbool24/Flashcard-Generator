const fs = require('fs');
const path = require('path');

module.exports = class logger {
    constrtuctor(logFilePath) {
        this.logFile = logFilePath || "";

        if (!_logFileExists(this.logFile)) {
            fs.writeFile("./cards.json", '{"cards":[]}', console.log);
        }
    }

    _logFileExists(logFile) {
        fs.access(logFile || './cards.json', (err) => {
            if (err && err.code === 'ENOENT') {
                return false;
            } else {
                return true;
            }
        });
    }

    // Function appends to file
    log(data) {
        data = JSON.stringify(data);
        fs.appendFile("./cards.json", data, console.log);
    }

    // Return JSON data
    data() {
        return require('./cards.json');
    }
}
