'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _server = require('../../server');

_chai2['default'].config.includeStack = true;

describe('Content APIs', function () {
	describe('GET /contents', function () {
		it('should return 3 content', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents?type=movie').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/json/);
				(0, _chai.expect)(res.body.length).to.equal(3);
				done();
			});
		});

		it('should limit and skip content by 1', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents?type=movie&limit=1&skip=1').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/json/);
				(0, _chai.expect)(res.body.length).to.equal(1);
				done();
			});
		});
		// TODO: Add more test cases on querying by languages, category.
	});

	describe('GET /contents/:contentUid', function () {
		it('should return the content with given content UID', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/1DeJlHGTPe').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.type).to.equal('movie');
				// TODO: expect(res.body.movie).to.be.an('object');
				done();
			});
		});
	});

	describe('GET /contents/:contentUid/:type', function () {
		it('should return portrait poster image of param contentUid', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/1DeJlHGTPe/poster?orientation=portrait').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/^image/);
				(0, _chai.expect)(Number.parseInt(res.headers['content-length'], 10)).to.equal(27138);
				done();
			});
		});

		it('should return landscape poster image of param contentUid', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/1DeJlHGTPe/poster?orientation=landscape').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/^image/);
				(0, _chai.expect)(Number.parseInt(res.headers['content-length'], 10)).to.equal(76109);
				done();
			});
		});

		it('should return 400 status if contentUid param is invalid', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/' + '2jKsqLwFnZ' + '/poster?orientation=landscape').expect(_httpStatus2['default'].BAD_REQUEST).then(function (res) {
				(0, _chai.expect)(res.body.isPublic).to.equal(false);
				(0, _chai.expect)(res.body.type).to.equal('error');
				done();
			});
		});

		it('should return 404 status if poster image for contentUid is not present', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/aGC4hWaJHQ/poster?orientation=landscape').expect(_httpStatus2['default'].NOT_FOUND).then(function (res) {
				(0, _chai.expect)(res.body.isPublic).to.equal(false);
				(0, _chai.expect)(res.body.type).to.equal('error');
				done();
			});
		});
	});

	describe('GET /contents/search', function () {
		it('should search by content title', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/search?q=Fan').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/json/);
				(0, _chai.expect)(res.body.movie.length).to.equal(1);
				(0, _chai.expect)(res.body.movie[0].title).to.equal('Fanaa');
				done();
			});
		});

		it('should search by content actors', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/search?q=Aamir').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/json/);
				(0, _chai.expect)(res.body.movie.length).to.equal(1);
				(0, _chai.expect)(res.body.movie[0].title).to.equal('Fanaa');
				done();
			});
		});

		it('should search by content categories', function (done) {
			(0, _supertest2['default'])(_server.app).get('/contents/search?q=Roman').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.headers['content-type']).to.match(/json/);
				(0, _chai.expect)(res.body.movie.length).to.equal(2);
				done();
			});
		});
	});
});
//# sourceMappingURL=content-ctrl-unit-test.js.map
