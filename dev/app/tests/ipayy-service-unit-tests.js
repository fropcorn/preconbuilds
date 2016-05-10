'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _servicesIpayyService = require('../services/ipayy-service');

_chai2['default'].config.includeStack = true;
var iPayyInst = new _servicesIpayyService.IpayPayment({
	msisdn: '8464051035',
	operator: 'IDEA',
	transId: 'idea846405135'
});
describe('Ipayy Services', function () {
	describe('generate otp', function () {
		it('should generate otp', function (done) {
			var responseText = '<generate-otp-response><application-name>Fropcorn</application-name><status>success</status><customer-code>9-qH7BbFPMaS946hgWwdYMkr1cwvAYgPZ1icjvz_LAY</customer-code><request-token-id>sudhir569f2fff13da223011f3k15c9</request-token-id><item><item-details><price>20</price><item-id>568bd89b4c65198d244d923c</item-id><item-name>PayPerView</item-name></item-details></item></generate-otp-response>';
			var headers = { 'Content-Type': 'application/xml' };
			(0, _nock2['default'])('http://api.ipayy.com').post('/v001/c/nweb/genotpwr').reply(200, responseText, headers);
			iPayyInst.generateOtp({
				price: 1,
				itemId: 'test1',
				'item-name': 'test'
			}).then(function (res) {
				(0, _chai.expect)(res['generate-otp-response'].status).to.be.an('array').and.to.deep.equal(['success']);
				done();
			});
		});

		it('should fail generate otp', function (done) {
			var responseText = '<error><http-status-code>400</http-status-code><error-response-code>IRQ0101</error-response-code><error-description></error-description></error>';
			var headers = { 'Content-Type': 'application/xml' };
			(0, _nock2['default'])('http://api.ipayy.com').post('/v001/c/nweb/genotpwr').reply(200, responseText, headers);
			iPayyInst.generateOtp({
				price: 1,
				itemId: 'test1',
				'item-name': 'test'
			}).then(function (res) {
				(0, _chai.expect)(res.error['http-status-code']).to.be.an('array').and.to.deep.equal(['400']);
				(0, _chai.expect)(res.error['error-response-code']).to.be.an('array').and.to.deep.equal(['IRQ0101']);
				done();
			});
		});
	});

	describe('do ipayy payment', function () {
		it('should make payment', function (done) {
			var responseText = '<web-payment-status-response><response-parameter-map><entry><key>application-name</key><value>Fropcorn</value></entry><entry><key>amount-charged</key><value>1.00</value></entry><entry><key>payment-status</key><value>SUCCESS</value></entry><entry><key>transaction-id</key><value>56633642</value></entry><entry><key>request-token-id</key><value>sudhir569f2fff13daaf3k15c9</value></entry><entry><key>customer-code</key><value>9-qH7BbFPMaS946hgWwdYMkr1cwvAYgPZ1icjvz_LAY</value></entry><entry><key>currency</key><value>INR</value></entry><entry><key>country</key><value>India</value></entry></response-parameter-map></web-payment-status-response>';
			var headers = { 'Content-Type': 'application/xml' };
			(0, _nock2['default'])('http://api.ipayy.com').post('/v001/c/nweb/dopayment').reply(200, responseText, headers);

			iPayyInst.doPayment({
				otp: '1234'
			}).then(function (res) {
				(0, _chai.expect)(res['web-payment-status-response']['response-parameter-map'][0].entry[2].value).to.be.an('array').and.to.deep.equal(['SUCCESS']);
				done();
			});
		});

		it('should fail payment', function (done) {
			var responseText = '<web-payment-status-response><response-parameter-map><entry><key>application-name</key><value>Fropcorn</value></entry><entry><key>amount-charged</key><value>1.00</value></entry><entry><key>payment-status</key><value>FAILURE</value></entry><entry><key>transaction-id</key><value>56633642</value></entry><entry><key>request-token-id</key><value>sudhir569f2fff13daaf3k15c9</value></entry><entry><key>customer-code</key><value>9-qH7BbFPMaS946hgWwdYMkr1cwvAYgPZ1icjvz_LAY</value></entry><entry><key>currency</key><value>INR</value></entry><entry><key>country</key><value>India</value></entry></response-parameter-map></web-payment-status-response>';
			var headers = { 'Content-Type': 'application/xml' };
			(0, _nock2['default'])('http://api.ipayy.com').post('/v001/c/nweb/dopayment').reply(200, responseText, headers);

			iPayyInst.doPayment({
				otp: '1234'
			}).then(function (res) {
				(0, _chai.expect)(res['web-payment-status-response']['response-parameter-map'][0].entry[2].value).to.be.an('array').and.to.deep.equal(['FAILURE']);
				done();
			});
		});

		it('should fail otp payment', function (done) {
			var responseText = '<error><http-status-code>401</http-status-code><error-response-code>ICR0201</error-response-code><error-description>The iPayy PIN / OTP token did not match.</error-description></error>';
			var headers = { 'Content-Type': 'application/xml' };
			(0, _nock2['default'])('http://api.ipayy.com').post('/v001/c/nweb/dopayment').reply(200, responseText, headers);

			iPayyInst.doPayment({
				otp: '1234'
			}).then(function (res) {
				(0, _chai.expect)(res.error['http-status-code']).to.be.an('array').and.to.deep.equal(['401']);
				(0, _chai.expect)(res.error['error-response-code']).to.be.an('array').and.to.deep.equal(['ICR0201']);
				done();
			});
		});
	});
});
//# sourceMappingURL=ipayy-service-unit-tests.js.map
