/**
 * Created by donthi on 04/05/2016.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.get = get;
exports.createContent = createContent;
exports.addContentInBulk = addContentInBulk;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _repositoriesContent = require('../repositories/content');

var ContentRepository = _interopRequireWildcard(_repositoriesContent);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function get(uid) {
	return ContentRepository.get(uid);
}

function createContent(contentObj) {
	return ContentRepository.createContent(contentObj);
}

function addContentInBulk(contents, integrator) {
	return new _bluebird2['default'](function (resolve, reject) {
		ContentRepository.dumpContents(contents, integrator).then(function (result) {
			resolve(result.created);
		}, function (e) {
			reject(e);
		});
	});
}
//# sourceMappingURL=content-service.js.map
