'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var minionConfig = process.env.WEBSTORM === 'true' ? require(_path2['default'].join(_all2['default'].rootPath, '..', 'minionConfig.json')) : require(_path2['default'].join(_all2['default'].rootPath, 'minionConfig.json'));

var testConfig = {
	dbName: 'fropcorn-mean-secret-test',
	db: 'mongodb://localhost/fropcorn-mean-secret-test',
	env: 'test',

	// disables detailed API console logging
	testSuite: process.env.TEST_SUITE === 'true',

	// rootClonePath
	rootClonePath: process.env.WEBSTORM === 'true' ? _path2['default'].join(_all2['default'].rootPath, '..', '..') : _path2['default'].join(_all2['default'].rootPath, '..'),

	// root file path
	rootContentFilesPath: process.env.WEBSTORM === 'true' ? _path2['default'].join(_all2['default'].rootPath, '..', '..', 'FropcornContent') : _path2['default'].join(_all2['default'].rootPath, '..', 'FropcornContent'),

	// external master HD path
	externalHdPath: process.env.TEST_SUITE === 'true' ? process.env.WEBSTORM === 'true' ? _path2['default'].join(_all2['default'].rootPath, '..', 'content-update') : _path2['default'].join(_all2['default'].rootPath, 'content-update') : _path2['default'].join('/media', 'FCMASTERHD'), // eslint-disable-line no-nested-ternary

	// external master HD contentFiles path
	externalHdContentFilesPath: _path2['default'].join('Fropcorn', 'FropcornContent'),

	// apk patch script path
	apkPatchScriptPath: '/usr/local/bin/APK_patch_shell_script.sh',

	// temp directory path
	tempDirectoryPath: '/tmp',

	// clonedProjectNames (should be same as folder names)
	clonedProjectNames: ['MinionService', 'MinionCatalogApp'],

	// used by /device/ping
	pingValue: true,

	// free view time added to user in case no payment options are available
	freePlaytime: 1800,

	// Khairati play time
	khairatiPlaytime: 10800,

	// log codes
	logCodes: {
		'default': 1,
		powerOnOff: 2,
		versionLogs: 3,
		streamLogs: 4,
		userLogs: 5,
		gpsLogs: 6,
		contentProfileUpdate: 7
	},

	// available payment options
	availablePaymentOptions: minionConfig.minion.availablePaymentOptions,

	// Minion
	minion: {
		id: minionConfig.minion.id,
		apiKey: minionConfig.minion.apiKey,
		mode: minionConfig.minion.mode,
		location: minionConfig.minion.location
	},

	// DRM Config
	drm: {
		pslParaphase: '5545696b48374623a203cccd906b6432'
	},

	// Device Shared Key
	DeviceSharedKey: '05a8133576c44ba39170e4fdb15f0f09',

	// Order Completion App Shared Key
	OCASharedKey: '942b2c588a2444f48792a98b4fef25d4',

	// Maintenance App Shared Key
	MaintenanceAppSharedKey: 'a706c720e9a411e4b02c1681e6b88ab3',

	// Fropcorn Grid
	fropcornGrid: {
		appId: 's78lNWWUpcsDqacxOkDOqb3FHVFWkRdTqcAqueKy',
		jsKey: 'oudJSfuynjBGPznBYpclsXhuJHncwL2vhuWpIRHu',
		masterKey: 'gREgUmpOrighRoRQYXEqzGwuvMDBjFh2Kjntr5Ud',
		serverUrl: 'http://localhost:1337'
	},

	// iPayy Config
	ipayy: {
		appKey: 'UImEgGgZrS-ov3Ju1HvOgw',
		merchantKey: 'lkHI12pekZJ0XZ0trNxjPQ',
		supportEmail: 'support@fropcorn.com',
		supportPhone: '+918454800800'
	},

	paymentProxy: {
		hostname: 'transactionservicestest.azurewebsites.net'
	},

	// Paytm Config
	paytm: {
		MID: 'Banyan60575793022911',
		merchantKey: 'NhYMJeeslWLFPlV1'
	}
};

// external HD content JSON path
testConfig.externalHdJsonPath = _path2['default'].join('Fropcorn', 'Minion', testConfig.minion.id || 'UPDATE_MINION_ID_HERE');

_lodash2['default'].assign(_all2['default'], testConfig);

exports['default'] = _all2['default'];
module.exports = exports['default'];
//# sourceMappingURL=test.js.map
