const debug = require('debug')('challenge');
const axios = require('axios');
const CategoryModel = require("./models/CategoryModel");
const StationModel = require("./models/StationModel");

const run = async () => {
  const categoryModel = new CategoryModel();
  const stationModel = new StationModel();


  /**
   * Define your solution here
   */

  // total categories -> categoryModel.getAll().length
  // total stations -> stationModel.getAll().length

  // let temp = stationModel.getByKey('innervisions');

  let validUrlStations = stationModel.getValidUrlStations();
  let InValidUrlStations = stationModel.getInValidUrlStations();

  console.log(validUrlStations.length);
  console.log(InValidUrlStations.length);

};

const tsStart = Date.now();
debug(`Application started`);
run()
    .then(() => debug(`Application finished %s`, Date.now() - tsStart))
    .catch(console.error);
