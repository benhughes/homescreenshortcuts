(function () {
	var wrapper = function () {
		var history,
			Log = function () {
				var args = Array.prototype.slice.call(arguments),
                    console = console || undefined,
                    log;
				args.splice(1, 0, "--");
				args[0] = "[" + args[0] + "]";
				history = history || [];   // store logs to an array for reference
				history.push(args);

				if (console) {
					log = Function.prototype.bind.call(console.log, console);
					log.apply(console, args);
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