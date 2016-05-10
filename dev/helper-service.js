'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getMinionConfig = getMinionConfig;
exports.updateMinionConfig = updateMinionConfig;
exports.updatePm2Config = updatePm2Config;
exports.deleteAndStartPm2Service = deleteAndStartPm2Service;
exports.pm2save = pm2save;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _pm2 = require('pm2');

var _pm22 = _interopRequireDefault(_pm2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _configEnv = require('./config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _appServicesUtilityService = require('./app/services/utility-service');

var utilityService = _interopRequireWildcard(_appServicesUtilityService);

var minionConfigPath = _path2['default'].join(_configEnv2['default'].rootPath, 'minionConfig.json');

/**
 * gets minionConfig.json as object
 */

function getMinionConfig() {
	if (!_fsExtra2['default'].existsSync(minionConfigPath)) {
		var err = utilityService.createEnhancedError('minionConfig.json not found', _httpStatus2['default'].INTERNAL_SERVER_ERROR);
		return _bluebird2['default'].reject(err);
	}

	return _fsExtra2['default'].readJsonAsync(minionConfigPath);
}

/**
 * updates minionConfig.json
 */

function updateMinionConfig(desiredMinionConfig) {
	return getMinionConfig().then(function (minionConfig) {
		_lodash2['default'].forOwn(desiredMinionConfig, function (value, key) {
			minionConfig.minion[key] = value;
		});
		return _fsExtra2['default'].writeJsonAsync(minionConfigPath, minionConfig);
	});
}

/**
 * updates service's pm2 config
 */

function updatePm2Config(serviceName) {
	var servicePm2ConfigPath = _path2['default'].join(_configEnv2['default'].rootPath, serviceName + '.json');
	return _bluebird2['default'].join(getMinionConfig(), _fsExtra2['default'].readJsonAsync(servicePm2ConfigPath), function (minionConfig, pm2Config) {
		pm2Config.apps[0].env.MINION_ID = minionConfig.minion.id;
		pm2Config.apps[0].env.MINION_API_KEY = minionConfig.minion.apiKey;
		pm2Config.apps[0].env.MINION_MODE = minionConfig.minion.mode;
		pm2Config.apps[0].env.MINION_LOCATION = minionConfig.minion.location;
		pm2Config.apps[0].env.NODE_ENV = minionConfig.minion.env;
		pm2Config.apps[0].env.AVAILABLE_PAYMENT_OPTIONS = minionConfig.minion.availablePaymentOptions;
		return _fsExtra2['default'].writeJsonAsync(servicePm2ConfigPath, pm2Config);
	});
}

/**
 * deletes and start pm2 service
 */
// TODO: promisify pm2

function deleteAndStartPm2Service(serviceName) {
	return new _bluebird2['default'](function (resolve, reject) {
		_pm22['default'].connect(function (connectErr) {
			if (connectErr) {
				var err = utilityService.createEnhancedError('Couldn\'t connect to pm2', _httpStatus2['default'].INTERNAL_SERVER_ERROR);
				return reject(err);
			}

			// Delete current processes
			_pm22['default']['delete'](serviceName, function (deleteErr) {
				if (deleteErr) {
					var err = utilityService.createEnhancedError('Couldn\'t delete pm2 service ' + serviceName, _httpStatus2['default'].INTERNAL_SERVER_ERROR);
					return reject(err);
				}
				var servicePath = _path2['default'].join(_configEnv2['default'].rootPath, serviceName + '.json');

				// Start a script on the current folder
				_pm22['default'].start(servicePath, function (startErr) {
					if (startErr) {
						var err = utilityService.createEnhancedError('Couldn\'t start pm2 service ' + serviceName, _httpStatus2['default'].INTERNAL_SERVER_ERROR);
						return reject(err);
					}

					return resolve();
				});
			});
		});
	});
}

/**
 * dumps pm2's current process to start them on reboot
 */

function pm2save() {
	return new _bluebird2['default'](function (resolve, reject) {
		_pm22['default'].connect(function (connectErr) {
			if (connectErr) {
				var err = utilityService.createEnhancedError('Couldn\'t connect to pm2', _httpStatus2['default'].INTERNAL_SERVER_ERROR);
				return reject(err);
			}

			// run pm2 save cmd
			_pm22['default'].dump(function (dumpErr) {
				if (dumpErr) {
					var err = utilityService.createEnhancedError('Couldn\'t dump pm2 services', _httpStatus2['default'].INTERNAL_SERVER_ERROR);
					return reject(err);
				}

				return resolve();
			});
		});
	});
}
//# sourceMappingURL=helper-service.js.map
