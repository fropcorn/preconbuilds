/**
 * Created by aadil on 06-05-2016.
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _commonHelperUtilitiesJs = require('../common/HelperUtilities.js');

var _commonHelperUtilitiesJs2 = _interopRequireDefault(_commonHelperUtilitiesJs);

exports.parse = function (json, integrationId) {
	console.log('Starting HotStar parser');
	console.time("parse");
	//return new Promise(function (fulfill) {
	var parsedJson = [];
	_lodash2['default'].forEach(json.contents, function (obj) {
		var type = _commonHelperUtilitiesJs2['default'].getContentType(obj.contentType);
		var contentObject = {
			"Metadata": {
				"sourceId": obj.contentId,
				"title": obj.contentTitle,
				"episodeTitle": obj.episodeTitle,
				"type": type,
				"genre": obj.genre,
				"integrationId": integrationId,
				"language": obj.language,
				"runningTimeInSecs": obj.duration,
				"cast": obj.actors,
				"directors": obj.directors,
				"studios": "",
				"releasedOn": new Date(parseInt(obj.broadcastDate, 10) * 1000),
				"synopsis": obj.longDescription,
				"character": ""
			}
		};

		parsedJson.push(contentObject);
	});
	console.timeEnd("parse");
	console.log('HotStar parser completed');
	// upload to elastic serach
	//fulfill(parsedJson);
	// });
};
//# sourceMappingURL=hotstarParser.js.map
