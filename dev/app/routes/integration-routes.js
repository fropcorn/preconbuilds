'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _configParamValidation = require('../../config/param-validation');

var _configParamValidation2 = _interopRequireDefault(_configParamValidation);

var _controllersIntegrationCtrl = require('../controllers/integration-ctrl');

var integrationCtrl = _interopRequireWildcard(_controllersIntegrationCtrl);

exports['default'] = function (app) {
	// register integrator
	app.post('/integration', (0, _expressValidation2['default'])(_configParamValidation2['default'].integratorRegistration), integrationCtrl.registerIntegrator);
};

module.exports = exports['default'];
//# sourceMappingURL=integration-routes.js.map
