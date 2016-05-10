/**
 * Created by aadil on 06-05-2016.
 */

'use strict';

exports.getContentType = function (type) {
	switch (type.toLowerCase().replace(' ', '')) {
		case 'episode':
		case 'tvepisode':
		case 'tvshows':
		case 'tvshow':
		case 'show':
		case 'shows':
			return 'tvepisode';
			break;
		case 'movie':
		case 'movies':
		case 'film':
		case 'films':
		case 'cinema':
		case 'cinemas':
			return 'movie';
			break;
	}
};
//# sourceMappingURL=HelperUtilities.js.map
