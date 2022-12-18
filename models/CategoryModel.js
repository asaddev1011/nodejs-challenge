const BaseModel = require("./BaseModel");

module.exports = class CategoryModel extends BaseModel {

    constructor() {
        super();
        this.schema = 'Categories';
    }

}
