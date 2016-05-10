'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.registerIntegrator = registerIntegrator;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _servicesIntegrationService = require('../services/integration-service');

var integrationService = _interopRequireWildcard(_servicesIntegrationService);

/**
 * Register integrator
 */

function registerIntegrator(req, res, next) {
	integrationService.registerIntegrator(req.body).then(function (integratorObj) {
		res.send(integratorObj);
	}).error(function (e) {
		return next(e);
	});
}
//# sourceMappingURL=integration-ctrl.js.map
