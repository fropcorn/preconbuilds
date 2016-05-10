'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _server = require('../../server');

_chai2['default'].config.includeStack = true;

var ContentOffering = _mongoose2['default'].model('ContentOffering');

describe('Order APIs', function () {
	var orderId = undefined;
	describe('POST /orders/createFreeSubscription', function () {
		it('should create free subscription order', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/orders/createFreeSubscription').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').send({
				mobileNumber: '9573284926',
				email: 'kunalkapadia12@gmail.com'
			}).expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.cost).to.equal(0);
				(0, _chai.expect)(res.body.offeringMode).to.equal('Subscription');
				(0, _chai.expect)(res.body.paymentMode).to.equal('free');
				(0, _chai.expect)(res.body.status).to.equal('completed');
				done();
			});
		});

		it('should not create free subscription order as last one was created within last 24 hrs', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/orders/createFreeSubscription').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').send({
				mobileNumber: '9573284926',
				email: 'kunalkapadia12@gmail.com'
			}).expect(_httpStatus2['default'].BAD_REQUEST).then(function () {
				done();
			});
		});
	});

	describe('POST /orders', function () {
		var offeringId = undefined;
		before(function (done) {
			ContentOffering.findOne().where('rentalCost').equals(0).where('mode').equals('Subscription').execAsync().then(function (offering) {
				if (offering) {
					offeringId = offering._id;
					done();
				}
			});
		});
		it('should create a zero cost order', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/orders').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').send({
				mobileNumber: '9573284926',
				email: 'kunalkapadia12@gmail.com',
				offering: offeringId
			}).expect(_httpStatus2['default'].OK).then(function (res) {
				orderId = res.body._id;
				(0, _chai.expect)(res.body.cost).to.equal(0);
				(0, _chai.expect)(res.body.offeringMode).to.equal('Subscription');
				done();
			});
		});
	});

	describe('GET /orders/:orderId', function () {
		it('should fetch order details of given orderId', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).get('/orders/' + orderId).set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').send().expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body._id).to.equal(orderId);
				(0, _chai.expect)(res.body.cost).to.equal(0);
				(0, _chai.expect)(res.body.offeringMode).to.equal('Subscription');
				done();
			});
		});
	});

	describe('POST /orders/:orderId/completeFreeOrder', function () {
		it('should complete the free order', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/orders/' + orderId + '/completeFreeOrder').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').send().expect(_httpStatus2['default'].OK).then(function (res) {
				(0, _chai.expect)(res.body.cost).to.equal(0);
				(0, _chai.expect)(res.body.offeringMode).to.equal('Subscription');
				(0, _chai.expect)(res.body.paymentMode).to.equal('free');
				(0, _chai.expect)(res.body.status).to.equal('completed');
				done();
			});
		});
	});

	describe('POST /orders/:orderId/updateTimeConsumed', function () {
		it('should update the time consumed of the order', function (done) {
			(0, _supertestAsPromised2['default'])(_server.app).post('/orders/' + orderId + '/updateTimeConsumed').set('pp-device-key', '9b3c8dd').set('px-hash', 'fakeHash').send({
				timeConsumed: 10
			}).expect(_httpStatus2['default'].OK).then(function () {
				done();
			});
		});
	});
});
//# sourceMappingURL=order-ctrl-unit-test.js.map
