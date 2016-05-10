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

var _servicesMiddlewareService = require('../services/middleware-service');

var middlewareService = _interopRequireWildcard(_servicesMiddlewareService);

var _controllersContentCtrl = require('../controllers/content-ctrl');

var contentCtrl = _interopRequireWildcard(_controllersContentCtrl);

exports['default'] = function (app) {
	// add content to the library
	app.post('/content', (0, _expressValidation2['default'])(_configParamValidation2['default'].content), middlewareService.setIntegrator, contentCtrl.addContent);

	// add content in bulk
	app.post('/content/bulk', (0, _expressValidation2['default'])(_configParamValidation2['default'].contentBulk), middlewareService.setIntegrator, contentCtrl.addContentInBulk);

	// get content by contentUid
	app.get('/content/:contentUid', contentCtrl.getContentById);
};

module.exports = exports['default'];
//# sourceMappingURL=content-routes.js.map
