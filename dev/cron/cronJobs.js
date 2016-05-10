'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cron = require('cron');

var _parse = require('parse');

var _internetLogs = require('./internetLogs');

var _internetLogs2 = _interopRequireDefault(_internetLogs);

var _uploadEnhancedLogs = require('./uploadEnhancedLogs');

var _uploadEnhancedLogs2 = _interopRequireDefault(_uploadEnhancedLogs);

var _updateCodeService = require('./updateCodeService');

var updateCodeService = _interopRequireWildcard(_updateCodeService);

var _updateOrderExpiryStatus = require('./updateOrderExpiryStatus');

var _updateOrderExpiryStatus2 = _interopRequireDefault(_updateOrderExpiryStatus);

var _syncContentOfferings = require('./syncContentOfferings');

var _syncContentOfferings2 = _interopRequireDefault(_syncContentOfferings);

var _gpsLogs = require('./gpsLogs');

var _gpsLogs2 = _interopRequireDefault(_gpsLogs);

var _puppetHealScript = require('./puppetHealScript');

var _puppetHealScript2 = _interopRequireDefault(_puppetHealScript);

var _appServicesUtilityService = require('../app/services/utility-service');

var utilityService = _interopRequireWildcard(_appServicesUtilityService);

var _configEnv = require('../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _keepAliveLogs = require('./keepAliveLogs');

var _keepAliveLogs2 = _interopRequireDefault(_keepAliveLogs);

var _commandExecutorJs = require('./commandExecutor.js');

var commandExecutor = _interopRequireWildcard(_commandExecutorJs);

var _appServicesLoggerService = require('../app/services/logger-service');

var logger = _interopRequireWildcard(_appServicesLoggerService);

var Khairati = _mongoose2['default'].model('Khairati'),
    CashCoupon = _mongoose2['default'].model('CashCoupon'),
    Content = _mongoose2['default'].model('Content'),
    Order = _mongoose2['default'].model('Order'),
    Transaction = _mongoose2['default'].model('Transaction'),
    LastSyncTimestamp = _mongoose2['default'].model('LastSyncTimestamp'),
    CommandLog = _mongoose2['default'].model('CommandLog'),
    debug = require('debug')('fropcorn:cronJobs');

/**
 * Upload Enhanced logs every 30 secs
 */
var uploadEnhancedLogsCronJob = new _cron.CronJob('*/30 * * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering uploadEnhancedLogsCronJob at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			(0, _uploadEnhancedLogs2['default'])();
		} else {
			debug('Error: syncOrdersCronJob: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 * Sync orders every 30 secs
 */
var syncOrdersCronJob = new _cron.CronJob('*/30 * * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering syncOrdersCronJob at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			Order.sync();
		} else {
			debug('Error: syncOrdersCronJob: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 * Sync transactions every 37 secs
 */
var uploadTransactionLogsCronJob = new _cron.CronJob('*/37 * * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering uploadTransactionLogsCronJob at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			Transaction.sync();
		} else {
			debug('Error: uploadTransactionLogsCronJob: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 * Sets isExpired to true for expired orders every 1 min
 */
var updateOrderExpiryStatusCronJob = new _cron.CronJob('00 */1 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering updateOrderExpiryStatus at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	(0, _updateOrderExpiryStatus2['default'])();
}, null, true, 'Asia/Kolkata');

/**
 * Log if internet is available/unavailable every 2 mins
 */
var isInternetAvailableCronJob = new _cron.CronJob('00 */2 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering isInternetAvailableCronJob at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			(0, _internetLogs2['default'])(true, 0);
		} else {
			debug('Error: isInternetAvailableCronJob: No Internet');
			(0, _internetLogs2['default'])(false);
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 * Do git pull every 10 mins
 */
_configEnv2['default'].clonedProjectNames.forEach(function (projectName) {
	// eslint-disable-line no-unused-vars
	debug('register updateCodeCronJob for project ' + projectName);
	var updateCodeCronJob = new _cron.CronJob('0 */10 * * * *', function () {
		// eslint-disable-line no-unused-vars
		debug('Triggering updateCodeCronJob at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

		utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
			if (isInternetAvailable) {
				updateCodeService.updateCode(projectName);
			} else {
				debug('Error: updateCodeCronJob: ' + projectName + ' No Internet');
			}
		});
	}, null, true, 'Asia/Kolkata');
});

/**
 * Sync content Offerings every 30 mins
 */
var syncContentOfferingsCronJob = new _cron.CronJob('00 */30 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering syncContentOfferingsCronJob at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			(0, _syncContentOfferings2['default'])();
		} else {
			debug('Error: syncContentOfferingsCronJob: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 * Sync Khairatis every 4 hrs
 */
var syncKhairatis = new _cron.CronJob('00 00 */4 * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering syncKhairatis at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			Khairati.sync();
		} else {
			debug('Error: syncKhairatis: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 * Sync Cash Coupons every 3 mins
 */
var syncUpdatedCashCoupons = new _cron.CronJob('00 */3 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering syncUpdatedCashCoupons at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			CashCoupon.updateSync();
		} else {
			debug('Error: syncCashCoupons: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

var syncCashCouponCount = new _cron.CronJob('00 */4 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering syncCashCouponCount at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			CashCoupon.countSync();
		} else {
			debug('Error: syncCashCoupons: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

/**
 *    trigger puppet heal script
 */
var puppetHealScript = new _cron.CronJob('00 */15 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering puppetHealScript at ' + (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));
	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			(0, _puppetHealScript2['default'])();
		} else {
			debug('Error: puppetHealScript: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');

var keepAlive = new _cron.CronJob('00 */1 * * * *', function () {
	// eslint-disable-line no-unused-vars
	(0, _keepAliveLogs2['default'])();
}, null, true, 'Asia/Kolkata');

var syncCommandLogs = new _cron.CronJob('00 */1 * * * *', function () {
	// eslint-disable-line no-unused-vars
	LastSyncTimestamp.getJobType('syncCommands').then(function (_lastSync) {
		var lastSync = _lastSync ? _lastSync.lastSuccessfullyExecutedAt : new Date(0);
		_parse.Parse.Cloud.run('getCommands', { lastSync: lastSync, minionId: _configEnv2['default'].minion.id }).then(function (commands) {
			_lodash2['default'].each(commands, function (command) {
				var commandLog = new CommandLog(command);
				commandLog.save().then(function () {
					var lastSyncTimestamp = new LastSyncTimestamp();
					lastSyncTimestamp.lastSuccessfullyExecutedAt = command.createdAt;
					lastSyncTimestamp.jobType = 'syncCommands';
					lastSyncTimestamp.save();
				});
			});
		});
	});
}, null, true, 'Asia/Kolkata');

var executionJob = new _cron.CronJob('00 */1 * * * *', function () {
	// eslint-disable-line no-unused-vars
	commandExecutor.runExecutor();
}, null, true, 'Asia/Kolkata');

var logContentSnapshot = function logContentSnapshot() {
	var query = Content.find({});
	query.select({ uid: 1, title: 1, offerings: 1, _id: 0 }).populate('offerings', 'mode rentalPeriod rentalCost -_id').execAsync().then(function (rawContents) {
		var contents = [];
		var content = {};
		_lodash2['default'].each(rawContents, function (rawContent) {
			content = {
				uid: rawContent.uid,
				offering: rawContent.offerings[0],
				title: rawContent.title
			};
			contents.push(content);
		});
		var data = { category: 'MinionContent', contents: contents };
		logger.log('info', 'Content Snapshot', 'CronService', JSON.parse(JSON.stringify(data)));
	}).error(function (error) {
		debug(error);
	});
};

/**
 * Trigger logContentSnapshot when ever the service starts
 */
logContentSnapshot();

/**
 * Trigger gps
 */
(0, _gpsLogs2['default'])();
//# sourceMappingURL=cronJobs.js.map
