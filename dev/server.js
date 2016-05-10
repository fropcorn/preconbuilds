'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _configEnv = require('./config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

// nconf config
_nconf2['default'].file({ file: _path2['default'].join(_configEnv2['default'].rootPath, 'nconf.config.json') });

var client = new _elasticsearch2['default'].Client({
	host: _configEnv2['default'].elastic.hostname,
	port: _configEnv2['default'].elastic.port,
	log: 'trace'
});

var debug = require('debug')('precon:server');

client.ping({
	// ping usually has a 3000ms timeout
	requestTimeout: Infinity,

	// undocumented params are appended to the query string
	hello: 'elasticsearch!'
}, function (error) {
	if (error) {
		debug('elasticsearch cluster is down!');
	} else {
		debug('All is well at elastic');
	}
});

var app = (0, _express2['default'])();
exports.app = app;
require('./config/express')(app, _configEnv2['default']);

var httpServer = app.listen(_configEnv2['default'].http.port, function () {
	debug('## MinionService started on port ' + _configEnv2['default'].http.port + ' (' + _configEnv2['default'].env + ')');
	debug('rootPath ' + _configEnv2['default'].rootPath + ', rootClonePath ' + _configEnv2['default'].rootClonePath);
	debug('Minion', _configEnv2['default'].minion);
	debug('AVAILABLE_PAYMENT_OPTIONS ' + _configEnv2['default'].availablePaymentOptions);
});

exports.httpServer = httpServer;
if (_configEnv2['default'].https.port && !_configEnv2['default'].testSuite) {
	var credentials = {
		key: _fsExtra2['default'].readFileSync(_configEnv2['default'].https.ssl.key, 'utf8'),
		cert: _fsExtra2['default'].readFileSync(_configEnv2['default'].https.ssl.cert, 'utf8')
	};

	var httpsServer = _https2['default'].createServer(credentials, app);
	httpsServer.listen(_configEnv2['default'].https.port, function () {
		debug('## MinionService started on port ' + _configEnv2['default'].https.port);
	});
}
//# sourceMappingURL=server.js.map
