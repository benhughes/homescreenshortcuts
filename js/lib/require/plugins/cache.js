
/*jslint regexp: true */
/*global require: false, localStorage: false, document: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

define(['module'], function (module) {
	'use strict';

	var cache,
		loadFunc,
		moduleId,
		moduleName,
		storagePrefix = "skype:";

	cache = {
		load: function (name, req, onLoad, config) {
			var localCopy;
			loadFunc = onLoad;
			moduleName = name;
			moduleId = this.createModuleId();
			localCopy = this.getFromLocalStorage(moduleId);

			if (localCopy) {
				console.log('Module: ' + moduleId + ' exists in local storage attempting to use it');
				loadFunc.fromText(localCopy);
			} else {
				this.getUrl(req.toUrl(name));
			}


			//req has the same API as require().
			//req([name], cache.useModule);
		},
		getUrl: function (url) {
			var xhr = new XMLHttpRequest(),
				returnText,
				that = this;
			xhr.open('GET', url);


			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log("response text = " + xhr.responseText);
						that.jsLoaded(xhr.responseText);
					} else {
						console.log('error', xhr.status);
					}
				}
			};

			xhr.send();

			return returnText;
		},
		jsLoaded: function (responseText) {
			this.saveToLocalStorage(responseText);
			loadFunc.fromText(responseText);
		},
		getFromLocalStorage: function (id) {
			return localStorage.getItem(storagePrefix + moduleId);
		},
		saveToLocalStorage: function (text) {
			localStorage.setItem(storagePrefix + moduleId, text);

		},
		useModule: function (moduleAssets) {
			console.log('inside req', moduleName, moduleAssets);
			this.appendCSS(moduleAssets.css);

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


	return cache;
});
