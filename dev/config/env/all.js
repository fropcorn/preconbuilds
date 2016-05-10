'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var rootPath = _path2['default'].join(__dirname, '/../../');

exports['default'] = {
	rootPath: rootPath,
	app: {
		name: 'Fropcorn Minion Services'
	},
	http: {
		port: process.env.PORT || 3000
	},
	https: {
		port: 443,

		// Paths to key and cert as string
		ssl: {
			key: _path2['default'].join(rootPath, 'config', 'ssl-credentials', 'key.pem'),
			cert: _path2['default'].join(rootPath, 'config', 'ssl-credentials', 'cert.pem')
		}
	},
	hostname: process.env.HOST || process.env.HOSTNAME,

	// used to block requests from blacklistedAppVersions
	blacklistedAppVersions: []
};
module.exports = exports['default'];
//# sourceMappingURL=all.js.map
