'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _parse = require('parse');

var _configEnv = require('./config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _expressValidation3 = _interopRequireDefault(_expressValidation);

var _cron = require('cron');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

require('./import-models');

var _configParamValidation = require('./config/param-validation');

var _configParamValidation2 = _interopRequireDefault(_configParamValidation);

var _configWinston = require('./config/winston');

var _configWinston2 = _interopRequireDefault(_configWinston);

var _appServicesLoggerService = require('./app/services/logger-service');

var logger = _interopRequireWildcard(_appServicesLoggerService);

var _appServicesUtilityService = require('./app/services/utility-service');

var utilityService = _interopRequireWildcard(_appServicesUtilityService);

var _helperService = require('./helper-service');

var helperService = _interopRequireWildcard(_helperService);

var _appControllersMinionConfigCtrl = require('./app/controllers/minion-config-ctrl');

var minionConfigCtrl = _interopRequireWildcard(_appControllersMinionConfigCtrl);

var debug = require('debug')('fropcorn:minion-config-server');

// promisify modules
_bluebird2['default'].promisifyAll(_mongoose2['default']);
_bluebird2['default'].promisifyAll(_fsExtra2['default']);

// initialize Parse with Credentials before requiring/importing other files
_parse.Parse.initialize(_configEnv2['default'].fropcornGrid.appId, _configEnv2['default'].fropcornGrid.jsKey, _configEnv2['default'].fropcornGrid.masterKey);
_parse.Parse.serverURL = _configEnv2['default'].fropcornGrid.serverUrl;

_mongoose2['default'].connect(_configEnv2['default'].db);
var db = _mongoose2['default'].connection;
db.on('error', function () {
	throw new Error('unable to connect to database at ' + _configEnv2['default'].db);
});

var app = (0, _express2['default'])();
exports.app = app;
app.use((0, _morgan2['default'])('dev'));

// parses body params, makes them available as req.body
app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({
	extended: true
}));

// enable CORS
app.use((0, _cors2['default'])());

// Uncomment this if we want all API calls to be logged.
if (_configEnv2['default'].env === 'dev' || _configEnv2['default'].env === 'test' && _configEnv2['default'].testSuite !== true) {
	_expressWinston2['default'].requestWhitelist.push('body');
	_expressWinston2['default'].responseWhitelist.push('body');
	app.use(_expressWinston2['default'].logger({
		transports: [new _winston2['default'].transports.Console({
			json: true,
			colorize: true
		})],
		meta: true, // optional: control whether you want to log the meta data about the request (default to true)
		msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
		expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
		colorStatus: true // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
	}));
}

// return true if service is running
app.get('/healthcheck', function (req, res) {
	res.send(true);
});

// sets minion config: env
app.post('/setMinionConfig', (0, _expressValidation3['default'])(_configParamValidation2['default'].setMinionConfig), minionConfigCtrl.setMinionConfig);

// sets minion mode
app.post('/setMinionMode', (0, _expressValidation3['default'])(_configParamValidation2['default'].setMinionMode), minionConfigCtrl.setMinionMode);

app.use(function (req, res, next) {
	var err = new Error('Oops! you are not supposed to be here :)');
	err.status = 404;
	return next(err);
});

app.use(function (err, req, res, next) {
	if (err instanceof _expressValidation2['default'].ValidationError) {
		var completeErrorMessage = (0, _lodash2['default'])(err.errors).map(function (error) {
			return error.messages.join('. ');
		}).join(' and ');
		var error = utilityService.createEnhancedError(completeErrorMessage, err.status);
		error.category = 'ParamValidationError';
		return next(error);
	} else if (err instanceof _mongoose2['default'].Error.ValidationError) {
		var completeErrorMessage = (0, _lodash2['default'])(err.errors).map(function (value, key) {
			return key + ': ' + value.message;
		}).join(' and ');
		var error = utilityService.createEnhancedError(completeErrorMessage, _httpStatus2['default'].BAD_REQUEST);
		error.category = 'MongooseValidationError';
		return next(error);
	} else {
		var error = utilityService.createEnhancedError(err.message, err.status, err.level, err.isPublic, {
			publicMessage: err.publicMessage,
			type: err.type
		});
		error.category = err.category;
		return next(error);
	}
});

// winston-express error middleware, needs to be included after all the routes have been defined.
app.use(_expressWinston2['default'].errorLogger({
	winstonInstance: _configWinston2['default']
}));

// Error Handling
app.use(function (err, req, res, next) {
	// eslint-disable-line no-unused-vars
	var errMessage = utilityService.getPublicErrorMessage(err);
	return res.status(err.status).json({
		message: errMessage,
		isPublic: err.isPublic,
		type: err.type
	});
});

// start server on port 3010
var server = app.listen(3010, function () {
	var port = server.address().port;
	logger.log('info', 'MinionConfigService started on port ' + port + ' (' + _configEnv2['default'].env + ')', 'MinionConfigService');
	debug('## MinionConfigService started on port ' + port + ' (' + _configEnv2['default'].env + ')');
});

exports.server = server;
var syncAvailablePaymentOptions = new _cron.CronJob('00 */5 * * * *', function () {
	// eslint-disable-line no-unused-vars
	debug('Triggering syncAvailablePaymentOptions at', (0, _moment2['default'])().format('ddd, MMM Do YYYY, h:mm:ss a'));

	utilityService.checkInternetAvailability().then(function (isInternetAvailable) {
		if (isInternetAvailable) {
			(function () {
				var minionConfigPromise = helperService.getMinionConfig();
				minionConfigPromise.then(function (minionConfig) {
					return utilityService.getMinion(minionConfig.minion);
				}).then(function (minion) {
					if (!_lodash2['default'].isEqual(minionConfigPromise.value().minion.availablePaymentOptions, minion.availablePaymentOptions)) {
						return minionConfigCtrl.updatePaymentOptions(minion.availablePaymentOptions);
					} else {
						return _bluebird2['default'].resolve(false);
					}
				}).then(function (updatedPaymentOptions) {
					if (updatedPaymentOptions) {
						logger.log('info', 'payment options successfully updated', 'MinionConfigService');
						debug('payment options successfully updated');
					}
				}).error(function () {
					logger.log('error', 'Error in getting Minion', 'MinionConfigService');
				});
			})();
		} else {
			debug('Error: syncAvailablePaymentOptions: No Internet');
		}
	});
}, null, true, 'Asia/Kolkata');
//# sourceMappingURL=minion-config-server.js.map
