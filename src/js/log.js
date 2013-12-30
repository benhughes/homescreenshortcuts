(function () {
	var wrapper = function () {
		var history,
			Log = function () {
				var args = Array.prototype.slice.call(arguments),
                    log;
				args.splice(1, 0, "--");
				args[0] = "[" + args[0] + "]";
				history = history || [];   // store logs to an array for reference
				history.push(args);

				if (typeof window.console !== "undefined") {
                    log = Function.prototype.bind.call(window.console.log, window.console);
					log.apply(window.console, args);
				}
			};
		return Log;
	};
	
	//sets up for require to be able to use file in browser and commonjs to use it on serevr
	if (typeof define === "function" && define.amd) {
		define("log", [], wrapper);
	} else if (window.module && typeof window.module.exports !== 'undefined') {
		window.module.exports = wrapper();
    }
})();