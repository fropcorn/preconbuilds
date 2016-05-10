'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

exports['default'] = {

	// POST /device/register
	'integratorRegistration': {
		body: {
			name: _joi2['default'].string().required()
		}
	},

	// POST /content
	'content': {
		headers: {
			'x-apiKey': _joi2['default'].string().required()
		},
		body: {
			title: _joi2['default'].string().required(),
			type: _joi2['default'].string().required(),
			classification: _joi2['default'].string().required()
		}
	},

	// POST /content/bulk
	'contentBulk': {
		headers: {
			// 'x-apiKey': Joi.string().required()
		}
	},

	// GET /contents
	'contents': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		}
	},

	// GET /contents/:contentUid/:type
	'getContentType': {
		params: {
			contentUid: _joi2['default'].string().alphanum().length(10).required(),
			type: _joi2['default'].string().valid('poster', 'trailer').required()
		},
		query: {
			orientation: _joi2['default'].string().valid('landscape', 'portrait')
		}
	},

	// GET /contents/search
	'contentSearch': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		query: {
			q: _joi2['default'].string().required()
		}
	},

	// GET /contents/:contentUid
	'contentDetails': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			contentUid: _joi2['default'].string().alphanum().length(10).required()
		}
	},

	// GET /getProfiles
	'getProfiles': {
		headers: {
			'px-hash': _joi2['default'].string().required()
		}
	},

	// GET /contentUpdate/start
	'startContentUpdate': {
		headers: {
			'px-hash': _joi2['default'].string().required()
		},
		query: {
			profile: _joi2['default'].string().required()
		}
	},

	// GET contentUpdateStatus
	'contentUpdateStatus': {
		headers: {
			'px-hash': _joi2['default'].string().required()
		}
	},

	// GET /minion/mode
	'getMinionMode': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		}
	},

	// GET /minion/modeForMO
	'getMinionModeForMo': {
		headers: {
			'px-hash': _joi2['default'].string().required()
		}
	},

	// POST /log
	'log': {
		body: {
			message: _joi2['default'].string().required()
		}
	},

	// POST /report
	'report': {
		body: {
			level: _joi2['default'].string().required(),
			message: _joi2['default'].string().required(),
			source: _joi2['default'].string().required()
		}
	},

	// GET /payment/optionsAvailable
	'paymentOptions': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		}
	},

	// GET /orders
	'getOrders': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		}
	},

	// POST /orders
	'createOrder': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		body: {
			offering: _joi2['default'].string().required(),
			mobileNumber: _joi2['default'].string().length(10).required() // TODO: make sure its numeric only
		}
	},

	// GET /ordersForOCA
	'getOrdersForOCA': {
		headers: {
			'px-hash': _joi2['default'].string().required()
		}
	},

	// GET /orders/:orderId
	'orderDetails': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		}
	},

	// POST /orders/createFreeSubscription
	'createFreeSubscription': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		body: {
			mobileNumber: _joi2['default'].string().length(10).required()
		}
	},

	// POST /orders/:orderId/updateTimeConsumed
	'updateTimeConsumed': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		},
		body: {
			timeConsumed: _joi2['default'].number().integer().positive().required()
		}
	},

	// POST /orders/:orderId/complete
	'completeCashOrder': {
		headers: {
			'px-hash': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		}
	},

	// POST /orders/:orderId/completeFreeOrder
	'completeFreeOrder': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		}
	},

	// POST /orders/:orderId/initiateTransaction
	'initiateTransaction': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		}
	},

	// POST /generateChecksum
	'generateChecksum': {
		body: {
			ORDER_ID: _joi2['default'].string().required()
		}
	},

	// POST /verifyChecksum
	'verifyChecksum': {},

	// POST /orders/:orderId/completeCouponPayment
	'completeCouponPayment': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		},
		body: {
			couponCode: _joi2['default'].string().alphanum().required()
		}
	},

	// POST /orders/:orderId/completePaymentTransaction
	'completePaymentTransaction': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		}
	},

	// POST /orders/:orderId/prepareForDownload'
	'prepareForDownload': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		},
		body: {
			uid: _joi2['default'].string().alphanum().length(10).required()
		}
	},

	// GET /orders/:orderId/download
	'downloadContent': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		params: {
			orderId: _joi2['default'].string().required()
		}
	},

	// POST /orders/:orderId/downloadErrorReason
	'updateDownloadErrorReason': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		body: {
			errorReason: _joi2['default'].string().required()
		}
	},

	// GET /content/stream or /content/streamencrypt
	'streamContent': {
		headers: {
			'px-hash': _joi2['default'].string().required(),
			'pp-device-key': _joi2['default'].string().required()
		},
		query: {
			uid: _joi2['default'].string().alphanum().length(10).required()
		}
	},

	// GET /banner/:id
	'getBanner': {
		params: {
			id: _joi2['default'].string().required()
		}
	},

	// POST /setMinionConfig
	'setMinionConfig': {
		body: {
			env: _joi2['default'].string().valid('development', 'test', 'production').required()
		}
	},

	// POST /setMinionMode
	'setMinionMode': {
		body: {
			mode: _joi2['default'].string().valid('PayPerView', 'Subscription').required(),
			location: _joi2['default'].string().valid('bus', 'airport', 'train', 'hospital')
		}
	}
};
module.exports = exports['default'];
//# sourceMappingURL=param-validation.js.map
