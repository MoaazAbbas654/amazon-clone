const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = () => {
	if (PHASE_PRODUCTION_BUILD || PHASE_PRODUCTION_SERVER)
		return {
			env : {
				GOOGLE_ID     :
					'632197140735-2vmr18dijktelm5nqt4hottt11je1nhn.apps.googleusercontent.com',
				GOOGLE_SECRET : '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',
			},
		};
};

module.exports = {
	images          : {
		domains : [
			'links.papareact.com',
			'fakestoreapi.com',
			'm.media-amazon.com',
		],
	},
	reactStrictMode : true,
};
