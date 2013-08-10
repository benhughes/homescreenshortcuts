
/*jslint regexp: true */
/*global require: false, document: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

define(['module'], function (module) {
	'use strict';

	var moduleLoader,
		loadFunc,
		moduleId,
		moduleName;

	moduleLoader = {
		load: function (name, req, onLoad, config) {
			loadFunc = onLoad;
			moduleName = name;
			moduleId = moduleLoader.createModuleId();
			//req has the same API as require().
			req([name], moduleLoader.useModule);
		},
		useModule: function (moduleAssets) {
			console.log('inside req', moduleName, moduleAssets);
			moduleLoader.appendCSS(moduleAssets.css);

			loadFunc(moduleAssets.module);
		},
		createModuleId: function () {
			return moduleName.replace(/\//g, "-");
		},
		appendCSS: function (css) {
			var el = document.createElement('style');
			el.type = "text/css";
			el.media = 'screen';
			el.id = moduleId;
			if (el.styleSheet) {
				el.styleSheet.cssText = css;//IE only
			} else {
				el.appendChild(document.createTextNode(css));
			}
			document.getElementsByTagName('head')[0].appendChild(el);
		}
	};


	return moduleLoader;
});
