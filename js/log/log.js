(function () {
	var wrapper = function (){
		var history,
			Log = function () {
				var args = Array.prototype.slice.call(arguments);
				args.splice(1, 0, "--");
				args[0] = "[" + args[0] + "]";
				history = history || [];   // store logs to an array for reference
				history.push(args);

				if (console) {
					var log = Function.prototype.bind.call(console.log, console);
					log.apply(console, args);
				}
			};
		return Log;
	}
	
	//sets up for require to be able to use file in browser and commonjs to use it on serevr
	if ( typeof define === "function" && define.amd ) {
		define( "log", [], wrapper);
	}else if (module && typeof module.exports !== 'undefined') {
		module.exports = wrapper();
 	}


})();