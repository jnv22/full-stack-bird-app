const { Locations } = require('../app/database/model');
const { Converter } = require('csvtojson');

const converter = new Converter({});

converter.on('end_parsed', (jsonArray) => {
  Locations.collection.insert(jsonArray, (err, docs) => {
    console.log(err, docs);
    process.exit();
  });
});

// read from file
require('fs').createReadStream('db_setup/US.csv').pipe(converter);
