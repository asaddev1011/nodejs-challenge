const BaseModel = require("./BaseModel");

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
        .sort( (a,b)=>{
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

  isValidUrl(url){
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

  getValidUrlStations(){
    return this.getAll()
      .filter((el) => {
        return this.isValidUrl(el.stream_url) === true
      });
  }

  getInValidUrlStations(){
    return this.getAll()
      .filter((el) => {
        return this.isValidUrl(el.stream_url) === false
      });
  }

}
