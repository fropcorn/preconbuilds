'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.setIntegrator = setIntegrator;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _repositoriesIntegrator = require('../repositories/integrator');

var IntegratorRepository = _interopRequireWildcard(_repositoriesIntegrator);

/**
 * set integrator to the request.
 */

function setIntegrator(req, res, next) {
	var apiKey = req.headers['x-apiKey'];
	IntegratorRepository.getIntegrator(apiKey).then(function (integrator) {
		req.body.integrator = integrator;
		return next();
	}).error(function (e) {
		return next(e);
	});
}
//# sourceMappingURL=middleware-service.js.map
