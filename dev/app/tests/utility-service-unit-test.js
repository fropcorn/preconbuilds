'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _rewire = require('rewire');

var _rewire2 = _interopRequireDefault(_rewire);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var debug = require('debug')('fropcorn:utility-service-unit-test'),
    utilityService = (0, _rewire2['default'])('../services/utility-service');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('Utility Service', function () {
	describe('# isInternetAvailable', function () {
		it('should return true if ping works', function (done) {
			var revert = utilityService.__set__('ping', function () {
				return _bluebird2['default'].resolve(true);
			});
			(0, _chai.expect)(utilityService.checkInternetAvailability()).to.eventually.equal(true).notify(done);
			revert();
		});

		it('should return false if ping does not work', function (done) {
			var revert = utilityService.__set__('ping', function () {
				return _bluebird2['default'].resolve(false);
			});
			(0, _chai.expect)(utilityService.checkInternetAvailability()).to.eventually.equal(false).notify(done);
			revert();
		});
	});

	describe('# ping', function () {
		it('should return boolean', function (done) {
			(0, _chai.expect)(utilityService.__get__('ping')()).to.eventually.be.a('boolean').notify(done);
		});
	});

	describe('# runCmd', function () {
		it('should return latest commit id', function (done) {
			var distPath = _configEnv2['default'].rootPath;
			if (process.env.WEBSTORM !== 'true') {
				distPath = _path2['default'].join(distPath, 'dist');
			}
			debug('distPath: ' + distPath);
			utilityService.runCmd('git', ['rev-parse', 'HEAD'], {
				cwd: distPath
			}).then(function (commitId) {
				(0, _chai.expect)(commitId).to.be.a('string').and.have.length(40);
				done();
			});
		});
	});

	describe('# getAvailablePaymentOptions', function () {
		it('should return CashCoupon, PayU and IPayy as internet is available', function (done) {
			var paymentOptions = ['CashCoupon', 'IPayy', 'Yippster', 'PayU'];
			var revertInternetAvailabilityMock = utilityService.__set__('checkInternetAvailability', function () {
				return _bluebird2['default'].resolve(true);
			});
			(0, _chai.expect)(utilityService.getAvailablePaymentOptions(paymentOptions)).to.eventually.have.members(['CashCoupon', 'IPayy', 'PayU']).notify(done);
			revertInternetAvailabilityMock();
		});

		it('should return CashCoupon and Yippster as internet is not available', function (done) {
			var paymentOptions = ['CashCoupon', 'IPayy', 'Yippster', 'PayU'];
			var revertInternetAvailabilityMock = utilityService.__set__('checkInternetAvailability', function () {
				return _bluebird2['default'].resolve(false);
			});
			(0, _chai.expect)(utilityService.getAvailablePaymentOptions(paymentOptions)).to.eventually.have.members(['CashCoupon', 'Yippster']).notify(done);
			revertInternetAvailabilityMock();
		});

		it('should return Yippster if IPayy is not available irrespective of internet availability', function (done) {
			var paymentOptions = ['Yippster'];
			(0, _chai.expect)(utilityService.getAvailablePaymentOptions(paymentOptions)).to.eventually.have.members(['Yippster']).notify(done);
		});

		it('should return empty array if no payment options are available', function (done) {
			var paymentOptions = [];
			(0, _chai.expect)(utilityService.getAvailablePaymentOptions(paymentOptions)).to.eventually.be.empty.notify(done);
		});
	});
});
//# sourceMappingURL=utility-service-unit-test.js.map
