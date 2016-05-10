/**
 * Created by donthi on 05/05/2016.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getIntegrator = getIntegrator;
exports.registerIntegrator = registerIntegrator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _elasticsearch = require('elasticsearch');

var _configEnv = require('../../config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var client = new _elasticsearch.Client();

/**
 * get integrator for given apiKey
 * @param apiKey
 * @returns {Promise}
 */

function getIntegrator(apiKey) {
	return new _bluebird2['default'](function (resolve, reject) {
		client.search({
			index: _configEnv2['default'].indexName,
			type: _configEnv2['default'].integrationType,
			query: { match: { apiKey: apiKey } }
		}).then(function (result) {
			console.log(result);
			resolve(result.hits.hits[0]._id);
		}, function (e) {
			reject(e);
		});
	});
}

/**
 * register integrator
 * @param name
 * @param apiKey
 * @returns {Promise}
 */

function registerIntegrator(name, apiKey) {
	return client.index({ index: _configEnv2['default'].indexName, type: _configEnv2['default'].integrationType, body: { name: name, apiKey: apiKey } });
}
//# sourceMappingURL=integrator.js.map
