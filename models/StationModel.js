const BaseModel = require("./BaseModel");
const http = require('http');

module.exports = class StationModel extends BaseModel {
  constructor() {
    super();
    this.schema = "Stations";
  }

  getAllByKey(key) {
    return this.getAll()
      .filter((el) => {
        return el.category === key;
      })
      .sort((a, b) => {
        return parseInt(a.play_count) > parseInt(b.play_count) ? -1 : 1;
      });
  }

  getByKey(key) {
    return this.getAll()
      .filter((el) => {
        return el.station_key === key;
      })
      .pop();
  }

  getUrlKey(key) {
    return this.getAll()
      .filter((el) => {
        return el.stream_url === key;
      })
      .pop();
  }

  // RegEx for validating URL and we can enforce more rules as per our requirements
  isValidUrl(url) {
    const pattern = new RegExp(
      '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      'i'
    );

    return pattern.test(url);
  }

  isUrlStreaming(url) {

    http.request(url, { method: 'HEAD' }, (res) => {
      if (res.headers["content-type"] === 'audio/mpeg') {
        console.log('\x1b[32m%s\x1b[0m', `${url} live radio streaming...`);
      } else {
        console.log(`${url} no audio streaming`);
      };
    }).on('error', (err) => {
      return false;
    }).end();

    return;

  }

  // return list of stations based on valid/inValid URL check
  getStationsValidAndStreaming(isValid) {

    const validStationList = this.getAll()
      .filter((el) => {
        return this.isValidUrl(el.stream_url) === isValid
      });

    const promises = validStationList
      .filter((el) => {
        return this.isUrlStreaming(el.stream_url) === isValid
      });

    Promise.all(promises).then((data) => {
      return data;
    });
  }

  // return which station's `stream_url` is valid or which is not. And group them
  getStationsByGroupCategories(isValid) {

    return this.getAll().reduce((obj, el) => {
      // Get the category of the station
      let stationCategory = el.category;

      // If the category doesn't already exist as a key in the object, create it
      if (!obj.hasOwnProperty(stationCategory)) {
        obj[stationCategory] = [];
      }

      // push obj only if it has the valid/inValid URL
      if (isValid && this.isValidUrl(el.stream_url) ||
        !isValid && !this.isValidUrl(el.stream_url)) {
        obj[stationCategory].push(el);
      }

      return obj;
    }, {});
  }

  // return total number of valid & invalid stations per category
  getStationsCountByCategories(data) {

    let stationsCountCategoryWise = [];

    for (let key in data) {
      stationsCountCategoryWise.push({ 'category': key, 'count': data[key].length });
    }

    return stationsCountCategoryWise;
  }

}
