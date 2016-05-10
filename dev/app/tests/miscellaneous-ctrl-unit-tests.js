'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _rewire = require('rewire');

var _rewire2 = _interopRequireDefault(_rewire);

var _server = require('../../server');

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var testConfig = (0, _rewire2['default'])('../../config/env/test');

describe('Misc APIs', function () {
	describe('# GET /minion/id', function () {
		it('should return minion id', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/minion/id').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.text).to.equal(_configEnv2['default'].minion.id);
				done();
			});
		});
	});

	describe('# GET /minion/mode', function () {
		it('should return minion mode as Subscription along with its offerings', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/minion/mode').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.mode).to.equal('Subscription');
				(0, _chai.expect)(res.body.offerings).to.be.an('array').and.to.have.length(3);
				done();
			});
		});

		it('should return minion mode as PayPerView', function (done) {
			var revert = testConfig.__set__('testConfig.minion.mode', 'PayPerView');

			(0, _supertestAsPromised2['default'])(_server.app).get('/minion/mode').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.mode).to.equal('PayPerView');
				(0, _chai.expect)(res.body.offerings).to.be['null']; // eslint-disable-line no-unused-expressions
				revert();
				done();
			});
		});
	});

	describe('# GET /getMemoryUsage', function () {
		it('should return memory usage', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/getMemoryUsage').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.rss).to.be.a('number');
				(0, _chai.expect)(res.body.heapTotal).to.be.a('number');
				(0, _chai.expect)(res.body.heapUsed).to.be.a('number');
				done();
			});
		});
	});
});
//# sourceMappingURL=miscellaneous-ctrl-unit-tests.js.map
