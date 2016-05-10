'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _server = require('../../server');

_chai2['default'].config.includeStack = true;

describe('Content Update APIs', function () {
	describe('# GET /contentUpdate/getProfiles', function () {
		it('should return all content update profiles', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/contentUpdate/getProfiles').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body).to.be.an('array').and.to.deep.equal(['Hyderabad', 'Mumbai']);
				done();
			});
		});
	});

	describe('# GET /contentUpdate/start', function () {
		it('should update content in db', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/contentUpdate/start?profile=Hyderabad').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.statusCode).to.equal(_httpStatus2['default'].OK);
				done();
			});
		});

		it('should return that content update is in progress', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/contentUpdate/status').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.latestContentUpdate.status).to.equal('inProgress');
				done();
			});
		});
	});

	describe('# GET /contentUpdate/status', function () {
		// wait for content update to succeed/fail.
		before(function (done) {
			var statusInterval = setInterval(function () {
				(0, _supertestAsPromised2['default'])(_server.app).get('/contentUpdate/status').set('px-hash', 'fakeHash').then(function (res) {
					if (res.body.latestContentUpdate.status !== 'inProgress') {
						clearInterval(statusInterval);
						done();
					}
				});
			}, 1500);
		});

		it('should return that content update has succeeded', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/contentUpdate/status').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.latestContentUpdate.status).to.equal('Successful');
				(0, _chai.expect)(res.body.contentCount).to.equal(2);
				done();
			});
		});
	});
});
//# sourceMappingURL=content-update-unit-tests.js.map
