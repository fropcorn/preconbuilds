'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _server = require('../../server');

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _servicesUtilityService = require('../services/utility-service');

var utilityService = _interopRequireWildcard(_servicesUtilityService);

_chai2['default'].config.includeStack = true;

var deviceParams = {
	key: 'v8is0kv9',
	mobileNumber: '9832047249',
	accountKey: 'mkbdijusjf',
	macId: 'irjkjljpoekdls'
};

describe('Device APIs', function () {
	describe('# POST /device/register', function () {
		var hash = utilityService.generateCheckSum({ body: deviceParams }, _configEnv2['default'].DeviceSharedKey, '');
		it('should register a new device', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/device/register').set('px-hash', hash).send(deviceParams).expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.key).to.equal(deviceParams.key);
				(0, _chai.expect)(res.body.mobileNumber).to.equal(deviceParams.mobileNumber);
				(0, _chai.expect)(res.body.accountKey).to.equal(deviceParams.accountKey);
				(0, _chai.expect)(res.body.macId).to.equal(deviceParams.macId);
				done();
			});
		});

		it('should reply with key, mobileNumber, accountKey and macId if the device is already registered', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/device/register').set('px-hash', 'fakeHash').send(deviceParams).expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.key).to.equal(deviceParams.key);
				(0, _chai.expect)(res.body.mobileNumber).to.equal(deviceParams.mobileNumber);
				(0, _chai.expect)(res.body.accountKey).to.equal(deviceParams.accountKey);
				(0, _chai.expect)(res.body.macId).to.equal(deviceParams.macId);
				done();
			});
		});
	});

	describe('# GET /device/isOnline', function () {
		it('should return true if internet is available', function (done) {
			_sinon2['default'].stub(utilityService, 'checkInternetAvailability').returns(_bluebird2['default'].resolve(true));

			(0, _supertestAsPromised2['default'])(_server.app).get('/device/isOnline').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body).to.equal(true);
				utilityService.checkInternetAvailability.restore();
				done();
			});
		});

		it('should return false if internet is not available', function (done) {
			_sinon2['default'].stub(utilityService, 'checkInternetAvailability').returns(_bluebird2['default'].resolve(false));

			(0, _supertestAsPromised2['default'])(_server.app).get('/device/isOnline').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body).to.equal(false);
				utilityService.checkInternetAvailability.restore();
				done();
			});
		});
	});

	describe('# GET /device/ping', function () {
		it('should return pingValue', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/device/ping').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body).to.equal(_configEnv2['default'].pingValue);
				done();
			});
		});
	});
});
//# sourceMappingURL=1-device-unit-tests.js.map
