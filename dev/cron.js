'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _parse = require('parse');

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('./import-models');

var _appServicesLoggerService = require('./app/services/logger-service');

var logger = _interopRequireWildcard(_appServicesLoggerService);

var _configEnv = require('./config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var debug = require('debug')('fropcorn:cron');

// promisify modules before requiring/importing other files
_bluebird2['default'].promisifyAll(_mongoose2['default']);
_bluebird2['default'].promisifyAll(_fsExtra2['default']);

// initialize Parse with Credentials before requiring/importing other files
_parse.Parse.initialize(_configEnv2['default'].fropcornGrid.appId, _configEnv2['default'].fropcornGrid.jsKey, _configEnv2['default'].fropcornGrid.masterKey);
_parse.Parse.serverURL = _configEnv2['default'].fropcornGrid.serverUrl;

// nconf config
_nconf2['default'].file({ file: _path2['default'].join(_configEnv2['default'].rootPath, 'nconf.config.json') });

debug('connecting to db: ' + _configEnv2['default'].db);
_mongoose2['default'].connect(_configEnv2['default'].db);
var db = _mongoose2['default'].connection;
db.on('error', function () {
	throw new Error('unable to connect to database at ' + _configEnv2['default'].db);
});

// Delete all cashCoupons and add jobType: deleteCashCouponsOnce in LastSyncTimeStamp model
var LastSyncTimestamp = _mongoose2['default'].model('LastSyncTimestamp'),
    CashCoupon = _mongoose2['default'].model('CashCoupon');

LastSyncTimestamp.getJobType('deleteCashCouponsOnce').then(function (isCashCouponDeletedOnce) {
	if (!isCashCouponDeletedOnce) {
		CashCoupon.removeAsync().then(function () {
			var newLastSyncTimestamp = new LastSyncTimestamp({
				lastSuccessfullyExecutedAt: (0, _moment2['default'])().toDate(),
				jobType: 'deleteCashCouponsOnce'
			});
			newLastSyncTimestamp.saveAsync().then(function () {
				debug('successfully deleted all cash coupons');
			});
		});
	}
});

// append to log file
logger.log('info', 'CronService started (' + _configEnv2['default'].env + ')', 'CronService');
logger.log('info', _configEnv2['default'].minion.mode, 'CronService', { category: 'MinionMode', mode: _configEnv2['default'].minion.mode });
debug('## CronService started (' + _configEnv2['default'].env + ') with minionId ' + _configEnv2['default'].minion.id);

require('./cron/cronJobs');
//# sourceMappingURL=cron.js.map
