'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.createEnhancedError = createEnhancedError;
exports.getPublicErrorMessage = getPublicErrorMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function createEnhancedError(message) {
	var status = arguments.length <= 1 || arguments[1] === undefined ? _httpStatus2['default'].INTERNAL_SERVER_ERROR : arguments[1];
	var level = arguments.length <= 2 || arguments[2] === undefined ? 'error' : arguments[2];
	var isPublic = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	var _ref = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

	var _ref$type = _ref.type;
	var type = _ref$type === undefined ? 'error' : _ref$type;
	var code = _ref.code;
	var publicMessage = _ref.publicMessage;

	var error = new Error(message);
	error.status = status;
	error.level = level;
	error.isPublic = isPublic;
	error.type = type;
	error.code = code;
	error.publicMessage = publicMessage;
	error.source = 'MinionService';
	error.isOperational = true;
	return error;
}

function getPublicErrorMessage(err) {
	if (err.isPublic) {
		return err.publicMessage || err.message;
	} else {
		return _httpStatus2['default'][err.status];
	}
}
//# sourceMappingURL=utility-service.js.map
