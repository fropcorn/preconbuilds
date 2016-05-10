/*
 * Generate Test Data
 * Usage: node generate-test-data [dbname]
 * dbname defaults to 'fropcorn-mean-secret-dev'
 * Ex: node generate-test-data fropcorn-mean-secret-test
 * test
 */

'use strict';

var mongoose = require('mongoose'),
    dbname = process.argv[2] || 'fropcorn-mean-secret-dev',
    debug = require('debug')('fropcorn:add_approver');

mongoose.connect('mongodb://localhost/' + dbname);

require('./approver');

var Approver = mongoose.model('Approver');

var approver = new Approver({
  name: 'Kunal',
  pin: 1357
});
approver.save();

debug('Done!');

setTimeout(function () {
  mongoose.connection.close();
}, 500);
//# sourceMappingURL=add_approver.js.map
