'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var errorMapping = {
	'IRQ0101': 'Maximum OTP tries exceeded. Please regenerate new OTP',
	'IRQ0103': 'OTP timeout.Please regenerate OTP',
	'IRQ0104': 'Required parameters missing',
	'ICR0201': 'OTP did not match',
	'LOW_BALANCE': 'You do not have enough balance to finish the transaction.',
	'INVALID_SUBSCRIBER': 'It seems like you chose wrong carrier. Please select correct carrier.',
	'AMOUNT_THRESHOLD_EXCEEDED': 'You do not have enough balance to finish the transaction.',
	'CONSENT_FAILED_ABORTED': 'You did not approve the transaction. Please try again.'
};
exports.errorMapping = errorMapping;
//# sourceMappingURL=error-message.js.map
