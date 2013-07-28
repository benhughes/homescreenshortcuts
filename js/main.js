(function () {
    'use strict';

	require.config({
		paths: {
			'text': 'lib/require/plugins/text',
			'log': 'log/log'
		},
		shim: {

		}
	});

	require(
		[
            'log',
            'router'
        ],
		function (log, Router) {
            var logPrefix = "main.js";
			log(logPrefix, 'initialising...');
			new Router();

		}
	);

}());