/**
 * Created by donthi on 04/05/2016.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.get = get;
exports.createContent = createContent;
exports.dumpContents = dumpContents;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _elasticsearch = require('elasticsearch');

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _parserHotstarHotstarParser = require('../../parser/hotstar/hotstarParser');

var _parserHotstarHotstarParser2 = _interopRequireDefault(_parserHotstarHotstarParser);

var client = new _elasticsearch.Client();

function get(contentId) {
	return client.get({ index: _configEnv2['default'].indexName, type: _configEnv2['default'].contentType, id: contentId });
}

function createContent(contentObj) {
	return client.index({ index: _configEnv2['default'].indexName, type: _configEnv2['default'].contentType, body: contentObj });
}

function dumpContents(contents, integrator) {
	return new Promise(function (resolve, reject) {
		if (!Array.isArray(contents)) {
			contents = [contents];
		}
		client.index({
			index: _configEnv2['default'].indexName,
			type: _configEnv2['default'].dumpType,
			body: { integrator: integrator, contents: contents }
		}).then(function (response) {
			resolve(response);
			client.get({ index: _configEnv2['default'].indexName, type: _configEnv2['default'].dumpType, id: response._id }).then(function (dump) {});
		}).error(function (e) {
			reject(e);
		});
	});
}
//# sourceMappingURL=content.js.map
