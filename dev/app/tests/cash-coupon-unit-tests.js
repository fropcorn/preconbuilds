'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var CashCoupon = _mongoose2['default'].model('CashCoupon');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('Cash Coupon', function () {
	var cashCoupon = {
		code: 'FROP4300',
		cost: 10,
		isUsed: false,
		id: '2rNIV6oO9i',
		isDeleted: false,
		minionId: 'prggjjgy'
	};
	var savedCashCoupon = undefined;

	describe('# Create Cash coupon', function () {
		it('should create cash coupon', function (done) {
			CashCoupon.create(cashCoupon).then(function (_savedCashCoupon) {
				(0, _chai.expect)(_savedCashCoupon.code).to.be.a('string');
				(0, _chai.expect)(_savedCashCoupon.code).to.be.equal('FROP4300');
				(0, _chai.expect)(_savedCashCoupon.cost).to.be.equal(10);
				savedCashCoupon = _savedCashCoupon;
				done();
			});
		});

		it('should return Cash coupon', function (done) {
			CashCoupon.getByCode(cashCoupon.code).then(function (data) {
				(0, _chai.expect)(data.code).to.be.a('string');
				(0, _chai.expect)(data.code).to.be.equal('FROP4300');
				(0, _chai.expect)(data.cost).to.be.equal(10);
				done();
			});
		});

		it('should return cash coupon count', function (done) {
			CashCoupon.getCount().then(function (count) {
				(0, _chai.expect)(count).to.be.a('number');
				(0, _chai.expect)(count).to.be.equal(1);
				done();
			});
		});

		it('should return cash coupon by query', function (done) {
			CashCoupon.get({ isUsed: false, minionId: 'prggjjgy' }).then(function (coupon) {
				(0, _chai.expect)(coupon[0].minionId).to.be.a('string');
				(0, _chai.expect)(coupon[0].minionId).to.be.equal('prggjjgy');
				(0, _chai.expect)(coupon[0].isUsed).to.be.equal(false);
				done();
			});
		});

		it('should return empty array', function (done) {
			savedCashCoupon.isUsed = true;
			savedCashCoupon.saveAsync().spread(function () {
				return CashCoupon.get({ isUsed: true });
			}).then(function (coupon) {
				(0, _chai.expect)(coupon).to.be.an('array');
				(0, _chai.expect)(coupon[0].minionId).to.be.a('string');
				(0, _chai.expect)(coupon[0].minionId).to.be.equal('prggjjgy');
				(0, _chai.expect)(coupon[0].isUsed).to.be.equal(true);
				done();
			});
		});
	});
});
//# sourceMappingURL=cash-coupon-unit-tests.js.map
