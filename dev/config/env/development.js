'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var devConfig = {
	elastic: {
		hostname: 'localhost:9200',
		port: '9200'
	},
	env: 'dev',
	indexName: 'precon-dev',
	contentType: 'Content',
	integrationType: 'Integration',
	dumpType: 'Dump',
	apiKeys: {
		hotstar: '3fc71e0da577e7068311'
	}
};

_lodash2['default'].assign(_all2['default'], devConfig);

exports['default'] = _all2['default'];
module.exports = exports['default'];
//# sourceMappingURL=development.js.map
