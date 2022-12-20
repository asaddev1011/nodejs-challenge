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

  const validStationsUrl = stationModel.getStationsUrl(true);
  const InValidStationsUrl = stationModel.getStationsUrl(false);

  const validStationsByCategories = stationModel.getStationsByGroupCategories(true);
  const inValidStationsByCategories = stationModel.getStationsByGroupCategories(false);

  console.log(`Total no. of stations: ${stationModel.getAll().length}`);

  console.log(`Total no. of cagtegories: ${categoryModel.getAll().length}`);

  console.log(`Total no. of stations with valid stream url: ${validStationsUrl.length}`);

  console.log(`Total no. of stations with inValid stream url: ${InValidStationsUrl.length}`);

  /* To see the List of stations with valid stram url uncomment the below console.log */
  // console.log(validStationsUrl);
  // console.log(InValidStationsUrl);

  /* List of stations with valid stream url is valid category wise uncomment to see it */
  // console.log(validStationsByCategories);
  // console.log(inValidStationsByCategories);

  console.log('Category wise count of valid stream url stations');
  console.log(stationModel.getStationsCountByCategories(validStationsByCategories));

  console.log('Category wise count of inValid stream url stations');
  console.log(stationModel.getStationsCountByCategories(inValidStationsByCategories));

};

const tsStart = Date.now();
debug(`Application started`);
run()
  .then(() => debug(`Application finished %s`, Date.now() - tsStart))
  .catch(console.error);
