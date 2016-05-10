'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var Order = _mongoose2['default'].model('Order'),
    ContentOffering = _mongoose2['default'].model('ContentOffering');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('Order Methods', function () {
	var order = undefined,
	    offering = undefined;
	before(function (done) {
		ContentOffering.getFreeSubscriptionOffering().then(function (data) {
			offering = data;
			var newOrder = new Order({
				offering: offering._id,
				mobileNumber: 8464051035,
				offeringMode: 'Subscription',
				email: 'frop@corn.com',
				deviceKey: 'abcd',
				subscriptionLength: offering.rentalPeriod,
				content: null,
				orderCompletionTime: 0
			});
			newOrder.saveAsync().then(function (svaedOrder) {
				order = svaedOrder[0];
				(0, _chai.expect)(order.deviceKey).to.be.equal('abcd');
				(0, _chai.expect)(order.email).to.be.equal('frop@corn.com');
				(0, _chai.expect)(order.mobileNumber).to.be.equal('8464051035');
				done();
			});
		});
	});

	it('should get order by options', function (done) {
		Order.get({
			mode: 'Subscription',
			deviceKey: 'abcd'
		}).then(function (data) {
			(0, _chai.expect)(data[0].deviceKey).to.be.equal('abcd');
			(0, _chai.expect)(data[0].email).to.be.equal('frop@corn.com');
			(0, _chai.expect)(order.mobileNumber).to.be.equal('8464051035');
			done();
		});
	});

	it('should get order by id', function (done) {
		Order.getById(order._id).then(function (data) {
			(0, _chai.expect)(data.deviceKey).to.be.equal('abcd');
			(0, _chai.expect)(order.mobileNumber).to.be.equal('8464051035');
			(0, _chai.expect)(data.email).to.be.equal('frop@corn.com');
			done();
		});
	});
});
//# sourceMappingURL=order-static-unit-tests.js.map
