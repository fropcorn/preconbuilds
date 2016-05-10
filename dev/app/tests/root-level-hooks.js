'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _server = require('../../server');

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var Device = _mongoose2['default'].model('Device'),
    device = new Device({
	key: '9b3c8dd',
	mobileNumber: '9845782649',
	accountKey: 'sdfljsoeivni',
	macId: 'ofiejoinvldk'
});

before(function (done) {
	_mongoose2['default'].connect(_configEnv2['default'].db, function () {
		_mongoose2['default'].connection.db.dropDatabase();

		(0, _supertest2['default'])(_server.app).get('/contentUpdate/start?profile=Mumbai').set('px-hash', 'fakeHash').end(function (err, res) {
			(0, _chai.expect)(err).to.not.exist; // eslint-disable-line no-unused-expressions
			(0, _chai.expect)(res.statusCode).to.equal(_httpStatus2['default'].OK);
		});

		var statusInterval = setInterval(function () {
			(0, _supertest2['default'])(_server.app).get('/contentUpdate/status').set('px-hash', 'fakeHash').end(function (err, res) {
				if (res.body.latestContentUpdate.status === 'Successful') {
					clearInterval(statusInterval);
					device.saveAsync().then(function () {
						done();
					});
				}
			});
		}, 1500);
	});
});

// executes once after all tests are executed
after(function (done) {
	_server.httpServer.close();
	_mongoose2['default'].connection.close();
	done();
});
//# sourceMappingURL=root-level-hooks.js.map
