'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getContentById = getContentById;
exports.addContent = addContent;
exports.addContentInBulk = addContentInBulk;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _servicesContentService = require('../services/content-service');

var contentService = _interopRequireWildcard(_servicesContentService);

/**
 * Get content details by contentUid
 */

function getContentById(req, res, next, uid) {
	contentService.get(uid).then(function (content) {
		req.content = content;
		return next();
	}).error(function (e) {
		return next(e);
	});
}

/**
 * Add content to the library
 */

function addContent(req, res, next) {
	contentService.createContent(req.body).then(function () {
		res.end(200);
	}).error(function (e) {
		return next(e);
	});
}

/**
 * Add content in bulk
 */

function addContentInBulk(req, res, next) {
	contentService.addContentInBulk(req.body.content, req.body.integrator).then(function (result) {
		res.send(result);
	}).error(function (e) {
		return next(e);
	});
}
//# sourceMappingURL=content-ctrl.js.map
