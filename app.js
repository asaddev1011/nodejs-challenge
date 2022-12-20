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

  let validStationsUrl = stationModel.getStationsUrl(true);
  let InValidStationsUrl = stationModel.getStationsUrl(false);
  let validStationsByCategories = stationModel.getStationsByGroupCategories(false);

  stationModel.getStationsCountByCategories(validStationsByCategories);


};

const tsStart = Date.now();
debug(`Application started`);
run()
  .then(() => debug(`Application finished %s`, Date.now() - tsStart))
  .catch(console.error);
