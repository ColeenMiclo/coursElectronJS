//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let electron = require("electron");
let node_path = require("node:path");
node_path = __toESM(node_path);
//#region node_modules/electron-squirrel-startup/node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isNaN(val) === false) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		if (ms >= d) return Math.round(ms / d) + "d";
		if (ms >= h) return Math.round(ms / h) + "h";
		if (ms >= m) return Math.round(ms / m) + "m";
		if (ms >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, n, name) {
		if (ms < n) return;
		if (ms < n * 1.5) return Math.floor(ms / n) + " " + name;
		return Math.ceil(ms / n) + " " + name + "s";
	}
}));
//#endregion
//#region node_modules/electron-squirrel-startup/node_modules/debug/src/debug.js
var require_debug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = require_ms();
	/**
	* The currently active debug mode names, and names to skip.
	*/
	exports.names = [];
	exports.skips = [];
	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	exports.formatters = {};
	/**
	* Previous log timestamp.
	*/
	var prevTime;
	/**
	* Select a color.
	* @param {String} namespace
	* @return {Number}
	* @api private
	*/
	function selectColor(namespace) {
		var hash = 0, i;
		for (i in namespace) {
			hash = (hash << 5) - hash + namespace.charCodeAt(i);
			hash |= 0;
		}
		return exports.colors[Math.abs(hash) % exports.colors.length];
	}
	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		function debug() {
			if (!debug.enabled) return;
			var self = debug;
			var curr = +/* @__PURE__ */ new Date();
			self.diff = curr - (prevTime || curr);
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			args[0] = exports.coerce(args[0]);
			if ("string" !== typeof args[0]) args.unshift("%O");
			var index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
				if (match === "%%") return match;
				index++;
				var formatter = exports.formatters[format];
				if ("function" === typeof formatter) {
					var val = args[index];
					match = formatter.call(self, val);
					args.splice(index, 1);
					index--;
				}
				return match;
			});
			exports.formatArgs.call(self, args);
			(debug.log || exports.log || console.log.bind(console)).apply(self, args);
		}
		debug.namespace = namespace;
		debug.enabled = exports.enabled(namespace);
		debug.useColors = exports.useColors();
		debug.color = selectColor(namespace);
		if ("function" === typeof exports.init) exports.init(debug);
		return debug;
	}
	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		exports.save(namespaces);
		exports.names = [];
		exports.skips = [];
		var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
		var len = split.length;
		for (var i = 0; i < len; i++) {
			if (!split[i]) continue;
			namespaces = split[i].replace(/\*/g, ".*?");
			if (namespaces[0] === "-") exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
			else exports.names.push(new RegExp("^" + namespaces + "$"));
		}
	}
	/**
	* Disable debug output.
	*
	* @api public
	*/
	function disable() {
		exports.enable("");
	}
	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		var i = 0, len = exports.skips.length;
		for (; i < len; i++) if (exports.skips[i].test(name)) return false;
		for (i = 0, len = exports.names.length; i < len; i++) if (exports.names[i].test(name)) return true;
		return false;
	}
	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) return val.stack || val.message;
		return val;
	}
}));
//#endregion
//#region node_modules/electron-squirrel-startup/node_modules/debug/src/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = require_debug();
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
	/**
	* Colors.
	*/
	exports.colors = [
		"lightseagreen",
		"forestgreen",
		"goldenrod",
		"dodgerblue",
		"darkorchid",
		"crimson"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && window.process.type === "renderer") return true;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	exports.formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (err) {
			return "[UnexpectedJSONParseError]: " + err.message;
		}
	};
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		var useColors = this.useColors;
		args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff);
		if (!useColors) return;
		var c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		var index = 0;
		var lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, function(match) {
			if ("%%" === match) return;
			index++;
			if ("%c" === match) lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.log()` when available.
	* No-op when `console.log` is not a "function".
	*
	* @api public
	*/
	function log() {
		return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (null == namespaces) exports.storage.removeItem("debug");
			else exports.storage.debug = namespaces;
		} catch (e) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		var r;
		try {
			r = exports.storage.debug;
		} catch (e) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Enable namespaces listed in `localStorage.debug` initially.
	*/
	exports.enable(load());
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return window.localStorage;
		} catch (e) {}
	}
}));
//#endregion
//#region node_modules/electron-squirrel-startup/node_modules/debug/src/node.js
var require_node$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty = require("tty");
	var util$1 = require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*
	* Expose `debug()` as the module.
	*/
	exports = module.exports = require_debug();
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter(function(key) {
		return /^debug_/i.test(key);
	}).reduce(function(obj, key) {
		var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
			return k.toUpperCase();
		});
		var val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* The file descriptor to write the `debug()` calls to.
	* Set the `DEBUG_FD` env variable to override with another value. i.e.:
	*
	*   $ DEBUG_FD=3 node script.js 3>debug.log
	*/
	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	if (1 !== fd && 2 !== fd) util$1.deprecate(function() {}, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
	var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
	}
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	exports.formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts).split("\n").map(function(str) {
			return str.trim();
		}).join(" ");
	};
	/**
	* Map %o to `util.inspect()`, allowing multiple lines if needed.
	*/
	exports.formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util$1.inspect(v, this.inspectOpts);
	};
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		var name = this.namespace;
		if (this.useColors) {
			var c = this.color;
			var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
	}
	/**
	* Invokes `util.format()` with the specified arguments and writes to `stream`.
	*/
	function log() {
		return stream.write(util$1.format.apply(util$1, arguments) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (null == namespaces) delete process.env.DEBUG;
		else process.env.DEBUG = namespaces;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Copied from `node/src/node.js`.
	*
	* XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	* relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	*/
	function createWritableStdioStream(fd) {
		var stream;
		switch (process.binding("tty_wrap").guessHandleType(fd)) {
			case "TTY":
				stream = new tty.WriteStream(fd);
				stream._type = "tty";
				if (stream._handle && stream._handle.unref) stream._handle.unref();
				break;
			case "FILE":
				stream = new (require("fs")).SyncWriteStream(fd, { autoClose: false });
				stream._type = "fs";
				break;
			case "PIPE":
			case "TCP":
				stream = new (require("net")).Socket({
					fd,
					readable: false,
					writable: true
				});
				stream.readable = false;
				stream.read = null;
				stream._type = "pipe";
				if (stream._handle && stream._handle.unref) stream._handle.unref();
				break;
			default: throw new Error("Implement me. Unknown stream file type!");
		}
		stream.fd = fd;
		stream._isStdio = true;
		return stream;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		var keys = Object.keys(exports.inspectOpts);
		for (var i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	/**
	* Enable namespaces listed in `process.env.DEBUG` initially.
	*/
	exports.enable(load());
}));
//#endregion
//#region node_modules/electron-squirrel-startup/node_modules/debug/src/index.js
var require_src$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process !== "undefined" && process.type === "renderer") module.exports = require_browser();
	else module.exports = require_node$1();
}));
//#endregion
//#region node_modules/electron-squirrel-startup/index.js
var require_electron_squirrel_startup = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$7 = require("path");
	var spawn = require("child_process").spawn;
	var debug = require_src$1()("electron-squirrel-startup");
	var app$1 = require("electron").app;
	var run = function(args, done) {
		var updateExe = path$7.resolve(path$7.dirname(process.execPath), "..", "Update.exe");
		debug("Spawning `%s` with args `%s`", updateExe, args);
		spawn(updateExe, args, { detached: true }).on("close", done);
	};
	var check = function() {
		if (process.platform === "win32") {
			var cmd = process.argv[1];
			debug("processing squirrel command `%s`", cmd);
			var target = path$7.basename(process.execPath);
			if (cmd === "--squirrel-install" || cmd === "--squirrel-updated") {
				run(["--createShortcut=" + target], app$1.quit);
				return true;
			}
			if (cmd === "--squirrel-uninstall") {
				run(["--removeShortcut=" + target], app$1.quit);
				return true;
			}
			if (cmd === "--squirrel-obsolete") {
				app$1.quit();
				return true;
			}
		}
		return false;
	};
	module.exports = check();
}));
//#endregion
//#region node_modules/electron-log/src/renderer/electron-log-preload.js
var require_electron_log_preload = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var electron = {};
	try {
		electron = require("electron");
	} catch (e) {}
	if (electron.ipcRenderer) initialize(electron);
	if (typeof module === "object") module.exports = initialize;
	/**
	* @param {Electron.ContextBridge} contextBridge
	* @param {Electron.IpcRenderer} ipcRenderer
	*/
	function initialize({ contextBridge, ipcRenderer }) {
		if (!ipcRenderer) return;
		ipcRenderer.on("__ELECTRON_LOG_IPC__", (_, message) => {
			window.postMessage({
				cmd: "message",
				...message
			});
		});
		ipcRenderer.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((e) => console.error(/* @__PURE__ */ new Error(`electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`)));
		const electronLog = {
			sendToMain(message) {
				try {
					ipcRenderer.send("__ELECTRON_LOG__", message);
				} catch (e) {
					console.error("electronLog.sendToMain ", e, "data:", message);
					ipcRenderer.send("__ELECTRON_LOG__", {
						cmd: "errorHandler",
						error: {
							message: e?.message,
							stack: e?.stack
						},
						errorName: "sendToMain"
					});
				}
			},
			log(...data) {
				electronLog.sendToMain({
					data,
					level: "info"
				});
			}
		};
		for (const level of [
			"error",
			"warn",
			"info",
			"verbose",
			"debug",
			"silly"
		]) electronLog[level] = (...data) => electronLog.sendToMain({
			data,
			level
		});
		if (contextBridge && process.contextIsolated) try {
			contextBridge.exposeInMainWorld("__electronLog", electronLog);
		} catch {}
		if (typeof window === "object") window.__electronLog = electronLog;
		else __electronLog = electronLog;
	}
}));
//#endregion
//#region node_modules/electron-log/src/core/scope.js
var require_scope = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = scopeFactory;
	function scopeFactory(logger) {
		return Object.defineProperties(scope, {
			defaultLabel: {
				value: "",
				writable: true
			},
			labelPadding: {
				value: true,
				writable: true
			},
			maxLabelLength: {
				value: 0,
				writable: true
			},
			labelLength: { get() {
				switch (typeof scope.labelPadding) {
					case "boolean": return scope.labelPadding ? scope.maxLabelLength : 0;
					case "number": return scope.labelPadding;
					default: return 0;
				}
			} }
		});
		function scope(label) {
			scope.maxLabelLength = Math.max(scope.maxLabelLength, label.length);
			const newScope = {};
			for (const level of logger.levels) newScope[level] = (...d) => logger.logData(d, {
				level,
				scope: label
			});
			newScope.log = newScope.info;
			return newScope;
		}
	}
}));
//#endregion
//#region node_modules/electron-log/src/core/Buffering.js
var require_Buffering = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffering = class {
		constructor({ processMessage }) {
			this.processMessage = processMessage;
			this.buffer = [];
			this.enabled = false;
			this.begin = this.begin.bind(this);
			this.commit = this.commit.bind(this);
			this.reject = this.reject.bind(this);
		}
		addMessage(message) {
			this.buffer.push(message);
		}
		begin() {
			this.enabled = [];
		}
		commit() {
			this.enabled = false;
			this.buffer.forEach((item) => this.processMessage(item));
			this.buffer = [];
		}
		reject() {
			this.enabled = false;
			this.buffer = [];
		}
	};
	module.exports = Buffering;
}));
//#endregion
//#region node_modules/electron-log/src/core/Logger.js
var require_Logger = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var scopeFactory = require_scope();
	var Buffering = require_Buffering();
	module.exports = class Logger {
		static instances = {};
		dependencies = {};
		errorHandler = null;
		eventLogger = null;
		functions = {};
		hooks = [];
		isDev = false;
		levels = null;
		logId = null;
		scope = null;
		transports = {};
		variables = {};
		constructor({ allowUnknownLevel = false, dependencies = {}, errorHandler, eventLogger, initializeFn, isDev = false, levels = [
			"error",
			"warn",
			"info",
			"verbose",
			"debug",
			"silly"
		], logId, transportFactories = {}, variables } = {}) {
			this.addLevel = this.addLevel.bind(this);
			this.create = this.create.bind(this);
			this.initialize = this.initialize.bind(this);
			this.logData = this.logData.bind(this);
			this.processMessage = this.processMessage.bind(this);
			this.allowUnknownLevel = allowUnknownLevel;
			this.buffering = new Buffering(this);
			this.dependencies = dependencies;
			this.initializeFn = initializeFn;
			this.isDev = isDev;
			this.levels = levels;
			this.logId = logId;
			this.scope = scopeFactory(this);
			this.transportFactories = transportFactories;
			this.variables = variables || {};
			for (const name of this.levels) this.addLevel(name, false);
			this.log = this.info;
			this.functions.log = this.log;
			this.errorHandler = errorHandler;
			errorHandler?.setOptions({
				...dependencies,
				logFn: this.error
			});
			this.eventLogger = eventLogger;
			eventLogger?.setOptions({
				...dependencies,
				logger: this
			});
			for (const [name, factory] of Object.entries(transportFactories)) this.transports[name] = factory(this, dependencies);
			Logger.instances[logId] = this;
		}
		static getInstance({ logId }) {
			return this.instances[logId] || this.instances.default;
		}
		addLevel(level, index = this.levels.length) {
			if (index !== false) this.levels.splice(index, 0, level);
			this[level] = (...args) => this.logData(args, { level });
			this.functions[level] = this[level];
		}
		catchErrors(options) {
			this.processMessage({
				data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
				level: "warn"
			}, { transports: ["console"] });
			return this.errorHandler.startCatching(options);
		}
		create(options) {
			if (typeof options === "string") options = { logId: options };
			return new Logger({
				dependencies: this.dependencies,
				errorHandler: this.errorHandler,
				initializeFn: this.initializeFn,
				isDev: this.isDev,
				transportFactories: this.transportFactories,
				variables: { ...this.variables },
				...options
			});
		}
		compareLevels(passLevel, checkLevel, levels = this.levels) {
			const pass = levels.indexOf(passLevel);
			const check = levels.indexOf(checkLevel);
			if (check === -1 || pass === -1) return true;
			return check <= pass;
		}
		initialize(options = {}) {
			this.initializeFn({
				logger: this,
				...this.dependencies,
				...options
			});
		}
		logData(data, options = {}) {
			if (this.buffering.enabled) this.buffering.addMessage({
				data,
				date: /* @__PURE__ */ new Date(),
				...options
			});
			else this.processMessage({
				data,
				...options
			});
		}
		processMessage(message, { transports = this.transports } = {}) {
			if (message.cmd === "errorHandler") {
				this.errorHandler.handle(message.error, {
					errorName: message.errorName,
					processType: "renderer",
					showDialog: Boolean(message.showDialog)
				});
				return;
			}
			let level = message.level;
			if (!this.allowUnknownLevel) level = this.levels.includes(message.level) ? message.level : "info";
			const normalizedMessage = {
				date: /* @__PURE__ */ new Date(),
				logId: this.logId,
				...message,
				level,
				variables: {
					...this.variables,
					...message.variables
				}
			};
			for (const [transName, transFn] of this.transportEntries(transports)) {
				if (typeof transFn !== "function" || transFn.level === false) continue;
				if (!this.compareLevels(transFn.level, message.level)) continue;
				try {
					const transformedMsg = this.hooks.reduce((msg, hook) => {
						return msg ? hook(msg, transFn, transName) : msg;
					}, normalizedMessage);
					if (transformedMsg) transFn({
						...transformedMsg,
						data: [...transformedMsg.data]
					});
				} catch (e) {
					this.processInternalErrorFn(e);
				}
			}
		}
		processInternalErrorFn(_e) {}
		transportEntries(transports = this.transports) {
			return (Array.isArray(transports) ? transports : Object.entries(transports)).map((item) => {
				switch (typeof item) {
					case "string": return this.transports[item] ? [item, this.transports[item]] : null;
					case "function": return [item.name, item];
					default: return Array.isArray(item) ? item : null;
				}
			}).filter(Boolean);
		}
	};
}));
//#endregion
//#region node_modules/electron-log/src/renderer/lib/RendererErrorHandler.js
var require_RendererErrorHandler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var consoleError = console.error;
	var RendererErrorHandler = class {
		logFn = null;
		onError = null;
		showDialog = false;
		preventDefault = true;
		constructor({ logFn = null } = {}) {
			this.handleError = this.handleError.bind(this);
			this.handleRejection = this.handleRejection.bind(this);
			this.startCatching = this.startCatching.bind(this);
			this.logFn = logFn;
		}
		handle(error, { logFn = this.logFn, errorName = "", onError = this.onError, showDialog = this.showDialog } = {}) {
			try {
				if (onError?.({
					error,
					errorName,
					processType: "renderer"
				}) !== false) logFn({
					error,
					errorName,
					showDialog
				});
			} catch {
				consoleError(error);
			}
		}
		setOptions({ logFn, onError, preventDefault, showDialog }) {
			if (typeof logFn === "function") this.logFn = logFn;
			if (typeof onError === "function") this.onError = onError;
			if (typeof preventDefault === "boolean") this.preventDefault = preventDefault;
			if (typeof showDialog === "boolean") this.showDialog = showDialog;
		}
		startCatching({ onError, showDialog } = {}) {
			if (this.isActive) return;
			this.isActive = true;
			this.setOptions({
				onError,
				showDialog
			});
			window.addEventListener("error", (event) => {
				this.preventDefault && event.preventDefault?.();
				this.handleError(event.error || event);
			});
			window.addEventListener("unhandledrejection", (event) => {
				this.preventDefault && event.preventDefault?.();
				this.handleRejection(event.reason || event);
			});
		}
		handleError(error) {
			this.handle(error, { errorName: "Unhandled" });
		}
		handleRejection(reason) {
			const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
			this.handle(error, { errorName: "Unhandled rejection" });
		}
	};
	module.exports = RendererErrorHandler;
}));
//#endregion
//#region node_modules/electron-log/src/core/transforms/transform.js
var require_transform = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = { transform };
	function transform({ logger, message, transport, initialData = message?.data || [], transforms = transport?.transforms }) {
		return transforms.reduce((data, trans) => {
			if (typeof trans === "function") return trans({
				data,
				logger,
				message,
				transport
			});
			return data;
		}, initialData);
	}
}));
//#endregion
//#region node_modules/electron-log/src/renderer/lib/transports/console.js
var require_console$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { transform } = require_transform();
	module.exports = consoleTransportRendererFactory;
	var consoleMethods = {
		error: console.error,
		warn: console.warn,
		info: console.info,
		verbose: console.info,
		debug: console.debug,
		silly: console.debug,
		log: console.log
	};
	function consoleTransportRendererFactory(logger) {
		return Object.assign(transport, {
			format: "{h}:{i}:{s}.{ms}{scope} › {text}",
			transforms: [formatDataFn],
			writeFn({ message: { level, data } }) {
				const consoleLogFn = consoleMethods[level] || consoleMethods.info;
				setTimeout(() => consoleLogFn(...data));
			}
		});
		function transport(message) {
			transport.writeFn({ message: {
				...message,
				data: transform({
					logger,
					message,
					transport
				})
			} });
		}
	}
	function formatDataFn({ data = [], logger = {}, message = {}, transport = {} }) {
		if (typeof transport.format === "function") return transport.format({
			data,
			level: message?.level || "info",
			logger,
			message,
			transport
		});
		if (typeof transport.format !== "string") return data;
		data.unshift(transport.format);
		if (typeof data[1] === "string" && data[1].match(/%[1cdfiOos]/)) data = [`${data[0]}${data[1]}`, ...data.slice(2)];
		const date = message.date || /* @__PURE__ */ new Date();
		data[0] = data[0].replace(/\{(\w+)}/g, (substring, name) => {
			switch (name) {
				case "level": return message.level;
				case "logId": return message.logId;
				case "scope": {
					const scope = message.scope || logger.scope?.defaultLabel;
					return scope ? ` (${scope})` : "";
				}
				case "text": return "";
				case "y": return date.getFullYear().toString(10);
				case "m": return (date.getMonth() + 1).toString(10).padStart(2, "0");
				case "d": return date.getDate().toString(10).padStart(2, "0");
				case "h": return date.getHours().toString(10).padStart(2, "0");
				case "i": return date.getMinutes().toString(10).padStart(2, "0");
				case "s": return date.getSeconds().toString(10).padStart(2, "0");
				case "ms": return date.getMilliseconds().toString(10).padStart(3, "0");
				case "iso": return date.toISOString();
				default: return message.variables?.[name] || substring;
			}
		}).trim();
		return data;
	}
}));
//#endregion
//#region node_modules/electron-log/src/renderer/lib/transports/ipc.js
var require_ipc$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { transform } = require_transform();
	module.exports = ipcTransportRendererFactory;
	var RESTRICTED_TYPES = /* @__PURE__ */ new Set([
		Promise,
		WeakMap,
		WeakSet
	]);
	function ipcTransportRendererFactory(logger) {
		return Object.assign(transport, {
			depth: 5,
			transforms: [serializeFn]
		});
		function transport(message) {
			if (!window.__electronLog) {
				logger.processMessage({
					data: ["electron-log: logger isn't initialized in the main process"],
					level: "error"
				}, { transports: ["console"] });
				return;
			}
			try {
				const serialized = transform({
					initialData: message,
					logger,
					message,
					transport
				});
				__electronLog.sendToMain(serialized);
			} catch (e) {
				logger.transports.console({
					data: [
						"electronLog.transports.ipc",
						e,
						"data:",
						message.data
					],
					level: "error"
				});
			}
		}
	}
	/**
	* Is type primitive, including null and undefined
	* @param {any} value
	* @returns {boolean}
	*/
	function isPrimitive(value) {
		return Object(value) !== value;
	}
	function serializeFn({ data, depth, seen = /* @__PURE__ */ new WeakSet(), transport = {} } = {}) {
		const actualDepth = depth || transport.depth || 5;
		if (seen.has(data)) return "[Circular]";
		if (actualDepth < 1) {
			if (isPrimitive(data)) return data;
			if (Array.isArray(data)) return "[Array]";
			return `[${typeof data}]`;
		}
		if (["function", "symbol"].includes(typeof data)) return data.toString();
		if (isPrimitive(data)) return data;
		if (RESTRICTED_TYPES.has(data.constructor)) return `[${data.constructor.name}]`;
		if (Array.isArray(data)) return data.map((item) => serializeFn({
			data: item,
			depth: actualDepth - 1,
			seen
		}));
		if (data instanceof Date) return data.toISOString();
		if (data instanceof Error) return data.stack;
		if (data instanceof Map) return new Map(Array.from(data).map(([key, value]) => [serializeFn({
			data: key,
			depth: actualDepth - 1,
			seen
		}), serializeFn({
			data: value,
			depth: actualDepth - 1,
			seen
		})]));
		if (data instanceof Set) return new Set(Array.from(data).map((val) => serializeFn({
			data: val,
			depth: actualDepth - 1,
			seen
		})));
		seen.add(data);
		return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, serializeFn({
			data: value,
			depth: actualDepth - 1,
			seen
		})]));
	}
}));
//#endregion
//#region node_modules/electron-log/src/renderer/index.js
var require_renderer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Logger = require_Logger();
	var RendererErrorHandler = require_RendererErrorHandler();
	var transportConsole = require_console$1();
	var transportIpc = require_ipc$1();
	if (typeof process === "object" && process.type === "browser") console.warn("electron-log/renderer is loaded in the main process. It could cause unexpected behaviour.");
	module.exports = createLogger();
	module.exports.Logger = Logger;
	module.exports.default = module.exports;
	function createLogger() {
		const logger = new Logger({
			allowUnknownLevel: true,
			errorHandler: new RendererErrorHandler(),
			initializeFn: () => {},
			logId: "default",
			transportFactories: {
				console: transportConsole,
				ipc: transportIpc
			},
			variables: { processType: "renderer" }
		});
		logger.errorHandler.setOptions({ logFn({ error, errorName, showDialog }) {
			logger.transports.console({
				data: [errorName, error].filter(Boolean),
				level: "error"
			});
			logger.transports.ipc({
				cmd: "errorHandler",
				error: {
					cause: error?.cause,
					code: error?.code,
					name: error?.name,
					message: error?.message,
					stack: error?.stack
				},
				errorName,
				logId: logger.logId,
				showDialog
			});
		} });
		if (typeof window === "object") window.addEventListener("message", (event) => {
			const { cmd, logId, ...message } = event.data || {};
			const instance = Logger.getInstance({ logId });
			if (cmd === "message") instance.processMessage(message, { transports: ["console"] });
		});
		return new Proxy(logger, { get(target, prop) {
			if (typeof target[prop] !== "undefined") return target[prop];
			return (...data) => logger.logData(data, { level: prop });
		} });
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/packageJson.js
var require_packageJson = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$4 = require("fs");
	var path$6 = require("path");
	module.exports = {
		findAndReadPackageJson,
		tryReadJsonAt
	};
	/**
	* @return {{ name?: string, version?: string}}
	*/
	function findAndReadPackageJson() {
		return tryReadJsonAt(getMainModulePath()) || tryReadJsonAt(extractPathFromArgs()) || tryReadJsonAt(process.resourcesPath, "app.asar") || tryReadJsonAt(process.resourcesPath, "app") || tryReadJsonAt(process.cwd()) || {
			name: void 0,
			version: void 0
		};
	}
	/**
	* @param {...string} searchPaths
	* @return {{ name?: string, version?: string } | undefined}
	*/
	function tryReadJsonAt(...searchPaths) {
		if (!searchPaths[0]) return;
		try {
			const fileName = findUp("package.json", path$6.join(...searchPaths));
			if (!fileName) return;
			const json = JSON.parse(fs$4.readFileSync(fileName, "utf8"));
			const name = json?.productName || json?.name;
			if (!name || name.toLowerCase() === "electron") return;
			if (name) return {
				name,
				version: json?.version
			};
			return;
		} catch (e) {
			return;
		}
	}
	/**
	* @param {string} fileName
	* @param {string} [cwd]
	* @return {string | null}
	*/
	function findUp(fileName, cwd) {
		let currentPath = cwd;
		while (true) {
			const parsedPath = path$6.parse(currentPath);
			const root = parsedPath.root;
			const dir = parsedPath.dir;
			if (fs$4.existsSync(path$6.join(currentPath, fileName))) return path$6.resolve(path$6.join(currentPath, fileName));
			if (currentPath === root) return null;
			currentPath = dir;
		}
	}
	/**
	* Get app path from --user-data-dir cmd arg, passed to a renderer process
	* @return {string|null}
	*/
	function extractPathFromArgs() {
		const matchedArgs = process.argv.filter((arg) => {
			return arg.indexOf("--user-data-dir=") === 0;
		});
		if (matchedArgs.length === 0 || typeof matchedArgs[0] !== "string") return null;
		return matchedArgs[0].replace("--user-data-dir=", "");
	}
	function getMainModulePath() {
		try {
			return require.main?.filename;
		} catch {
			return;
		}
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/NodeExternalApi.js
var require_NodeExternalApi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var childProcess = require("child_process");
	var os$3 = require("os");
	var path$5 = require("path");
	var packageJson = require_packageJson();
	var NodeExternalApi = class {
		appName = void 0;
		appPackageJson = void 0;
		platform = process.platform;
		getAppLogPath(appName = this.getAppName()) {
			if (this.platform === "darwin") return path$5.join(this.getSystemPathHome(), "Library/Logs", appName);
			return path$5.join(this.getAppUserDataPath(appName), "logs");
		}
		getAppName() {
			const appName = this.appName || this.getAppPackageJson()?.name;
			if (!appName) throw new Error("electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()");
			return appName;
		}
		/**
		* @private
		* @returns {undefined}
		*/
		getAppPackageJson() {
			if (typeof this.appPackageJson !== "object") this.appPackageJson = packageJson.findAndReadPackageJson();
			return this.appPackageJson;
		}
		getAppUserDataPath(appName = this.getAppName()) {
			return appName ? path$5.join(this.getSystemPathAppData(), appName) : void 0;
		}
		getAppVersion() {
			return this.getAppPackageJson()?.version;
		}
		getElectronLogPath() {
			return this.getAppLogPath();
		}
		getMacOsVersion() {
			const release = Number(os$3.release().split(".")[0]);
			if (release <= 19) return `10.${release - 4}`;
			return release - 9;
		}
		/**
		* @protected
		* @returns {string}
		*/
		getOsVersion() {
			let osName = os$3.type().replace("_", " ");
			let osVersion = os$3.release();
			if (osName === "Darwin") {
				osName = "macOS";
				osVersion = this.getMacOsVersion();
			}
			return `${osName} ${osVersion}`;
		}
		/**
		* @return {PathVariables}
		*/
		getPathVariables() {
			const appName = this.getAppName();
			const appVersion = this.getAppVersion();
			const self = this;
			return {
				appData: this.getSystemPathAppData(),
				appName,
				appVersion,
				get electronDefaultDir() {
					return self.getElectronLogPath();
				},
				home: this.getSystemPathHome(),
				libraryDefaultDir: this.getAppLogPath(appName),
				libraryTemplate: this.getAppLogPath("{appName}"),
				temp: this.getSystemPathTemp(),
				userData: this.getAppUserDataPath(appName)
			};
		}
		getSystemPathAppData() {
			const home = this.getSystemPathHome();
			switch (this.platform) {
				case "darwin": return path$5.join(home, "Library/Application Support");
				case "win32": return process.env.APPDATA || path$5.join(home, "AppData/Roaming");
				default: return process.env.XDG_CONFIG_HOME || path$5.join(home, ".config");
			}
		}
		getSystemPathHome() {
			return os$3.homedir?.() || process.env.HOME;
		}
		getSystemPathTemp() {
			return os$3.tmpdir();
		}
		getVersions() {
			return {
				app: `${this.getAppName()} ${this.getAppVersion()}`,
				electron: void 0,
				os: this.getOsVersion()
			};
		}
		isDev() {
			return process.env.NODE_ENV === "development" || process.env.ELECTRON_IS_DEV === "1";
		}
		isElectron() {
			return Boolean(process.versions.electron);
		}
		onAppEvent(_eventName, _handler) {}
		onAppReady(handler) {
			handler();
		}
		onEveryWebContentsEvent(eventName, handler) {}
		/**
		* Listen to async messages sent from opposite process
		* @param {string} channel
		* @param {function} listener
		*/
		onIpc(channel, listener) {}
		onIpcInvoke(channel, listener) {}
		/**
		* @param {string} url
		* @param {Function} [logFunction]
		*/
		openUrl(url, logFunction = console.error) {
			const start = {
				darwin: "open",
				win32: "start",
				linux: "xdg-open"
			}[process.platform] || "xdg-open";
			childProcess.exec(`${start} ${url}`, {}, (err) => {
				if (err) logFunction(err);
			});
		}
		setAppName(appName) {
			this.appName = appName;
		}
		setPlatform(platform) {
			this.platform = platform;
		}
		setPreloadFileForSessions({ filePath, includeFutureSession = true, getSessions = () => [] }) {}
		/**
		* Sent a message to opposite process
		* @param {string} channel
		* @param {any} message
		*/
		sendIpc(channel, message) {}
		showErrorBox(title, message) {}
	};
	module.exports = NodeExternalApi;
}));
//#endregion
//#region node_modules/electron-log/src/main/ElectronExternalApi.js
var require_ElectronExternalApi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$4 = require("path");
	var NodeExternalApi = require_NodeExternalApi();
	var ElectronExternalApi = class extends NodeExternalApi {
		/**
		* @type {typeof Electron}
		*/
		electron = void 0;
		/**
		* @param {object} options
		* @param {typeof Electron} [options.electron]
		*/
		constructor({ electron } = {}) {
			super();
			this.electron = electron;
		}
		getAppName() {
			let appName;
			try {
				appName = this.appName || this.electron.app?.name || this.electron.app?.getName();
			} catch {}
			return appName || super.getAppName();
		}
		getAppUserDataPath(appName) {
			return this.getPath("userData") || super.getAppUserDataPath(appName);
		}
		getAppVersion() {
			let appVersion;
			try {
				appVersion = this.electron.app?.getVersion();
			} catch {}
			return appVersion || super.getAppVersion();
		}
		getElectronLogPath() {
			return this.getPath("logs") || super.getElectronLogPath();
		}
		/**
		* @private
		* @param {any} name
		* @returns {string|undefined}
		*/
		getPath(name) {
			try {
				return this.electron.app?.getPath(name);
			} catch {
				return;
			}
		}
		getVersions() {
			return {
				app: `${this.getAppName()} ${this.getAppVersion()}`,
				electron: `Electron ${process.versions.electron}`,
				os: this.getOsVersion()
			};
		}
		getSystemPathAppData() {
			return this.getPath("appData") || super.getSystemPathAppData();
		}
		isDev() {
			if (this.electron.app?.isPackaged !== void 0) return !this.electron.app.isPackaged;
			if (typeof process.execPath === "string") return path$4.basename(process.execPath).toLowerCase().startsWith("electron");
			return super.isDev();
		}
		onAppEvent(eventName, handler) {
			this.electron.app?.on(eventName, handler);
			return () => {
				this.electron.app?.off(eventName, handler);
			};
		}
		onAppReady(handler) {
			if (this.electron.app?.isReady()) handler();
			else if (this.electron.app?.once) this.electron.app?.once("ready", handler);
			else handler();
		}
		onEveryWebContentsEvent(eventName, handler) {
			this.electron.webContents?.getAllWebContents()?.forEach((webContents) => {
				webContents.on(eventName, handler);
			});
			this.electron.app?.on("web-contents-created", onWebContentsCreated);
			return () => {
				this.electron.webContents?.getAllWebContents().forEach((webContents) => {
					webContents.off(eventName, handler);
				});
				this.electron.app?.off("web-contents-created", onWebContentsCreated);
			};
			function onWebContentsCreated(_, webContents) {
				webContents.on(eventName, handler);
			}
		}
		/**
		* Listen to async messages sent from opposite process
		* @param {string} channel
		* @param {function} listener
		*/
		onIpc(channel, listener) {
			this.electron.ipcMain?.on(channel, listener);
		}
		onIpcInvoke(channel, listener) {
			this.electron.ipcMain?.handle?.(channel, listener);
		}
		/**
		* @param {string} url
		* @param {Function} [logFunction]
		*/
		openUrl(url, logFunction = console.error) {
			this.electron.shell?.openExternal(url).catch(logFunction);
		}
		setPreloadFileForSessions({ filePath, includeFutureSession = true, getSessions = () => [this.electron.session?.defaultSession] }) {
			for (const session of getSessions().filter(Boolean)) setPreload(session);
			if (includeFutureSession) this.onAppEvent("session-created", (session) => {
				setPreload(session);
			});
			/**
			* @param {Session} session
			*/
			function setPreload(session) {
				if (typeof session.registerPreloadScript === "function") session.registerPreloadScript({
					filePath,
					id: "electron-log-preload",
					type: "frame"
				});
				else session.setPreloads([...session.getPreloads(), filePath]);
			}
		}
		/**
		* Sent a message to opposite process
		* @param {string} channel
		* @param {any} message
		*/
		sendIpc(channel, message) {
			this.electron.BrowserWindow?.getAllWindows()?.forEach((wnd) => {
				if (wnd.webContents?.isDestroyed() === false && wnd.webContents?.isCrashed() === false) wnd.webContents.send(channel, message);
			});
		}
		showErrorBox(title, message) {
			this.electron.dialog?.showErrorBox(title, message);
		}
	};
	module.exports = ElectronExternalApi;
}));
//#endregion
//#region node_modules/electron-log/src/main/initialize.js
var require_initialize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$3 = require("fs");
	var os$2 = require("os");
	var path$3 = require("path");
	var preloadInitializeFn = require_electron_log_preload();
	var preloadInitialized = false;
	var spyConsoleInitialized = false;
	module.exports = { initialize({ externalApi, getSessions, includeFutureSession, logger, preload = true, spyRendererConsole = false }) {
		externalApi.onAppReady(() => {
			try {
				if (preload) initializePreload({
					externalApi,
					getSessions,
					includeFutureSession,
					logger,
					preloadOption: preload
				});
				if (spyRendererConsole) initializeSpyRendererConsole({
					externalApi,
					logger
				});
			} catch (err) {
				logger.warn(err);
			}
		});
	} };
	function initializePreload({ externalApi, getSessions, includeFutureSession, logger, preloadOption }) {
		let preloadPath = typeof preloadOption === "string" ? preloadOption : void 0;
		if (preloadInitialized) {
			logger.warn((/* @__PURE__ */ new Error("log.initialize({ preload }) already called")).stack);
			return;
		}
		preloadInitialized = true;
		try {
			preloadPath = path$3.resolve(__dirname, "../renderer/electron-log-preload.js");
		} catch {}
		if (!preloadPath || !fs$3.existsSync(preloadPath)) {
			preloadPath = path$3.join(externalApi.getAppUserDataPath() || os$2.tmpdir(), "electron-log-preload.js");
			const preloadCode = `
      try {
        (${preloadInitializeFn.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
			fs$3.writeFileSync(preloadPath, preloadCode, "utf8");
		}
		externalApi.setPreloadFileForSessions({
			filePath: preloadPath,
			includeFutureSession,
			getSessions
		});
	}
	function initializeSpyRendererConsole({ externalApi, logger }) {
		if (spyConsoleInitialized) {
			logger.warn((/* @__PURE__ */ new Error("log.initialize({ spyRendererConsole }) already called")).stack);
			return;
		}
		spyConsoleInitialized = true;
		const levels = [
			"debug",
			"info",
			"warn",
			"error"
		];
		externalApi.onEveryWebContentsEvent("console-message", (event, level, message) => {
			logger.processMessage({
				data: [message],
				level: levels[level],
				variables: { processType: "renderer" }
			});
		});
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/ErrorHandler.js
var require_ErrorHandler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ErrorHandler = class {
		externalApi = void 0;
		isActive = false;
		logFn = void 0;
		onError = void 0;
		showDialog = true;
		constructor({ externalApi, logFn = void 0, onError = void 0, showDialog = void 0 } = {}) {
			this.createIssue = this.createIssue.bind(this);
			this.handleError = this.handleError.bind(this);
			this.handleRejection = this.handleRejection.bind(this);
			this.setOptions({
				externalApi,
				logFn,
				onError,
				showDialog
			});
			this.startCatching = this.startCatching.bind(this);
			this.stopCatching = this.stopCatching.bind(this);
		}
		handle(error, { logFn = this.logFn, onError = this.onError, processType = "browser", showDialog = this.showDialog, errorName = "" } = {}) {
			error = normalizeError(error);
			try {
				if (typeof onError === "function") {
					const versions = this.externalApi?.getVersions() || {};
					const createIssue = this.createIssue;
					if (onError({
						createIssue,
						error,
						errorName,
						processType,
						versions
					}) === false) return;
				}
				errorName ? logFn(errorName, error) : logFn(error);
				if (showDialog && !errorName.includes("rejection") && this.externalApi) this.externalApi.showErrorBox(`A JavaScript error occurred in the ${processType} process`, error.stack);
			} catch {
				console.error(error);
			}
		}
		setOptions({ externalApi, logFn, onError, showDialog }) {
			if (typeof externalApi === "object") this.externalApi = externalApi;
			if (typeof logFn === "function") this.logFn = logFn;
			if (typeof onError === "function") this.onError = onError;
			if (typeof showDialog === "boolean") this.showDialog = showDialog;
		}
		startCatching({ onError, showDialog } = {}) {
			if (this.isActive) return;
			this.isActive = true;
			this.setOptions({
				onError,
				showDialog
			});
			process.on("uncaughtException", this.handleError);
			process.on("unhandledRejection", this.handleRejection);
		}
		stopCatching() {
			this.isActive = false;
			process.removeListener("uncaughtException", this.handleError);
			process.removeListener("unhandledRejection", this.handleRejection);
		}
		createIssue(pageUrl, queryParams) {
			this.externalApi?.openUrl(`${pageUrl}?${new URLSearchParams(queryParams).toString()}`);
		}
		handleError(error) {
			this.handle(error, { errorName: "Unhandled" });
		}
		handleRejection(reason) {
			const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
			this.handle(error, { errorName: "Unhandled rejection" });
		}
	};
	function normalizeError(e) {
		if (e instanceof Error) return e;
		if (e && typeof e === "object") {
			if (e.message) return Object.assign(new Error(e.message), e);
			try {
				return new Error(JSON.stringify(e));
			} catch (serErr) {
				return /* @__PURE__ */ new Error(`Couldn't normalize error ${String(e)}: ${serErr}`);
			}
		}
		return /* @__PURE__ */ new Error(`Can't normalize error ${String(e)}`);
	}
	module.exports = ErrorHandler;
}));
//#endregion
//#region node_modules/electron-log/src/node/EventLogger.js
var require_EventLogger = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventLogger = class {
		disposers = [];
		format = "{eventSource}#{eventName}:";
		formatters = {
			app: {
				"certificate-error": ({ args }) => {
					return this.arrayToObject(args.slice(1, 4), [
						"url",
						"error",
						"certificate"
					]);
				},
				"child-process-gone": ({ args }) => {
					return args.length === 1 ? args[0] : args;
				},
				"render-process-gone": ({ args: [webContents, details] }) => {
					return details && typeof details === "object" ? {
						...details,
						...this.getWebContentsDetails(webContents)
					} : [];
				}
			},
			webContents: {
				"console-message": ({ args: [level, message, line, sourceId] }) => {
					if (level < 3) return;
					return {
						message,
						source: `${sourceId}:${line}`
					};
				},
				"did-fail-load": ({ args }) => {
					return this.arrayToObject(args, [
						"errorCode",
						"errorDescription",
						"validatedURL",
						"isMainFrame",
						"frameProcessId",
						"frameRoutingId"
					]);
				},
				"did-fail-provisional-load": ({ args }) => {
					return this.arrayToObject(args, [
						"errorCode",
						"errorDescription",
						"validatedURL",
						"isMainFrame",
						"frameProcessId",
						"frameRoutingId"
					]);
				},
				"plugin-crashed": ({ args }) => {
					return this.arrayToObject(args, ["name", "version"]);
				},
				"preload-error": ({ args }) => {
					return this.arrayToObject(args, ["preloadPath", "error"]);
				}
			}
		};
		events = {
			app: {
				"certificate-error": true,
				"child-process-gone": true,
				"render-process-gone": true
			},
			webContents: {
				"did-fail-load": true,
				"did-fail-provisional-load": true,
				"plugin-crashed": true,
				"preload-error": true,
				"unresponsive": true
			}
		};
		externalApi = void 0;
		level = "error";
		scope = "";
		constructor(options = {}) {
			this.setOptions(options);
		}
		setOptions({ events, externalApi, level, logger, format, formatters, scope }) {
			if (typeof events === "object") this.events = events;
			if (typeof externalApi === "object") this.externalApi = externalApi;
			if (typeof level === "string") this.level = level;
			if (typeof logger === "object") this.logger = logger;
			if (typeof format === "string" || typeof format === "function") this.format = format;
			if (typeof formatters === "object") this.formatters = formatters;
			if (typeof scope === "string") this.scope = scope;
		}
		startLogging(options = {}) {
			this.setOptions(options);
			this.disposeListeners();
			for (const eventName of this.getEventNames(this.events.app)) this.disposers.push(this.externalApi.onAppEvent(eventName, (...handlerArgs) => {
				this.handleEvent({
					eventSource: "app",
					eventName,
					handlerArgs
				});
			}));
			for (const eventName of this.getEventNames(this.events.webContents)) this.disposers.push(this.externalApi.onEveryWebContentsEvent(eventName, (...handlerArgs) => {
				this.handleEvent({
					eventSource: "webContents",
					eventName,
					handlerArgs
				});
			}));
		}
		stopLogging() {
			this.disposeListeners();
		}
		arrayToObject(array, fieldNames) {
			const obj = {};
			fieldNames.forEach((fieldName, index) => {
				obj[fieldName] = array[index];
			});
			if (array.length > fieldNames.length) obj.unknownArgs = array.slice(fieldNames.length);
			return obj;
		}
		disposeListeners() {
			this.disposers.forEach((disposer) => disposer());
			this.disposers = [];
		}
		formatEventLog({ eventName, eventSource, handlerArgs }) {
			const [event, ...args] = handlerArgs;
			if (typeof this.format === "function") return this.format({
				args,
				event,
				eventName,
				eventSource
			});
			const formatter = this.formatters[eventSource]?.[eventName];
			let formattedArgs = args;
			if (typeof formatter === "function") formattedArgs = formatter({
				args,
				event,
				eventName,
				eventSource
			});
			if (!formattedArgs) return;
			const eventData = {};
			if (Array.isArray(formattedArgs)) eventData.args = formattedArgs;
			else if (typeof formattedArgs === "object") Object.assign(eventData, formattedArgs);
			if (eventSource === "webContents") Object.assign(eventData, this.getWebContentsDetails(event?.sender));
			return [this.format.replace("{eventSource}", eventSource === "app" ? "App" : "WebContents").replace("{eventName}", eventName), eventData];
		}
		getEventNames(eventMap) {
			if (!eventMap || typeof eventMap !== "object") return [];
			return Object.entries(eventMap).filter(([_, listen]) => listen).map(([eventName]) => eventName);
		}
		getWebContentsDetails(webContents) {
			if (!webContents?.loadURL) return {};
			try {
				return { webContents: {
					id: webContents.id,
					url: webContents.getURL()
				} };
			} catch {
				return {};
			}
		}
		handleEvent({ eventName, eventSource, handlerArgs }) {
			const log = this.formatEventLog({
				eventName,
				eventSource,
				handlerArgs
			});
			if (log) (this.scope ? this.logger.scope(this.scope) : this.logger)?.[this.level]?.(...log);
		}
	};
	module.exports = EventLogger;
}));
//#endregion
//#region node_modules/electron-log/src/core/transforms/format.js
var require_format = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { transform } = require_transform();
	module.exports = {
		concatFirstStringElements,
		formatScope,
		formatText,
		formatVariables,
		timeZoneFromOffset,
		format({ message, logger, transport, data = message?.data }) {
			switch (typeof transport.format) {
				case "string": return transform({
					message,
					logger,
					transforms: [
						formatVariables,
						formatScope,
						formatText
					],
					transport,
					initialData: [transport.format, ...data]
				});
				case "function": return transport.format({
					data,
					level: message?.level || "info",
					logger,
					message,
					transport
				});
				default: return data;
			}
		}
	};
	/**
	* The first argument of console.log may contain a template. In the library
	* the first element is a string related to transports.console.format. So
	* this function concatenates first two elements to make templates like %d
	* work
	* @param {*[]} data
	* @return {*[]}
	*/
	function concatFirstStringElements({ data }) {
		if (typeof data[0] !== "string" || typeof data[1] !== "string") return data;
		if (data[0].match(/%[1cdfiOos]/)) return data;
		return [`${data[0]} ${data[1]}`, ...data.slice(2)];
	}
	function timeZoneFromOffset(minutesOffset) {
		const minutesPositive = Math.abs(minutesOffset);
		return `${minutesOffset > 0 ? "-" : "+"}${Math.floor(minutesPositive / 60).toString().padStart(2, "0")}:${(minutesPositive % 60).toString().padStart(2, "0")}`;
	}
	function formatScope({ data, logger, message }) {
		const { defaultLabel, labelLength } = logger?.scope || {};
		const template = data[0];
		let label = message.scope;
		if (!label) label = defaultLabel;
		let scopeText;
		if (label === "") scopeText = labelLength > 0 ? "".padEnd(labelLength + 3) : "";
		else if (typeof label === "string") scopeText = ` (${label})`.padEnd(labelLength + 3);
		else scopeText = "";
		data[0] = template.replace("{scope}", scopeText);
		return data;
	}
	function formatVariables({ data, message }) {
		let template = data[0];
		if (typeof template !== "string") return data;
		template = template.replace("{level}]", `${message.level}]`.padEnd(6, " "));
		const date = message.date || /* @__PURE__ */ new Date();
		data[0] = template.replace(/\{(\w+)}/g, (substring, name) => {
			switch (name) {
				case "level": return message.level || "info";
				case "logId": return message.logId;
				case "y": return date.getFullYear().toString(10);
				case "m": return (date.getMonth() + 1).toString(10).padStart(2, "0");
				case "d": return date.getDate().toString(10).padStart(2, "0");
				case "h": return date.getHours().toString(10).padStart(2, "0");
				case "i": return date.getMinutes().toString(10).padStart(2, "0");
				case "s": return date.getSeconds().toString(10).padStart(2, "0");
				case "ms": return date.getMilliseconds().toString(10).padStart(3, "0");
				case "z": return timeZoneFromOffset(date.getTimezoneOffset());
				case "iso": return date.toISOString();
				default: return message.variables?.[name] || substring;
			}
		}).trim();
		return data;
	}
	function formatText({ data }) {
		const template = data[0];
		if (typeof template !== "string") return data;
		if (template.lastIndexOf("{text}") === template.length - 6) {
			data[0] = template.replace(/\s?{text}/, "");
			if (data[0] === "") data.shift();
			return data;
		}
		const templatePieces = template.split("{text}");
		let result = [];
		if (templatePieces[0] !== "") result.push(templatePieces[0]);
		result = result.concat(data.slice(1));
		if (templatePieces[1] !== "") result.push(templatePieces[1]);
		return result;
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/transforms/object.js
var require_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = require("util");
	module.exports = {
		serialize,
		maxDepth({ data, transport, depth = transport?.depth ?? 6 }) {
			if (!data) return data;
			if (depth < 1) {
				if (Array.isArray(data)) return "[array]";
				if (typeof data === "object" && data) return "[object]";
				return data;
			}
			if (Array.isArray(data)) return data.map((child) => module.exports.maxDepth({
				data: child,
				depth: depth - 1
			}));
			if (typeof data !== "object") return data;
			if (data && typeof data.toISOString === "function") return data;
			if (data === null) return null;
			if (data instanceof Error) return data;
			const newJson = {};
			for (const i in data) {
				if (!Object.prototype.hasOwnProperty.call(data, i)) continue;
				newJson[i] = module.exports.maxDepth({
					data: data[i],
					depth: depth - 1
				});
			}
			return newJson;
		},
		toJSON({ data }) {
			return JSON.parse(JSON.stringify(data, createSerializer()));
		},
		toString({ data, transport }) {
			const inspectOptions = transport?.inspectOptions || {};
			const simplifiedData = data.map((item) => {
				if (item === void 0) return;
				try {
					const str = JSON.stringify(item, createSerializer(), "  ");
					return str === void 0 ? void 0 : JSON.parse(str);
				} catch (e) {
					return item;
				}
			});
			return util.formatWithOptions(inspectOptions, ...simplifiedData);
		}
	};
	/**
	* @param {object} options?
	* @param {boolean} options.serializeMapAndSet?
	* @return {function}
	*/
	function createSerializer(options = {}) {
		const seen = /* @__PURE__ */ new WeakSet();
		return function(key, value) {
			if (typeof value === "object" && value !== null) {
				if (seen.has(value)) return;
				seen.add(value);
			}
			return serialize(key, value, options);
		};
	}
	/**
	* @param {string} key
	* @param {any} value
	* @param {object} options?
	* @return {any}
	*/
	function serialize(key, value, options = {}) {
		const serializeMapAndSet = options?.serializeMapAndSet !== false;
		if (value instanceof Error) return value.stack;
		if (!value) return value;
		if (typeof value === "function") return `[function] ${value.toString()}`;
		if (value instanceof Date) return value.toISOString();
		if (serializeMapAndSet && value instanceof Map && Object.fromEntries) return Object.fromEntries(value);
		if (serializeMapAndSet && value instanceof Set && Array.from) return Array.from(value);
		return value;
	}
}));
//#endregion
//#region node_modules/electron-log/src/core/transforms/style.js
var require_style = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		transformStyles,
		applyAnsiStyles({ data }) {
			return transformStyles(data, styleToAnsi, resetAnsiStyle);
		},
		removeStyles({ data }) {
			return transformStyles(data, () => "");
		}
	};
	var ANSI_COLORS = {
		unset: "\x1B[0m",
		black: "\x1B[30m",
		red: "\x1B[31m",
		green: "\x1B[32m",
		yellow: "\x1B[33m",
		blue: "\x1B[34m",
		magenta: "\x1B[35m",
		cyan: "\x1B[36m",
		white: "\x1B[37m",
		gray: "\x1B[90m"
	};
	function styleToAnsi(style) {
		return ANSI_COLORS[style.replace(/color:\s*(\w+).*/, "$1").toLowerCase()] || "";
	}
	function resetAnsiStyle(string) {
		return string + ANSI_COLORS.unset;
	}
	function transformStyles(data, onStyleFound, onStyleApplied) {
		const foundStyles = {};
		return data.reduce((result, item, index, array) => {
			if (foundStyles[index]) return result;
			if (typeof item === "string") {
				let valueIndex = index;
				let styleApplied = false;
				item = item.replace(/%[1cdfiOos]/g, (match) => {
					valueIndex += 1;
					if (match !== "%c") return match;
					const style = array[valueIndex];
					if (typeof style === "string") {
						foundStyles[valueIndex] = true;
						styleApplied = true;
						return onStyleFound(style, item);
					}
					return match;
				});
				if (styleApplied && onStyleApplied) item = onStyleApplied(item);
			}
			result.push(item);
			return result;
		}, []);
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/console.js
var require_console = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { concatFirstStringElements, format } = require_format();
	var { maxDepth, toJSON } = require_object();
	var { applyAnsiStyles, removeStyles } = require_style();
	var { transform } = require_transform();
	var consoleMethods = {
		error: console.error,
		warn: console.warn,
		info: console.info,
		verbose: console.info,
		debug: console.debug,
		silly: console.debug,
		log: console.log
	};
	module.exports = consoleTransportFactory;
	var DEFAULT_FORMAT = `%c{h}:{i}:{s}.{ms}{scope}%c ${process.platform === "win32" ? ">" : "›"} {text}`;
	Object.assign(consoleTransportFactory, { DEFAULT_FORMAT });
	function consoleTransportFactory(logger) {
		return Object.assign(transport, {
			colorMap: {
				error: "red",
				warn: "yellow",
				info: "cyan",
				verbose: "unset",
				debug: "gray",
				silly: "gray",
				default: "unset"
			},
			format: DEFAULT_FORMAT,
			level: "silly",
			transforms: [
				addTemplateColors,
				format,
				formatStyles,
				concatFirstStringElements,
				maxDepth,
				toJSON
			],
			useStyles: process.env.FORCE_STYLES,
			writeFn({ message }) {
				(consoleMethods[message.level] || consoleMethods.info)(...message.data);
			}
		});
		function transport(message) {
			const data = transform({
				logger,
				message,
				transport
			});
			transport.writeFn({ message: {
				...message,
				data
			} });
		}
	}
	function addTemplateColors({ data, message, transport }) {
		if (typeof transport.format !== "string" || !transport.format.includes("%c")) return data;
		return [
			`color:${levelToStyle(message.level, transport)}`,
			"color:unset",
			...data
		];
	}
	function canUseStyles(useStyleValue, level) {
		if (typeof useStyleValue === "boolean") return useStyleValue;
		const stream = level === "error" || level === "warn" ? process.stderr : process.stdout;
		return stream && stream.isTTY;
	}
	function formatStyles(args) {
		const { message, transport } = args;
		return (canUseStyles(transport.useStyles, message.level) ? applyAnsiStyles : removeStyles)(args);
	}
	function levelToStyle(level, transport) {
		return transport.colorMap[level] || transport.colorMap.default;
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/file/File.js
var require_File = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventEmitter$1 = require("events");
	var fs$2 = require("fs");
	var os$1 = require("os");
	var File = class extends EventEmitter$1 {
		asyncWriteQueue = [];
		bytesWritten = 0;
		hasActiveAsyncWriting = false;
		path = null;
		initialSize = void 0;
		writeOptions = null;
		writeAsync = false;
		constructor({ path, writeOptions = {
			encoding: "utf8",
			flag: "a",
			mode: 438
		}, writeAsync = false }) {
			super();
			this.path = path;
			this.writeOptions = writeOptions;
			this.writeAsync = writeAsync;
		}
		get size() {
			return this.getSize();
		}
		clear() {
			try {
				fs$2.writeFileSync(this.path, "", {
					mode: this.writeOptions.mode,
					flag: "w"
				});
				this.reset();
				return true;
			} catch (e) {
				if (e.code === "ENOENT") return true;
				this.emit("error", e, this);
				return false;
			}
		}
		crop(bytesAfter) {
			try {
				const content = readFileSyncFromEnd(this.path, bytesAfter || 4096);
				this.clear();
				this.writeLine(`[log cropped]${os$1.EOL}${content}`);
			} catch (e) {
				this.emit("error", /* @__PURE__ */ new Error(`Couldn't crop file ${this.path}. ${e.message}`), this);
			}
		}
		getSize() {
			if (this.initialSize === void 0) try {
				const stats = fs$2.statSync(this.path);
				this.initialSize = stats.size;
			} catch (e) {
				this.initialSize = 0;
			}
			return this.initialSize + this.bytesWritten;
		}
		increaseBytesWrittenCounter(text) {
			this.bytesWritten += Buffer.byteLength(text, this.writeOptions.encoding);
		}
		isNull() {
			return false;
		}
		nextAsyncWrite() {
			const file = this;
			if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0) return;
			const text = this.asyncWriteQueue.join("");
			this.asyncWriteQueue = [];
			this.hasActiveAsyncWriting = true;
			fs$2.writeFile(this.path, text, this.writeOptions, (e) => {
				file.hasActiveAsyncWriting = false;
				if (e) file.emit("error", /* @__PURE__ */ new Error(`Couldn't write to ${file.path}. ${e.message}`), this);
				else file.increaseBytesWrittenCounter(text);
				file.nextAsyncWrite();
			});
		}
		reset() {
			this.initialSize = void 0;
			this.bytesWritten = 0;
		}
		toString() {
			return this.path;
		}
		writeLine(text) {
			text += os$1.EOL;
			if (this.writeAsync) {
				this.asyncWriteQueue.push(text);
				this.nextAsyncWrite();
				return;
			}
			try {
				fs$2.writeFileSync(this.path, text, this.writeOptions);
				this.increaseBytesWrittenCounter(text);
			} catch (e) {
				this.emit("error", /* @__PURE__ */ new Error(`Couldn't write to ${this.path}. ${e.message}`), this);
			}
		}
	};
	module.exports = File;
	function readFileSyncFromEnd(filePath, bytesCount) {
		const buffer = Buffer.alloc(bytesCount);
		const stats = fs$2.statSync(filePath);
		const readLength = Math.min(stats.size, bytesCount);
		const offset = Math.max(0, stats.size - bytesCount);
		const fd = fs$2.openSync(filePath, "r");
		const totalBytes = fs$2.readSync(fd, buffer, 0, readLength, offset);
		fs$2.closeSync(fd);
		return buffer.toString("utf8", 0, totalBytes);
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/file/NullFile.js
var require_NullFile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var File = require_File();
	var NullFile = class extends File {
		clear() {}
		crop() {}
		getSize() {
			return 0;
		}
		isNull() {
			return true;
		}
		writeLine() {}
	};
	module.exports = NullFile;
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/file/FileRegistry.js
var require_FileRegistry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventEmitter = require("events");
	var fs$1 = require("fs");
	var path$2 = require("path");
	var File = require_File();
	var NullFile = require_NullFile();
	var FileRegistry = class extends EventEmitter {
		store = {};
		constructor() {
			super();
			this.emitError = this.emitError.bind(this);
		}
		/**
		* Provide a File object corresponding to the filePath
		* @param {string} filePath
		* @param {WriteOptions} [writeOptions]
		* @param {boolean} [writeAsync]
		* @return {File}
		*/
		provide({ filePath, writeOptions = {}, writeAsync = false }) {
			let file;
			try {
				filePath = path$2.resolve(filePath);
				if (this.store[filePath]) return this.store[filePath];
				file = this.createFile({
					filePath,
					writeOptions,
					writeAsync
				});
			} catch (e) {
				file = new NullFile({ path: filePath });
				this.emitError(e, file);
			}
			file.on("error", this.emitError);
			this.store[filePath] = file;
			return file;
		}
		/**
		* @param {string} filePath
		* @param {WriteOptions} writeOptions
		* @param {boolean} async
		* @return {File}
		* @private
		*/
		createFile({ filePath, writeOptions, writeAsync }) {
			this.testFileWriting({
				filePath,
				writeOptions
			});
			return new File({
				path: filePath,
				writeOptions,
				writeAsync
			});
		}
		/**
		* @param {Error} error
		* @param {File} file
		* @private
		*/
		emitError(error, file) {
			this.emit("error", error, file);
		}
		/**
		* @param {string} filePath
		* @param {WriteOptions} writeOptions
		* @private
		*/
		testFileWriting({ filePath, writeOptions }) {
			fs$1.mkdirSync(path$2.dirname(filePath), { recursive: true });
			fs$1.writeFileSync(filePath, "", {
				flag: "a",
				mode: writeOptions.mode
			});
		}
	};
	module.exports = FileRegistry;
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/file/index.js
var require_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = require("fs");
	var os = require("os");
	var path$1 = require("path");
	var FileRegistry = require_FileRegistry();
	var { transform } = require_transform();
	var { removeStyles } = require_style();
	var { format, concatFirstStringElements } = require_format();
	var { toString } = require_object();
	module.exports = fileTransportFactory;
	var globalRegistry = new FileRegistry();
	function fileTransportFactory(logger, { registry = globalRegistry, externalApi } = {}) {
		/** @type {PathVariables} */
		let pathVariables;
		if (registry.listenerCount("error") < 1) registry.on("error", (e, file) => {
			logConsole(`Can't write to ${file}`, e);
		});
		return Object.assign(transport, {
			fileName: getDefaultFileName(logger.variables.processType),
			format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
			getFile,
			inspectOptions: { depth: 5 },
			level: "silly",
			maxSize: 1024 ** 2,
			readAllLogs,
			sync: true,
			transforms: [
				removeStyles,
				format,
				concatFirstStringElements,
				toString
			],
			writeOptions: {
				flag: "a",
				mode: 438,
				encoding: "utf8"
			},
			archiveLogFn(file) {
				const oldPath = file.toString();
				const inf = path$1.parse(oldPath);
				try {
					fs.renameSync(oldPath, path$1.join(inf.dir, `${inf.name}.old${inf.ext}`));
				} catch (e) {
					logConsole("Could not rotate log", e);
					const quarterOfMaxSize = Math.round(transport.maxSize / 4);
					file.crop(Math.min(quarterOfMaxSize, 262144));
				}
			},
			resolvePathFn(vars) {
				return path$1.join(vars.libraryDefaultDir, vars.fileName);
			},
			setAppName(name) {
				logger.dependencies.externalApi.setAppName(name);
			}
		});
		function transport(message) {
			const file = getFile(message);
			if (transport.maxSize > 0 && file.size > transport.maxSize) {
				transport.archiveLogFn(file);
				file.reset();
			}
			const content = transform({
				logger,
				message,
				transport
			});
			file.writeLine(content);
		}
		function initializeOnFirstAccess() {
			if (pathVariables) return;
			pathVariables = Object.create(Object.prototype, {
				...Object.getOwnPropertyDescriptors(externalApi.getPathVariables()),
				fileName: {
					get() {
						return transport.fileName;
					},
					enumerable: true
				}
			});
			if (typeof transport.archiveLog === "function") {
				transport.archiveLogFn = transport.archiveLog;
				logConsole("archiveLog is deprecated. Use archiveLogFn instead");
			}
			if (typeof transport.resolvePath === "function") {
				transport.resolvePathFn = transport.resolvePath;
				logConsole("resolvePath is deprecated. Use resolvePathFn instead");
			}
		}
		function logConsole(message, error = null, level = "error") {
			const data = [`electron-log.transports.file: ${message}`];
			if (error) data.push(error);
			logger.transports.console({
				data,
				date: /* @__PURE__ */ new Date(),
				level
			});
		}
		function getFile(msg) {
			initializeOnFirstAccess();
			const filePath = transport.resolvePathFn(pathVariables, msg);
			return registry.provide({
				filePath,
				writeAsync: !transport.sync,
				writeOptions: transport.writeOptions
			});
		}
		function readAllLogs({ fileFilter = (f) => f.endsWith(".log") } = {}) {
			initializeOnFirstAccess();
			const logsPath = path$1.dirname(transport.resolvePathFn(pathVariables));
			if (!fs.existsSync(logsPath)) return [];
			return fs.readdirSync(logsPath).map((fileName) => path$1.join(logsPath, fileName)).filter(fileFilter).map((logPath) => {
				try {
					return {
						path: logPath,
						lines: fs.readFileSync(logPath, "utf8").split(os.EOL)
					};
				} catch {
					return null;
				}
			}).filter(Boolean);
		}
	}
	function getDefaultFileName(processType = process.type) {
		switch (processType) {
			case "renderer": return "renderer.log";
			case "worker": return "worker.log";
			default: return "main.log";
		}
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/ipc.js
var require_ipc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { maxDepth, toJSON } = require_object();
	var { transform } = require_transform();
	module.exports = ipcTransportFactory;
	/**
	* @param logger
	* @param {ElectronExternalApi} externalApi
	* @returns {transport|null}
	*/
	function ipcTransportFactory(logger, { externalApi }) {
		Object.assign(transport, {
			depth: 3,
			eventId: "__ELECTRON_LOG_IPC__",
			level: logger.isDev ? "silly" : false,
			transforms: [toJSON, maxDepth]
		});
		return externalApi?.isElectron() ? transport : void 0;
		function transport(message) {
			if (message?.variables?.processType === "renderer") return;
			externalApi?.sendIpc(transport.eventId, {
				...message,
				data: transform({
					logger,
					message,
					transport
				})
			});
		}
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/transports/remote.js
var require_remote = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var http = require("http");
	var https = require("https");
	var { transform } = require_transform();
	var { removeStyles } = require_style();
	var { toJSON, maxDepth } = require_object();
	module.exports = remoteTransportFactory;
	function remoteTransportFactory(logger) {
		return Object.assign(transport, {
			client: { name: "electron-application" },
			depth: 6,
			level: false,
			requestOptions: {},
			transforms: [
				removeStyles,
				toJSON,
				maxDepth
			],
			makeBodyFn({ message }) {
				return JSON.stringify({
					client: transport.client,
					data: message.data,
					date: message.date.getTime(),
					level: message.level,
					scope: message.scope,
					variables: message.variables
				});
			},
			processErrorFn({ error }) {
				logger.processMessage({
					data: [`electron-log: can't POST ${transport.url}`, error],
					level: "warn"
				}, { transports: ["console", "file"] });
			},
			sendRequestFn({ serverUrl, requestOptions, body }) {
				const request = (serverUrl.startsWith("https:") ? https : http).request(serverUrl, {
					method: "POST",
					...requestOptions,
					headers: {
						"Content-Type": "application/json",
						"Content-Length": body.length,
						...requestOptions.headers
					}
				});
				request.write(body);
				request.end();
				return request;
			}
		});
		function transport(message) {
			if (!transport.url) return;
			const body = transport.makeBodyFn({
				logger,
				message: {
					...message,
					data: transform({
						logger,
						message,
						transport
					})
				},
				transport
			});
			const request = transport.sendRequestFn({
				serverUrl: transport.url,
				requestOptions: transport.requestOptions,
				body: Buffer.from(body, "utf8")
			});
			request.on("error", (error) => transport.processErrorFn({
				error,
				logger,
				message,
				request,
				transport
			}));
		}
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/createDefaultLogger.js
var require_createDefaultLogger = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Logger = require_Logger();
	var ErrorHandler = require_ErrorHandler();
	var EventLogger = require_EventLogger();
	var transportConsole = require_console();
	var transportFile = require_file();
	var transportIpc = require_ipc();
	var transportRemote = require_remote();
	module.exports = createDefaultLogger;
	function createDefaultLogger({ dependencies, initializeFn }) {
		const defaultLogger = new Logger({
			dependencies,
			errorHandler: new ErrorHandler(),
			eventLogger: new EventLogger(),
			initializeFn,
			isDev: dependencies.externalApi?.isDev(),
			logId: "default",
			transportFactories: {
				console: transportConsole,
				file: transportFile,
				ipc: transportIpc,
				remote: transportRemote
			},
			variables: { processType: "main" }
		});
		defaultLogger.default = defaultLogger;
		defaultLogger.Logger = Logger;
		defaultLogger.processInternalErrorFn = (e) => {
			defaultLogger.transports.console.writeFn({ message: {
				data: ["Unhandled electron-log error", e],
				level: "error"
			} });
		};
		return defaultLogger;
	}
}));
//#endregion
//#region node_modules/electron-log/src/main/index.js
var require_main = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var electron$1 = require("electron");
	var ElectronExternalApi = require_ElectronExternalApi();
	var { initialize } = require_initialize();
	var createDefaultLogger = require_createDefaultLogger();
	var externalApi = new ElectronExternalApi({ electron: electron$1 });
	var defaultLogger = createDefaultLogger({
		dependencies: { externalApi },
		initializeFn: initialize
	});
	module.exports = defaultLogger;
	externalApi.onIpc("__ELECTRON_LOG__", (_, message) => {
		if (message.scope) defaultLogger.Logger.getInstance(message).scope(message.scope);
		const date = new Date(message.date);
		processMessage({
			...message,
			date: date.getTime() ? date : /* @__PURE__ */ new Date()
		});
	});
	externalApi.onIpcInvoke("__ELECTRON_LOG__", (_, { cmd = "", logId }) => {
		switch (cmd) {
			case "getOptions": return {
				levels: defaultLogger.Logger.getInstance({ logId }).levels,
				logId
			};
			default:
				processMessage({
					data: [`Unknown cmd '${cmd}'`],
					level: "error"
				});
				return {};
		}
	});
	function processMessage(message) {
		defaultLogger.Logger.getInstance(message)?.processMessage(message);
	}
}));
//#endregion
//#region node_modules/electron-log/src/node/index.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var NodeExternalApi = require_NodeExternalApi();
	module.exports = require_createDefaultLogger()({ dependencies: { externalApi: new NodeExternalApi() } });
}));
//#endregion
//#region node_modules/electron-log/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isRenderer = typeof process === "undefined" || process.type === "renderer" || process.type === "worker";
	var isMain = typeof process === "object" && process.type === "browser";
	if (isRenderer) {
		require_electron_log_preload();
		module.exports = require_renderer();
	} else if (isMain) module.exports = require_main();
	else module.exports = require_node();
}));
//#endregion
//#region src/main.js
var import_electron_squirrel_startup = /* @__PURE__ */ __toESM(require_electron_squirrel_startup());
var log = require_src();
log.initialize();
if (import_electron_squirrel_startup.default) electron.app.quit();
var createWindow = () => {
	const mainWindow = new electron.BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: { preload: node_path.default.join(__dirname, "preload.cjs") }
	});
	mainWindow.loadURL("http://localhost:5173");
	mainWindow.webContents.openDevTools();
};
electron.app.whenReady().then(() => {
	createWindow();
	electron.app.on("activate", () => {
		if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
	});
	log.info("Application started");
});
electron.app.on("window-all-closed", () => {
	if (process.platform !== "darwin") electron.app.quit();
});
//#endregion
