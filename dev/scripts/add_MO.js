/*
 * Generate Test Data
 * Usage: node generate-test-data [dbname]
 * dbname defaults to 'fropcorn-mean-secret-dev'
 * Ex: node generate-test-data fropcorn-mean-secret-test
 * test 2
 */

'use strict';

var mongoose = require('mongoose'),
    dbname = process.argv[2] || 'fropcorn-mean-secret-dev',
    debug = require('debug')('fropcorn:add_MO');

mongoose.connect('mongodb://localhost/' + dbname);

require('./mo');

var Mo = mongoose.model('Mo');

var mo = new Mo({
  name: 'Kunal',
  pin: 2468
});
mo.save();

debug('Done!');

setTimeout(function () {
  mongoose.connection.close();
}, 500);
//# sourceMappingURL=add_MO.js.map
