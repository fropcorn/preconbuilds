'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _winston3 = require('./winston');

var _winston4 = _interopRequireDefault(_winston3);

var _appServicesUtilityService = require('../app/services/utility-service');

var utilityService = _interopRequireWildcard(_appServicesUtilityService);

exports['default'] = function (app, config) {
	app.use((0, _morgan2['default'])('dev'));

	// parses body params, makes them available as req.body
	app.use(_bodyParser2['default'].json());
	app.use(_bodyParser2['default'].urlencoded({
		extended: true
	}));

	app.use((0, _cookieParser2['default'])());
	app.use((0, _compression2['default'])());
	app.use((0, _methodOverride2['default'])());

	// Enable CORS - Cross Origin Resource Sharing
	app.use((0, _cors2['default'])());

	// Enable detailed API logging in dev and test (except during test suite run)
	if (config.env === 'dev' || config.env === 'test' && config.testSuite !== true) {
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

	var routes = _glob2['default'].sync(config.rootPath + 'app/routes/*.js');
	routes.forEach(function (router) {
		require(router)(app);
	});

	app.use(function (req, res, next) {
		// eslint-disable-line no-unused-vars
		var hostname = _url2['default'].parse(req.get('host')).pathname;
		if (hostname === 'fropcornservices.com' || config.env === 'development' || config.testSuite === true) {
			var err = utilityService.createEnhancedError('Oops! you are not supposed to be here :)', _httpStatus2['default'].NOT_FOUND, 'error', true);
			return next(err);
		} else {
			return res.redirect('http://fropcorn.com');
		}
	});

	app.use(function (err, req, res, next) {
		if (err instanceof _expressValidation2['default'].ValidationError) {
			var completeErrorMessage = (0, _lodash2['default'])(err.errors).map(function (error) {
				return error.messages.join('. ');
			}).join(' and ');
			var error = utilityService.createEnhancedError(completeErrorMessage, err.status);
			error.category = 'ParamValidationError';
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

	app.use(function (err, req, res, next) {
		var _req = _lodash2['default'].pick(req, ['headers', 'query', 'body']);
		_req.url = req.method + ' ' + req.url;
		return next(err);
	});

	app.use(_expressWinston2['default'].errorLogger({
		winstonInstance: _winston4['default']
	}));

	app.use(function (req, res, next) {
		var socket = req.socket;
		function clrsct() {
			socket.removeAllListeners('timeout');
			socket.setTimeout(5000, function () {
				socket.destroy();
			});
		}
		res.once('finish', clrsct);
		res.once('close', clrsct);
		next();
	});

	app.use(function (err, req, res, next) {
		// eslint-disable-line no-unused-vars
		var errMessage = utilityService.getPublicErrorMessage(err);
		return res.status(err.status).json({
			message: errMessage,
			isPublic: err.isPublic,
			type: err.type
		});
	});
};

module.exports = exports['default'];
//# sourceMappingURL=express.js.map
