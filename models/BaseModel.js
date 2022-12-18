const DBSource = require('./db/Source');

module.exports = class BaseModel {
    source;
    schema;

    constructor() {
        this.source = DBSource;
    }

    getAll() {
        return this.source[this.schema];
    }

}
