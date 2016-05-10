'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _server = require('../../server');

_chai2['default'].config.includeStack = true;

describe('GET /error/publicError', function () {
	it('should return publicly visible error message', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).get('/error/publicError').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].BAD_REQUEST).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(true);
			(0, _chai.expect)(res.body.message).to.equal('This is an user friendly error and should be visible to the user');
			(0, _chai.expect)(res.body.type).to.equal('error');
			done();
		});
	});

	it('should return internal error message', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).get('/error/internalError').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].INTERNAL_SERVER_ERROR).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(false);
			(0, _chai.expect)(res.body.message).to.equal('Internal Server Error');
			(0, _chai.expect)(res.body.type).to.equal('error');
			done();
		});
	});

	it('should return internal error of type success', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).get('/error/publicErrorOfTypeSuccess').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].INTERNAL_SERVER_ERROR).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(true);
			(0, _chai.expect)(res.body.message).to.equal('This message should be visible to the user and not error message');
			(0, _chai.expect)(res.body.type).to.equal('success');
			done();
		});
	});

	it('should return 404 not found error', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).get('/error/404').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].NOT_FOUND).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(true);
			(0, _chai.expect)(res.body.message).to.equal('Oops! you are not supposed to be here :)');
			(0, _chai.expect)(res.body.type).to.equal('error');
			done();
		});
	});

	it('should handle express validation error - "key" is required', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).get('/minion/mode').expect(_httpStatus2['default'].BAD_REQUEST).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(false);
			(0, _chai.expect)(res.body.message).to.equal('Bad Request');
			(0, _chai.expect)(res.body.type).to.equal('error');
			done();
		});
	});

	it('should handle mongoose validation error - the value of path mobileNumber is not a valid mobile number', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).post('/device/register').set('px-hash', 'fakeHash').send({
			key: 'v8is0kv9',
			mobileNumber: '983204724a',
			accountKey: 'mkbdijusjf',
			macId: 'irjkjljpoekdls'
		}).expect(_httpStatus2['default'].BAD_REQUEST).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(false);
			(0, _chai.expect)(res.body.message).to.equal('Bad Request');
			(0, _chai.expect)(res.body.type).to.equal('error');
			done();
		});
	});

	it('should handle mongoose error - Cast to ObjectId failed for value "5694e1639c681fe82b06583" at path "_id"', function (done) {
		(0, _supertestAsPromised2['default'])(_server.app).get('/orders/5694e1639c681fe82b06583').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').expect(_httpStatus2['default'].INTERNAL_SERVER_ERROR).then(function (res) {
			(0, _chai.expect)(res.body.isPublic).to.equal(false);
			(0, _chai.expect)(res.body.message).to.equal('Internal Server Error');
			(0, _chai.expect)(res.body.type).to.equal('error');
			done();
		});
	});
});
//# sourceMappingURL=error-unit-tests.js.map
