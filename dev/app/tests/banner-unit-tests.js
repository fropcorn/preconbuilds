'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _mockFs = require('mock-fs');

var _mockFs2 = _interopRequireDefault(_mockFs);

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _server = require('../../server');

describe.skip('Banner APIs', function () {
	before(function (done) {
		var bannersPath = _path2['default'].join(_configEnv2['default'].rootContentFilesPath, 'Banners');
		(0, _mockFs2['default'])(_defineProperty({}, bannersPath, {
			'1.jpg': new Buffer([8, 6, 7, 5, 3, 0, 9])
		}));
		done();
	});

	after(function (done) {
		_mockFs2['default'].restore();
		done();
	});

	describe('# GET /banner/list', function () {
		it('should return banner list', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/banner/list').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.list).to.be.an('array').and.to.deep.equal(['1.jpg']);
				done();
			});
		});
	});

	describe('# GET /banner/:id', function () {
		it('should render banner', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/banner/1.jpg').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/^image/);
				(0, _chai.expect)(res.body).to.deep.equal(new Buffer([8, 6, 7, 5, 3, 0, 9]));
				done();
			});
		});

		it('should return 404 status if banner file is not present', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/banner/2.png').expect(_httpStatus2['default'].NOT_FOUND).then(function (res) {
				(0, _chai.expect)(res.body.isPublic).to.equal(false);
				(0, _chai.expect)(res.body.type).to.equal('error');
				done();
			});
		});
	});
});
//# sourceMappingURL=banner-unit-tests.js.map
