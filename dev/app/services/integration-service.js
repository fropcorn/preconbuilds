/**
 * Created by donthi on 04/05/2016.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.registerIntegrator = registerIntegrator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _repositoriesIntegrator = require('../repositories/integrator');

var IntegratorRepository = _interopRequireWildcard(_repositoriesIntegrator);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function registerIntegrator(reqBody) {
	return new _bluebird2['default'](function (resolve, reject) {
		var apiKey = _crypto2['default'].randomBytes(10).toString('hex');
		IntegratorRepository.registerIntegrator(reqBody.name, apiKey).then(function (integratorObj) {
			resolve({
				id: integratorObj._id,
				apiKey: apiKey
			});
		}, function (e) {
			reject(e);
		});
	});
}
//# sourceMappingURL=integration-service.js.map
