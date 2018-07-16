/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (true) {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "development" !== 'production' &&
        "development" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("development" !== 'production' &&
      "development" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(5).setImmediate))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(8);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('main-vue', __webpack_require__(16));

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */],
    el: '#app'
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(6);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(9);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
var routes = [{ path: '/login', component: __webpack_require__(10) }, { path: '/register', component: __webpack_require__(12) }, { path: '/', component: __webpack_require__(14) }];

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
      routes: routes
}));

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(151)
/* template */
var __vue_template__ = __webpack_require__(11)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\js\\views\\loginView.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e5316b3", Component.options)
  } else {
    hotAPI.reload("data-v-0e5316b3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade",
      attrs: { "uk-height-viewport": "" }
    },
    [
      _c("div", { staticClass: "uk-width-1-1" }, [
        _c("div", { staticClass: "uk-container" }, [
          _c(
            "div",
            {
              staticClass: "uk-grid-margin uk-grid uk-grid-stack",
              attrs: { "uk-grid": "" }
            },
            [
              _c("div", { staticClass: "uk-width-1-1@m" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
                  },
                  [
                    _c("h3", { staticClass: "uk-card-title uk-text-center" }, [
                      _vm._v("Welcome back!")
                    ]),
                    _vm._v(" "),
                    _c("form", { on: { submit: _vm.login } }, [
                      _c("div", { staticClass: "uk-margin" }, [
                        _c("div", { staticClass: "uk-inline uk-width-1-1" }, [
                          _c("span", {
                            staticClass: "uk-form-icon",
                            attrs: { "uk-icon": "icon: mail" }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.email,
                                expression: "email"
                              }
                            ],
                            staticClass: "uk-input uk-form-large",
                            attrs: {
                              name: "email",
                              placeholder: "Email",
                              type: "text"
                            },
                            domProps: { value: _vm.email },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.email = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "uk-margin" }, [
                        _c("div", { staticClass: "uk-inline uk-width-1-1" }, [
                          _c("span", {
                            staticClass: "uk-form-icon",
                            attrs: { "uk-icon": "icon: lock" }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password,
                                expression: "password"
                              }
                            ],
                            staticClass: "uk-input uk-form-large",
                            attrs: {
                              name: "password",
                              placeholder: "Password",
                              type: "password"
                            },
                            domProps: { value: _vm.password },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.password = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "uk-margin" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "uk-button uk-button-primary uk-button-large uk-width-1-1",
                            on: { click: _vm.login }
                          },
                          [_vm._v("Login")]
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "uk-text-small uk-text-center" },
                        [
                          _vm._v("\n\t\t\t\t\t\t\t\tNot registered? "),
                          _c("router-link", { attrs: { to: "/register" } }, [
                            _vm._v("Create an account")
                          ])
                        ],
                        1
                      )
                    ])
                  ]
                )
              ])
            ]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0e5316b3", module.exports)
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(150)
/* template */
var __vue_template__ = __webpack_require__(13)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\js\\views\\registerView.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-84c7d41a", Component.options)
  } else {
    hotAPI.reload("data-v-84c7d41a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade",
      attrs: { "uk-height-viewport": "" }
    },
    [
      _c("div", { staticClass: "uk-width-1-1" }, [
        _c("div", { staticClass: "uk-container" }, [
          _c(
            "div",
            {
              staticClass: "uk-grid-margin uk-grid uk-grid-stack",
              attrs: { "uk-grid": "" }
            },
            [
              _c("div", { staticClass: "uk-width-1-1@m" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
                  },
                  [
                    _c("h3", { staticClass: "uk-card-title uk-text-center" }, [
                      _vm._v("Create an Account Now!")
                    ]),
                    _vm._v(" "),
                    _c("form", { on: { submit: _vm.signup } }, [
                      _c("div", { staticClass: "uk-margin" }, [
                        _c("div", { staticClass: "uk-inline uk-width-1-1" }, [
                          _c("span", {
                            staticClass: "uk-form-icon",
                            attrs: { "uk-icon": "icon: user" }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.nama_panggilan,
                                expression: "nama_panggilan"
                              }
                            ],
                            staticClass: "uk-input uk-form-large",
                            attrs: {
                              name: "name",
                              placeholder: "Nama Panggilan",
                              type: "text"
                            },
                            domProps: { value: _vm.nama_panggilan },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.nama_panggilan = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "uk-margin" }, [
                        _c("div", { staticClass: "uk-inline uk-width-1-1" }, [
                          _c("span", {
                            staticClass: "uk-form-icon",
                            attrs: { "uk-icon": "icon: mail" }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.email,
                                expression: "email"
                              }
                            ],
                            staticClass: "uk-input uk-form-large",
                            attrs: {
                              name: "email",
                              placeholder: "Email",
                              type: "text"
                            },
                            domProps: { value: _vm.email },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.email = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "uk-margin" }, [
                        _c("div", { staticClass: "uk-inline uk-width-1-1" }, [
                          _c("span", {
                            staticClass: "uk-form-icon",
                            attrs: { "uk-icon": "icon: lock" }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password,
                                expression: "password"
                              }
                            ],
                            staticClass: "uk-input uk-form-large",
                            attrs: {
                              name: "password",
                              placeholder: "Password",
                              type: "password"
                            },
                            domProps: { value: _vm.password },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.password = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "uk-margin" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "uk-button uk-button-primary uk-button-large uk-width-1-1",
                            on: { click: _vm.signup }
                          },
                          [_vm._v("REGISTER")]
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "uk-text-small uk-text-center" },
                        [
                          _vm._v(
                            "\n                                already have account?\n                                "
                          ),
                          _c("router-link", { attrs: { to: "/login" } }, [
                            _vm._v("Login Now")
                          ])
                        ],
                        1
                      )
                    ])
                  ]
                )
              ])
            ]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-84c7d41a", module.exports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(18)
/* template */
var __vue_template__ = __webpack_require__(15)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\js\\views\\homeView.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42ce91af", Component.options)
  } else {
    hotAPI.reload("data-v-42ce91af", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "button",
      {
        staticClass: "uk-button",
        on: {
          click: function($event) {
            _vm.logout()
          }
        }
      },
      [_vm._v("logout")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42ce91af", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(17)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\js\\components\\main.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f582032", Component.options)
  } else {
    hotAPI.reload("data-v-0f582032", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0f582032", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilites_currentUser_js__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilites_currentUser_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utilites_currentUser_js__);
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        __WEBPACK_IMPORTED_MODULE_0__utilites_currentUser_js___default()(this);
    },

    methods: {
        logout: function logout() {
            var _this = this;

            Parse.User.logOut().then(function () {
                _this.$router.push('/login');
            });
        }
    }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _Object$keys = __webpack_require__(47)['default'];

var _Object$freeze = __webpack_require__(105)['default'];

var _Object$create = __webpack_require__(70)['default'];

var _Object$defineProperty = __webpack_require__(54)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

var _interopRequireWildcard = __webpack_require__(46)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _canBeSerialized = __webpack_require__(108);

var _canBeSerialized2 = _interopRequireDefault(_canBeSerialized);

var _decode = __webpack_require__(38);

var _decode2 = _interopRequireDefault(_decode);

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _equals = __webpack_require__(117);

var _equals2 = _interopRequireDefault(_equals);

var _escape2 = __webpack_require__(80);

var _escape3 = _interopRequireDefault(_escape2);

var _ParseACL = __webpack_require__(35);

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _parseDate = __webpack_require__(81);

var _parseDate2 = _interopRequireDefault(_parseDate);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseOp = __webpack_require__(37);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseQuery = __webpack_require__(51);

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _SingleInstanceStateController = __webpack_require__(118);

var SingleInstanceStateController = _interopRequireWildcard(_SingleInstanceStateController);

var _unique = __webpack_require__(79);

var _unique2 = _interopRequireDefault(_unique);

var _UniqueInstanceStateController = __webpack_require__(119);

var UniqueInstanceStateController = _interopRequireWildcard(_UniqueInstanceStateController);

var _unsavedChildren = __webpack_require__(129);

var _unsavedChildren2 = _interopRequireDefault(_unsavedChildren);

// Mapping of class names to constructors, so we can populate objects from the
// server with appropriate subclasses of ParseObject
var classMap = {};

// Global counter for generating unique local Ids
var localCount = 0;
// Global counter for generating unique Ids for non-single-instance objects
var objectCount = 0;
// On web clients, objects are single-instance: any two objects with the same Id
// will have the same attributes. However, this may be dangerous default
// behavior in a server scenario
var singleInstance = !_CoreManager2['default'].get('IS_NODE');
if (singleInstance) {
  _CoreManager2['default'].setObjectStateController(SingleInstanceStateController);
} else {
  _CoreManager2['default'].setObjectStateController(UniqueInstanceStateController);
}

function getServerUrlPath() {
  var serverUrl = _CoreManager2['default'].get('SERVER_URL');
  if (serverUrl[serverUrl.length - 1] !== '/') {
    serverUrl += '/';
  }
  var url = serverUrl.replace(/https?:\/\//, '');
  return url.substr(url.indexOf('/'));
}

/**
 * Creates a new model with defined attributes.
 *
 * <p>You won't normally call this method directly.  It is recommended that
 * you use a subclass of <code>Parse.Object</code> instead, created by calling
 * <code>extend</code>.</p>
 *
 * <p>However, if you don't want to use a subclass, or aren't sure which
 * subclass is appropriate, you can use this form:<pre>
 *     var object = new Parse.Object("ClassName");
 * </pre>
 * That is basically equivalent to:<pre>
 *     var MyClass = Parse.Object.extend("ClassName");
 *     var object = new MyClass();
 * </pre></p>
 *
 * @class Parse.Object
 * @constructor
 * @param {String} className The class name for the object
 * @param {Object} attributes The initial set of data to store in the object.
 * @param {Object} options The options for this object instance.
 */

var ParseObject = (function () {
  function ParseObject(className, attributes, options) {
    _classCallCheck(this, ParseObject);

    // Enable legacy initializers
    if (typeof this.initialize === 'function') {
      this.initialize.apply(this, arguments);
    }

    var toSet = null;
    this._objCount = objectCount++;
    if (typeof className === 'string') {
      this.className = className;
      if (attributes && typeof attributes === 'object') {
        toSet = attributes;
      }
    } else if (className && typeof className === 'object') {
      this.className = className.className;
      toSet = {};
      for (var attr in className) {
        if (attr !== 'className') {
          toSet[attr] = className[attr];
        }
      }
      if (attributes && typeof attributes === 'object') {
        options = attributes;
      }
    }
    if (toSet && !this.set(toSet, options)) {
      throw new Error('Can\'t create an invalid Parse Object');
    }
  }

  /** Prototype getters / setters **/

  _createClass(ParseObject, [{
    key: '_getId',

    /** Private methods **/

    /**
     * Returns a local or server Id used uniquely identify this object
     */
    value: function _getId() {
      if (typeof this.id === 'string') {
        return this.id;
      }
      if (typeof this._localId === 'string') {
        return this._localId;
      }
      var localId = 'local' + String(localCount++);
      this._localId = localId;
      return localId;
    }

    /**
     * Returns a unique identifier used to pull data from the State Controller.
     */
  }, {
    key: '_getStateIdentifier',
    value: function _getStateIdentifier() {
      if (singleInstance) {
        var id = this.id;
        if (!id) {
          id = this._getId();
        }
        return {
          id: id,
          className: this.className
        };
      } else {
        return this;
      }
    }
  }, {
    key: '_getServerData',
    value: function _getServerData() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      return stateController.getServerData(this._getStateIdentifier());
    }
  }, {
    key: '_clearServerData',
    value: function _clearServerData() {
      var serverData = this._getServerData();
      var unset = {};
      for (var attr in serverData) {
        unset[attr] = undefined;
      }
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.setServerData(this._getStateIdentifier(), unset);
    }
  }, {
    key: '_getPendingOps',
    value: function _getPendingOps() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      return stateController.getPendingOps(this._getStateIdentifier());
    }
  }, {
    key: '_clearPendingOps',
    value: function _clearPendingOps() {
      var pending = this._getPendingOps();
      var latest = pending[pending.length - 1];
      var keys = _Object$keys(latest);
      keys.forEach(function (key) {
        delete latest[key];
      });
    }
  }, {
    key: '_getDirtyObjectAttributes',
    value: function _getDirtyObjectAttributes() {
      var attributes = this.attributes;
      var stateController = _CoreManager2['default'].getObjectStateController();
      var objectCache = stateController.getObjectCache(this._getStateIdentifier());
      var dirty = {};
      for (var attr in attributes) {
        var val = attributes[attr];
        if (val && typeof val === 'object' && !(val instanceof ParseObject) && !(val instanceof _ParseFile2['default']) && !(val instanceof _ParseRelation2['default'])) {
          // Due to the way browsers construct maps, the key order will not change
          // unless the object is changed
          try {
            var json = (0, _encode2['default'])(val, false, true);
            var stringified = JSON.stringify(json);
            if (objectCache[attr] !== stringified) {
              dirty[attr] = val;
            }
          } catch (e) {
            // Error occurred, possibly by a nested unsaved pointer in a mutable container
            // No matter how it happened, it indicates a change in the attribute
            dirty[attr] = val;
          }
        }
      }
      return dirty;
    }
  }, {
    key: '_toFullJSON',
    value: function _toFullJSON(seen) {
      var json = this.toJSON(seen);
      json.__type = 'Object';
      json.className = this.className;
      return json;
    }
  }, {
    key: '_getSaveJSON',
    value: function _getSaveJSON() {
      var pending = this._getPendingOps();
      var dirtyObjects = this._getDirtyObjectAttributes();
      var json = {};
      var attr;
      for (attr in dirtyObjects) {
        json[attr] = new _ParseOp.SetOp(dirtyObjects[attr]).toJSON();
      }
      for (attr in pending[0]) {
        json[attr] = pending[0][attr].toJSON();
      }
      return json;
    }
  }, {
    key: '_getSaveParams',
    value: function _getSaveParams() {
      var method = this.id ? 'PUT' : 'POST';
      var body = this._getSaveJSON();
      var path = 'classes/' + this.className;
      if (this.id) {
        path += '/' + this.id;
      } else if (this.className === '_User') {
        path = 'users';
      }
      return {
        method: method,
        body: body,
        path: path
      };
    }
  }, {
    key: '_finishFetch',
    value: function _finishFetch(serverData) {
      if (!this.id && serverData.objectId) {
        this.id = serverData.objectId;
      }
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.initializeState(this._getStateIdentifier());
      var decoded = {};
      for (var attr in serverData) {
        if (attr === 'ACL') {
          decoded[attr] = new _ParseACL2['default'](serverData[attr]);
        } else if (attr !== 'objectId') {
          decoded[attr] = (0, _decode2['default'])(serverData[attr]);
          if (decoded[attr] instanceof _ParseRelation2['default']) {
            decoded[attr]._ensureParentAndKey(this, attr);
          }
        }
      }
      if (decoded.createdAt && typeof decoded.createdAt === 'string') {
        decoded.createdAt = (0, _parseDate2['default'])(decoded.createdAt);
      }
      if (decoded.updatedAt && typeof decoded.updatedAt === 'string') {
        decoded.updatedAt = (0, _parseDate2['default'])(decoded.updatedAt);
      }
      if (!decoded.updatedAt && decoded.createdAt) {
        decoded.updatedAt = decoded.createdAt;
      }
      stateController.commitServerChanges(this._getStateIdentifier(), decoded);
    }
  }, {
    key: '_setExisted',
    value: function _setExisted(existed) {
      var stateController = _CoreManager2['default'].getObjectStateController();
      var state = stateController.getState(this._getStateIdentifier());
      if (state) {
        state.existed = existed;
      }
    }
  }, {
    key: '_migrateId',
    value: function _migrateId(serverId) {
      if (this._localId && serverId) {
        if (singleInstance) {
          var stateController = _CoreManager2['default'].getObjectStateController();
          var oldState = stateController.removeState(this._getStateIdentifier());
          this.id = serverId;
          delete this._localId;
          if (oldState) {
            stateController.initializeState(this._getStateIdentifier(), oldState);
          }
        } else {
          this.id = serverId;
          delete this._localId;
        }
      }
    }
  }, {
    key: '_handleSaveResponse',
    value: function _handleSaveResponse(response, status) {
      var changes = {};
      var attr;
      var stateController = _CoreManager2['default'].getObjectStateController();
      var pending = stateController.popPendingState(this._getStateIdentifier());
      for (attr in pending) {
        if (pending[attr] instanceof _ParseOp.RelationOp) {
          changes[attr] = pending[attr].applyTo(undefined, this, attr);
        } else if (!(attr in response)) {
          // Only SetOps and UnsetOps should not come back with results
          changes[attr] = pending[attr].applyTo(undefined);
        }
      }
      for (attr in response) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && typeof response[attr] === 'string') {
          changes[attr] = (0, _parseDate2['default'])(response[attr]);
        } else if (attr === 'ACL') {
          changes[attr] = new _ParseACL2['default'](response[attr]);
        } else if (attr !== 'objectId') {
          changes[attr] = (0, _decode2['default'])(response[attr]);
        }
      }
      if (changes.createdAt && !changes.updatedAt) {
        changes.updatedAt = changes.createdAt;
      }

      this._migrateId(response.objectId);

      if (status !== 201) {
        this._setExisted(true);
      }

      stateController.commitServerChanges(this._getStateIdentifier(), changes);
    }
  }, {
    key: '_handleSaveError',
    value: function _handleSaveError() {
      var pending = this._getPendingOps();
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.mergeFirstPendingState(this._getStateIdentifier());
    }

    /** Public methods **/

  }, {
    key: 'initialize',
    value: function initialize() {}
    // NOOP

    /**
     * Returns a JSON version of the object suitable for saving to Parse.
     * @method toJSON
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON(seen) {
      var seenEntry = this.id ? this.className + ':' + this.id : this;
      var seen = seen || [seenEntry];
      var json = {};
      var attrs = this.attributes;
      for (var attr in attrs) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && attrs[attr].toJSON) {
          json[attr] = attrs[attr].toJSON();
        } else {
          json[attr] = (0, _encode2['default'])(attrs[attr], false, false, seen);
        }
      }
      var pending = this._getPendingOps();
      for (var attr in pending[0]) {
        json[attr] = pending[0][attr].toJSON();
      }

      if (this.id) {
        json.objectId = this.id;
      }
      return json;
    }

    /**
     * Determines whether this ParseObject is equal to another ParseObject
     * @method equals
     * @return {Boolean}
     */
  }, {
    key: 'equals',
    value: function equals(other) {
      if (this === other) {
        return true;
      }
      return other instanceof ParseObject && this.className === other.className && this.id === other.id && typeof this.id !== 'undefined';
    }

    /**
     * Returns true if this object has been modified since its last
     * save/refresh.  If an attribute is specified, it returns true only if that
     * particular attribute has been modified since the last save/refresh.
     * @method dirty
     * @param {String} attr An attribute name (optional).
     * @return {Boolean}
     */
  }, {
    key: 'dirty',
    value: function dirty(attr) {
      if (!this.id) {
        return true;
      }
      var pendingOps = this._getPendingOps();
      var dirtyObjects = this._getDirtyObjectAttributes();
      if (attr) {
        if (dirtyObjects.hasOwnProperty(attr)) {
          return true;
        }
        for (var i = 0; i < pendingOps.length; i++) {
          if (pendingOps[i].hasOwnProperty(attr)) {
            return true;
          }
        }
        return false;
      }
      if (_Object$keys(pendingOps[0]).length !== 0) {
        return true;
      }
      if (_Object$keys(dirtyObjects).length !== 0) {
        return true;
      }
      return false;
    }

    /**
     * Returns an array of keys that have been modified since last save/refresh
     * @method dirtyKeys
     * @return {Array of string}
     */
  }, {
    key: 'dirtyKeys',
    value: function dirtyKeys() {
      var pendingOps = this._getPendingOps();
      var keys = {};
      for (var i = 0; i < pendingOps.length; i++) {
        for (var attr in pendingOps[i]) {
          keys[attr] = true;
        }
      }
      var dirtyObjects = this._getDirtyObjectAttributes();
      for (var attr in dirtyObjects) {
        keys[attr] = true;
      }
      return _Object$keys(keys);
    }

    /**
     * Gets a Pointer referencing this Object.
     * @method toPointer
     * @return {Object}
     */
  }, {
    key: 'toPointer',
    value: function toPointer() {
      if (!this.id) {
        throw new Error('Cannot create a pointer to an unsaved ParseObject');
      }
      return {
        __type: 'Pointer',
        className: this.className,
        objectId: this.id
      };
    }

    /**
     * Gets the value of an attribute.
     * @method get
     * @param {String} attr The string name of an attribute.
     */
  }, {
    key: 'get',
    value: function get(attr) {
      return this.attributes[attr];
    }

    /**
     * Gets a relation on the given class for the attribute.
     * @method relation
     * @param String attr The attribute to get the relation for.
     */
  }, {
    key: 'relation',
    value: function relation(attr) {
      var value = this.get(attr);
      if (value) {
        if (!(value instanceof _ParseRelation2['default'])) {
          throw new Error('Called relation() on non-relation field ' + attr);
        }
        value._ensureParentAndKey(this, attr);
        return value;
      }
      return new _ParseRelation2['default'](this, attr);
    }

    /**
     * Gets the HTML-escaped value of an attribute.
     * @method escape
     * @param {String} attr The string name of an attribute.
     */
  }, {
    key: 'escape',
    value: function escape(attr) {
      var val = this.attributes[attr];
      if (val == null) {
        return '';
      }
      var str = val;
      if (typeof val !== 'string') {
        if (typeof val.toString !== 'function') {
          return '';
        }
        val = val.toString();
      }
      return (0, _escape3['default'])(val);
    }

    /**
     * Returns <code>true</code> if the attribute contains a value that is not
     * null or undefined.
     * @method has
     * @param {String} attr The string name of the attribute.
     * @return {Boolean}
     */
  }, {
    key: 'has',
    value: function has(attr) {
      var attributes = this.attributes;
      if (attributes.hasOwnProperty(attr)) {
        return attributes[attr] != null;
      }
      return false;
    }

    /**
     * Sets a hash of model attributes on the object.
     *
     * <p>You can call it with an object containing keys and values, or with one
     * key and value.  For example:<pre>
     *   gameTurn.set({
     *     player: player1,
     *     diceRoll: 2
     *   }, {
     *     error: function(gameTurnAgain, error) {
     *       // The set failed validation.
     *     }
     *   });
     *
     *   game.set("currentPlayer", player2, {
     *     error: function(gameTurnAgain, error) {
     *       // The set failed validation.
     *     }
     *   });
     *
     *   game.set("finished", true);</pre></p>
     *
     * @method set
     * @param {String} key The key to set.
     * @param {} value The value to give it.
     * @param {Object} options A set of options for the set.
     *     The only supported option is <code>error</code>.
     * @return {Boolean} true if the set succeeded.
     */
  }, {
    key: 'set',
    value: function set(key, value, options) {
      var changes = {};
      var newOps = {};
      if (key && typeof key === 'object') {
        changes = key;
        options = value;
      } else if (typeof key === 'string') {
        changes[key] = value;
      } else {
        return this;
      }

      options = options || {};
      var readonly = [];
      if (typeof this.constructor.readOnlyAttributes === 'function') {
        readonly = readonly.concat(this.constructor.readOnlyAttributes());
      }
      for (var k in changes) {
        if (k === 'createdAt' || k === 'updatedAt') {
          // This property is read-only, but for legacy reasons we silently
          // ignore it
          continue;
        }
        if (readonly.indexOf(k) > -1) {
          throw new Error('Cannot modify readonly attribute: ' + k);
        }
        if (options.unset) {
          newOps[k] = new _ParseOp.UnsetOp();
        } else if (changes[k] instanceof _ParseOp.Op) {
          newOps[k] = changes[k];
        } else if (changes[k] && typeof changes[k] === 'object' && typeof changes[k].__op === 'string') {
          newOps[k] = (0, _ParseOp.opFromJSON)(changes[k]);
        } else if (k === 'objectId' || k === 'id') {
          this.id = changes[k];
        } else if (k === 'ACL' && typeof changes[k] === 'object' && !(changes[k] instanceof _ParseACL2['default'])) {
          newOps[k] = new _ParseOp.SetOp(new _ParseACL2['default'](changes[k]));
        } else {
          newOps[k] = new _ParseOp.SetOp(changes[k]);
        }
      }

      // Calculate new values
      var currentAttributes = this.attributes;
      var newValues = {};
      for (var attr in newOps) {
        if (newOps[attr] instanceof _ParseOp.RelationOp) {
          newValues[attr] = newOps[attr].applyTo(currentAttributes[attr], this, attr);
        } else if (!(newOps[attr] instanceof _ParseOp.UnsetOp)) {
          newValues[attr] = newOps[attr].applyTo(currentAttributes[attr]);
        }
      }

      // Validate changes
      if (!options.ignoreValidation) {
        var validation = this.validate(newValues);
        if (validation) {
          if (typeof options.error === 'function') {
            options.error(this, validation);
          }
          return false;
        }
      }

      // Consolidate Ops
      var pendingOps = this._getPendingOps();
      var last = pendingOps.length - 1;
      var stateController = _CoreManager2['default'].getObjectStateController();
      for (var attr in newOps) {
        var nextOp = newOps[attr].mergeWith(pendingOps[last][attr]);
        stateController.setPendingOp(this._getStateIdentifier(), attr, nextOp);
      }

      return this;
    }

    /**
     * Remove an attribute from the model. This is a noop if the attribute doesn't
     * exist.
     * @method unset
     * @param {String} attr The string name of an attribute.
     */
  }, {
    key: 'unset',
    value: function unset(attr, options) {
      options = options || {};
      options.unset = true;
      return this.set(attr, null, options);
    }

    /**
     * Atomically increments the value of the given attribute the next time the
     * object is saved. If no amount is specified, 1 is used by default.
     *
     * @method increment
     * @param attr {String} The key.
     * @param amount {Number} The amount to increment by (optional).
     */
  }, {
    key: 'increment',
    value: function increment(attr, amount) {
      if (typeof amount === 'undefined') {
        amount = 1;
      }
      if (typeof amount !== 'number') {
        throw new Error('Cannot increment by a non-numeric amount.');
      }
      return this.set(attr, new _ParseOp.IncrementOp(amount));
    }

    /**
     * Atomically add an object to the end of the array associated with a given
     * key.
     * @method add
     * @param attr {String} The key.
     * @param item {} The item to add.
     */
  }, {
    key: 'add',
    value: function add(attr, item) {
      return this.set(attr, new _ParseOp.AddOp([item]));
    }

    /**
     * Atomically add an object to the array associated with a given key, only
     * if it is not already present in the array. The position of the insert is
     * not guaranteed.
     *
     * @method addUnique
     * @param attr {String} The key.
     * @param item {} The object to add.
     */
  }, {
    key: 'addUnique',
    value: function addUnique(attr, item) {
      return this.set(attr, new _ParseOp.AddUniqueOp([item]));
    }

    /**
     * Atomically remove all instances of an object from the array associated
     * with a given key.
     *
     * @method remove
     * @param attr {String} The key.
     * @param item {} The object to remove.
     */
  }, {
    key: 'remove',
    value: function remove(attr, item) {
      return this.set(attr, new _ParseOp.RemoveOp([item]));
    }

    /**
     * Returns an instance of a subclass of Parse.Op describing what kind of
     * modification has been performed on this field since the last time it was
     * saved. For example, after calling object.increment("x"), calling
     * object.op("x") would return an instance of Parse.Op.Increment.
     *
     * @method op
     * @param attr {String} The key.
     * @returns {Parse.Op} The operation, or undefined if none.
     */
  }, {
    key: 'op',
    value: function op(attr) {
      var pending = this._getPendingOps();
      for (var i = pending.length; i--;) {
        if (pending[i][attr]) {
          return pending[i][attr];
        }
      }
    }

    /**
     * Creates a new model with identical attributes to this one, similar to Backbone.Model's clone()
     * @method clone
     * @return {Parse.Object}
     */
  }, {
    key: 'clone',
    value: function clone() {
      var clone = new this.constructor();
      if (!clone.className) {
        clone.className = this.className;
      }
      var attributes = this.attributes;
      if (typeof this.constructor.readOnlyAttributes === 'function') {
        var readonly = this.constructor.readOnlyAttributes() || [];
        // Attributes are frozen, so we have to rebuild an object,
        // rather than delete readonly keys
        var copy = {};
        for (var a in attributes) {
          if (readonly.indexOf(a) < 0) {
            copy[a] = attributes[a];
          }
        }
        attributes = copy;
      }
      if (clone.set) {
        clone.set(attributes);
      }
      return clone;
    }

    /**
     * Creates a new instance of this object. Not to be confused with clone()
     * @method newInstance
     * @return {Parse.Object}
     */
  }, {
    key: 'newInstance',
    value: function newInstance() {
      var clone = new this.constructor();
      if (!clone.className) {
        clone.className = this.className;
      }
      clone.id = this.id;
      if (singleInstance) {
        // Just return an object with the right id
        return clone;
      }

      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.duplicateState(this._getStateIdentifier(), clone._getStateIdentifier());
      return clone;
    }

    /**
     * Returns true if this object has never been saved to Parse.
     * @method isNew
     * @return {Boolean}
     */
  }, {
    key: 'isNew',
    value: function isNew() {
      return !this.id;
    }

    /**
     * Returns true if this object was created by the Parse server when the
     * object might have already been there (e.g. in the case of a Facebook
     * login)
     * @method existed
     * @return {Boolean}
     */
  }, {
    key: 'existed',
    value: function existed() {
      if (!this.id) {
        return false;
      }
      var stateController = _CoreManager2['default'].getObjectStateController();
      var state = stateController.getState(this._getStateIdentifier());
      if (state) {
        return state.existed;
      }
      return false;
    }

    /**
     * Checks if the model is currently in a valid state.
     * @method isValid
     * @return {Boolean}
     */
  }, {
    key: 'isValid',
    value: function isValid() {
      return !this.validate(this.attributes);
    }

    /**
     * You should not call this function directly unless you subclass
     * <code>Parse.Object</code>, in which case you can override this method
     * to provide additional validation on <code>set</code> and
     * <code>save</code>.  Your implementation should return
     *
     * @method validate
     * @param {Object} attrs The current data to validate.
     * @return {} False if the data is valid.  An error object otherwise.
     * @see Parse.Object#set
     */
  }, {
    key: 'validate',
    value: function validate(attrs) {
      if (attrs.hasOwnProperty('ACL') && !(attrs.ACL instanceof _ParseACL2['default'])) {
        return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'ACL must be a Parse ACL.');
      }
      for (var key in attrs) {
        if (!/^[A-Za-z][0-9A-Za-z_]*$/.test(key)) {
          return new _ParseError2['default'](_ParseError2['default'].INVALID_KEY_NAME);
        }
      }
      return false;
    }

    /**
     * Returns the ACL for this object.
     * @method getACL
     * @returns {Parse.ACL} An instance of Parse.ACL.
     * @see Parse.Object#get
     */
  }, {
    key: 'getACL',
    value: function getACL() {
      var acl = this.get('ACL');
      if (acl instanceof _ParseACL2['default']) {
        return acl;
      }
      return null;
    }

    /**
     * Sets the ACL to be used for this object.
     * @method setACL
     * @param {Parse.ACL} acl An instance of Parse.ACL.
     * @param {Object} options Optional Backbone-like options object to be
     *     passed in to set.
     * @return {Boolean} Whether the set passed validation.
     * @see Parse.Object#set
     */
  }, {
    key: 'setACL',
    value: function setACL(acl, options) {
      return this.set('ACL', acl, options);
    }

    /**
     * Clears any changes to this object made since the last call to save()
     * @method revert
     */
  }, {
    key: 'revert',
    value: function revert() {
      this._clearPendingOps();
    }

    /**
     * Clears all attributes on a model
     * @method clear
     */
  }, {
    key: 'clear',
    value: function clear() {
      var attributes = this.attributes;
      var erasable = {};
      var readonly = ['createdAt', 'updatedAt'];
      if (typeof this.constructor.readOnlyAttributes === 'function') {
        readonly = readonly.concat(this.constructor.readOnlyAttributes());
      }
      for (var attr in attributes) {
        if (readonly.indexOf(attr) < 0) {
          erasable[attr] = true;
        }
      }
      return this.set(erasable, { unset: true });
    }

    /**
     * Fetch the model from the server. If the server's representation of the
     * model differs from its current attributes, they will be overriden.
     *
     * @method fetch
     * @param {Object} options A Backbone-style callback object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the fetch
     *     completes.
     */
  }, {
    key: 'fetch',
    value: function fetch(options) {
      options = options || {};
      var fetchOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        fetchOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        fetchOptions.sessionToken = options.sessionToken;
      }
      var controller = _CoreManager2['default'].getObjectController();
      return controller.fetch(this, true, fetchOptions)._thenRunCallbacks(options);
    }

    /**
     * Set a hash of model attributes, and save the model to the server.
     * updatedAt will be updated when the request returns.
     * You can either call it as:<pre>
     *   object.save();</pre>
     * or<pre>
     *   object.save(null, options);</pre>
     * or<pre>
     *   object.save(attrs, options);</pre>
     * or<pre>
     *   object.save(key, value, options);</pre>
     *
     * For example, <pre>
     *   gameTurn.save({
     *     player: "Jake Cutter",
     *     diceRoll: 2
     *   }, {
     *     success: function(gameTurnAgain) {
     *       // The save was successful.
     *     },
     *     error: function(gameTurnAgain, error) {
     *       // The save failed.  Error is an instance of Parse.Error.
     *     }
     *   });</pre>
     * or with promises:<pre>
     *   gameTurn.save({
     *     player: "Jake Cutter",
     *     diceRoll: 2
     *   }).then(function(gameTurnAgain) {
     *     // The save was successful.
     *   }, function(error) {
     *     // The save failed.  Error is an instance of Parse.Error.
     *   });</pre>
     *
     * @method save
     * @param {Object} options A Backbone-style callback object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the save
     *     completes.
     */
  }, {
    key: 'save',
    value: function save(arg1, arg2, arg3) {
      var _this = this;

      var attrs;
      var options;
      if (typeof arg1 === 'object' || typeof arg1 === 'undefined') {
        attrs = arg1;
        if (typeof arg2 === 'object') {
          options = arg2;
        }
      } else {
        attrs = {};
        attrs[arg1] = arg2;
        options = arg3;
      }

      // Support save({ success: function() {}, error: function() {} })
      if (!options && attrs) {
        options = {};
        if (typeof attrs.success === 'function') {
          options.success = attrs.success;
          delete attrs.success;
        }
        if (typeof attrs.error === 'function') {
          options.error = attrs.error;
          delete attrs.error;
        }
      }

      if (attrs) {
        var validation = this.validate(attrs);
        if (validation) {
          if (options && typeof options.error === 'function') {
            options.error(this, validation);
          }
          return _ParsePromise2['default'].error(validation);
        }
        this.set(attrs, options);
      }

      options = options || {};
      var saveOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        saveOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getObjectController();
      var unsaved = (0, _unsavedChildren2['default'])(this);
      return controller.save(unsaved, saveOptions).then(function () {
        return controller.save(_this, saveOptions);
      })._thenRunCallbacks(options, this);
    }

    /**
     * Destroy this model on the server if it was already persisted.
     * If `wait: true` is passed, waits for the server to respond
     * before removal.
     *
     * @method destroy
     * @param {Object} options A Backbone-style callback object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the destroy
     *     completes.
     */
  }, {
    key: 'destroy',
    value: function destroy(options) {
      options = options || {};
      var destroyOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }
      if (!this.id) {
        return _ParsePromise2['default'].as()._thenRunCallbacks(options);
      }
      return _CoreManager2['default'].getObjectController().destroy(this, destroyOptions)._thenRunCallbacks(options);
    }

    /** Static methods **/

  }, {
    key: 'attributes',
    get: function get() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      return _Object$freeze(stateController.estimateAttributes(this._getStateIdentifier()));
    }

    /**
     * The first time this object was saved on the server.
     * @property createdAt
     * @type Date
     */
  }, {
    key: 'createdAt',
    get: function get() {
      return this._getServerData().createdAt;
    }

    /**
     * The last time this object was updated on the server.
     * @property updatedAt
     * @type Date
     */
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._getServerData().updatedAt;
    }
  }], [{
    key: '_clearAllState',
    value: function _clearAllState() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.clearAllState();
    }

    /**
     * Fetches the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAll([object1, object2, ...], {
     *     success: function(list) {
     *       // All the objects were fetched.
     *     },
     *     error: function(error) {
     *       // An error occurred while fetching one of the objects.
     *     },
     *   });
     * </pre>
     *
     * @method fetchAll
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     * </ul>
     */
  }, {
    key: 'fetchAll',
    value: function fetchAll(list, options) {
      var options = options || {};

      var queryOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().fetch(list, true, queryOptions)._thenRunCallbacks(options);
    }

    /**
     * Fetches the given list of Parse.Object if needed.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAllIfNeeded([object1, ...], {
     *     success: function(list) {
     *       // Objects were fetched and updated.
     *     },
     *     error: function(error) {
     *       // An error occurred while fetching one of the objects.
     *     },
     *   });
     * </pre>
     *
     * @method fetchAllIfNeeded
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     * </ul>
     */
  }, {
    key: 'fetchAllIfNeeded',
    value: function fetchAllIfNeeded(list, options) {
      var options = options || {};

      var queryOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().fetch(list, false, queryOptions)._thenRunCallbacks(options);
    }

    /**
     * Destroy the given list of models on the server if it was already persisted.
     *
     * <p>Unlike saveAll, if an error occurs while deleting an individual model,
     * this method will continue trying to delete the rest of the models if
     * possible, except in the case of a fatal error like a connection error.
     *
     * <p>In particular, the Parse.Error object returned in the case of error may
     * be one of two types:
     *
     * <ul>
     *   <li>A Parse.Error.AGGREGATE_ERROR. This object's "errors" property is an
     *       array of other Parse.Error objects. Each error object in this array
     *       has an "object" property that references the object that could not be
     *       deleted (for instance, because that object could not be found).</li>
     *   <li>A non-aggregate Parse.Error. This indicates a serious error that
     *       caused the delete operation to be aborted partway through (for
     *       instance, a connection failure in the middle of the delete).</li>
     * </ul>
     *
     * <pre>
     *   Parse.Object.destroyAll([object1, object2, ...], {
     *     success: function() {
     *       // All the objects were deleted.
     *     },
     *     error: function(error) {
     *       // An error occurred while deleting one or more of the objects.
     *       // If this is an aggregate error, then we can inspect each error
     *       // object individually to determine the reason why a particular
     *       // object was not deleted.
     *       if (error.code === Parse.Error.AGGREGATE_ERROR) {
     *         for (var i = 0; i < error.errors.length; i++) {
     *           console.log("Couldn't delete " + error.errors[i].object.id +
     *             "due to " + error.errors[i].message);
     *         }
     *       } else {
     *         console.log("Delete aborted because of " + error.message);
     *       }
     *     },
     *   });
     * </pre>
     *
     * @method destroyAll
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the destroyAll
     *     completes.
     */
  }, {
    key: 'destroyAll',
    value: function destroyAll(list, options) {
      var options = options || {};

      var destroyOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().destroy(list, destroyOptions)._thenRunCallbacks(options);
    }

    /**
     * Saves the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.saveAll([object1, object2, ...], {
     *     success: function(list) {
     *       // All the objects were saved.
     *     },
     *     error: function(error) {
     *       // An error occurred while saving one of the objects.
     *     },
     *   });
     * </pre>
     *
     * @method saveAll
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     */
  }, {
    key: 'saveAll',
    value: function saveAll(list, options) {
      var options = options || {};

      var saveOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        saveOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().save(list, saveOptions)._thenRunCallbacks(options);
    }

    /**
     * Creates a reference to a subclass of Parse.Object with the given id. This
     * does not exist on Parse.Object, only on subclasses.
     *
     * <p>A shortcut for: <pre>
     *  var Foo = Parse.Object.extend("Foo");
     *  var pointerToFoo = new Foo();
     *  pointerToFoo.id = "myObjectId";
     * </pre>
     *
     * @method createWithoutData
     * @param {String} id The ID of the object to create a reference to.
     * @static
     * @return {Parse.Object} A Parse.Object reference.
     */
  }, {
    key: 'createWithoutData',
    value: function createWithoutData(id) {
      var obj = new this();
      obj.id = id;
      return obj;
    }

    /**
     * Creates a new instance of a Parse Object from a JSON representation.
     * @method fromJSON
     * @param {Object} json The JSON map of the Object's data
     * @param {boolean} override In single instance mode, all old server data
     *   is overwritten if this is set to true
     * @static
     * @return {Parse.Object} A Parse.Object reference
     */
  }, {
    key: 'fromJSON',
    value: function fromJSON(json, override) {
      if (!json.className) {
        throw new Error('Cannot create an object without a className');
      }
      var constructor = classMap[json.className];
      var o = constructor ? new constructor() : new ParseObject(json.className);
      var otherAttributes = {};
      for (var attr in json) {
        if (attr !== 'className' && attr !== '__type') {
          otherAttributes[attr] = json[attr];
        }
      }
      if (override) {
        // id needs to be set before clearServerData can work
        if (otherAttributes.objectId) {
          o.id = otherAttributes.objectId;
        }
        var preserved = null;
        if (typeof o._preserveFieldsOnFetch === 'function') {
          preserved = o._preserveFieldsOnFetch();
        }
        o._clearServerData();
        if (preserved) {
          o._finishFetch(preserved);
        }
      }
      o._finishFetch(otherAttributes);
      if (json.objectId) {
        o._setExisted(true);
      }
      return o;
    }

    /**
     * Registers a subclass of Parse.Object with a specific class name.
     * When objects of that class are retrieved from a query, they will be
     * instantiated with this subclass.
     * This is only necessary when using ES6 subclassing.
     * @method registerSubclass
     * @param {String} className The class name of the subclass
     * @param {Class} constructor The subclass
     */
  }, {
    key: 'registerSubclass',
    value: function registerSubclass(className, constructor) {
      if (typeof className !== 'string') {
        throw new TypeError('The first argument must be a valid class name.');
      }
      if (typeof constructor === 'undefined') {
        throw new TypeError('You must supply a subclass constructor.');
      }
      if (typeof constructor !== 'function') {
        throw new TypeError('You must register the subclass constructor. ' + 'Did you attempt to register an instance of the subclass?');
      }
      classMap[className] = constructor;
      if (!constructor.className) {
        constructor.className = className;
      }
    }

    /**
     * Creates a new subclass of Parse.Object for the given Parse class name.
     *
     * <p>Every extension of a Parse class will inherit from the most recent
     * previous extension of that class. When a Parse.Object is automatically
     * created by parsing JSON, it will use the most recent extension of that
     * class.</p>
     *
     * <p>You should call either:<pre>
     *     var MyClass = Parse.Object.extend("MyClass", {
     *         <i>Instance methods</i>,
     *         initialize: function(attrs, options) {
     *             this.someInstanceProperty = [],
     *             <i>Other instance properties</i>
     *         }
     *     }, {
     *         <i>Class properties</i>
     *     });</pre>
     * or, for Backbone compatibility:<pre>
     *     var MyClass = Parse.Object.extend({
     *         className: "MyClass",
     *         <i>Instance methods</i>,
     *         initialize: function(attrs, options) {
     *             this.someInstanceProperty = [],
     *             <i>Other instance properties</i>
     *         }
     *     }, {
     *         <i>Class properties</i>
     *     });</pre></p>
     *
     * @method extend
     * @param {String} className The name of the Parse class backing this model.
     * @param {Object} protoProps Instance properties to add to instances of the
     *     class returned from this method.
     * @param {Object} classProps Class properties to add the class returned from
     *     this method.
     * @return {Class} A new subclass of Parse.Object.
     */
  }, {
    key: 'extend',
    value: function extend(className, protoProps, classProps) {
      if (typeof className !== 'string') {
        if (className && typeof className.className === 'string') {
          return ParseObject.extend(className.className, className, protoProps);
        } else {
          throw new Error('Parse.Object.extend\'s first argument should be the className.');
        }
      }
      var adjustedClassName = className;

      if (adjustedClassName === 'User' && _CoreManager2['default'].get('PERFORM_USER_REWRITE')) {
        adjustedClassName = '_User';
      }

      var parentProto = ParseObject.prototype;
      if (this.hasOwnProperty('__super__') && this.__super__) {
        parentProto = this.prototype;
      } else if (classMap[adjustedClassName]) {
        parentProto = classMap[adjustedClassName].prototype;
      }
      var ParseObjectSubclass = function ParseObjectSubclass(attributes, options) {
        // Enable legacy initializers
        if (typeof this.initialize === 'function') {
          this.initialize.apply(this, arguments);
        }

        this.className = adjustedClassName;
        this._objCount = objectCount++;
        if (attributes && typeof attributes === 'object') {
          if (!this.set(attributes || {}, options)) {
            throw new Error('Can\'t create an invalid Parse Object');
          }
        }
      };
      ParseObjectSubclass.className = adjustedClassName;
      ParseObjectSubclass.__super__ = parentProto;

      ParseObjectSubclass.prototype = _Object$create(parentProto, {
        constructor: {
          value: ParseObjectSubclass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

      if (protoProps) {
        for (var prop in protoProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseObjectSubclass.prototype, prop, {
              value: protoProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var prop in classProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseObjectSubclass, prop, {
              value: classProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      ParseObjectSubclass.extend = function (name, protoProps, classProps) {
        if (typeof name === 'string') {
          return ParseObject.extend.call(ParseObjectSubclass, name, protoProps, classProps);
        }
        return ParseObject.extend.call(ParseObjectSubclass, adjustedClassName, name, protoProps);
      };
      ParseObjectSubclass.createWithoutData = ParseObject.createWithoutData;

      classMap[adjustedClassName] = ParseObjectSubclass;
      return ParseObjectSubclass;
    }

    /**
     * Enable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * This is disabled by default in server environments, since it can lead to
     * security issues.
     * @method enableSingleInstance
     */
  }, {
    key: 'enableSingleInstance',
    value: function enableSingleInstance() {
      singleInstance = true;
      _CoreManager2['default'].setObjectStateController(SingleInstanceStateController);
    }

    /**
     * Disable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * When disabled, you can have two instances of the same object in memory
     * without them sharing attributes.
     * @method disableSingleInstance
     */
  }, {
    key: 'disableSingleInstance',
    value: function disableSingleInstance() {
      singleInstance = false;
      _CoreManager2['default'].setObjectStateController(UniqueInstanceStateController);
    }
  }]);

  return ParseObject;
})();

exports['default'] = ParseObject;

_CoreManager2['default'].setObjectController({
  fetch: function fetch(target, forceFetch, options) {
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _ParsePromise2['default'].as([]);
      }
      var objs = [];
      var ids = [];
      var className = null;
      var results = [];
      var error = null;
      target.forEach(function (el, i) {
        if (error) {
          return;
        }
        if (!className) {
          className = el.className;
        }
        if (className !== el.className) {
          error = new _ParseError2['default'](_ParseError2['default'].INVALID_CLASS_NAME, 'All objects should be of the same class');
        }
        if (!el.id) {
          error = new _ParseError2['default'](_ParseError2['default'].MISSING_OBJECT_ID, 'All objects must have an ID');
        }
        if (forceFetch || _Object$keys(el._getServerData()).length === 0) {
          ids.push(el.id);
          objs.push(el);
        }
        results.push(el);
      });
      if (error) {
        return _ParsePromise2['default'].error(error);
      }
      var query = new _ParseQuery2['default'](className);
      query.containedIn('objectId', ids);
      query._limit = ids.length;
      return query.find(options).then(function (objects) {
        var idMap = {};
        objects.forEach(function (o) {
          idMap[o.id] = o;
        });
        for (var i = 0; i < objs.length; i++) {
          var obj = objs[i];
          if (!obj || !obj.id || !idMap[obj.id]) {
            if (forceFetch) {
              return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OBJECT_NOT_FOUND, 'All objects must exist on the server.'));
            }
          }
        }
        if (!singleInstance) {
          // If single instance objects are disabled, we need to replace the
          for (var i = 0; i < results.length; i++) {
            var obj = results[i];
            if (obj && obj.id && idMap[obj.id]) {
              var id = obj.id;
              obj._finishFetch(idMap[id].toJSON());
              results[i] = idMap[id];
            }
          }
        }
        return _ParsePromise2['default'].as(results);
      });
    } else {
      var RESTController = _CoreManager2['default'].getRESTController();
      return RESTController.request('GET', 'classes/' + target.className + '/' + target._getId(), {}, options).then(function (response, status, xhr) {
        if (target instanceof ParseObject) {
          target._clearPendingOps();
          target._clearServerData();
          target._finishFetch(response);
        }
        return target;
      });
    }
  },

  destroy: function destroy(target, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _ParsePromise2['default'].as([]);
      }
      var batches = [[]];
      target.forEach(function (obj) {
        if (!obj.id) {
          return;
        }
        batches[batches.length - 1].push(obj);
        if (batches[batches.length - 1].length >= 20) {
          batches.push([]);
        }
      });
      if (batches[batches.length - 1].length === 0) {
        // If the last batch is empty, remove it
        batches.pop();
      }
      var deleteCompleted = _ParsePromise2['default'].as();
      var errors = [];
      batches.forEach(function (batch) {
        deleteCompleted = deleteCompleted.then(function () {
          return RESTController.request('POST', 'batch', {
            requests: batch.map(function (obj) {
              return {
                method: 'DELETE',
                path: getServerUrlPath() + 'classes/' + obj.className + '/' + obj._getId(),
                body: {}
              };
            })
          }, options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
              if (results[i] && results[i].hasOwnProperty('error')) {
                var err = new _ParseError2['default'](results[i].error.code, results[i].error.error);
                err.object = batch[i];
                errors.push(err);
              }
            }
          });
        });
      });
      return deleteCompleted.then(function () {
        if (errors.length) {
          var aggregate = new _ParseError2['default'](_ParseError2['default'].AGGREGATE_ERROR);
          aggregate.errors = errors;
          return _ParsePromise2['default'].error(aggregate);
        }
        return _ParsePromise2['default'].as(target);
      });
    } else if (target instanceof ParseObject) {
      return RESTController.request('DELETE', 'classes/' + target.className + '/' + target._getId(), {}, options).then(function () {
        return _ParsePromise2['default'].as(target);
      });
    }
    return _ParsePromise2['default'].as(target);
  },

  save: function save(target, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    var stateController = _CoreManager2['default'].getObjectStateController();
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _ParsePromise2['default'].as([]);
      }

      var unsaved = target.concat();
      for (var i = 0; i < target.length; i++) {
        if (target[i] instanceof ParseObject) {
          unsaved = unsaved.concat((0, _unsavedChildren2['default'])(target[i], true));
        }
      }
      unsaved = (0, _unique2['default'])(unsaved);

      var filesSaved = _ParsePromise2['default'].as();
      var pending = [];
      unsaved.forEach(function (el) {
        if (el instanceof _ParseFile2['default']) {
          filesSaved = filesSaved.then(function () {
            return el.save();
          });
        } else if (el instanceof ParseObject) {
          pending.push(el);
        }
      });

      return filesSaved.then(function () {
        var objectError = null;
        return _ParsePromise2['default']._continueWhile(function () {
          return pending.length > 0;
        }, function () {
          var batch = [];
          var nextPending = [];
          pending.forEach(function (el) {
            if (batch.length < 20 && (0, _canBeSerialized2['default'])(el)) {
              batch.push(el);
            } else {
              nextPending.push(el);
            }
          });
          pending = nextPending;
          if (batch.length < 1) {
            return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Tried to save a batch with a cycle.'));
          }

          // Queue up tasks for each object in the batch.
          // When every task is ready, the API request will execute
          var batchReturned = new _ParsePromise2['default']();
          var batchReady = [];
          var batchTasks = [];
          batch.forEach(function (obj, index) {
            var ready = new _ParsePromise2['default']();
            batchReady.push(ready);
            var task = function task() {
              ready.resolve();
              return batchReturned.then(function (responses, status) {
                if (responses[index].hasOwnProperty('success')) {
                  obj._handleSaveResponse(responses[index].success, status);
                } else {
                  if (!objectError && responses[index].hasOwnProperty('error')) {
                    var serverError = responses[index].error;
                    objectError = new _ParseError2['default'](serverError.code, serverError.error);
                    // Cancel the rest of the save
                    pending = [];
                  }
                  obj._handleSaveError();
                }
              });
            };
            stateController.pushPendingState(obj._getStateIdentifier());
            batchTasks.push(stateController.enqueueTask(obj._getStateIdentifier(), task));
          });

          _ParsePromise2['default'].when(batchReady).then(function () {
            // Kick off the batch request
            return RESTController.request('POST', 'batch', {
              requests: batch.map(function (obj) {
                var params = obj._getSaveParams();
                params.path = getServerUrlPath() + params.path;
                return params;
              })
            }, options);
          }).then(function (response, status, xhr) {
            batchReturned.resolve(response, status);
          });

          return _ParsePromise2['default'].when(batchTasks);
        }).then(function () {
          if (objectError) {
            return _ParsePromise2['default'].error(objectError);
          }
          return _ParsePromise2['default'].as(target);
        });
      });
    } else if (target instanceof ParseObject) {
      // copying target lets Flow guarantee the pointer isn't modified elsewhere
      var targetCopy = target;
      var task = function task() {
        var params = targetCopy._getSaveParams();
        return RESTController.request(params.method, params.path, params.body, options).then(function (response, status) {
          targetCopy._handleSaveResponse(response, status);
        }, function (error) {
          targetCopy._handleSaveError();
          return _ParsePromise2['default'].error(error);
        });
      };

      stateController.pushPendingState(target._getStateIdentifier());
      return stateController.enqueueTask(target._getStateIdentifier(), task).then(function () {
        return target;
      }, function (error) {
        return _ParsePromise2['default'].error(error);
      });
    }
    return _ParsePromise2['default'].as();
  }
});
module.exports = exports['default'];

/**
 * The ID of this object, unique within its class.
 * @property id
 * @type String
 */

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _getIterator = __webpack_require__(71)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _isPromisesAPlusCompliant = true;

/**
 * A Promise is returned by async methods as a hook to provide callbacks to be
 * called when the async task is fulfilled.
 *
 * <p>Typical usage would be like:<pre>
 *    query.find().then(function(results) {
 *      results[0].set("foo", "bar");
 *      return results[0].saveAsync();
 *    }).then(function(result) {
 *      console.log("Updated " + result.id);
 *    });
 * </pre></p>
 *
 * @class Parse.Promise
 * @constructor
 */

var ParsePromise = (function () {
  function ParsePromise(executor) {
    _classCallCheck(this, ParsePromise);

    this._resolved = false;
    this._rejected = false;
    this._resolvedCallbacks = [];
    this._rejectedCallbacks = [];

    if (typeof executor === 'function') {
      executor(this.resolve.bind(this), this.reject.bind(this));
    }
  }

  /**
   * Marks this promise as fulfilled, firing any callbacks waiting on it.
   * @method resolve
   * @param {Object} result the result to pass to the callbacks.
   */

  _createClass(ParsePromise, [{
    key: 'resolve',
    value: function resolve() {
      if (this._resolved || this._rejected) {
        throw new Error('A promise was resolved even though it had already been ' + (this._resolved ? 'resolved' : 'rejected') + '.');
      }
      this._resolved = true;

      for (var _len = arguments.length, results = Array(_len), _key = 0; _key < _len; _key++) {
        results[_key] = arguments[_key];
      }

      this._result = results;
      for (var i = 0; i < this._resolvedCallbacks.length; i++) {
        this._resolvedCallbacks[i].apply(this, results);
      }

      this._resolvedCallbacks = [];
      this._rejectedCallbacks = [];
    }

    /**
     * Marks this promise as fulfilled, firing any callbacks waiting on it.
     * @method reject
     * @param {Object} error the error to pass to the callbacks.
     */
  }, {
    key: 'reject',
    value: function reject(error) {
      if (this._resolved || this._rejected) {
        throw new Error('A promise was resolved even though it had already been ' + (this._resolved ? 'resolved' : 'rejected') + '.');
      }
      this._rejected = true;
      this._error = error;
      for (var i = 0; i < this._rejectedCallbacks.length; i++) {
        this._rejectedCallbacks[i](error);
      }
      this._resolvedCallbacks = [];
      this._rejectedCallbacks = [];
    }

    /**
     * Adds callbacks to be called when this promise is fulfilled. Returns a new
     * Promise that will be fulfilled when the callback is complete. It allows
     * chaining. If the callback itself returns a Promise, then the one returned
     * by "then" will not be fulfilled until that one returned by the callback
     * is fulfilled.
     * @method then
     * @param {Function} resolvedCallback Function that is called when this
     * Promise is resolved. Once the callback is complete, then the Promise
     * returned by "then" will also be fulfilled.
     * @param {Function} rejectedCallback Function that is called when this
     * Promise is rejected with an error. Once the callback is complete, then
     * the promise returned by "then" with be resolved successfully. If
     * rejectedCallback is null, or it returns a rejected Promise, then the
     * Promise returned by "then" will be rejected with that error.
     * @return {Parse.Promise} A new Promise that will be fulfilled after this
     * Promise is fulfilled and either callback has completed. If the callback
     * returned a Promise, then this Promise will not be fulfilled until that
     * one is.
     */
  }, {
    key: 'then',
    value: function then(resolvedCallback, rejectedCallback) {
      var _this = this;

      var promise = new ParsePromise();

      var wrappedResolvedCallback = function wrappedResolvedCallback() {
        for (var _len2 = arguments.length, results = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          results[_key2] = arguments[_key2];
        }

        if (typeof resolvedCallback === 'function') {
          if (_isPromisesAPlusCompliant) {
            try {
              results = [resolvedCallback.apply(this, results)];
            } catch (e) {
              results = [ParsePromise.error(e)];
            }
          } else {
            results = [resolvedCallback.apply(this, results)];
          }
        }
        if (results.length === 1 && ParsePromise.is(results[0])) {
          results[0].then(function () {
            promise.resolve.apply(promise, arguments);
          }, function (error) {
            promise.reject(error);
          });
        } else {
          promise.resolve.apply(promise, results);
        }
      };

      var wrappedRejectedCallback = function wrappedRejectedCallback(error) {
        var result = [];
        if (typeof rejectedCallback === 'function') {
          if (_isPromisesAPlusCompliant) {
            try {
              result = [rejectedCallback(error)];
            } catch (e) {
              result = [ParsePromise.error(e)];
            }
          } else {
            result = [rejectedCallback(error)];
          }
          if (result.length === 1 && ParsePromise.is(result[0])) {
            result[0].then(function () {
              promise.resolve.apply(promise, arguments);
            }, function (error) {
              promise.reject(error);
            });
          } else {
            if (_isPromisesAPlusCompliant) {
              promise.resolve.apply(promise, result);
            } else {
              promise.reject(result[0]);
            }
          }
        } else {
          promise.reject(error);
        }
      };

      var runLater = function runLater(fn) {
        fn.call();
      };
      if (_isPromisesAPlusCompliant) {
        if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
          runLater = function (fn) {
            process.nextTick(fn);
          };
        } else if (typeof setTimeout === 'function') {
          runLater = function (fn) {
            setTimeout(fn, 0);
          };
        }
      }

      if (this._resolved) {
        runLater(function () {
          wrappedResolvedCallback.apply(_this, _this._result);
        });
      } else if (this._rejected) {
        runLater(function () {
          wrappedRejectedCallback(_this._error);
        });
      } else {
        this._resolvedCallbacks.push(wrappedResolvedCallback);
        this._rejectedCallbacks.push(wrappedRejectedCallback);
      }

      return promise;
    }

    /**
     * Add handlers to be called when the promise
     * is either resolved or rejected
     * @method always
     */
  }, {
    key: 'always',
    value: function always(callback) {
      return this.then(callback, callback);
    }

    /**
     * Add handlers to be called when the Promise object is resolved
     * @method done
     */
  }, {
    key: 'done',
    value: function done(callback) {
      return this.then(callback);
    }

    /**
     * Add handlers to be called when the Promise object is rejected
     * Alias for catch().
     * @method fail
     */
  }, {
    key: 'fail',
    value: function fail(callback) {
      return this.then(null, callback);
    }

    /**
     * Add handlers to be called when the Promise object is rejected
     * @method catch
     */
  }, {
    key: 'catch',
    value: function _catch(callback) {
      return this.then(null, callback);
    }

    /**
     * Run the given callbacks after this promise is fulfilled.
     * @method _thenRunCallbacks
     * @param optionsOrCallback {} A Backbone-style options callback, or a
     * callback function. If this is an options object and contains a "model"
     * attributes, that will be passed to error callbacks as the first argument.
     * @param model {} If truthy, this will be passed as the first result of
     * error callbacks. This is for Backbone-compatability.
     * @return {Parse.Promise} A promise that will be resolved after the
     * callbacks are run, with the same result as this.
     */
  }, {
    key: '_thenRunCallbacks',
    value: function _thenRunCallbacks(optionsOrCallback, model) {
      var options = {};
      if (typeof optionsOrCallback === 'function') {
        options.success = function (result) {
          optionsOrCallback(result, null);
        };
        options.error = function (error) {
          optionsOrCallback(null, error);
        };
      } else if (typeof optionsOrCallback === 'object') {
        if (typeof optionsOrCallback.success === 'function') {
          options.success = optionsOrCallback.success;
        }
        if (typeof optionsOrCallback.error === 'function') {
          options.error = optionsOrCallback.error;
        }
      }

      return this.then(function () {
        for (var _len3 = arguments.length, results = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          results[_key3] = arguments[_key3];
        }

        if (options.success) {
          options.success.apply(this, results);
        }
        return ParsePromise.as.apply(ParsePromise, arguments);
      }, function (error) {
        if (options.error) {
          if (typeof model !== 'undefined') {
            options.error(model, error);
          } else {
            options.error(error);
          }
        }
        // By explicitly returning a rejected Promise, this will work with
        // either jQuery or Promises/A+ semantics.
        return ParsePromise.error(error);
      });
    }

    /**
     * Adds a callback function that should be called regardless of whether
     * this promise failed or succeeded. The callback will be given either the
     * array of results for its first argument, or the error as its second,
     * depending on whether this Promise was rejected or resolved. Returns a
     * new Promise, like "then" would.
     * @method _continueWith
     * @param {Function} continuation the callback.
     */
  }, {
    key: '_continueWith',
    value: function _continueWith(continuation) {
      return this.then(function () {
        return continuation(arguments, null);
      }, function (error) {
        return continuation(null, error);
      });
    }

    /**
     * Returns true iff the given object fulfils the Promise interface.
     * @method is
     * @param {Object} promise The object to test
     * @static
     * @return {Boolean}
     */
  }], [{
    key: 'is',
    value: function is(promise) {
      return promise != null && typeof promise.then === 'function';
    }

    /**
     * Returns a new promise that is resolved with a given value.
     * @method as
     * @param value The value to resolve the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'as',
    value: function as() {
      var promise = new ParsePromise();

      for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        values[_key4] = arguments[_key4];
      }

      promise.resolve.apply(promise, values);
      return promise;
    }

    /**
     * Returns a new promise that is resolved with a given value.
     * If that value is a thenable Promise (has a .then() prototype
     * method), the new promise will be chained to the end of the
     * value.
     * @method resolve
     * @param value The value to resolve the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'resolve',
    value: function resolve(value) {
      return new ParsePromise(function (resolve, reject) {
        if (ParsePromise.is(value)) {
          value.then(resolve, reject);
        } else {
          resolve(value);
        }
      });
    }

    /**
     * Returns a new promise that is rejected with a given error.
     * @method error
     * @param error The error to reject the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'error',
    value: function error() {
      var promise = new ParsePromise();

      for (var _len5 = arguments.length, errors = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        errors[_key5] = arguments[_key5];
      }

      promise.reject.apply(promise, errors);
      return promise;
    }

    /**
     * Returns a new promise that is rejected with a given error.
     * This is an alias for Parse.Promise.error, for compliance with
     * the ES6 implementation.
     * @method reject
     * @param error The error to reject the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'reject',
    value: function reject() {
      for (var _len6 = arguments.length, errors = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        errors[_key6] = arguments[_key6];
      }

      return ParsePromise.error.apply(null, errors);
    }

    /**
     * Returns a new promise that is fulfilled when all of the input promises
     * are resolved. If any promise in the list fails, then the returned promise
     * will be rejected with an array containing the error from each promise.
     * If they all succeed, then the returned promise will succeed, with the
     * results being the results of all the input
     * promises. For example: <pre>
     *   var p1 = Parse.Promise.as(1);
     *   var p2 = Parse.Promise.as(2);
     *   var p3 = Parse.Promise.as(3);
     *
     *   Parse.Promise.when(p1, p2, p3).then(function(r1, r2, r3) {
     *     console.log(r1);  // prints 1
     *     console.log(r2);  // prints 2
     *     console.log(r3);  // prints 3
     *   });</pre>
     *
     * The input promises can also be specified as an array: <pre>
     *   var promises = [p1, p2, p3];
     *   Parse.Promise.when(promises).then(function(results) {
     *     console.log(results);  // prints [1,2,3]
     *   });
     * </pre>
     * @method when
     * @param {Array} promises a list of promises to wait for.
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'when',
    value: function when(promises) {
      var objects;
      var arrayArgument = Array.isArray(promises);
      if (arrayArgument) {
        objects = promises;
      } else {
        objects = arguments;
      }

      var total = objects.length;
      var hadError = false;
      var results = [];
      var returnValue = arrayArgument ? [results] : results;
      var errors = [];
      results.length = objects.length;
      errors.length = objects.length;

      if (total === 0) {
        return ParsePromise.as.apply(this, returnValue);
      }

      var promise = new ParsePromise();

      var resolveOne = function resolveOne() {
        total--;
        if (total <= 0) {
          if (hadError) {
            promise.reject(errors);
          } else {
            promise.resolve.apply(promise, returnValue);
          }
        }
      };

      var chain = function chain(object, index) {
        if (ParsePromise.is(object)) {
          object.then(function (result) {
            results[index] = result;
            resolveOne();
          }, function (error) {
            errors[index] = error;
            hadError = true;
            resolveOne();
          });
        } else {
          results[i] = object;
          resolveOne();
        }
      };
      for (var i = 0; i < objects.length; i++) {
        chain(objects[i], i);
      }

      return promise;
    }

    /**
     * Returns a new promise that is fulfilled when all of the promises in the
     * iterable argument are resolved. If any promise in the list fails, then
     * the returned promise will be immediately rejected with the reason that
     * single promise rejected. If they all succeed, then the returned promise
     * will succeed, with the results being the results of all the input
     * promises. If the iterable provided is empty, the returned promise will
     * be immediately resolved.
     * 
     * For example: <pre>
     *   var p1 = Parse.Promise.as(1);
     *   var p2 = Parse.Promise.as(2);
     *   var p3 = Parse.Promise.as(3);
     *
     *   Parse.Promise.all([p1, p2, p3]).then(function([r1, r2, r3]) {
     *     console.log(r1);  // prints 1
     *     console.log(r2);  // prints 2
     *     console.log(r3);  // prints 3
     *   });</pre>
     *
     * @method all
     * @param {Iterable} promises an iterable of promises to wait for.
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'all',
    value: function all(promises) {
      var total = 0;
      var objects = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(promises), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;

          objects[total++] = p;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (total === 0) {
        return ParsePromise.as([]);
      }

      var hadError = false;
      var promise = new ParsePromise();
      var resolved = 0;
      var results = [];
      objects.forEach(function (object, i) {
        if (ParsePromise.is(object)) {
          object.then(function (result) {
            if (hadError) {
              return false;
            }
            results[i] = result;
            resolved++;
            if (resolved >= total) {
              promise.resolve(results);
            }
          }, function (error) {
            // Reject immediately
            promise.reject(error);
            hadError = true;
          });
        } else {
          results[i] = object;
          resolved++;
          if (!hadError && resolved >= total) {
            promise.resolve(results);
          }
        }
      });

      return promise;
    }

    /**
     * Returns a new promise that is immediately fulfilled when any of the
     * promises in the iterable argument are resolved or rejected. If the
     * first promise to complete is resolved, the returned promise will be
     * resolved with the same value. Likewise, if the first promise to
     * complete is rejected, the returned promise will be rejected with the
     * same reason.
     *
     * @method race
     * @param {Iterable} promises an iterable of promises to wait for.
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'race',
    value: function race(promises) {
      var completed = false;
      var promise = new ParsePromise();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(promises), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var p = _step2.value;

          if (ParsePromise.is(p)) {
            p.then(function (result) {
              if (completed) {
                return;
              }
              completed = true;
              promise.resolve(result);
            }, function (error) {
              if (completed) {
                return;
              }
              completed = true;
              promise.reject(error);
            });
          } else if (!completed) {
            completed = true;
            promise.resolve(p);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return promise;
    }

    /**
     * Runs the given asyncFunction repeatedly, as long as the predicate
     * function returns a truthy value. Stops repeating if asyncFunction returns
     * a rejected promise.
     * @method _continueWhile
     * @param {Function} predicate should return false when ready to stop.
     * @param {Function} asyncFunction should return a Promise.
     * @static
     */
  }, {
    key: '_continueWhile',
    value: function _continueWhile(predicate, asyncFunction) {
      if (predicate()) {
        return asyncFunction().then(function () {
          return ParsePromise._continueWhile(predicate, asyncFunction);
        });
      }
      return ParsePromise.as();
    }
  }, {
    key: 'isPromisesAPlusCompliant',
    value: function isPromisesAPlusCompliant() {
      return _isPromisesAPlusCompliant;
    }
  }, {
    key: 'enableAPlusCompliant',
    value: function enableAPlusCompliant() {
      _isPromisesAPlusCompliant = true;
    }
  }, {
    key: 'disableAPlusCompliant',
    value: function disableAPlusCompliant() {
      _isPromisesAPlusCompliant = false;
    }
  }]);

  return ParsePromise;
})();

exports['default'] = ParsePromise;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var config = {
  // Defaults
  IS_NODE: typeof process !== 'undefined' && !!process.versions && !!process.versions.node && !process.version.electron,
  REQUEST_ATTEMPT_LIMIT: 5,
  SERVER_URL: 'https://api.parse.com/1',
  LIVEQUERY_SERVER_URL: null,
  VERSION: 'js' + '1.8.5',
  APPLICATION_ID: null,
  JAVASCRIPT_KEY: null,
  MASTER_KEY: null,
  USE_MASTER_KEY: false,
  PERFORM_USER_REWRITE: true,
  FORCE_REVOCABLE_SESSION: false
};

module.exports = {
  get: function get(key) {
    if (config.hasOwnProperty(key)) {
      return config[key];
    }
    throw new Error('Configuration key not found: ' + key);
  },

  set: function set(key, value) {
    config[key] = value;
  },

  /* Specialized Controller Setters/Getters */

  setAnalyticsController: function setAnalyticsController(controller) {
    if (typeof controller.track !== 'function') {
      throw new Error('AnalyticsController must implement track()');
    }
    config['AnalyticsController'] = controller;
  },

  getAnalyticsController: function getAnalyticsController() {
    return config['AnalyticsController'];
  },

  setCloudController: function setCloudController(controller) {
    if (typeof controller.run !== 'function') {
      throw new Error('CloudController must implement run()');
    }
    config['CloudController'] = controller;
  },

  getCloudController: function getCloudController() {
    return config['CloudController'];
  },

  setConfigController: function setConfigController(controller) {
    if (typeof controller.current !== 'function') {
      throw new Error('ConfigController must implement current()');
    }
    if (typeof controller.get !== 'function') {
      throw new Error('ConfigController must implement get()');
    }
    config['ConfigController'] = controller;
  },

  getConfigController: function getConfigController() {
    return config['ConfigController'];
  },

  setFileController: function setFileController(controller) {
    if (typeof controller.saveFile !== 'function') {
      throw new Error('FileController must implement saveFile()');
    }
    if (typeof controller.saveBase64 !== 'function') {
      throw new Error('FileController must implement saveBase64()');
    }
    config['FileController'] = controller;
  },

  getFileController: function getFileController() {
    return config['FileController'];
  },

  setInstallationController: function setInstallationController(controller) {
    if (typeof controller.currentInstallationId !== 'function') {
      throw new Error('InstallationController must implement currentInstallationId()');
    }
    config['InstallationController'] = controller;
  },

  getInstallationController: function getInstallationController() {
    return config['InstallationController'];
  },

  setObjectController: function setObjectController(controller) {
    if (typeof controller.save !== 'function') {
      throw new Error('ObjectController must implement save()');
    }
    if (typeof controller.fetch !== 'function') {
      throw new Error('ObjectController must implement fetch()');
    }
    if (typeof controller.destroy !== 'function') {
      throw new Error('ObjectController must implement destroy()');
    }
    config['ObjectController'] = controller;
  },

  getObjectController: function getObjectController() {
    return config['ObjectController'];
  },

  setObjectStateController: function setObjectStateController(controller) {
    if (typeof controller.getState !== 'function') {
      throw new Error('ObjectStateController must implement getState()');
    }
    if (typeof controller.initializeState !== 'function') {
      throw new Error('ObjectStateController must implement initializeState()');
    }
    if (typeof controller.removeState !== 'function') {
      throw new Error('ObjectStateController must implement removeState()');
    }
    if (typeof controller.getServerData !== 'function') {
      throw new Error('ObjectStateController must implement getServerData()');
    }
    if (typeof controller.setServerData !== 'function') {
      throw new Error('ObjectStateController must implement setServerData()');
    }
    if (typeof controller.getPendingOps !== 'function') {
      throw new Error('ObjectStateController must implement getPendingOps()');
    }
    if (typeof controller.setPendingOp !== 'function') {
      throw new Error('ObjectStateController must implement setPendingOp()');
    }
    if (typeof controller.pushPendingState !== 'function') {
      throw new Error('ObjectStateController must implement pushPendingState()');
    }
    if (typeof controller.popPendingState !== 'function') {
      throw new Error('ObjectStateController must implement popPendingState()');
    }
    if (typeof controller.mergeFirstPendingState !== 'function') {
      throw new Error('ObjectStateController must implement mergeFirstPendingState()');
    }
    if (typeof controller.getObjectCache !== 'function') {
      throw new Error('ObjectStateController must implement getObjectCache()');
    }
    if (typeof controller.estimateAttribute !== 'function') {
      throw new Error('ObjectStateController must implement estimateAttribute()');
    }
    if (typeof controller.estimateAttributes !== 'function') {
      throw new Error('ObjectStateController must implement estimateAttributes()');
    }
    if (typeof controller.commitServerChanges !== 'function') {
      throw new Error('ObjectStateController must implement commitServerChanges()');
    }
    if (typeof controller.enqueueTask !== 'function') {
      throw new Error('ObjectStateController must implement enqueueTask()');
    }
    if (typeof controller.clearAllState !== 'function') {
      throw new Error('ObjectStateController must implement clearAllState()');
    }

    config['ObjectStateController'] = controller;
  },

  getObjectStateController: function getObjectStateController() {
    return config['ObjectStateController'];
  },

  setPushController: function setPushController(controller) {
    if (typeof controller.send !== 'function') {
      throw new Error('PushController must implement send()');
    }
    config['PushController'] = controller;
  },

  getPushController: function getPushController() {
    return config['PushController'];
  },

  setQueryController: function setQueryController(controller) {
    if (typeof controller.find !== 'function') {
      throw new Error('QueryController must implement find()');
    }
    config['QueryController'] = controller;
  },

  getQueryController: function getQueryController() {
    return config['QueryController'];
  },

  setRESTController: function setRESTController(controller) {
    if (typeof controller.request !== 'function') {
      throw new Error('RESTController must implement request()');
    }
    if (typeof controller.ajax !== 'function') {
      throw new Error('RESTController must implement ajax()');
    }
    config['RESTController'] = controller;
  },

  getRESTController: function getRESTController() {
    return config['RESTController'];
  },

  setSessionController: function setSessionController(controller) {
    if (typeof controller.getSession !== 'function') {
      throw new Error('A SessionController must implement getSession()');
    }
    config['SessionController'] = controller;
  },

  getSessionController: function getSessionController() {
    return config['SessionController'];
  },

  setStorageController: function setStorageController(controller) {
    if (controller.async) {
      if (typeof controller.getItemAsync !== 'function') {
        throw new Error('An async StorageController must implement getItemAsync()');
      }
      if (typeof controller.setItemAsync !== 'function') {
        throw new Error('An async StorageController must implement setItemAsync()');
      }
      if (typeof controller.removeItemAsync !== 'function') {
        throw new Error('An async StorageController must implement removeItemAsync()');
      }
    } else {
      if (typeof controller.getItem !== 'function') {
        throw new Error('A synchronous StorageController must implement getItem()');
      }
      if (typeof controller.setItem !== 'function') {
        throw new Error('A synchronous StorageController must implement setItem()');
      }
      if (typeof controller.removeItem !== 'function') {
        throw new Error('A synchonous StorageController must implement removeItem()');
      }
    }
    config['StorageController'] = controller;
  },

  getStorageController: function getStorageController() {
    return config['StorageController'];
  },

  setUserController: function setUserController(controller) {
    if (typeof controller.setCurrentUser !== 'function') {
      throw new Error('A UserController must implement setCurrentUser()');
    }
    if (typeof controller.currentUser !== 'function') {
      throw new Error('A UserController must implement currentUser()');
    }
    if (typeof controller.currentUserAsync !== 'function') {
      throw new Error('A UserController must implement currentUserAsync()');
    }
    if (typeof controller.signUp !== 'function') {
      throw new Error('A UserController must implement signUp()');
    }
    if (typeof controller.logIn !== 'function') {
      throw new Error('A UserController must implement logIn()');
    }
    if (typeof controller.become !== 'function') {
      throw new Error('A UserController must implement become()');
    }
    if (typeof controller.logOut !== 'function') {
      throw new Error('A UserController must implement logOut()');
    }
    if (typeof controller.requestPasswordReset !== 'function') {
      throw new Error('A UserController must implement requestPasswordReset()');
    }
    if (typeof controller.upgradeToRevocableSession !== 'function') {
      throw new Error('A UserController must implement upgradeToRevocableSession()');
    }
    if (typeof controller.linkWith !== 'function') {
      throw new Error('A UserController must implement linkWith()');
    }
    config['UserController'] = controller;
  },

  getUserController: function getUserController() {
    return config['UserController'];
  },

  setLiveQueryController: function setLiveQueryController(controller) {
    if (typeof controller.subscribe !== 'function') {
      throw new Error('LiveQueryController must implement subscribe()');
    }
    if (typeof controller.unsubscribe !== 'function') {
      throw new Error('LiveQueryController must implement unsubscribe()');
    }
    if (typeof controller.open !== 'function') {
      throw new Error('LiveQueryController must implement open()');
    }
    if (typeof controller.close !== 'function') {
      throw new Error('LiveQueryController must implement close()');
    }
    config['LiveQueryController'] = controller;
  },

  getLiveQueryController: function getLiveQueryController() {
    return config['LiveQueryController'];
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__(54)["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Constructs a new Parse.Error object with the given code and message.
 * @class Parse.Error
 * @constructor
 * @param {Number} code An error code constant from <code>Parse.Error</code>.
 * @param {String} message A detailed description of the error.
 */


var _classCallCheck = __webpack_require__(20)["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ParseError = function ParseError(code, message) {
  _classCallCheck(this, ParseError);

  this.code = code;
  this.message = message;
}

/**
 * Error code indicating some error other than those enumerated here.
 * @property OTHER_CAUSE
 * @static
 * @final
 */
;

exports["default"] = ParseError;
ParseError.OTHER_CAUSE = -1;

/**
 * Error code indicating that something has gone wrong with the server.
 * If you get this error code, it is Parse's fault. Contact us at
 * https://parse.com/help
 * @property INTERNAL_SERVER_ERROR
 * @static
 * @final
 */
ParseError.INTERNAL_SERVER_ERROR = 1;

/**
 * Error code indicating the connection to the Parse servers failed.
 * @property CONNECTION_FAILED
 * @static
 * @final
 */
ParseError.CONNECTION_FAILED = 100;

/**
 * Error code indicating the specified object doesn't exist.
 * @property OBJECT_NOT_FOUND
 * @static
 * @final
 */
ParseError.OBJECT_NOT_FOUND = 101;

/**
 * Error code indicating you tried to query with a datatype that doesn't
 * support it, like exact matching an array or object.
 * @property INVALID_QUERY
 * @static
 * @final
 */
ParseError.INVALID_QUERY = 102;

/**
 * Error code indicating a missing or invalid classname. Classnames are
 * case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the
 * only valid characters.
 * @property INVALID_CLASS_NAME
 * @static
 * @final
 */
ParseError.INVALID_CLASS_NAME = 103;

/**
 * Error code indicating an unspecified object id.
 * @property MISSING_OBJECT_ID
 * @static
 * @final
 */
ParseError.MISSING_OBJECT_ID = 104;

/**
 * Error code indicating an invalid key name. Keys are case-sensitive. They
 * must start with a letter, and a-zA-Z0-9_ are the only valid characters.
 * @property INVALID_KEY_NAME
 * @static
 * @final
 */
ParseError.INVALID_KEY_NAME = 105;

/**
 * Error code indicating a malformed pointer. You should not see this unless
 * you have been mucking about changing internal Parse code.
 * @property INVALID_POINTER
 * @static
 * @final
 */
ParseError.INVALID_POINTER = 106;

/**
 * Error code indicating that badly formed JSON was received upstream. This
 * either indicates you have done something unusual with modifying how
 * things encode to JSON, or the network is failing badly.
 * @property INVALID_JSON
 * @static
 * @final
 */
ParseError.INVALID_JSON = 107;

/**
 * Error code indicating that the feature you tried to access is only
 * available internally for testing purposes.
 * @property COMMAND_UNAVAILABLE
 * @static
 * @final
 */
ParseError.COMMAND_UNAVAILABLE = 108;

/**
 * You must call Parse.initialize before using the Parse library.
 * @property NOT_INITIALIZED
 * @static
 * @final
 */
ParseError.NOT_INITIALIZED = 109;

/**
 * Error code indicating that a field was set to an inconsistent type.
 * @property INCORRECT_TYPE
 * @static
 * @final
 */
ParseError.INCORRECT_TYPE = 111;

/**
 * Error code indicating an invalid channel name. A channel name is either
 * an empty string (the broadcast channel) or contains only a-zA-Z0-9_
 * characters and starts with a letter.
 * @property INVALID_CHANNEL_NAME
 * @static
 * @final
 */
ParseError.INVALID_CHANNEL_NAME = 112;

/**
 * Error code indicating that push is misconfigured.
 * @property PUSH_MISCONFIGURED
 * @static
 * @final
 */
ParseError.PUSH_MISCONFIGURED = 115;

/**
 * Error code indicating that the object is too large.
 * @property OBJECT_TOO_LARGE
 * @static
 * @final
 */
ParseError.OBJECT_TOO_LARGE = 116;

/**
 * Error code indicating that the operation isn't allowed for clients.
 * @property OPERATION_FORBIDDEN
 * @static
 * @final
 */
ParseError.OPERATION_FORBIDDEN = 119;

/**
 * Error code indicating the result was not found in the cache.
 * @property CACHE_MISS
 * @static
 * @final
 */
ParseError.CACHE_MISS = 120;

/**
 * Error code indicating that an invalid key was used in a nested
 * JSONObject.
 * @property INVALID_NESTED_KEY
 * @static
 * @final
 */
ParseError.INVALID_NESTED_KEY = 121;

/**
 * Error code indicating that an invalid filename was used for ParseFile.
 * A valid file name contains only a-zA-Z0-9_. characters and is between 1
 * and 128 characters.
 * @property INVALID_FILE_NAME
 * @static
 * @final
 */
ParseError.INVALID_FILE_NAME = 122;

/**
 * Error code indicating an invalid ACL was provided.
 * @property INVALID_ACL
 * @static
 * @final
 */
ParseError.INVALID_ACL = 123;

/**
 * Error code indicating that the request timed out on the server. Typically
 * this indicates that the request is too expensive to run.
 * @property TIMEOUT
 * @static
 * @final
 */
ParseError.TIMEOUT = 124;

/**
 * Error code indicating that the email address was invalid.
 * @property INVALID_EMAIL_ADDRESS
 * @static
 * @final
 */
ParseError.INVALID_EMAIL_ADDRESS = 125;

/**
 * Error code indicating a missing content type.
 * @property MISSING_CONTENT_TYPE
 * @static
 * @final
 */
ParseError.MISSING_CONTENT_TYPE = 126;

/**
 * Error code indicating a missing content length.
 * @property MISSING_CONTENT_LENGTH
 * @static
 * @final
 */
ParseError.MISSING_CONTENT_LENGTH = 127;

/**
 * Error code indicating an invalid content length.
 * @property INVALID_CONTENT_LENGTH
 * @static
 * @final
 */
ParseError.INVALID_CONTENT_LENGTH = 128;

/**
 * Error code indicating a file that was too large.
 * @property FILE_TOO_LARGE
 * @static
 * @final
 */
ParseError.FILE_TOO_LARGE = 129;

/**
 * Error code indicating an error saving a file.
 * @property FILE_SAVE_ERROR
 * @static
 * @final
 */
ParseError.FILE_SAVE_ERROR = 130;

/**
 * Error code indicating that a unique field was given a value that is
 * already taken.
 * @property DUPLICATE_VALUE
 * @static
 * @final
 */
ParseError.DUPLICATE_VALUE = 137;

/**
 * Error code indicating that a role's name is invalid.
 * @property INVALID_ROLE_NAME
 * @static
 * @final
 */
ParseError.INVALID_ROLE_NAME = 139;

/**
 * Error code indicating that an application quota was exceeded.  Upgrade to
 * resolve.
 * @property EXCEEDED_QUOTA
 * @static
 * @final
 */
ParseError.EXCEEDED_QUOTA = 140;

/**
 * Error code indicating that a Cloud Code script failed.
 * @property SCRIPT_FAILED
 * @static
 * @final
 */
ParseError.SCRIPT_FAILED = 141;

/**
 * Error code indicating that a Cloud Code validation failed.
 * @property VALIDATION_ERROR
 * @static
 * @final
 */
ParseError.VALIDATION_ERROR = 142;

/**
 * Error code indicating that invalid image data was provided.
 * @property INVALID_IMAGE_DATA
 * @static
 * @final
 */
ParseError.INVALID_IMAGE_DATA = 143;

/**
 * Error code indicating an unsaved file.
 * @property UNSAVED_FILE_ERROR
 * @static
 * @final
 */
ParseError.UNSAVED_FILE_ERROR = 151;

/**
 * Error code indicating an invalid push time.
 * @property INVALID_PUSH_TIME_ERROR
 * @static
 * @final
 */
ParseError.INVALID_PUSH_TIME_ERROR = 152;

/**
 * Error code indicating an error deleting a file.
 * @property FILE_DELETE_ERROR
 * @static
 * @final
 */
ParseError.FILE_DELETE_ERROR = 153;

/**
 * Error code indicating that the application has exceeded its request
 * limit.
 * @property REQUEST_LIMIT_EXCEEDED
 * @static
 * @final
 */
ParseError.REQUEST_LIMIT_EXCEEDED = 155;

/**
 * Error code indicating an invalid event name.
 * @property INVALID_EVENT_NAME
 * @static
 * @final
 */
ParseError.INVALID_EVENT_NAME = 160;

/**
 * Error code indicating that the username is missing or empty.
 * @property USERNAME_MISSING
 * @static
 * @final
 */
ParseError.USERNAME_MISSING = 200;

/**
 * Error code indicating that the password is missing or empty.
 * @property PASSWORD_MISSING
 * @static
 * @final
 */
ParseError.PASSWORD_MISSING = 201;

/**
 * Error code indicating that the username has already been taken.
 * @property USERNAME_TAKEN
 * @static
 * @final
 */
ParseError.USERNAME_TAKEN = 202;

/**
 * Error code indicating that the email has already been taken.
 * @property EMAIL_TAKEN
 * @static
 * @final
 */
ParseError.EMAIL_TAKEN = 203;

/**
 * Error code indicating that the email is missing, but must be specified.
 * @property EMAIL_MISSING
 * @static
 * @final
 */
ParseError.EMAIL_MISSING = 204;

/**
 * Error code indicating that a user with the specified email was not found.
 * @property EMAIL_NOT_FOUND
 * @static
 * @final
 */
ParseError.EMAIL_NOT_FOUND = 205;

/**
 * Error code indicating that a user object without a valid session could
 * not be altered.
 * @property SESSION_MISSING
 * @static
 * @final
 */
ParseError.SESSION_MISSING = 206;

/**
 * Error code indicating that a user can only be created through signup.
 * @property MUST_CREATE_USER_THROUGH_SIGNUP
 * @static
 * @final
 */
ParseError.MUST_CREATE_USER_THROUGH_SIGNUP = 207;

/**
 * Error code indicating that an an account being linked is already linked
 * to another user.
 * @property ACCOUNT_ALREADY_LINKED
 * @static
 * @final
 */
ParseError.ACCOUNT_ALREADY_LINKED = 208;

/**
 * Error code indicating that the current session token is invalid.
 * @property INVALID_SESSION_TOKEN
 * @static
 * @final
 */
ParseError.INVALID_SESSION_TOKEN = 209;

/**
 * Error code indicating that a user cannot be linked to an account because
 * that account's id could not be found.
 * @property LINKED_ID_MISSING
 * @static
 * @final
 */
ParseError.LINKED_ID_MISSING = 250;

/**
 * Error code indicating that a user with a linked (e.g. Facebook) account
 * has an invalid session.
 * @property INVALID_LINKED_SESSION
 * @static
 * @final
 */
ParseError.INVALID_LINKED_SESSION = 251;

/**
 * Error code indicating that a service being linked (e.g. Facebook or
 * Twitter) is unsupported.
 * @property UNSUPPORTED_SERVICE
 * @static
 * @final
 */
ParseError.UNSUPPORTED_SERVICE = 252;

/**
 * Error code indicating that there were multiple errors. Aggregate errors
 * have an "errors" property, which is an array of error objects with more
 * detail about each error that occurred.
 * @property AGGREGATE_ERROR
 * @static
 * @final
 */
ParseError.AGGREGATE_ERROR = 600;

/**
 * Error code indicating the client was unable to read an input file.
 * @property FILE_READ_ERROR
 * @static
 * @final
 */
ParseError.FILE_READ_ERROR = 601;

/**
 * Error code indicating a real error code is unavailable because
 * we had to use an XDomainRequest object to allow CORS requests in
 * Internet Explorer, which strips the body from HTTP responses that have
 * a non-2XX status code.
 * @property X_DOMAIN_REQUEST
 * @static
 * @final
 */
ParseError.X_DOMAIN_REQUEST = 602;
module.exports = exports["default"];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

function b64Digit(number) {
  if (number < 26) {
    return String.fromCharCode(65 + number);
  }
  if (number < 52) {
    return String.fromCharCode(97 + (number - 26));
  }
  if (number < 62) {
    return String.fromCharCode(48 + (number - 52));
  }
  if (number === 62) {
    return '+';
  }
  if (number === 63) {
    return '/';
  }
  throw new TypeError('Tried to encode large digit ' + number + ' in base64.');
}

/**
 * A Parse.File is a local representation of a file that is saved to the Parse
 * cloud.
 * @class Parse.File
 * @constructor
 * @param name {String} The file's name. This will be prefixed by a unique
 *     value once the file has finished saving. The file name must begin with
 *     an alphanumeric character, and consist of alphanumeric characters,
 *     periods, spaces, underscores, or dashes.
 * @param data {Array} The data for the file, as either:
 *     1. an Array of byte value Numbers, or
 *     2. an Object like { base64: "..." } with a base64-encoded String.
 *     3. a File object selected with a file upload control. (3) only works
 *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
 *        For example:<pre>
 * var fileUploadControl = $("#profilePhotoFileUpload")[0];
 * if (fileUploadControl.files.length > 0) {
 *   var file = fileUploadControl.files[0];
 *   var name = "photo.jpg";
 *   var parseFile = new Parse.File(name, file);
 *   parseFile.save().then(function() {
 *     // The file has been saved to Parse.
 *   }, function(error) {
 *     // The file either could not be read, or could not be saved to Parse.
 *   });
 * }</pre>
 * @param type {String} Optional Content-Type header to use for the file. If
 *     this is omitted, the content type will be inferred from the name's
 *     extension.
 */

var ParseFile = (function () {
  function ParseFile(name, data, type) {
    _classCallCheck(this, ParseFile);

    var specifiedType = type || '';

    this._name = name;

    if (Array.isArray(data)) {
      this._source = {
        format: 'base64',
        base64: ParseFile.encodeBase64(data),
        type: specifiedType
      };
    } else if (typeof File !== 'undefined' && data instanceof File) {
      this._source = {
        format: 'file',
        file: data,
        type: specifiedType
      };
    } else if (data && data.hasOwnProperty('base64')) {
      var matches = /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,(\S+)/.exec(data.base64);
      if (matches && matches.length > 0) {
        // if data URI with type and charset, there will be 4 matches.
        this._source = {
          format: 'base64',
          base64: matches.length === 4 ? matches[3] : matches[2],
          type: matches[1]
        };
      } else {
        this._source = {
          format: 'base64',
          base64: data.base64,
          type: specifiedType
        };
      }
    } else if (typeof data !== 'undefined') {
      throw new TypeError('Cannot create a Parse.File with that data.');
    }
  }

  /**
   * Gets the name of the file. Before save is called, this is the filename
   * given by the user. After save is called, that name gets prefixed with a
   * unique identifier.
   * @method name
   * @return {String}
   */

  _createClass(ParseFile, [{
    key: 'name',
    value: function name() {
      return this._name;
    }

    /**
     * Gets the url of the file. It is only available after you save the file or
     * after you get the file from a Parse.Object.
     * @method url
     * @param {Object} options An object to specify url options
     * @return {String}
     */
  }, {
    key: 'url',
    value: function url(options) {
      options = options || {};
      if (!this._url) {
        return;
      }
      if (options.forceSecure) {
        return this._url.replace(/^http:\/\//i, 'https://');
      } else {
        return this._url;
      }
    }

    /**
     * Saves the file to the Parse cloud.
     * @method save
     * @param {Object} options A Backbone-style options object.
     * @return {Parse.Promise} Promise that is resolved when the save finishes.
     */
  }, {
    key: 'save',
    value: function save(options) {
      var _this = this;

      options = options || {};
      var controller = _CoreManager2['default'].getFileController();
      if (!this._previousSave) {
        if (this._source.format === 'file') {
          this._previousSave = controller.saveFile(this._name, this._source).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        } else {
          this._previousSave = controller.saveBase64(this._name, this._source).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        }
      }
      if (this._previousSave) {
        return this._previousSave._thenRunCallbacks(options);
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        __type: 'File',
        name: this._name,
        url: this._url
      };
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      if (this === other) {
        return true;
      }
      // Unsaved Files are never equal, since they will be saved to different URLs
      return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(obj) {
      if (obj.__type !== 'File') {
        throw new TypeError('JSON object does not represent a ParseFile');
      }
      var file = new ParseFile(obj.name);
      file._url = obj.url;
      return file;
    }
  }, {
    key: 'encodeBase64',
    value: function encodeBase64(bytes) {
      var chunks = [];
      chunks.length = Math.ceil(bytes.length / 3);
      for (var i = 0; i < chunks.length; i++) {
        var b1 = bytes[i * 3];
        var b2 = bytes[i * 3 + 1] || 0;
        var b3 = bytes[i * 3 + 2] || 0;

        var has2 = i * 3 + 1 < bytes.length;
        var has3 = i * 3 + 2 < bytes.length;

        chunks[i] = [b64Digit(b1 >> 2 & 0x3F), b64Digit(b1 << 4 & 0x30 | b2 >> 4 & 0x0F), has2 ? b64Digit(b2 << 2 & 0x3C | b3 >> 6 & 0x03) : '=', has3 ? b64Digit(b3 & 0x3F) : '='].join('');
      }

      return chunks.join('');
    }
  }]);

  return ParseFile;
})();

exports['default'] = ParseFile;

_CoreManager2['default'].setFileController({
  saveFile: function saveFile(name, source) {
    if (source.format !== 'file') {
      throw new Error('saveFile can only be used with File-type sources.');
    }
    // To directly upload a File, we use a REST-style AJAX request
    var headers = {
      'X-Parse-Application-ID': _CoreManager2['default'].get('APPLICATION_ID'),
      'X-Parse-JavaScript-Key': _CoreManager2['default'].get('JAVASCRIPT_KEY')
    };
    var url = _CoreManager2['default'].get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += 'files/' + name;
    return _CoreManager2['default'].getRESTController().ajax('POST', url, source.file, headers);
  },

  saveBase64: function saveBase64(name, source) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }
    var data = {
      base64: source.base64
    };
    if (source.type) {
      data._ContentType = source.type;
    }

    return _CoreManager2['default'].getRESTController().request('POST', 'files/' + name, data);
  }
});
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var store  = __webpack_require__(114)('wks')
  , uid    = __webpack_require__(62)
  , Symbol = __webpack_require__(49).Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseOp = __webpack_require__(37);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseQuery = __webpack_require__(51);

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

/**
 * Creates a new Relation for the given parent object and key. This
 * constructor should rarely be used directly, but rather created by
 * Parse.Object.relation.
 * @class Parse.Relation
 * @constructor
 * @param {Parse.Object} parent The parent of this relation.
 * @param {String} key The key for this relation on the parent.
 *
 * <p>
 * A class that is used to access all of the children of a many-to-many
 * relationship.  Each instance of Parse.Relation is associated with a
 * particular parent object and key.
 * </p>
 */

var ParseRelation = (function () {
  function ParseRelation(parent, key) {
    _classCallCheck(this, ParseRelation);

    this.parent = parent;
    this.key = key;
    this.targetClassName = null;
  }

  /**
   * Makes sure that this relation has the right parent and key.
   */

  _createClass(ParseRelation, [{
    key: '_ensureParentAndKey',
    value: function _ensureParentAndKey(parent, key) {
      this.key = this.key || key;
      if (this.key !== key) {
        throw new Error('Internal Error. Relation retrieved from two different keys.');
      }
      if (this.parent) {
        if (this.parent.className !== parent.className) {
          throw new Error('Internal Error. Relation retrieved from two different Objects.');
        }
        if (this.parent.id) {
          if (this.parent.id !== parent.id) {
            throw new Error('Internal Error. Relation retrieved from two different Objects.');
          }
        } else if (parent.id) {
          this.parent = parent;
        }
      } else {
        this.parent = parent;
      }
    }

    /**
     * Adds a Parse.Object or an array of Parse.Objects to the relation.
     * @method add
     * @param {} objects The item or items to add.
     */
  }, {
    key: 'add',
    value: function add(objects) {
      if (!Array.isArray(objects)) {
        objects = [objects];
      }

      var change = new _ParseOp.RelationOp(objects, []);
      this.parent.set(this.key, change);
      this.targetClassName = change._targetClassName;
      return this.parent;
    }

    /**
     * Removes a Parse.Object or an array of Parse.Objects from this relation.
     * @method remove
     * @param {} objects The item or items to remove.
     */
  }, {
    key: 'remove',
    value: function remove(objects) {
      if (!Array.isArray(objects)) {
        objects = [objects];
      }

      var change = new _ParseOp.RelationOp([], objects);
      this.parent.set(this.key, change);
      this.targetClassName = change._targetClassName;
    }

    /**
     * Returns a JSON version of the object suitable for saving to disk.
     * @method toJSON
     * @return {Object}
     */
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        __type: 'Relation',
        className: this.targetClassName
      };
    }

    /**
     * Returns a Parse.Query that is limited to objects in this
     * relation.
     * @method query
     * @return {Parse.Query}
     */
  }, {
    key: 'query',
    value: function query() {
      var query;
      if (!this.targetClassName) {
        query = new _ParseQuery2['default'](this.parent.className);
        query._extraOptions.redirectClassNameForKey = this.key;
      } else {
        query = new _ParseQuery2['default'](this.targetClassName);
      }
      query._addCondition('$relatedTo', 'object', {
        __type: 'Pointer',
        className: this.parent.className,
        objectId: this.parent.id
      });
      query._addCondition('$relatedTo', 'key', this.key);

      return query;
    }
  }]);

  return ParseRelation;
})();

exports['default'] = ParseRelation;
module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$getOwnPropertyDescriptor = __webpack_require__(97)["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$create = __webpack_require__(70)["default"];

var _Object$setPrototypeOf = __webpack_require__(101)["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _Object$keys = __webpack_require__(47)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseACL = __webpack_require__(35);

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = __webpack_require__(44);

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseOp = __webpack_require__(37);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var toString = Object.prototype.toString;

function encode(value, disallowObjects, forcePointers, seen) {
  if (value instanceof _ParseObject2['default']) {
    if (disallowObjects) {
      throw new Error('Parse Objects not allowed here');
    }
    var seenEntry = value.id ? value.className + ':' + value.id : value;
    if (forcePointers || !seen || seen.indexOf(seenEntry) > -1 || value.dirty() || _Object$keys(value._getServerData()).length < 1) {
      return value.toPointer();
    }
    seen = seen.concat(seenEntry);
    return value._toFullJSON(seen);
  }
  if (value instanceof _ParseOp.Op || value instanceof _ParseACL2['default'] || value instanceof _ParseGeoPoint2['default'] || value instanceof _ParseRelation2['default']) {
    return value.toJSON();
  }
  if (value instanceof _ParseFile2['default']) {
    if (!value.url()) {
      throw new Error('Tried to encode an unsaved file.');
    }
    return value.toJSON();
  }
  if (toString.call(value) === '[object Date]') {
    if (isNaN(value)) {
      throw new Error('Tried to encode an invalid date.');
    }
    return { __type: 'Date', iso: value.toJSON() };
  }
  if (toString.call(value) === '[object RegExp]' && typeof value.source === 'string') {
    return value.source;
  }

  if (Array.isArray(value)) {
    return value.map(function (v) {
      return encode(v, disallowObjects, forcePointers, seen);
    });
  }

  if (value && typeof value === 'object') {
    var output = {};
    for (var k in value) {
      output[k] = encode(value[k], disallowObjects, forcePointers, seen);
    }
    return output;
  }

  return value;
}

exports['default'] = function (value, disallowObjects, forcePointers, seen) {
  return encode(value, !!disallowObjects, !!forcePointers, seen || []);
};

module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _Object$keys = __webpack_require__(47)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseRole = __webpack_require__(67);

var _ParseRole2 = _interopRequireDefault(_ParseRole);

var _ParseUser = __webpack_require__(53);

var _ParseUser2 = _interopRequireDefault(_ParseUser);

var PUBLIC_KEY = '*';

/**
 * Creates a new ACL.
 * If no argument is given, the ACL has no permissions for anyone.
 * If the argument is a Parse.User, the ACL will have read and write
 *   permission for only that user.
 * If the argument is any other JSON object, that object will be interpretted
 *   as a serialized ACL created with toJSON().
 * @class Parse.ACL
 * @constructor
 *
 * <p>An ACL, or Access Control List can be added to any
 * <code>Parse.Object</code> to restrict access to only a subset of users
 * of your application.</p>
 */

var ParseACL = (function () {
  function ParseACL(arg1) {
    _classCallCheck(this, ParseACL);

    this.permissionsById = {};
    if (arg1 && typeof arg1 === 'object') {
      if (arg1 instanceof _ParseUser2['default']) {
        this.setReadAccess(arg1, true);
        this.setWriteAccess(arg1, true);
      } else {
        for (var userId in arg1) {
          var accessList = arg1[userId];
          if (typeof userId !== 'string') {
            throw new TypeError('Tried to create an ACL with an invalid user id.');
          }
          this.permissionsById[userId] = {};
          for (var permission in accessList) {
            var allowed = accessList[permission];
            if (permission !== 'read' && permission !== 'write') {
              throw new TypeError('Tried to create an ACL with an invalid permission type.');
            }
            if (typeof allowed !== 'boolean') {
              throw new TypeError('Tried to create an ACL with an invalid permission value.');
            }
            this.permissionsById[userId][permission] = allowed;
          }
        }
      }
    } else if (typeof arg1 === 'function') {
      throw new TypeError('ParseACL constructed with a function. Did you forget ()?');
    }
  }

  /**
   * Returns a JSON-encoded version of the ACL.
   * @method toJSON
   * @return {Object}
   */

  _createClass(ParseACL, [{
    key: 'toJSON',
    value: function toJSON() {
      var permissions = {};
      for (var p in this.permissionsById) {
        permissions[p] = this.permissionsById[p];
      }
      return permissions;
    }

    /**
     * Returns whether this ACL is equal to another object
     * @method equals
     * @param other The other object to compare to
     * @return {Boolean}
     */
  }, {
    key: 'equals',
    value: function equals(other) {
      if (!(other instanceof ParseACL)) {
        return false;
      }
      var users = _Object$keys(this.permissionsById);
      var otherUsers = _Object$keys(other.permissionsById);
      if (users.length !== otherUsers.length) {
        return false;
      }
      for (var u in this.permissionsById) {
        if (!other.permissionsById[u]) {
          return false;
        }
        if (this.permissionsById[u].read !== other.permissionsById[u].read) {
          return false;
        }
        if (this.permissionsById[u].write !== other.permissionsById[u].write) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: '_setAccess',
    value: function _setAccess(accessType, userId, allowed) {
      if (userId instanceof _ParseUser2['default']) {
        userId = userId.id;
      } else if (userId instanceof _ParseRole2['default']) {
        userId = 'role:' + userId.getName();
      }
      if (typeof userId !== 'string') {
        throw new TypeError('userId must be a string.');
      }
      if (typeof allowed !== 'boolean') {
        throw new TypeError('allowed must be either true or false.');
      }
      var permissions = this.permissionsById[userId];
      if (!permissions) {
        if (!allowed) {
          // The user already doesn't have this permission, so no action is needed
          return;
        } else {
          permissions = {};
          this.permissionsById[userId] = permissions;
        }
      }

      if (allowed) {
        this.permissionsById[userId][accessType] = true;
      } else {
        delete permissions[accessType];
        if (_Object$keys(permissions).length === 0) {
          delete this.permissionsById[userId];
        }
      }
    }
  }, {
    key: '_getAccess',
    value: function _getAccess(accessType, userId) {
      if (userId instanceof _ParseUser2['default']) {
        userId = userId.id;
      } else if (userId instanceof _ParseRole2['default']) {
        userId = 'role:' + userId.getName();
      }
      var permissions = this.permissionsById[userId];
      if (!permissions) {
        return false;
      }
      return !!permissions[accessType];
    }

    /**
     * Sets whether the given user is allowed to read this object.
     * @method setReadAccess
     * @param userId An instance of Parse.User or its objectId.
     * @param {Boolean} allowed Whether that user should have read access.
     */
  }, {
    key: 'setReadAccess',
    value: function setReadAccess(userId, allowed) {
      this._setAccess('read', userId, allowed);
    }

    /**
     * Get whether the given user id is *explicitly* allowed to read this object.
     * Even if this returns false, the user may still be able to access it if
     * getPublicReadAccess returns true or a role that the user belongs to has
     * write access.
     * @method getReadAccess
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */
  }, {
    key: 'getReadAccess',
    value: function getReadAccess(userId) {
      return this._getAccess('read', userId);
    }

    /**
     * Sets whether the given user id is allowed to write this object.
     * @method setWriteAccess
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role..
     * @param {Boolean} allowed Whether that user should have write access.
     */
  }, {
    key: 'setWriteAccess',
    value: function setWriteAccess(userId, allowed) {
      this._setAccess('write', userId, allowed);
    }

    /**
     * Gets whether the given user id is *explicitly* allowed to write this object.
     * Even if this returns false, the user may still be able to write it if
     * getPublicWriteAccess returns true or a role that the user belongs to has
     * write access.
     * @method getWriteAccess
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */
  }, {
    key: 'getWriteAccess',
    value: function getWriteAccess(userId) {
      return this._getAccess('write', userId);
    }

    /**
     * Sets whether the public is allowed to read this object.
     * @method setPublicReadAccess
     * @param {Boolean} allowed
     */
  }, {
    key: 'setPublicReadAccess',
    value: function setPublicReadAccess(allowed) {
      this.setReadAccess(PUBLIC_KEY, allowed);
    }

    /**
     * Gets whether the public is allowed to read this object.
     * @method getPublicReadAccess
     * @return {Boolean}
     */
  }, {
    key: 'getPublicReadAccess',
    value: function getPublicReadAccess() {
      return this.getReadAccess(PUBLIC_KEY);
    }

    /**
     * Sets whether the public is allowed to write this object.
     * @method setPublicWriteAccess
     * @param {Boolean} allowed
     */
  }, {
    key: 'setPublicWriteAccess',
    value: function setPublicWriteAccess(allowed) {
      this.setWriteAccess(PUBLIC_KEY, allowed);
    }

    /**
     * Gets whether the public is allowed to write this object.
     * @method getPublicWriteAccess
     * @return {Boolean}
     */
  }, {
    key: 'getPublicWriteAccess',
    value: function getPublicWriteAccess() {
      return this.getWriteAccess(PUBLIC_KEY);
    }

    /**
     * Gets whether users belonging to the given role are allowed
     * to read this object. Even if this returns false, the role may
     * still be able to write it if a parent role has read access.
     *
     * @method getRoleReadAccess
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has read access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'getRoleReadAccess',
    value: function getRoleReadAccess(role) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      return this.getReadAccess('role:' + role);
    }

    /**
     * Gets whether users belonging to the given role are allowed
     * to write this object. Even if this returns false, the role may
     * still be able to write it if a parent role has write access.
     *
     * @method getRoleWriteAccess
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has write access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'getRoleWriteAccess',
    value: function getRoleWriteAccess(role) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      return this.getWriteAccess('role:' + role);
    }

    /**
     * Sets whether users belonging to the given role are allowed
     * to read this object.
     *
     * @method setRoleReadAccess
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can read this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'setRoleReadAccess',
    value: function setRoleReadAccess(role, allowed) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      this.setReadAccess('role:' + role, allowed);
    }

    /**
     * Sets whether users belonging to the given role are allowed
     * to write this object.
     *
     * @method setRoleWriteAccess
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can write this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'setRoleWriteAccess',
    value: function setRoleWriteAccess(role, allowed) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      this.setWriteAccess('role:' + role, allowed);
    }
  }]);

  return ParseACL;
})();

exports['default'] = ParseACL;
module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var $          = __webpack_require__(25)
  , createDesc = __webpack_require__(73);
module.exports = __webpack_require__(50) ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.opFromJSON = opFromJSON;

var _arrayContainsObject = __webpack_require__(78);

var _arrayContainsObject2 = _interopRequireDefault(_arrayContainsObject);

var _decode = __webpack_require__(38);

var _decode2 = _interopRequireDefault(_decode);

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _unique = __webpack_require__(79);

var _unique2 = _interopRequireDefault(_unique);

function opFromJSON(json) {
  if (!json || !json.__op) {
    return null;
  }
  switch (json.__op) {
    case 'Delete':
      return new UnsetOp();
    case 'Increment':
      return new IncrementOp(json.amount);
    case 'Add':
      return new AddOp((0, _decode2['default'])(json.objects));
    case 'AddUnique':
      return new AddUniqueOp((0, _decode2['default'])(json.objects));
    case 'Remove':
      return new RemoveOp((0, _decode2['default'])(json.objects));
    case 'AddRelation':
      var toAdd = (0, _decode2['default'])(json.objects);
      if (!Array.isArray(toAdd)) {
        return new RelationOp([], []);
      }
      return new RelationOp(toAdd, []);
    case 'RemoveRelation':
      var toRemove = (0, _decode2['default'])(json.objects);
      if (!Array.isArray(toRemove)) {
        return new RelationOp([], []);
      }
      return new RelationOp([], toRemove);
    case 'Batch':
      var toAdd = [];
      var toRemove = [];
      for (var i = 0; i < json.ops.length; i++) {
        if (json.ops[i].__op === 'AddRelation') {
          toAdd = toAdd.concat((0, _decode2['default'])(json.ops[i].objects));
        } else if (json.ops[i].__op === 'RemoveRelation') {
          toRemove = toRemove.concat((0, _decode2['default'])(json.ops[i].objects));
        }
      }
      return new RelationOp(toAdd, toRemove);
  }
  return null;
}

var Op = (function () {
  function Op() {
    _classCallCheck(this, Op);
  }

  _createClass(Op, [{
    key: 'applyTo',

    // Empty parent class
    value: function applyTo(value) {}
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {}
  }, {
    key: 'toJSON',
    value: function toJSON() {}
  }]);

  return Op;
})();

exports.Op = Op;

var SetOp = (function (_Op) {
  _inherits(SetOp, _Op);

  function SetOp(value) {
    _classCallCheck(this, SetOp);

    _get(Object.getPrototypeOf(SetOp.prototype), 'constructor', this).call(this);
    this._value = value;
  }

  _createClass(SetOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      return this._value;
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      return new SetOp(this._value);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return (0, _encode2['default'])(this._value, false, true);
    }
  }]);

  return SetOp;
})(Op);

exports.SetOp = SetOp;

var UnsetOp = (function (_Op2) {
  _inherits(UnsetOp, _Op2);

  function UnsetOp() {
    _classCallCheck(this, UnsetOp);

    _get(Object.getPrototypeOf(UnsetOp.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(UnsetOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      return undefined;
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      return new UnsetOp();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Delete' };
    }
  }]);

  return UnsetOp;
})(Op);

exports.UnsetOp = UnsetOp;

var IncrementOp = (function (_Op3) {
  _inherits(IncrementOp, _Op3);

  function IncrementOp(amount) {
    _classCallCheck(this, IncrementOp);

    _get(Object.getPrototypeOf(IncrementOp.prototype), 'constructor', this).call(this);
    if (typeof amount !== 'number') {
      throw new TypeError('Increment Op must be initialized with a numeric amount.');
    }
    this._amount = amount;
  }

  _createClass(IncrementOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (typeof value === 'undefined') {
        return this._amount;
      }
      if (typeof value !== 'number') {
        throw new TypeError('Cannot increment a non-numeric value.');
      }
      return this._amount + value;
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new SetOp(this._amount);
      }
      if (previous instanceof IncrementOp) {
        return new IncrementOp(this.applyTo(previous._amount));
      }
      throw new Error('Cannot merge Increment Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Increment', amount: this._amount };
    }
  }]);

  return IncrementOp;
})(Op);

exports.IncrementOp = IncrementOp;

var AddOp = (function (_Op4) {
  _inherits(AddOp, _Op4);

  function AddOp(value) {
    _classCallCheck(this, AddOp);

    _get(Object.getPrototypeOf(AddOp.prototype), 'constructor', this).call(this);
    this._value = Array.isArray(value) ? value : [value];
  }

  _createClass(AddOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (value == null) {
        return this._value;
      }
      if (Array.isArray(value)) {
        return value.concat(this._value);
      }
      throw new Error('Cannot add elements to a non-array value');
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new SetOp(this._value);
      }
      if (previous instanceof AddOp) {
        return new AddOp(this.applyTo(previous._value));
      }
      throw new Error('Cannot merge Add Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Add', objects: (0, _encode2['default'])(this._value, false, true) };
    }
  }]);

  return AddOp;
})(Op);

exports.AddOp = AddOp;

var AddUniqueOp = (function (_Op5) {
  _inherits(AddUniqueOp, _Op5);

  function AddUniqueOp(value) {
    _classCallCheck(this, AddUniqueOp);

    _get(Object.getPrototypeOf(AddUniqueOp.prototype), 'constructor', this).call(this);
    this._value = (0, _unique2['default'])(Array.isArray(value) ? value : [value]);
  }

  _createClass(AddUniqueOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (value == null) {
        return this._value || [];
      }
      if (Array.isArray(value)) {
        // copying value lets Flow guarantee the pointer isn't modified elsewhere
        var valueCopy = value;
        var toAdd = [];
        this._value.forEach(function (v) {
          if (v instanceof _ParseObject2['default']) {
            if (!(0, _arrayContainsObject2['default'])(valueCopy, v)) {
              toAdd.push(v);
            }
          } else {
            if (valueCopy.indexOf(v) < 0) {
              toAdd.push(v);
            }
          }
        });
        return value.concat(toAdd);
      }
      throw new Error('Cannot add elements to a non-array value');
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new SetOp(this._value);
      }
      if (previous instanceof AddUniqueOp) {
        return new AddUniqueOp(this.applyTo(previous._value));
      }
      throw new Error('Cannot merge AddUnique Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'AddUnique', objects: (0, _encode2['default'])(this._value, false, true) };
    }
  }]);

  return AddUniqueOp;
})(Op);

exports.AddUniqueOp = AddUniqueOp;

var RemoveOp = (function (_Op6) {
  _inherits(RemoveOp, _Op6);

  function RemoveOp(value) {
    _classCallCheck(this, RemoveOp);

    _get(Object.getPrototypeOf(RemoveOp.prototype), 'constructor', this).call(this);
    this._value = (0, _unique2['default'])(Array.isArray(value) ? value : [value]);
  }

  _createClass(RemoveOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (value == null) {
        return [];
      }
      if (Array.isArray(value)) {
        var i = value.indexOf(this._value);
        var removed = value.concat([]);
        for (var i = 0; i < this._value.length; i++) {
          var index = removed.indexOf(this._value[i]);
          while (index > -1) {
            removed.splice(index, 1);
            index = removed.indexOf(this._value[i]);
          }
          if (this._value[i] instanceof _ParseObject2['default'] && this._value[i].id) {
            for (var j = 0; j < removed.length; j++) {
              if (removed[j] instanceof _ParseObject2['default'] && this._value[i].id === removed[j].id) {
                removed.splice(j, 1);
                j--;
              }
            }
          }
        }
        return removed;
      }
      throw new Error('Cannot remove elements from a non-array value');
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new UnsetOp();
      }
      if (previous instanceof RemoveOp) {
        var uniques = previous._value.concat([]);
        for (var i = 0; i < this._value.length; i++) {
          if (this._value[i] instanceof _ParseObject2['default']) {
            if (!(0, _arrayContainsObject2['default'])(uniques, this._value[i])) {
              uniques.push(this._value[i]);
            }
          } else {
            if (uniques.indexOf(this._value[i]) < 0) {
              uniques.push(this._value[i]);
            }
          }
        }
        return new RemoveOp(uniques);
      }
      throw new Error('Cannot merge Remove Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Remove', objects: (0, _encode2['default'])(this._value, false, true) };
    }
  }]);

  return RemoveOp;
})(Op);

exports.RemoveOp = RemoveOp;

var RelationOp = (function (_Op7) {
  _inherits(RelationOp, _Op7);

  function RelationOp(adds, removes) {
    _classCallCheck(this, RelationOp);

    _get(Object.getPrototypeOf(RelationOp.prototype), 'constructor', this).call(this);
    this._targetClassName = null;

    if (Array.isArray(adds)) {
      this.relationsToAdd = (0, _unique2['default'])(adds.map(this._extractId, this));
    }

    if (Array.isArray(removes)) {
      this.relationsToRemove = (0, _unique2['default'])(removes.map(this._extractId, this));
    }
  }

  _createClass(RelationOp, [{
    key: '_extractId',
    value: function _extractId(obj) {
      if (typeof obj === 'string') {
        return obj;
      }
      if (!obj.id) {
        throw new Error('You cannot add or remove an unsaved Parse Object from a relation');
      }
      if (!this._targetClassName) {
        this._targetClassName = obj.className;
      }
      if (this._targetClassName !== obj.className) {
        throw new Error('Tried to create a Relation with 2 different object types: ' + this._targetClassName + ' and ' + obj.className + '.');
      }
      return obj.id;
    }
  }, {
    key: 'applyTo',
    value: function applyTo(value, object, key) {
      if (!value) {
        var parent = new _ParseObject2['default'](object.className);
        if (object.id && object.id.indexOf('local') === 0) {
          parent._localId = object.id;
        } else if (object.id) {
          parent.id = object.id;
        }
        var relation = new _ParseRelation2['default'](parent, key);
        relation.targetClassName = this._targetClassName;
        return relation;
      }
      if (value instanceof _ParseRelation2['default']) {
        if (this._targetClassName) {
          if (value.targetClassName) {
            if (this._targetClassName !== value.targetClassName) {
              throw new Error('Related object must be a ' + value.targetClassName + ', but a ' + this._targetClassName + ' was passed in.');
            }
          } else {
            value.targetClassName = this._targetClassName;
          }
        }
        return value;
      } else {
        throw new Error('Relation cannot be applied to a non-relation field');
      }
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      } else if (previous instanceof UnsetOp) {
        throw new Error('You cannot modify a relation after deleting it.');
      } else if (previous instanceof RelationOp) {
        if (previous._targetClassName && previous._targetClassName !== this._targetClassName) {
          throw new Error('Related object must be of class ' + previous._targetClassName + ', but ' + (this._targetClassName || 'null') + ' was passed in.');
        }
        var newAdd = previous.relationsToAdd.concat([]);
        this.relationsToRemove.forEach(function (r) {
          var index = newAdd.indexOf(r);
          if (index > -1) {
            newAdd.splice(index, 1);
          }
        });
        this.relationsToAdd.forEach(function (r) {
          var index = newAdd.indexOf(r);
          if (index < 0) {
            newAdd.push(r);
          }
        });

        var newRemove = previous.relationsToRemove.concat([]);
        this.relationsToAdd.forEach(function (r) {
          var index = newRemove.indexOf(r);
          if (index > -1) {
            newRemove.splice(index, 1);
          }
        });
        this.relationsToRemove.forEach(function (r) {
          var index = newRemove.indexOf(r);
          if (index < 0) {
            newRemove.push(r);
          }
        });

        var newRelation = new RelationOp(newAdd, newRemove);
        newRelation._targetClassName = this._targetClassName;
        return newRelation;
      }
      throw new Error('Cannot merge Relation Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var _this = this;

      var idToPointer = function idToPointer(id) {
        return {
          __type: 'Pointer',
          className: _this._targetClassName,
          objectId: id
        };
      };

      var adds = null;
      var removes = null;
      var pointers = null;

      if (this.relationsToAdd.length > 0) {
        pointers = this.relationsToAdd.map(idToPointer);
        adds = { __op: 'AddRelation', objects: pointers };
      }
      if (this.relationsToRemove.length > 0) {
        pointers = this.relationsToRemove.map(idToPointer);
        removes = { __op: 'RemoveRelation', objects: pointers };
      }

      if (adds && removes) {
        return { __op: 'Batch', ops: [adds, removes] };
      }

      return adds || removes || {};
    }
  }]);

  return RelationOp;
})(Op);

exports.RelationOp = RelationOp;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = decode;

var _ParseACL = __webpack_require__(35);

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = __webpack_require__(44);

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseOp = __webpack_require__(37);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function decode(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    var dup = [];
    value.forEach(function (v, i) {
      dup[i] = decode(v);
    });
    return dup;
  }
  if (typeof value.__op === 'string') {
    return (0, _ParseOp.opFromJSON)(value);
  }
  if (value.__type === 'Pointer' && value.className) {
    return _ParseObject2['default'].fromJSON(value);
  }
  if (value.__type === 'Object' && value.className) {
    return _ParseObject2['default'].fromJSON(value);
  }
  if (value.__type === 'Relation') {
    // The parent and key fields will be populated by the parent
    var relation = new _ParseRelation2['default'](null, null);
    relation.targetClassName = value.className;
    return relation;
  }
  if (value.__type === 'Date') {
    return new Date(value.iso);
  }
  if (value.__type === 'File') {
    return _ParseFile2['default'].fromJSON(value);
  }
  if (value.__type === 'GeoPoint') {
    return new _ParseGeoPoint2['default']({
      latitude: value.latitude,
      longitude: value.longitude
    });
  }
  var copy = {};
  for (var k in value) {
    copy[k] = decode(value[k]);
  }
  return copy;
}

module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(49)
  , core      = __webpack_require__(26)
  , ctx       = __webpack_require__(40)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(96);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(27);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 * Creates a new GeoPoint with any of the following forms:<br>
 *   <pre>
 *   new GeoPoint(otherGeoPoint)
 *   new GeoPoint(30, 30)
 *   new GeoPoint([30, 30])
 *   new GeoPoint({latitude: 30, longitude: 30})
 *   new GeoPoint()  // defaults to (0, 0)
 *   </pre>
 * @class Parse.GeoPoint
 * @constructor
 *
 * <p>Represents a latitude / longitude point that may be associated
 * with a key in a ParseObject or used as a reference point for geo queries.
 * This allows proximity-based queries on the key.</p>
 *
 * <p>Only one key in a class may contain a GeoPoint.</p>
 *
 * <p>Example:<pre>
 *   var point = new Parse.GeoPoint(30.0, -20.0);
 *   var object = new Parse.Object("PlaceObject");
 *   object.set("location", point);
 *   object.save();</pre></p>
 */

var ParseGeoPoint = (function () {
  function ParseGeoPoint(arg1, arg2) {
    _classCallCheck(this, ParseGeoPoint);

    if (Array.isArray(arg1)) {
      ParseGeoPoint._validate(arg1[0], arg1[1]);
      this._latitude = arg1[0];
      this._longitude = arg1[1];
    } else if (typeof arg1 === 'object') {
      ParseGeoPoint._validate(arg1.latitude, arg1.longitude);
      this._latitude = arg1.latitude;
      this._longitude = arg1.longitude;
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      ParseGeoPoint._validate(arg1, arg2);
      this._latitude = arg1;
      this._longitude = arg2;
    } else {
      this._latitude = 0;
      this._longitude = 0;
    }
  }

  /**
   * North-south portion of the coordinate, in range [-90, 90].
   * Throws an exception if set out of range in a modern browser.
   * @property latitude
   * @type Number
   */

  _createClass(ParseGeoPoint, [{
    key: 'toJSON',

    /**
     * Returns a JSON representation of the GeoPoint, suitable for Parse.
     * @method toJSON
     * @return {Object}
     */
    value: function toJSON() {
      ParseGeoPoint._validate(this._latitude, this._longitude);
      return {
        __type: 'GeoPoint',
        latitude: this._latitude,
        longitude: this._longitude
      };
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other instanceof ParseGeoPoint && this.latitude === other.latitude && this.longitude === other.longitude;
    }

    /**
     * Returns the distance from this GeoPoint to another in radians.
     * @method radiansTo
     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */
  }, {
    key: 'radiansTo',
    value: function radiansTo(point) {
      var d2r = Math.PI / 180.0;
      var lat1rad = this.latitude * d2r;
      var long1rad = this.longitude * d2r;
      var lat2rad = point.latitude * d2r;
      var long2rad = point.longitude * d2r;

      var sinDeltaLatDiv2 = Math.sin((lat1rad - lat2rad) / 2);
      var sinDeltaLongDiv2 = Math.sin((long1rad - long2rad) / 2);
      // Square of half the straight line chord distance between both points.
      var a = sinDeltaLatDiv2 * sinDeltaLatDiv2 + Math.cos(lat1rad) * Math.cos(lat2rad) * sinDeltaLongDiv2 * sinDeltaLongDiv2;
      a = Math.min(1.0, a);
      return 2 * Math.asin(Math.sqrt(a));
    }

    /**
     * Returns the distance from this GeoPoint to another in kilometers.
     * @method kilometersTo
     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */
  }, {
    key: 'kilometersTo',
    value: function kilometersTo(point) {
      return this.radiansTo(point) * 6371.0;
    }

    /**
     * Returns the distance from this GeoPoint to another in miles.
     * @method milesTo
     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */
  }, {
    key: 'milesTo',
    value: function milesTo(point) {
      return this.radiansTo(point) * 3958.8;
    }

    /**
     * Throws an exception if the given lat-long is out of bounds.
     */
  }, {
    key: 'latitude',
    get: function get() {
      return this._latitude;
    },
    set: function set(val) {
      ParseGeoPoint._validate(val, this.longitude);
      this._latitude = val;
    }

    /**
     * East-west portion of the coordinate, in range [-180, 180].
     * Throws if set out of range in a modern browser.
     * @property longitude
     * @type Number
     */
  }, {
    key: 'longitude',
    get: function get() {
      return this._longitude;
    },
    set: function set(val) {
      ParseGeoPoint._validate(this.latitude, val);
      this._longitude = val;
    }
  }], [{
    key: '_validate',
    value: function _validate(latitude, longitude) {
      if (latitude !== latitude || longitude !== longitude) {
        throw new TypeError('GeoPoint latitude and longitude must be valid numbers');
      }
      if (latitude < -90.0) {
        throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' < -90.0.');
      }
      if (latitude > 90.0) {
        throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' > 90.0.');
      }
      if (longitude < -180.0) {
        throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' < -180.0.');
      }
      if (longitude > 180.0) {
        throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' > 180.0.');
      }
    }

    /**
     * Creates a GeoPoint with the user's current location, if available.
     * Calls options.success with a new GeoPoint instance or calls options.error.
     * @method current
     * @param {Object} options An object with success and error callbacks.
     * @static
     */
  }, {
    key: 'current',
    value: function current(options) {
      var promise = new _ParsePromise2['default']();
      navigator.geolocation.getCurrentPosition(function (location) {
        promise.resolve(new ParseGeoPoint(location.coords.latitude, location.coords.longitude));
      }, function (error) {
        promise.reject(error);
      });

      return promise._thenRunCallbacks(options);
    }
  }]);

  return ParseGeoPoint;
})();

exports['default'] = ParseGeoPoint;
module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

module.exports = {
  async: function async() {
    var controller = _CoreManager2['default'].getStorageController();
    return !!controller.async;
  },

  getItem: function getItem(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.getItem(path);
  },

  getItemAsync: function getItemAsync(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      return controller.getItemAsync(path);
    }
    return _ParsePromise2['default'].as(controller.getItem(path));
  },

  setItem: function setItem(path, value) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.setItem(path, value);
  },

  setItemAsync: function setItemAsync(path, value) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      return controller.setItemAsync(path, value);
    }
    return _ParsePromise2['default'].as(controller.setItem(path, value));
  },

  removeItem: function removeItem(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.removeItem(path);
  },

  removeItemAsync: function removeItemAsync(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      return controller.removeItemAsync(path);
    }
    return _ParsePromise2['default'].as(controller.removeItem(path));
  },

  generatePath: function generatePath(path) {
    if (!_CoreManager2['default'].get('APPLICATION_ID')) {
      throw new Error('You need to call Parse.initialize before using Parse.');
    }
    if (typeof path !== 'string') {
      throw new Error('Tried to get a Storage path that was not a String.');
    }
    if (path[0] === '/') {
      path = path.substr(1);
    }
    return 'Parse/' + _CoreManager2['default'].get('APPLICATION_ID') + '/' + path;
  },

  _clear: function _clear() {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.hasOwnProperty('clear')) {
      controller.clear();
    }
  }
};

_CoreManager2['default'].setStorageController(__webpack_require__(130));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(56)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseGeoPoint = __webpack_require__(44);

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 * Converts a string into a regex that matches it.
 * Surrounding with \Q .. \E does this, we just need to escape any \E's in
 * the text separately.
 */
function quote(s) {
  return '\\Q' + s.replace('\\E', '\\E\\\\E\\Q') + '\\E';
}

/**
 * Creates a new parse Parse.Query for the given Parse.Object subclass.
 * @class Parse.Query
 * @constructor
 * @param {} objectClass An instance of a subclass of Parse.Object, or a Parse className string.
 *
 * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
 * most common use case is finding all objects that match a query through the
 * <code>find</code> method. For example, this sample code fetches all objects
 * of class <code>MyClass</code>. It calls a different function depending on
 * whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(MyClass);
 * query.find({
 *   success: function(results) {
 *     // results is an array of Parse.Object.
 *   },
 *
 *   error: function(error) {
 *     // error is an instance of Parse.Error.
 *   }
 * });</pre></p>
 *
 * <p>A Parse.Query can also be used to retrieve a single object whose id is
 * known, through the get method. For example, this sample code fetches an
 * object of class <code>MyClass</code> and id <code>myId</code>. It calls a
 * different function depending on whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(MyClass);
 * query.get(myId, {
 *   success: function(object) {
 *     // object is an instance of Parse.Object.
 *   },
 *
 *   error: function(object, error) {
 *     // error is an instance of Parse.Error.
 *   }
 * });</pre></p>
 *
 * <p>A Parse.Query can also be used to count the number of objects that match
 * the query without retrieving all of those objects. For example, this
 * sample code counts the number of objects of the class <code>MyClass</code>
 * <pre>
 * var query = new Parse.Query(MyClass);
 * query.count({
 *   success: function(number) {
 *     // There are number instances of MyClass.
 *   },
 *
 *   error: function(error) {
 *     // error is an instance of Parse.Error.
 *   }
 * });</pre></p>
 */

var ParseQuery = (function () {
  function ParseQuery(objectClass) {
    _classCallCheck(this, ParseQuery);

    if (typeof objectClass === 'string') {
      if (objectClass === 'User' && _CoreManager2['default'].get('PERFORM_USER_REWRITE')) {
        this.className = '_User';
      } else {
        this.className = objectClass;
      }
    } else if (objectClass instanceof _ParseObject2['default']) {
      this.className = objectClass.className;
    } else if (typeof objectClass === 'function') {
      if (typeof objectClass.className === 'string') {
        this.className = objectClass.className;
      } else {
        var obj = new objectClass();
        this.className = obj.className;
      }
    } else {
      throw new TypeError('A ParseQuery must be constructed with a ParseObject or class name.');
    }

    this._where = {};
    this._include = [];
    this._limit = -1; // negative limit is not sent in the server request
    this._skip = 0;
    this._extraOptions = {};
  }

  /**
   * Adds constraint that at least one of the passed in queries matches.
   * @method _orQuery
   * @param {Array} queries
   * @return {Parse.Query} Returns the query, so you can chain this call.
   */

  _createClass(ParseQuery, [{
    key: '_orQuery',
    value: function _orQuery(queries) {
      var queryJSON = queries.map(function (q) {
        return q.toJSON().where;
      });

      this._where.$or = queryJSON;
      return this;
    }

    /**
     * Helper for condition queries
     */
  }, {
    key: '_addCondition',
    value: function _addCondition(key, condition, value) {
      if (!this._where[key] || typeof this._where[key] === 'string') {
        this._where[key] = {};
      }
      this._where[key][condition] = (0, _encode2['default'])(value, false, true);
      return this;
    }

    /**
     * Returns a JSON representation of this query.
     * @method toJSON
     * @return {Object} The JSON representation of the query.
     */
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var params = {
        where: this._where
      };

      if (this._include.length) {
        params.include = this._include.join(',');
      }
      if (this._select) {
        params.keys = this._select.join(',');
      }
      if (this._limit >= 0) {
        params.limit = this._limit;
      }
      if (this._skip > 0) {
        params.skip = this._skip;
      }
      if (this._order) {
        params.order = this._order.join(',');
      }
      for (var key in this._extraOptions) {
        params[key] = this._extraOptions[key];
      }

      return params;
    }

    /**
     * Constructs a Parse.Object whose id is already known by fetching data from
     * the server.  Either options.success or options.error is called when the
     * find completes.
     *
     * @method get
     * @param {String} objectId The id of the object to be fetched.
     * @param {Object} options A Backbone-style options object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the result when
     * the query completes.
     */
  }, {
    key: 'get',
    value: function get(objectId, options) {
      this.equalTo('objectId', objectId);

      var firstOptions = {};
      if (options && options.hasOwnProperty('useMasterKey')) {
        firstOptions.useMasterKey = options.useMasterKey;
      }
      if (options && options.hasOwnProperty('sessionToken')) {
        firstOptions.sessionToken = options.sessionToken;
      }

      return this.first(firstOptions).then(function (response) {
        if (response) {
          return response;
        }

        var errorObject = new _ParseError2['default'](_ParseError2['default'].OBJECT_NOT_FOUND, 'Object not found.');
        return _ParsePromise2['default'].error(errorObject);
      })._thenRunCallbacks(options, null);
    }

    /**
     * Retrieves a list of ParseObjects that satisfy this query.
     * Either options.success or options.error is called when the find
     * completes.
     *
     * @method find
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the find completes successfully.
     *   <li>error: Function to call when the find fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the results when
     * the query completes.
     */
  }, {
    key: 'find',
    value: function find(options) {
      var _this = this;

      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getQueryController();

      return controller.find(this.className, this.toJSON(), findOptions).then(function (response) {
        return response.results.map(function (data) {
          // In cases of relations, the server may send back a className
          // on the top level of the payload
          var override = response.className || _this.className;
          if (!data.className) {
            data.className = override;
          }
          return _ParseObject2['default'].fromJSON(data, true);
        });
      })._thenRunCallbacks(options);
    }

    /**
     * Counts the number of objects that match this query.
     * Either options.success or options.error is called when the count
     * completes.
     *
     * @method count
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the count completes successfully.
     *   <li>error: Function to call when the find fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the count when
     * the query completes.
     */
  }, {
    key: 'count',
    value: function count(options) {
      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getQueryController();

      var params = this.toJSON();
      params.limit = 0;
      params.count = 1;

      return controller.find(this.className, params, findOptions).then(function (result) {
        return result.count;
      })._thenRunCallbacks(options);
    }

    /**
     * Retrieves at most one Parse.Object that satisfies this query.
     *
     * Either options.success or options.error is called when it completes.
     * success is passed the object if there is one. otherwise, undefined.
     *
     * @method first
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the find completes successfully.
     *   <li>error: Function to call when the find fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the object when
     * the query completes.
     */
  }, {
    key: 'first',
    value: function first(options) {
      var _this2 = this;

      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getQueryController();

      var params = this.toJSON();
      params.limit = 1;

      return controller.find(this.className, params, findOptions).then(function (response) {
        var objects = response.results;
        if (!objects[0]) {
          return undefined;
        }
        if (!objects[0].className) {
          objects[0].className = _this2.className;
        }
        return _ParseObject2['default'].fromJSON(objects[0], true);
      })._thenRunCallbacks(options);
    }

    /**
     * Iterates over each result of a query, calling a callback for each one. If
     * the callback returns a promise, the iteration will not continue until
     * that promise has been fulfilled. If the callback returns a rejected
     * promise, then iteration will stop with that error. The items are
     * processed in an unspecified order. The query may not have any sort order,
     * and may not use limit or skip.
     * @method each
     * @param {Function} callback Callback that will be called with each result
     *     of the query.
     * @param {Object} options An optional Backbone-like options object with
     *     success and error callbacks that will be invoked once the iteration
     *     has finished.
     * @return {Parse.Promise} A promise that will be fulfilled once the
     *     iteration has completed.
     */
  }, {
    key: 'each',
    value: function each(callback, options) {
      options = options || {};

      if (this._order || this._skip || this._limit >= 0) {
        return _ParsePromise2['default'].error('Cannot iterate on a query with sort, skip, or limit.')._thenRunCallbacks(options);
      }

      var promise = new _ParsePromise2['default']();

      var query = new ParseQuery(this.className);
      // We can override the batch size from the options.
      // This is undocumented, but useful for testing.
      query._limit = options.batchSize || 100;
      query._include = this._include.map(function (i) {
        return i;
      });
      if (this._select) {
        query._select = this._select.map(function (s) {
          return s;
        });
      }

      query._where = {};
      for (var attr in this._where) {
        var val = this._where[attr];
        if (Array.isArray(val)) {
          query._where[attr] = val.map(function (v) {
            return v;
          });
        } else if (val && typeof val === 'object') {
          var conditionMap = {};
          query._where[attr] = conditionMap;
          for (var cond in val) {
            conditionMap[cond] = val[cond];
          }
        } else {
          query._where[attr] = val;
        }
      }

      query.ascending('objectId');

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var finished = false;
      return _ParsePromise2['default']._continueWhile(function () {
        return !finished;
      }, function () {
        return query.find(findOptions).then(function (results) {
          var callbacksDone = _ParsePromise2['default'].as();
          results.forEach(function (result) {
            callbacksDone = callbacksDone.then(function () {
              return callback(result);
            });
          });

          return callbacksDone.then(function () {
            if (results.length >= query._limit) {
              query.greaterThan('objectId', results[results.length - 1].id);
            } else {
              finished = true;
            }
          });
        });
      })._thenRunCallbacks(options);
    }

    /** Query Conditions **/

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be equal to the provided value.
     * @method equalTo
     * @param {String} key The key to check.
     * @param value The value that the Parse.Object must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'equalTo',
    value: function equalTo(key, value) {
      if (typeof value === 'undefined') {
        return this.doesNotExist(key);
      }

      this._where[key] = (0, _encode2['default'])(value, false, true);
      return this;
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be not equal to the provided value.
     * @method notEqualTo
     * @param {String} key The key to check.
     * @param value The value that must not be equalled.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'notEqualTo',
    value: function notEqualTo(key, value) {
      return this._addCondition(key, '$ne', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than the provided value.
     * @method lessThan
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'lessThan',
    value: function lessThan(key, value) {
      return this._addCondition(key, '$lt', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than the provided value.
     * @method greaterThan
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'greaterThan',
    value: function greaterThan(key, value) {
      return this._addCondition(key, '$gt', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than or equal to the provided value.
     * @method lessThanOrEqualTo
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'lessThanOrEqualTo',
    value: function lessThanOrEqualTo(key, value) {
      return this._addCondition(key, '$lte', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than or equal to the provided value.
     * @method greaterThanOrEqualTo
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'greaterThanOrEqualTo',
    value: function greaterThanOrEqualTo(key, value) {
      return this._addCondition(key, '$gte', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be contained in the provided list of values.
     * @method containedIn
     * @param {String} key The key to check.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'containedIn',
    value: function containedIn(key, value) {
      return this._addCondition(key, '$in', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * not be contained in the provided list of values.
     * @method notContainedIn
     * @param {String} key The key to check.
     * @param {Array} values The values that will not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'notContainedIn',
    value: function notContainedIn(key, value) {
      return this._addCondition(key, '$nin', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * contain each one of the provided list of values.
     * @method containsAll
     * @param {String} key The key to check.  This key's value must be an array.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'containsAll',
    value: function containsAll(key, values) {
      return this._addCondition(key, '$all', values);
    }

    /**
     * Adds a constraint for finding objects that contain the given key.
     * @method exists
     * @param {String} key The key that should exist.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'exists',
    value: function exists(key) {
      return this._addCondition(key, '$exists', true);
    }

    /**
     * Adds a constraint for finding objects that do not contain a given key.
     * @method doesNotExist
     * @param {String} key The key that should not exist
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'doesNotExist',
    value: function doesNotExist(key) {
      return this._addCondition(key, '$exists', false);
    }

    /**
     * Adds a regular expression constraint for finding string values that match
     * the provided regular expression.
     * This may be slow for large datasets.
     * @method matches
     * @param {String} key The key that the string to match is stored in.
     * @param {RegExp} regex The regular expression pattern to match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'matches',
    value: function matches(key, regex, modifiers) {
      this._addCondition(key, '$regex', regex);
      if (!modifiers) {
        modifiers = '';
      }
      if (regex.ignoreCase) {
        modifiers += 'i';
      }
      if (regex.multiline) {
        modifiers += 'm';
      }
      if (modifiers.length) {
        this._addCondition(key, '$options', modifiers);
      }
      return this;
    }

    /**
     * Adds a constraint that requires that a key's value matches a Parse.Query
     * constraint.
     * @method matchesQuery
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'matchesQuery',
    value: function matchesQuery(key, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$inQuery', queryJSON);
    }

    /**
     * Adds a constraint that requires that a key's value not matches a
     * Parse.Query constraint.
     * @method doesNotMatchQuery
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'doesNotMatchQuery',
    value: function doesNotMatchQuery(key, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$notInQuery', queryJSON);
    }

    /**
     * Adds a constraint that requires that a key's value matches a value in
     * an object returned by a different Parse.Query.
     * @method matchesKeyInQuery
     * @param {String} key The key that contains the value that is being
     *                     matched.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'matchesKeyInQuery',
    value: function matchesKeyInQuery(key, queryKey, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$select', {
        key: queryKey,
        query: queryJSON
      });
    }

    /**
     * Adds a constraint that requires that a key's value not match a value in
     * an object returned by a different Parse.Query.
     * @method doesNotMatchKeyInQuery
     * @param {String} key The key that contains the value that is being
     *                     excluded.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'doesNotMatchKeyInQuery',
    value: function doesNotMatchKeyInQuery(key, queryKey, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$dontSelect', {
        key: queryKey,
        query: queryJSON
      });
    }

    /**
     * Adds a constraint for finding string values that contain a provided
     * string.  This may be slow for large datasets.
     * @method contains
     * @param {String} key The key that the string to match is stored in.
     * @param {String} substring The substring that the value must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'contains',
    value: function contains(key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', quote(value));
    }

    /**
     * Adds a constraint for finding string values that start with a provided
     * string.  This query will use the backend index, so it will be fast even
     * for large datasets.
     * @method startsWith
     * @param {String} key The key that the string to match is stored in.
     * @param {String} prefix The substring that the value must start with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'startsWith',
    value: function startsWith(key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', '^' + quote(value));
    }

    /**
     * Adds a constraint for finding string values that end with a provided
     * string.  This will be slow for large datasets.
     * @method endsWith
     * @param {String} key The key that the string to match is stored in.
     * @param {String} suffix The substring that the value must end with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'endsWith',
    value: function endsWith(key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', quote(value) + '$');
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given.
     * @method near
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'near',
    value: function near(key, point) {
      if (!(point instanceof _ParseGeoPoint2['default'])) {
        // Try to cast it as a GeoPoint
        point = new _ParseGeoPoint2['default'](point);
      }
      return this._addCondition(key, '$nearSphere', point);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * @method withinRadians
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in radians) of results to
     *   return.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinRadians',
    value: function withinRadians(key, point, distance) {
      this.near(key, point);
      return this._addCondition(key, '$maxDistance', distance);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 3958.8 miles.
     * @method withinMiles
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in miles) of results to
     *     return.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinMiles',
    value: function withinMiles(key, point, distance) {
      return this.withinRadians(key, point, distance / 3958.8);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 6371.0 kilometers.
     * @method withinKilometers
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in kilometers) of results
     *     to return.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinKilometers',
    value: function withinKilometers(key, point, distance) {
      return this.withinRadians(key, point, distance / 6371.0);
    }

    /**
     * Adds a constraint to the query that requires a particular key's
     * coordinates be contained within a given rectangular geographic bounding
     * box.
     * @method withinGeoBox
     * @param {String} key The key to be constrained.
     * @param {Parse.GeoPoint} southwest
     *     The lower-left inclusive corner of the box.
     * @param {Parse.GeoPoint} northeast
     *     The upper-right inclusive corner of the box.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinGeoBox',
    value: function withinGeoBox(key, southwest, northeast) {
      if (!(southwest instanceof _ParseGeoPoint2['default'])) {
        southwest = new _ParseGeoPoint2['default'](southwest);
      }
      if (!(northeast instanceof _ParseGeoPoint2['default'])) {
        northeast = new _ParseGeoPoint2['default'](northeast);
      }
      this._addCondition(key, '$within', { '$box': [southwest, northeast] });
      return this;
    }

    /** Query Orderings **/

    /**
     * Sorts the results in ascending order by the given key.
     *
     * @method ascending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'ascending',
    value: function ascending() {
      this._order = [];

      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      return this.addAscending.apply(this, keys);
    }

    /**
     * Sorts the results in ascending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @method addAscending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'addAscending',
    value: function addAscending() {
      var _this3 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          key = key.join();
        }
        _this3._order = _this3._order.concat(key.replace(/\s/g, '').split(','));
      });

      return this;
    }

    /**
     * Sorts the results in descending order by the given key.
     *
     * @method descending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'descending',
    value: function descending() {
      this._order = [];

      for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        keys[_key3] = arguments[_key3];
      }

      return this.addDescending.apply(this, keys);
    }

    /**
     * Sorts the results in descending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @method addDescending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'addDescending',
    value: function addDescending() {
      var _this4 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        keys[_key4] = arguments[_key4];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          key = key.join();
        }
        _this4._order = _this4._order.concat(key.replace(/\s/g, '').split(',').map(function (k) {
          return '-' + k;
        }));
      });

      return this;
    }

    /** Query Options **/

    /**
     * Sets the number of results to skip before returning any results.
     * This is useful for pagination.
     * Default is to skip zero results.
     * @method skip
     * @param {Number} n the number of results to skip.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'skip',
    value: function skip(n) {
      if (typeof n !== 'number' || n < 0) {
        throw new Error('You can only skip by a positive number');
      }
      this._skip = n;
      return this;
    }

    /**
     * Sets the limit of the number of results to return. The default limit is
     * 100, with a maximum of 1000 results being returned at a time.
     * @method limit
     * @param {Number} n the number of results to limit to.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'limit',
    value: function limit(n) {
      if (typeof n !== 'number') {
        throw new Error('You can only set the limit to a numeric value');
      }
      this._limit = n;
      return this;
    }

    /**
     * Includes nested Parse.Objects for the provided key.  You can use dot
     * notation to specify which fields in the included object are also fetched.
     * @method include
     * @param {String} key The name of the key to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'include',
    value: function include() {
      var _this5 = this;

      for (var _len5 = arguments.length, keys = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        keys[_key5] = arguments[_key5];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          _this5._include = _this5._include.concat(key);
        } else {
          _this5._include.push(key);
        }
      });
      return this;
    }

    /**
     * Restricts the fields of the returned Parse.Objects to include only the
     * provided keys.  If this is called multiple times, then all of the keys
     * specified in each of the calls will be included.
     * @method select
     * @param {Array} keys The names of the keys to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'select',
    value: function select() {
      var _this6 = this;

      if (!this._select) {
        this._select = [];
      }

      for (var _len6 = arguments.length, keys = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        keys[_key6] = arguments[_key6];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          _this6._select = _this6._select.concat(key);
        } else {
          _this6._select.push(key);
        }
      });
      return this;
    }

    /**
     * Subscribe this query to get liveQuery updates
     * @method subscribe
     * @return {LiveQuerySubscription} Returns the liveQuerySubscription, it's an event emitter
     * which can be used to get liveQuery updates.
     */
  }, {
    key: 'subscribe',
    value: function subscribe() {
      var controller = _CoreManager2['default'].getLiveQueryController();
      return controller.subscribe(this);
    }

    /**
     * Constructs a Parse.Query that is the OR of the passed in queries.  For
     * example:
     * <pre>var compoundQuery = Parse.Query.or(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is an or of the query1, query2, and
     * query3.
     * @method or
     * @param {...Parse.Query} var_args The list of queries to OR.
     * @static
     * @return {Parse.Query} The query that is the OR of the passed in queries.
     */
  }], [{
    key: 'or',
    value: function or() {
      var className = null;

      for (var _len7 = arguments.length, queries = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        queries[_key7] = arguments[_key7];
      }

      queries.forEach(function (q) {
        if (!className) {
          className = q.className;
        }

        if (className !== q.className) {
          throw new Error('All queries must be for the same class.');
        }
      });

      var query = new ParseQuery(className);
      query._orQuery(queries);
      return query;
    }
  }]);

  return ParseQuery;
})();

exports['default'] = ParseQuery;

_CoreManager2['default'].setQueryController({
  find: function find(className, params, options) {
    var RESTController = _CoreManager2['default'].getRESTController();

    return RESTController.request('GET', 'classes/' + className, params, options);
  }
});
module.exports = exports['default'];

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(40)
  , call        = __webpack_require__(124)
  , isArrayIter = __webpack_require__(125)
  , anObject    = __webpack_require__(41)
  , toLength    = __webpack_require__(85)
  , getIterFn   = __webpack_require__(76);
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _Object$defineProperty = __webpack_require__(54)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _isRevocableSession = __webpack_require__(87);

var _isRevocableSession2 = _interopRequireDefault(_isRevocableSession);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseObject2 = __webpack_require__(21);

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseSession = __webpack_require__(88);

var _ParseSession2 = _interopRequireDefault(_ParseSession);

var _Storage = __webpack_require__(45);

var _Storage2 = _interopRequireDefault(_Storage);

var CURRENT_USER_KEY = 'currentUser';
var canUseCurrentUser = !_CoreManager2['default'].get('IS_NODE');
var currentUserCacheMatchesDisk = false;
var currentUserCache = null;

var authProviders = {};

/**
 * @class Parse.User
 * @constructor
 *
 * <p>A Parse.User object is a local representation of a user persisted to the
 * Parse cloud. This class is a subclass of a Parse.Object, and retains the
 * same functionality of a Parse.Object, but also extends it with various
 * user specific methods, like authentication, signing up, and validation of
 * uniqueness.</p>
 */

var ParseUser = (function (_ParseObject) {
  _inherits(ParseUser, _ParseObject);

  function ParseUser(attributes) {
    _classCallCheck(this, ParseUser);

    _get(Object.getPrototypeOf(ParseUser.prototype), 'constructor', this).call(this, '_User');
    if (attributes && typeof attributes === 'object') {
      if (!this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Parse User');
      }
    }
  }

  /**
   * Request a revocable session token to replace the older style of token.
   * @method _upgradeToRevocableSession
   * @param {Object} options A Backbone-style options object.
   * @return {Parse.Promise} A promise that is resolved when the replacement
   *   token has been fetched.
   */

  _createClass(ParseUser, [{
    key: '_upgradeToRevocableSession',
    value: function _upgradeToRevocableSession(options) {
      options = options || {};

      var upgradeOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        upgradeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.upgradeToRevocableSession(this, upgradeOptions)._thenRunCallbacks(options);
    }

    /**
     * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
     * call linkWith on the user (even if it doesn't exist yet on the server).
     * @method _linkWith
     */
  }, {
    key: '_linkWith',
    value: function _linkWith(provider, options) {
      var _this = this;

      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[provider];
      } else {
        authType = provider.getAuthType();
      }
      if (options && options.hasOwnProperty('authData')) {
        var authData = this.get('authData') || {};
        authData[authType] = options.authData;

        var controller = _CoreManager2['default'].getUserController();
        return controller.linkWith(this, authData)._thenRunCallbacks(options, this);
      } else {
        var promise = new _ParsePromise2['default']();
        provider.authenticate({
          success: function success(provider, result) {
            var opts = {};
            opts.authData = result;
            if (options.success) {
              opts.success = options.success;
            }
            if (options.error) {
              opts.error = options.error;
            }
            _this._linkWith(provider, opts).then(function () {
              promise.resolve(_this);
            }, function (error) {
              promise.reject(error);
            });
          },
          error: function error(provider, _error) {
            if (options.error) {
              options.error(_this, _error);
            }
            promise.reject(_error);
          }
        });
        return promise;
      }
    }

    /**
     * Synchronizes auth data for a provider (e.g. puts the access token in the
     * right place to be used by the Facebook SDK).
     * @method _synchronizeAuthData
     */
  }, {
    key: '_synchronizeAuthData',
    value: function _synchronizeAuthData(provider) {
      if (!this.isCurrent() || !provider) {
        return;
      }
      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[authType];
      } else {
        authType = provider.getAuthType();
      }
      var authData = this.get('authData');
      if (!provider || typeof authData !== 'object') {
        return;
      }
      var success = provider.restoreAuthentication(authData[authType]);
      if (!success) {
        this._unlinkFrom(provider);
      }
    }

    /**
     * Synchronizes authData for all providers.
     * @method _synchronizeAllAuthData
     */
  }, {
    key: '_synchronizeAllAuthData',
    value: function _synchronizeAllAuthData() {
      var authData = this.get('authData');
      if (typeof authData !== 'object') {
        return;
      }

      for (var key in authData) {
        this._synchronizeAuthData(key);
      }
    }

    /**
     * Removes null values from authData (which exist temporarily for
     * unlinking)
     * @method _cleanupAuthData
     */
  }, {
    key: '_cleanupAuthData',
    value: function _cleanupAuthData() {
      if (!this.isCurrent()) {
        return;
      }
      var authData = this.get('authData');
      if (typeof authData !== 'object') {
        return;
      }

      for (var key in authData) {
        if (!authData[key]) {
          delete authData[key];
        }
      }
    }

    /**
     * Unlinks a user from a service.
     * @method _unlinkFrom
     */
  }, {
    key: '_unlinkFrom',
    value: function _unlinkFrom(provider, options) {
      var _this2 = this;

      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[provider];
      } else {
        authType = provider.getAuthType();
      }
      return this._linkWith(provider, { authData: null }).then(function () {
        _this2._synchronizeAuthData(provider);
        return _ParsePromise2['default'].as(_this2);
      })._thenRunCallbacks(options);
    }

    /**
     * Checks whether a user is linked to a service.
     * @method _isLinked
     */
  }, {
    key: '_isLinked',
    value: function _isLinked(provider) {
      var authType;
      if (typeof provider === 'string') {
        authType = provider;
      } else {
        authType = provider.getAuthType();
      }
      var authData = this.get('authData') || {};
      return !!authData[authType];
    }

    /**
     * Deauthenticates all providers.
     * @method _logOutWithAll
     */
  }, {
    key: '_logOutWithAll',
    value: function _logOutWithAll() {
      var authData = this.get('authData');
      if (typeof authData !== 'object') {
        return;
      }

      for (var key in authData) {
        this._logOutWith(key);
      }
    }

    /**
     * Deauthenticates a single provider (e.g. removing access tokens from the
     * Facebook SDK).
     * @method _logOutWith
     */
  }, {
    key: '_logOutWith',
    value: function _logOutWith(provider) {
      if (!this.isCurrent()) {
        return;
      }
      if (typeof provider === 'string') {
        provider = authProviders[provider];
      }
      if (provider && provider.deauthenticate) {
        provider.deauthenticate();
      }
    }

    /**
     * Class instance method used to maintain specific keys when a fetch occurs.
     * Used to ensure that the session token is not lost.
     */
  }, {
    key: '_preserveFieldsOnFetch',
    value: function _preserveFieldsOnFetch() {
      return {
        sessionToken: this.get('sessionToken')
      };
    }

    /**
     * Returns true if <code>current</code> would return this user.
     * @method isCurrent
     * @return {Boolean}
     */
  }, {
    key: 'isCurrent',
    value: function isCurrent() {
      var current = ParseUser.current();
      return !!current && current.id === this.id;
    }

    /**
     * Returns get("username").
     * @method getUsername
     * @return {String}
     */
  }, {
    key: 'getUsername',
    value: function getUsername() {
      return this.get('username');
    }

    /**
     * Calls set("username", username, options) and returns the result.
     * @method setUsername
     * @param {String} username
     * @param {Object} options A Backbone-style options object.
     * @return {Boolean}
     */
  }, {
    key: 'setUsername',
    value: function setUsername(username) {
      // Strip anonymity, even we do not support anonymous user in js SDK, we may
      // encounter anonymous user created by android/iOS in cloud code.
      var authData = this.get('authData');
      if (authData && authData.hasOwnProperty('anonymous')) {
        // We need to set anonymous to null instead of deleting it in order to remove it from Parse.
        authData.anonymous = null;
      }
      this.set('username', username);
    }

    /**
     * Calls set("password", password, options) and returns the result.
     * @method setPassword
     * @param {String} password
     * @param {Object} options A Backbone-style options object.
     * @return {Boolean}
     */
  }, {
    key: 'setPassword',
    value: function setPassword(password) {
      this.set('password', password);
    }

    /**
     * Returns get("email").
     * @method getEmail
     * @return {String}
     */
  }, {
    key: 'getEmail',
    value: function getEmail() {
      return this.get('email');
    }

    /**
     * Calls set("email", email, options) and returns the result.
     * @method setEmail
     * @param {String} email
     * @param {Object} options A Backbone-style options object.
     * @return {Boolean}
     */
  }, {
    key: 'setEmail',
    value: function setEmail(email) {
      this.set('email', email);
    }

    /**
     * Returns the session token for this user, if the user has been logged in,
     * or if it is the result of a query with the master key. Otherwise, returns
     * undefined.
     * @method getSessionToken
     * @return {String} the session token, or undefined
     */
  }, {
    key: 'getSessionToken',
    value: function getSessionToken() {
      return this.get('sessionToken');
    }

    /**
     * Checks whether this user is the current user and has been authenticated.
     * @method authenticated
     * @return (Boolean) whether this user is the current user and is logged in.
     */
  }, {
    key: 'authenticated',
    value: function authenticated() {
      var current = ParseUser.current();
      return !!this.get('sessionToken') && !!current && current.id === this.id;
    }

    /**
     * Signs up a new user. You should call this instead of save for
     * new Parse.Users. This will create a new Parse.User on the server, and
     * also persist the session on disk so that you can access the user using
     * <code>current</code>.
     *
     * <p>A username and password must be set before calling signUp.</p>
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method signUp
     * @param {Object} attrs Extra fields to set on the new user, or null.
     * @param {Object} options A Backbone-style options object.
     * @return {Parse.Promise} A promise that is fulfilled when the signup
     *     finishes.
     */
  }, {
    key: 'signUp',
    value: function signUp(attrs, options) {
      options = options || {};

      var signupOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        signupOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('installationId')) {
        signupOptions.installationId = options.installationId;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.signUp(this, attrs, signupOptions)._thenRunCallbacks(options, this);
    }

    /**
     * Logs in a Parse.User. On success, this saves the session to disk,
     * so you can retrieve the currently logged in user using
     * <code>current</code>.
     *
     * <p>A username and password must be set before calling logIn.</p>
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method logIn
     * @param {Object} options A Backbone-style options object.
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the login is complete.
     */
  }, {
    key: 'logIn',
    value: function logIn(options) {
      options = options || {};

      var loginOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        loginOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('installationId')) {
        loginOptions.installationId = options.installationId;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.logIn(this, loginOptions)._thenRunCallbacks(options, this);
    }

    /**
     * Wrap the default save behavior with functionality to save to local
     * storage if this is current user.
     */
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _get(Object.getPrototypeOf(ParseUser.prototype), 'save', this).apply(this, args).then(function () {
        if (_this3.isCurrent()) {
          return _CoreManager2['default'].getUserController().updateUserOnDisk(_this3);
        }
        return _this3;
      });
    }

    /**
     * Wrap the default destroy behavior with functionality that logs out
     * the current user when it is destroyed
     */
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this4 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _get(Object.getPrototypeOf(ParseUser.prototype), 'destroy', this).apply(this, args).then(function () {
        if (_this4.isCurrent()) {
          return _CoreManager2['default'].getUserController().removeUserFromDisk();
        }
        return _this4;
      });
    }

    /**
     * Wrap the default fetch behavior with functionality to save to local
     * storage if this is current user.
     */
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this5 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _get(Object.getPrototypeOf(ParseUser.prototype), 'fetch', this).apply(this, args).then(function () {
        if (_this5.isCurrent()) {
          return _CoreManager2['default'].getUserController().updateUserOnDisk(_this5);
        }
        return _this5;
      });
    }
  }], [{
    key: 'readOnlyAttributes',
    value: function readOnlyAttributes() {
      return ['sessionToken'];
    }

    /**
     * Adds functionality to the existing Parse.User class
     * @method extend
     * @param {Object} protoProps A set of properties to add to the prototype
     * @param {Object} classProps A set of static properties to add to the class
     * @static
     * @return {Class} The newly extended Parse.User class
     */
  }, {
    key: 'extend',
    value: function extend(protoProps, classProps) {
      if (protoProps) {
        for (var prop in protoProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseUser.prototype, prop, {
              value: protoProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var prop in classProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseUser, prop, {
              value: classProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      return ParseUser;
    }

    /**
     * Retrieves the currently logged in ParseUser with a valid session,
     * either from memory or localStorage, if necessary.
     * @method current
     * @static
     * @return {Parse.Object} The currently logged in Parse.User.
     */
  }, {
    key: 'current',
    value: function current() {
      if (!canUseCurrentUser) {
        return null;
      }
      var controller = _CoreManager2['default'].getUserController();
      return controller.currentUser();
    }

    /**
     * Retrieves the currently logged in ParseUser from asynchronous Storage.
     * @method currentAsync
     * @static
     * @return {Parse.Promise} A Promise that is resolved with the currently
     *   logged in Parse User
     */
  }, {
    key: 'currentAsync',
    value: function currentAsync() {
      if (!canUseCurrentUser) {
        return _ParsePromise2['default'].as(null);
      }
      var controller = _CoreManager2['default'].getUserController();
      return controller.currentUserAsync();
    }

    /**
     * Signs up a new user with a username (or email) and password.
     * This will create a new Parse.User on the server, and also persist the
     * session in localStorage so that you can access the user using
     * {@link #current}.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method signUp
     * @param {String} username The username (or email) to sign up with.
     * @param {String} password The password to sign up with.
     * @param {Object} attrs Extra fields to set on the new user.
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the signup completes.
     */
  }, {
    key: 'signUp',
    value: function signUp(username, password, attrs, options) {
      attrs = attrs || {};
      attrs.username = username;
      attrs.password = password;
      var user = new ParseUser(attrs);
      return user.signUp({}, options);
    }

    /**
     * Logs in a user with a username (or email) and password. On success, this
     * saves the session to disk, so you can retrieve the currently logged in
     * user using <code>current</code>.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method logIn
     * @param {String} username The username (or email) to log in with.
     * @param {String} password The password to log in with.
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */
  }, {
    key: 'logIn',
    value: function logIn(username, password, options) {
      if (typeof username !== 'string') {
        return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Username must be a string.'));
      } else if (typeof password !== 'string') {
        return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Password must be a string.'));
      }
      var user = new ParseUser();
      user._finishFetch({ username: username, password: password });
      return user.logIn(options);
    }

    /**
     * Logs in a user with a session token. On success, this saves the session
     * to disk, so you can retrieve the currently logged in user using
     * <code>current</code>.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method become
     * @param {String} sessionToken The sessionToken to log in with.
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */
  }, {
    key: 'become',
    value: function become(sessionToken, options) {
      if (!canUseCurrentUser) {
        throw new Error('It is not memory-safe to become a user in a server environment');
      }
      options = options || {};

      var becomeOptions = {
        sessionToken: sessionToken
      };
      if (options.hasOwnProperty('useMasterKey')) {
        becomeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.become(becomeOptions)._thenRunCallbacks(options);
    }
  }, {
    key: 'logInWith',
    value: function logInWith(provider, options) {
      return ParseUser._logInWith(provider, options);
    }

    /**
     * Logs out the currently logged in user session. This will remove the
     * session from disk, log out of linked services, and future calls to
     * <code>current</code> will return <code>null</code>.
     * @method logOut
     * @static
     * @return {Parse.Promise} A promise that is resolved when the session is
     *   destroyed on the server.
     */
  }, {
    key: 'logOut',
    value: function logOut() {
      if (!canUseCurrentUser) {
        throw new Error('There is no current user user on a node.js server environment.');
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.logOut();
    }

    /**
     * Requests a password reset email to be sent to the specified email address
     * associated with the user account. This email allows the user to securely
     * reset their password on the Parse site.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method requestPasswordReset
     * @param {String} email The email address associated with the user that
     *     forgot their password.
     * @param {Object} options A Backbone-style options object.
     * @static
     */
  }, {
    key: 'requestPasswordReset',
    value: function requestPasswordReset(email, options) {
      options = options || {};

      var requestOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        requestOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.requestPasswordReset(email, requestOptions)._thenRunCallbacks(options);
    }

    /**
     * Allow someone to define a custom User class without className
     * being rewritten to _User. The default behavior is to rewrite
     * User to _User for legacy reasons. This allows developers to
     * override that behavior.
     *
     * @method allowCustomUserClass
     * @param {Boolean} isAllowed Whether or not to allow custom User class
     * @static
     */
  }, {
    key: 'allowCustomUserClass',
    value: function allowCustomUserClass(isAllowed) {
      _CoreManager2['default'].set('PERFORM_USER_REWRITE', !isAllowed);
    }

    /**
     * Allows a legacy application to start using revocable sessions. If the
     * current session token is not revocable, a request will be made for a new,
     * revocable session.
     * It is not necessary to call this method from cloud code unless you are
     * handling user signup or login from the server side. In a cloud code call,
     * this function will not attempt to upgrade the current token.
     * @method enableRevocableSession
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is resolved when the process has
     *   completed. If a replacement session token is requested, the promise
     *   will be resolved after a new token has been fetched.
     */
  }, {
    key: 'enableRevocableSession',
    value: function enableRevocableSession(options) {
      options = options || {};
      _CoreManager2['default'].set('FORCE_REVOCABLE_SESSION', true);
      if (canUseCurrentUser) {
        var current = ParseUser.current();
        if (current) {
          return current._upgradeToRevocableSession(options);
        }
      }
      return _ParsePromise2['default'].as()._thenRunCallbacks(options);
    }

    /**
     * Enables the use of become or the current user in a server
     * environment. These features are disabled by default, since they depend on
     * global objects that are not memory-safe for most servers.
     * @method enableUnsafeCurrentUser
     * @static
     */
  }, {
    key: 'enableUnsafeCurrentUser',
    value: function enableUnsafeCurrentUser() {
      canUseCurrentUser = true;
    }

    /**
     * Disables the use of become or the current user in any environment.
     * These features are disabled on servers by default, since they depend on
     * global objects that are not memory-safe for most servers.
     * @method disableUnsafeCurrentUser
     * @static
     */
  }, {
    key: 'disableUnsafeCurrentUser',
    value: function disableUnsafeCurrentUser() {
      canUseCurrentUser = false;
    }
  }, {
    key: '_registerAuthenticationProvider',
    value: function _registerAuthenticationProvider(provider) {
      authProviders[provider.getAuthType()] = provider;
      // Synchronize the current user with the auth provider.
      ParseUser.currentAsync().then(function (current) {
        if (current) {
          current._synchronizeAuthData(provider.getAuthType());
        }
      });
    }
  }, {
    key: '_logInWith',
    value: function _logInWith(provider, options) {
      var user = new ParseUser();
      return user._linkWith(provider, options);
    }
  }, {
    key: '_clearCache',
    value: function _clearCache() {
      currentUserCache = null;
      currentUserCacheMatchesDisk = false;
    }
  }, {
    key: '_setCurrentUserCache',
    value: function _setCurrentUserCache(user) {
      currentUserCache = user;
    }
  }]);

  return ParseUser;
})(_ParseObject3['default']);

exports['default'] = ParseUser;

_ParseObject3['default'].registerSubclass('_User', ParseUser);

var DefaultController = {
  updateUserOnDisk: function updateUserOnDisk(user) {
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    var json = user.toJSON();
    json.className = '_User';
    return _Storage2['default'].setItemAsync(path, JSON.stringify(json)).then(function () {
      return user;
    });
  },

  removeUserFromDisk: function removeUserFromDisk() {
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    currentUserCacheMatchesDisk = true;
    currentUserCache = null;
    return _Storage2['default'].removeItemAsync(path);
  },

  setCurrentUser: function setCurrentUser(user) {
    currentUserCache = user;
    user._cleanupAuthData();
    user._synchronizeAllAuthData();
    return DefaultController.updateUserOnDisk(user);
  },

  currentUser: function currentUser() {
    if (currentUserCache) {
      return currentUserCache;
    }
    if (currentUserCacheMatchesDisk) {
      return null;
    }
    if (_Storage2['default'].async()) {
      throw new Error('Cannot call currentUser() when using a platform with an async ' + 'storage system. Call currentUserAsync() instead.');
    }
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    var userData = _Storage2['default'].getItem(path);
    currentUserCacheMatchesDisk = true;
    if (!userData) {
      currentUserCache = null;
      return null;
    }
    userData = JSON.parse(userData);
    if (!userData.className) {
      userData.className = '_User';
    }
    if (userData._id) {
      if (userData.objectId !== userData._id) {
        userData.objectId = userData._id;
      }
      delete userData._id;
    }
    if (userData._sessionToken) {
      userData.sessionToken = userData._sessionToken;
      delete userData._sessionToken;
    }
    var current = _ParseObject3['default'].fromJSON(userData);
    currentUserCache = current;
    current._synchronizeAllAuthData();
    return current;
  },

  currentUserAsync: function currentUserAsync() {
    if (currentUserCache) {
      return _ParsePromise2['default'].as(currentUserCache);
    }
    if (currentUserCacheMatchesDisk) {
      return _ParsePromise2['default'].as(null);
    }
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    return _Storage2['default'].getItemAsync(path).then(function (userData) {
      currentUserCacheMatchesDisk = true;
      if (!userData) {
        currentUserCache = null;
        return _ParsePromise2['default'].as(null);
      }
      userData = JSON.parse(userData);
      if (!userData.className) {
        userData.className = '_User';
      }
      if (userData._id) {
        if (userData.objectId !== userData._id) {
          userData.objectId = userData._id;
        }
        delete userData._id;
      }
      if (userData._sessionToken) {
        userData.sessionToken = userData._sessionToken;
        delete userData._sessionToken;
      }
      var current = _ParseObject3['default'].fromJSON(userData);
      currentUserCache = current;
      current._synchronizeAllAuthData();
      return _ParsePromise2['default'].as(current);
    });
  },

  signUp: function signUp(user, attrs, options) {
    var username = attrs && attrs.username || user.get('username');
    var password = attrs && attrs.password || user.get('password');

    if (!username || !username.length) {
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Cannot sign up user with an empty name.'));
    }
    if (!password || !password.length) {
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Cannot sign up user with an empty password.'));
    }

    return user.save(attrs, options).then(function () {
      // Clear the password field
      user._finishFetch({ password: undefined });

      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }
      return user;
    });
  },

  logIn: function logIn(user, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    var stateController = _CoreManager2['default'].getObjectStateController();
    var auth = {
      username: user.get('username'),
      password: user.get('password')
    };
    return RESTController.request('GET', 'login', auth, options).then(function (response, status) {
      user._migrateId(response.objectId);
      user._setExisted(true);
      stateController.setPendingOp(user._getStateIdentifier(), 'username', undefined);
      stateController.setPendingOp(user._getStateIdentifier(), 'password', undefined);
      response.password = undefined;
      user._finishFetch(response);
      if (!canUseCurrentUser) {
        // We can't set the current user, so just return the one we logged in
        return _ParsePromise2['default'].as(user);
      }
      return DefaultController.setCurrentUser(user);
    });
  },

  become: function become(options) {
    var user = new ParseUser();
    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('GET', 'users/me', {}, options).then(function (response, status) {
      user._finishFetch(response);
      user._setExisted(true);
      return DefaultController.setCurrentUser(user);
    });
  },

  logOut: function logOut() {
    return DefaultController.currentUserAsync().then(function (currentUser) {
      var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
      var promise = _Storage2['default'].removeItemAsync(path);
      var RESTController = _CoreManager2['default'].getRESTController();
      if (currentUser !== null) {
        var currentSession = currentUser.getSessionToken();
        if (currentSession && (0, _isRevocableSession2['default'])(currentSession)) {
          promise = promise.then(function () {
            return RESTController.request('POST', 'logout', {}, { sessionToken: currentSession });
          });
        }
        currentUser._logOutWithAll();
        currentUser._finishFetch({ sessionToken: undefined });
      }
      currentUserCacheMatchesDisk = true;
      currentUserCache = null;

      return promise;
    });
  },

  requestPasswordReset: function requestPasswordReset(email, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('POST', 'requestPasswordReset', { email: email }, options);
  },

  upgradeToRevocableSession: function upgradeToRevocableSession(user, options) {
    var token = user.getSessionToken();
    if (!token) {
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].SESSION_MISSING, 'Cannot upgrade a user with no session token'));
    }

    options.sessionToken = token;

    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('POST', 'upgradeToRevocableSession', {}, options).then(function (result) {
      var session = new _ParseSession2['default']();
      session._finishFetch(result);
      user._finishFetch({ sessionToken: session.getSessionToken() });
      if (user.isCurrent()) {
        return DefaultController.setCurrentUser(user);
      }
      return _ParsePromise2['default'].as(user);
    });
  },

  linkWith: function linkWith(user, authData) {
    return user.save({ authData: authData }).then(function () {
      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }
      return user;
    });
  }
};

_CoreManager2['default'].setUserController(DefaultController);
module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(39)
  , core    = __webpack_require__(26)
  , fails   = __webpack_require__(56);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
var Iterators = __webpack_require__(42);
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(112)
  , $export        = __webpack_require__(39)
  , redefine       = __webpack_require__(60)
  , hide           = __webpack_require__(36)
  , has            = __webpack_require__(43)
  , Iterators      = __webpack_require__(42)
  , $iterCreate    = __webpack_require__(113)
  , setToStringTag = __webpack_require__(61)
  , getProto       = __webpack_require__(25).getProto
  , ITERATOR       = __webpack_require__(30)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(25).setDesc
  , has = __webpack_require__(43)
  , TAG = __webpack_require__(30)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 62 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(60);
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is a simple wrapper to unify EventEmitter implementations across platforms.
 */



module.exports = __webpack_require__(140).EventEmitter;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(48);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Represents a Role on the Parse server. Roles represent groupings of
 * Users for the purposes of granting permissions (e.g. specifying an ACL
 * for an Object). Roles are specified by their sets of child users and
 * child roles, all of which are granted any permissions that the parent
 * role has.
 *
 * <p>Roles must have a name (which cannot be changed after creation of the
 * role), and must specify an ACL.</p>
 * @class Parse.Role
 * @constructor
 * @param {String} name The name of the Role to create.
 * @param {Parse.ACL} acl The ACL for this role. Roles must have an ACL.
 * A Parse.Role is a local representation of a role persisted to the Parse
 * cloud.
 */


var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseACL = __webpack_require__(35);

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseObject2 = __webpack_require__(21);

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var ParseRole = (function (_ParseObject) {
  _inherits(ParseRole, _ParseObject);

  function ParseRole(name, acl) {
    _classCallCheck(this, ParseRole);

    _get(Object.getPrototypeOf(ParseRole.prototype), 'constructor', this).call(this, '_Role');
    if (typeof name === 'string' && acl instanceof _ParseACL2['default']) {
      this.setName(name);
      this.setACL(acl);
    }
  }

  /**
   * Gets the name of the role.  You can alternatively call role.get("name")
   *
   * @method getName
   * @return {String} the name of the role.
   */

  _createClass(ParseRole, [{
    key: 'getName',
    value: function getName() {
      return this.get('name');
    }

    /**
     * Sets the name for a role. This value must be set before the role has
     * been saved to the server, and cannot be set once the role has been
     * saved.
     *
     * <p>
     *   A role's name can only contain alphanumeric characters, _, -, and
     *   spaces.
     * </p>
     *
     * <p>This is equivalent to calling role.set("name", name)</p>
     *
     * @method setName
     * @param {String} name The name of the role.
     * @param {Object} options Standard options object with success and error
     *     callbacks.
     */
  }, {
    key: 'setName',
    value: function setName(name, options) {
      return this.set('name', name, options);
    }

    /**
     * Gets the Parse.Relation for the Parse.Users that are direct
     * children of this role. These users are granted any privileges that this
     * role has been granted (e.g. read or write access through ACLs). You can
     * add or remove users from the role through this relation.
     *
     * <p>This is equivalent to calling role.relation("users")</p>
     *
     * @method getUsers
     * @return {Parse.Relation} the relation for the users belonging to this
     *     role.
     */
  }, {
    key: 'getUsers',
    value: function getUsers() {
      return this.relation('users');
    }

    /**
     * Gets the Parse.Relation for the Parse.Roles that are direct
     * children of this role. These roles' users are granted any privileges that
     * this role has been granted (e.g. read or write access through ACLs). You
     * can add or remove child roles from this role through this relation.
     *
     * <p>This is equivalent to calling role.relation("roles")</p>
     *
     * @method getRoles
     * @return {Parse.Relation} the relation for the roles belonging to this
     *     role.
     */
  }, {
    key: 'getRoles',
    value: function getRoles() {
      return this.relation('roles');
    }
  }, {
    key: 'validate',
    value: function validate(attrs, options) {
      var isInvalid = _get(Object.getPrototypeOf(ParseRole.prototype), 'validate', this).call(this, attrs, options);
      if (isInvalid) {
        return isInvalid;
      }

      if ('name' in attrs && attrs.name !== this.getName()) {
        var newName = attrs.name;
        if (this.id && this.id !== attrs.objectId) {
          // Check to see if the objectId being set matches this.id
          // This happens during a fetch -- the id is set before calling fetch
          // Let the name be set in this case
          return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'A role\'s name can only be set before it has been saved.');
        }
        if (typeof newName !== 'string') {
          return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'A role\'s name must be a String.');
        }
        if (!/^[0-9a-zA-Z\-_ ]+$/.test(newName)) {
          return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'A role\'s name can be only contain alphanumeric characters, _, ' + '-, and spaces.');
        }
      }
      return false;
    }
  }]);

  return ParseRole;
})(_ParseObject3['default']);

exports['default'] = ParseRole;

_ParseObject3['default'].registerSubclass('_Role', ParseRole);
module.exports = exports['default'];

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(69)
  , defined = __webpack_require__(48);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(57);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(115)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(59)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 75 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(77)
  , ITERATOR  = __webpack_require__(30)('iterator')
  , Iterators = __webpack_require__(42);
module.exports = __webpack_require__(26).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(57)
  , TAG = __webpack_require__(30)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = arrayContainsObject;

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function arrayContainsObject(array, object) {
  if (array.indexOf(object) > -1) {
    return true;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof _ParseObject2['default'] && array[i].className === object.className && array[i]._getId() === object._getId()) {
      return true;
    }
  }
  return false;
}

module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unique;

var _arrayContainsObject = __webpack_require__(78);

var _arrayContainsObject2 = _interopRequireDefault(_arrayContainsObject);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function unique(arr) {
  var uniques = [];
  arr.forEach(function (value) {
    if (value instanceof _ParseObject2['default']) {
      if (!(0, _arrayContainsObject2['default'])(uniques, value)) {
        uniques.push(value);
      }
    } else {
      if (uniques.indexOf(value) < 0) {
        uniques.push(value);
      }
    }
  });
  return uniques;
}

module.exports = exports['default'];

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = escape;

function escape(str) {
  return str.replace(/[&<>\/'"]/g, function (char) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '/': '&#x2F;',
      '\'': '&#x27;',
      '"': '&quot;'
    })[char];
  });
}

module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseDate;

function parseDate(iso8601) {
  var regexp = new RegExp('^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})' + 'T' + '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})' + '(.([0-9]+))?' + 'Z$');
  var match = regexp.exec(iso8601);
  if (!match) {
    return null;
  }

  var year = match[1] || 0;
  var month = (match[2] || 1) - 1;
  var day = match[3] || 0;
  var hour = match[4] || 0;
  var minute = match[5] || 0;
  var second = match[6] || 0;
  var milli = match[8] || 0;

  return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
}

module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.defaultState = defaultState;
exports.setServerData = setServerData;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _TaskQueue = __webpack_require__(83);

var _TaskQueue2 = _interopRequireDefault(_TaskQueue);

var _ParseOp = __webpack_require__(37);

function defaultState() {
  return {
    serverData: {},
    pendingOps: [{}],
    objectCache: {},
    tasks: new _TaskQueue2['default'](),
    existed: false
  };
}

function setServerData(serverData, attributes) {
  for (var _attr in attributes) {
    if (typeof attributes[_attr] !== 'undefined') {
      serverData[_attr] = attributes[_attr];
    } else {
      delete serverData[_attr];
    }
  }
}

function setPendingOp(pendingOps, attr, op) {
  var last = pendingOps.length - 1;
  if (op) {
    pendingOps[last][attr] = op;
  } else {
    delete pendingOps[last][attr];
  }
}

function pushPendingState(pendingOps) {
  pendingOps.push({});
}

function popPendingState(pendingOps) {
  var first = pendingOps.shift();
  if (!pendingOps.length) {
    pendingOps[0] = {};
  }
  return first;
}

function mergeFirstPendingState(pendingOps) {
  var first = popPendingState(pendingOps);
  var next = pendingOps[0];
  for (var _attr2 in first) {
    if (next[_attr2] && first[_attr2]) {
      var merged = next[_attr2].mergeWith(first[_attr2]);
      if (merged) {
        next[_attr2] = merged;
      }
    } else {
      next[_attr2] = first[_attr2];
    }
  }
}

function estimateAttribute(serverData, pendingOps, className, id, attr) {
  var value = serverData[attr];
  for (var i = 0; i < pendingOps.length; i++) {
    if (pendingOps[i][attr]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        value = pendingOps[i][attr].applyTo(value, { className: className, id: id }, attr);
      } else {
        value = pendingOps[i][attr].applyTo(value);
      }
    }
  }
  return value;
}

function estimateAttributes(serverData, pendingOps, className, id) {
  var data = {};
  var attr = undefined;
  for (attr in serverData) {
    data[attr] = serverData[attr];
  }
  for (var i = 0; i < pendingOps.length; i++) {
    for (attr in pendingOps[i]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        data[attr] = pendingOps[i][attr].applyTo(data[attr], { className: className, id: id }, attr);
      } else {
        data[attr] = pendingOps[i][attr].applyTo(data[attr]);
      }
    }
  }
  return data;
}

function commitServerChanges(serverData, objectCache, changes) {
  for (var _attr3 in changes) {
    var val = changes[_attr3];
    serverData[_attr3] = val;
    if (val && typeof val === 'object' && !(val instanceof _ParseObject2['default']) && !(val instanceof _ParseFile2['default']) && !(val instanceof _ParseRelation2['default'])) {
      var json = (0, _encode2['default'])(val, false, true);
      objectCache[_attr3] = JSON.stringify(json);
    }
  }
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

module.exports = (function () {
  function TaskQueue() {
    _classCallCheck(this, TaskQueue);

    this.queue = [];
  }

  _createClass(TaskQueue, [{
    key: 'enqueue',
    value: function enqueue(task) {
      var _this = this;

      var taskComplete = new _ParsePromise2['default']();
      this.queue.push({
        task: task,
        _completion: taskComplete
      });
      if (this.queue.length === 1) {
        task().then(function () {
          _this._dequeue();
          taskComplete.resolve();
        }, function (error) {
          _this._dequeue();
          taskComplete.reject(error);
        });
      }
      return taskComplete;
    }
  }, {
    key: '_dequeue',
    value: function _dequeue() {
      var _this2 = this;

      this.queue.shift();
      if (this.queue.length) {
        var next = this.queue[0];
        next.task().then(function () {
          _this2._dequeue();
          next._completion.resolve();
        }, function (error) {
          _this2._dequeue();
          next._completion.reject(error);
        });
      }
    }
  }]);

  return TaskQueue;
})();

/***/ }),
/* 84 */
/***/ (function(module, exports) {



/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(75)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $              = __webpack_require__(25)
  , global         = __webpack_require__(49)
  , $export        = __webpack_require__(39)
  , fails          = __webpack_require__(56)
  , hide           = __webpack_require__(36)
  , redefineAll    = __webpack_require__(63)
  , forOf          = __webpack_require__(52)
  , strictNew      = __webpack_require__(64)
  , isObject       = __webpack_require__(27)
  , setToStringTag = __webpack_require__(61)
  , DESCRIPTORS    = __webpack_require__(50);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isRevocableSession;

function isRevocableSession(token) {
  return token.indexOf('r:') > -1;
}

module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * @class Parse.Session
 * @constructor
 *
 * <p>A Parse.Session object is a local representation of a revocable session.
 * This class is a subclass of a Parse.Object, and retains the same
 * functionality of a Parse.Object.</p>
 */


var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _isRevocableSession = __webpack_require__(87);

var _isRevocableSession2 = _interopRequireDefault(_isRevocableSession);

var _ParseObject2 = __webpack_require__(21);

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseUser = __webpack_require__(53);

var _ParseUser2 = _interopRequireDefault(_ParseUser);

var ParseSession = (function (_ParseObject) {
  _inherits(ParseSession, _ParseObject);

  function ParseSession(attributes) {
    _classCallCheck(this, ParseSession);

    _get(Object.getPrototypeOf(ParseSession.prototype), 'constructor', this).call(this, '_Session');
    if (attributes && typeof attributes === 'object') {
      if (!this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }
  }

  /**
   * Returns the session token string.
   * @method getSessionToken
   * @return {String}
   */

  _createClass(ParseSession, [{
    key: 'getSessionToken',
    value: function getSessionToken() {
      return this.get('sessionToken');
    }
  }], [{
    key: 'readOnlyAttributes',
    value: function readOnlyAttributes() {
      return ['createdWith', 'expiresAt', 'installationId', 'restricted', 'sessionToken', 'user'];
    }

    /**
     * Retrieves the Session object for the currently logged in session.
     * @method current
     * @static
     * @return {Parse.Promise} A promise that is resolved with the Parse.Session
     *   object after it has been fetched. If there is no current user, the
     *   promise will be rejected.
     */
  }, {
    key: 'current',
    value: function current(options) {
      options = options || {};
      var controller = _CoreManager2['default'].getSessionController();

      var sessionOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        sessionOptions.useMasterKey = options.useMasterKey;
      }
      return _ParseUser2['default'].currentAsync().then(function (user) {
        if (!user) {
          return _ParsePromise2['default'].error('There is no current user.');
        }
        var token = user.getSessionToken();
        sessionOptions.sessionToken = user.getSessionToken();
        return controller.getSession(sessionOptions);
      });
    }

    /**
     * Determines whether the current session token is revocable.
     * This method is useful for migrating Express.js or Node.js web apps to
     * use revocable sessions. If you are migrating an app that uses the Parse
     * SDK in the browser only, please use Parse.User.enableRevocableSession()
     * instead, so that sessions can be automatically upgraded.
     * @method isCurrentSessionRevocable
     * @static
     * @return {Boolean}
     */
  }, {
    key: 'isCurrentSessionRevocable',
    value: function isCurrentSessionRevocable() {
      var currentUser = _ParseUser2['default'].current();
      if (currentUser) {
        return (0, _isRevocableSession2['default'])(currentUser.getSessionToken() || '');
      }
      return false;
    }
  }]);

  return ParseSession;
})(_ParseObject3['default']);

exports['default'] = ParseSession;

_ParseObject3['default'].registerSubclass('_Session', ParseSession);

_CoreManager2['default'].setSessionController({
  getSession: function getSession(options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    var session = new ParseSession();

    return RESTController.request('GET', 'sessions/me', {}, options).then(function (sessionData) {
      session._finishFetch(sessionData);
      session._setExisted(true);
      return session;
    });
  }
});
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _Map = __webpack_require__(141)['default'];

var _getIterator = __webpack_require__(71)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter2 = __webpack_require__(65);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _LiveQuerySubscription = __webpack_require__(148);

var _LiveQuerySubscription2 = _interopRequireDefault(_LiveQuerySubscription);

// The LiveQuery client inner state
var CLIENT_STATE = {
  INITIALIZED: 'initialized',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  CLOSED: 'closed',
  RECONNECTING: 'reconnecting',
  DISCONNECTED: 'disconnected'
};

// The event type the LiveQuery client should sent to server
var OP_TYPES = {
  CONNECT: 'connect',
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  ERROR: 'error'
};

// The event we get back from LiveQuery server
var OP_EVENTS = {
  CONNECTED: 'connected',
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  ERROR: 'error',
  CREATE: 'create',
  UPDATE: 'update',
  ENTER: 'enter',
  LEAVE: 'leave',
  DELETE: 'delete'
};

// The event the LiveQuery client should emit
var CLIENT_EMMITER_TYPES = {
  CLOSE: 'close',
  ERROR: 'error',
  OPEN: 'open'
};

// The event the LiveQuery subscription should emit
var SUBSCRIPTION_EMMITER_TYPES = {
  OPEN: 'open',
  CLOSE: 'close',
  ERROR: 'error',
  CREATE: 'create',
  UPDATE: 'update',
  ENTER: 'enter',
  LEAVE: 'leave',
  DELETE: 'delete'
};

var generateInterval = function generateInterval(k) {
  return Math.random() * Math.min(30, Math.pow(2, k) - 1) * 1000;
};

/**
 * Creates a new LiveQueryClient.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 * 
 * A wrapper of a standard WebSocket client. We add several useful methods to 
 * help you connect/disconnect to LiveQueryServer, subscribe/unsubscribe a ParseQuery easily.
 *
 * javascriptKey and masterKey are used for verifying the LiveQueryClient when it tries
 * to connect to the LiveQuery server
 * 
 * @class Parse.LiveQueryClient
 * @constructor
 * @param {Object} options
 * @param {string} options.applicationId - applicationId of your Parse app
 * @param {string} options.serverURL - <b>the URL of your LiveQuery server</b>
 * @param {string} options.javascriptKey (optional)
 * @param {string} options.masterKey (optional) Your Parse Master Key. (Node.js only!)
 * @param {string} options.sessionToken (optional)
 *
 *
 * We expose three events to help you monitor the status of the LiveQueryClient.
 *
 * <pre>
 * let Parse = require('parse/node');
 * let LiveQueryClient = Parse.LiveQueryClient;
 * let client = new LiveQueryClient({
 *   applicationId: '',
 *   serverURL: '',
 *   javascriptKey: '',
 *   masterKey: ''
 *  });
 * </pre>
 * 
 * Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
 * <pre>
 * client.on('open', () => {
 * 
 * });</pre>
 *
 * Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
 * <pre>
 * client.on('close', () => {
 * 
 * });</pre>
 *
 * Error - When some network error or LiveQuery server error happens, you'll get this event.
 * <pre>
 * client.on('error', (error) => {
 * 
 * });</pre>
 * 
 * 
 */

var LiveQueryClient = (function (_EventEmitter) {
  _inherits(LiveQueryClient, _EventEmitter);

  function LiveQueryClient(_ref) {
    var applicationId = _ref.applicationId;
    var serverURL = _ref.serverURL;
    var javascriptKey = _ref.javascriptKey;
    var masterKey = _ref.masterKey;
    var sessionToken = _ref.sessionToken;

    _classCallCheck(this, LiveQueryClient);

    _get(Object.getPrototypeOf(LiveQueryClient.prototype), 'constructor', this).call(this);

    if (!serverURL || serverURL.indexOf('ws') !== 0) {
      throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
    }

    this.reconnectHandle = null;
    this.attempts = 1;;
    this.id = 0;
    this.requestId = 1;
    this.serverURL = serverURL;
    this.applicationId = applicationId;
    this.javascriptKey = javascriptKey;
    this.masterKey = masterKey;
    this.sessionToken = sessionToken;
    this.connectPromise = new _ParsePromise2['default']();
    this.subscriptions = new _Map();
    this.state = CLIENT_STATE.INITIALIZED;
  }

  _createClass(LiveQueryClient, [{
    key: 'shouldOpen',
    value: function shouldOpen() {
      return this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED;
    }

    /**
     * Subscribes to a ParseQuery
     * 
     * If you provide the sessionToken, when the LiveQuery server gets ParseObject's 
     * updates from parse server, it'll try to check whether the sessionToken fulfills 
     * the ParseObject's ACL. The LiveQuery server will only send updates to clients whose 
     * sessionToken is fit for the ParseObject's ACL. You can check the LiveQuery protocol
     * <a href="https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification">here</a> for more details. The subscription you get is the same subscription you get 
     * from our Standard API.
     * 
     * @method subscribe
     * @param {Object} query - the ParseQuery you want to subscribe to
     * @param {string} sessionToken (optional) 
     * @return {Object} subscription
     */
  }, {
    key: 'subscribe',
    value: function subscribe(query, sessionToken) {
      var _this = this;

      if (!query) {
        return;
      }
      var where = query.toJSON().where;
      var className = query.className;
      var subscribeRequest = {
        op: OP_TYPES.SUBSCRIBE,
        requestId: this.requestId,
        query: {
          className: className,
          where: where
        }
      };

      if (sessionToken) {
        subscribeRequest.sessionToken = sessionToken;
      }

      var subscription = new _LiveQuerySubscription2['default'](this.requestId, query, sessionToken);
      this.subscriptions.set(this.requestId, subscription);
      this.requestId += 1;
      this.connectPromise.then(function () {
        _this.socket.send(JSON.stringify(subscribeRequest));
      });

      // adding listener so process does not crash
      // best practice is for developer to register their own listener
      subscription.on('error', function () {});

      return subscription;
    }

    /**
     * After calling unsubscribe you'll stop receiving events from the subscription object.
     * 
     * @method unsubscribe
     * @param {Object} subscription - subscription you would like to unsubscribe from.
     */
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(subscription) {
      var _this2 = this;

      if (!subscription) {
        return;
      }

      this.subscriptions['delete'](subscription.id);
      var unsubscribeRequest = {
        op: OP_TYPES.UNSUBSCRIBE,
        requestId: subscription.id
      };
      this.connectPromise.then(function () {
        _this2.socket.send(JSON.stringify(unsubscribeRequest));
      });
    }

    /**
     * After open is called, the LiveQueryClient will try to send a connect request
     * to the LiveQuery server.
     * 
     * @method open
     */
  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      var WebSocketImplementation = this._getWebSocketImplementation();
      if (!WebSocketImplementation) {
        this.emit(CLIENT_EMMITER_TYPES.ERROR, 'Can not find WebSocket implementation');
        return;
      }

      if (this.state !== CLIENT_STATE.RECONNECTING) {
        this.state = CLIENT_STATE.CONNECTING;
      }

      // Get WebSocket implementation
      this.socket = new WebSocketImplementation(this.serverURL);

      // Bind WebSocket callbacks
      this.socket.onopen = function () {
        _this3._handleWebSocketOpen();
      };

      this.socket.onmessage = function (event) {
        _this3._handleWebSocketMessage(event);
      };

      this.socket.onclose = function () {
        _this3._handleWebSocketClose();
      };

      this.socket.onerror = function (error) {
        console.log("error on socket");
        _this3._handleWebSocketError(error);
      };
    }
  }, {
    key: 'resubscribe',
    value: function resubscribe() {
      var _this4 = this;

      this.subscriptions.forEach(function (subscription, requestId) {
        var query = subscription.query;
        var where = query.toJSON().where;
        var className = query.className;
        var sessionToken = subscription.sessionToken;
        var subscribeRequest = {
          op: OP_TYPES.SUBSCRIBE,
          requestId: requestId,
          query: {
            className: className,
            where: where
          }
        };

        if (sessionToken) {
          subscribeRequest.sessionToken = sessionToken;
        }

        _this4.connectPromise.then(function () {
          _this4.socket.send(JSON.stringify(subscribeRequest));
        });
      });
    }

    /**
     * This method will close the WebSocket connection to this LiveQueryClient, 
     * cancel the auto reconnect and unsubscribe all subscriptions based on it.
     * 
     * @method close
     */
  }, {
    key: 'close',
    value: function close() {
      if (this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }
      this.state = CLIENT_STATE.DISCONNECTED;
      this.socket.close();
      // Notify each subscription about the close
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(this.subscriptions.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscription = _step.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._handleReset();
      this.emit(CLIENT_EMMITER_TYPES.CLOSE);
    }
  }, {
    key: '_getWebSocketImplementation',
    value: function _getWebSocketImplementation() {
      return typeof WebSocket === 'function' || typeof WebSocket === 'object' ? WebSocket : null;
    }

    // ensure we start with valid state if connect is called again after close
  }, {
    key: '_handleReset',
    value: function _handleReset() {
      this.attempts = 1;;
      this.id = 0;
      this.requestId = 1;
      this.connectPromise = new _ParsePromise2['default']();
      this.subscriptions = new _Map();
    }
  }, {
    key: '_handleWebSocketOpen',
    value: function _handleWebSocketOpen() {
      this.attempts = 1;
      var connectRequest = {
        op: OP_TYPES.CONNECT,
        applicationId: this.applicationId,
        javascriptKey: this.javascriptKey,
        masterKey: this.masterKey,
        sessionToken: this.sessionToken
      };
      this.socket.send(JSON.stringify(connectRequest));
    }
  }, {
    key: '_handleWebSocketMessage',
    value: function _handleWebSocketMessage(event) {
      var data = event.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      var subscription = null;
      if (data.requestId) {
        subscription = this.subscriptions.get(data.requestId);
      }
      switch (data.op) {
        case OP_EVENTS.CONNECTED:
          if (this.state === CLIENT_STATE.RECONNECTING) {
            this.resubscribe();
          }
          this.emit(CLIENT_EMMITER_TYPES.OPEN);
          this.id = data.clientId;
          this.connectPromise.resolve();
          this.state = CLIENT_STATE.CONNECTED;
          break;
        case OP_EVENTS.SUBSCRIBED:
          if (subscription) {
            subscription.emit(SUBSCRIPTION_EMMITER_TYPES.OPEN);
          }
          break;
        case OP_EVENTS.ERROR:
          if (data.requestId) {
            if (subscription) {
              subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR, data.error);
            }
          } else {
            this.emit(CLIENT_EMMITER_TYPES.ERROR, data.error);
          }
          break;
        case OP_EVENTS.UNSUBSCRIBED:
          // We have already deleted subscription in unsubscribe(), do nothing here
          break;
        default:
          // create, update, enter, leave, delete cases
          var className = data.object.className;
          // Delete the extrea __type and className fields during transfer to full JSON
          delete data.object.__type;
          delete data.object.className;
          var parseObject = new _ParseObject2['default'](className);
          parseObject._finishFetch(data.object);
          if (!subscription) {
            break;
          }
          subscription.emit(data.op, parseObject);
      }
    }
  }, {
    key: '_handleWebSocketClose',
    value: function _handleWebSocketClose() {
      if (this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }
      this.state = CLIENT_STATE.CLOSED;
      this.emit(CLIENT_EMMITER_TYPES.CLOSE);
      // Notify each subscription about the close
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(this.subscriptions.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var subscription = _step2.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._handleReconnect();
    }
  }, {
    key: '_handleWebSocketError',
    value: function _handleWebSocketError(error) {
      this.emit(CLIENT_EMMITER_TYPES.ERROR, error);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(this.subscriptions.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var subscription = _step3.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this._handleReconnect();
    }
  }, {
    key: '_handleReconnect',
    value: function _handleReconnect() {
      var _this5 = this;

      // if closed or currently reconnecting we stop attempting to reconnect
      if (this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }

      this.state = CLIENT_STATE.RECONNECTING;
      var time = generateInterval(this.attempts);

      // handle case when both close/error occur at frequent rates we ensure we do not reconnect unnecessarily.
      // we're unable to distinguish different between close/error when we're unable to reconnect therefore
      // we try to reonnect in both cases
      // server side ws and browser WebSocket behave differently in when close/error get triggered

      if (this.reconnectHandle) {
        clearTimeout(this.reconnectHandle);
      } else {
        console.info('attempting to reconnect');
      }

      this.reconnectHandle = setTimeout((function () {
        _this5.attempts++;
        _this5.connectPromise = new _ParsePromise2['default']();
        _this5.open();
      }).bind(this), time);
    }
  }]);

  return LiveQueryClient;
})(_EventEmitter3['default']);

exports['default'] = LiveQueryClient;
module.exports = exports['default'];

/***/ }),
/* 90 */,
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(92);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

var _interopRequireWildcard = __webpack_require__(46)['default'];

var _decode = __webpack_require__(38);

var _decode2 = _interopRequireDefault(_decode);

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _InstallationController = __webpack_require__(131);

var _InstallationController2 = _interopRequireDefault(_InstallationController);

var _ParseOp = __webpack_require__(37);

var ParseOp = _interopRequireWildcard(_ParseOp);

var _RESTController = __webpack_require__(132);

var _RESTController2 = _interopRequireDefault(_RESTController);

/**
 * Contains all Parse API classes and functions.
 * @class Parse
 * @static
 */
var Parse = {
  /**
   * Call this method first to set up your authentication tokens for Parse.
   * You can get your keys from the Data Browser on parse.com.
   * @method initialize
   * @param {String} applicationId Your Parse Application ID.
   * @param {String} javaScriptKey (optional) Your Parse JavaScript Key (Not needed for parse-server)
   * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
   * @static
   */
  initialize: function initialize(applicationId, javaScriptKey) {
    if ('browser' === 'browser' && _CoreManager2['default'].get('IS_NODE')) {
      console.log('It looks like you\'re using the browser version of the SDK in a ' + 'node.js environment. You should require(\'parse/node\') instead.');
    }
    Parse._initialize(applicationId, javaScriptKey);
  },

  _initialize: function _initialize(applicationId, javaScriptKey, masterKey) {
    _CoreManager2['default'].set('APPLICATION_ID', applicationId);
    _CoreManager2['default'].set('JAVASCRIPT_KEY', javaScriptKey);
    _CoreManager2['default'].set('MASTER_KEY', masterKey);
    _CoreManager2['default'].set('USE_MASTER_KEY', false);
  }
};

/** These legacy setters may eventually be deprecated **/
Object.defineProperty(Parse, 'applicationId', {
  get: function get() {
    return _CoreManager2['default'].get('APPLICATION_ID');
  },
  set: function set(value) {
    _CoreManager2['default'].set('APPLICATION_ID', value);
  }
});
Object.defineProperty(Parse, 'javaScriptKey', {
  get: function get() {
    return _CoreManager2['default'].get('JAVASCRIPT_KEY');
  },
  set: function set(value) {
    _CoreManager2['default'].set('JAVASCRIPT_KEY', value);
  }
});
Object.defineProperty(Parse, 'masterKey', {
  get: function get() {
    return _CoreManager2['default'].get('MASTER_KEY');
  },
  set: function set(value) {
    _CoreManager2['default'].set('MASTER_KEY', value);
  }
});
Object.defineProperty(Parse, 'serverURL', {
  get: function get() {
    return _CoreManager2['default'].get('SERVER_URL');
  },
  set: function set(value) {
    _CoreManager2['default'].set('SERVER_URL', value);
  }
});
Object.defineProperty(Parse, 'liveQueryServerURL', {
  get: function get() {
    return _CoreManager2['default'].get('LIVEQUERY_SERVER_URL');
  },
  set: function set(value) {
    _CoreManager2['default'].set('LIVEQUERY_SERVER_URL', value);
  }
});
/** End setters **/

Parse.ACL = __webpack_require__(35);
Parse.Analytics = __webpack_require__(133);
Parse.Cloud = __webpack_require__(134);
Parse.CoreManager = __webpack_require__(23);
Parse.Config = __webpack_require__(135);
Parse.Error = __webpack_require__(28);
Parse.FacebookUtils = __webpack_require__(136);
Parse.File = __webpack_require__(29);
Parse.GeoPoint = __webpack_require__(44);
Parse.Installation = __webpack_require__(137);
Parse.Object = __webpack_require__(21);
Parse.Op = {
  Set: ParseOp.SetOp,
  Unset: ParseOp.UnsetOp,
  Increment: ParseOp.IncrementOp,
  Add: ParseOp.AddOp,
  Remove: ParseOp.RemoveOp,
  AddUnique: ParseOp.AddUniqueOp,
  Relation: ParseOp.RelationOp
};
Parse.Promise = __webpack_require__(22);
Parse.Push = __webpack_require__(138);
Parse.Query = __webpack_require__(51);
Parse.Relation = __webpack_require__(31);
Parse.Role = __webpack_require__(67);
Parse.Session = __webpack_require__(88);
Parse.Storage = __webpack_require__(45);
Parse.User = __webpack_require__(53);
Parse.LiveQuery = __webpack_require__(139);
Parse.LiveQueryClient = __webpack_require__(89);

Parse._request = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _CoreManager2['default'].getRESTController().request.apply(null, args);
};
Parse._ajax = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _CoreManager2['default'].getRESTController().ajax.apply(null, args);
};
// We attempt to match the signatures of the legacy versions of these methods
Parse._decode = function (_, value) {
  return (0, _decode2['default'])(value);
};
Parse._encode = function (value, _, disallowObjects) {
  return (0, _encode2['default'])(value, disallowObjects);
};
Parse._getInstallationId = function () {
  return _CoreManager2['default'].getInstallationController().currentInstallationId();
};

_CoreManager2['default'].setInstallationController(_InstallationController2['default']);
_CoreManager2['default'].setRESTController(_RESTController2['default']);

// For legacy requires, of the form `var Parse = require('parse').Parse`
Parse.Parse = Parse;

module.exports = Parse;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(25);
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
module.exports = __webpack_require__(26).Object.keys;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(66);

__webpack_require__(55)('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(25);
__webpack_require__(99);
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(68);

__webpack_require__(55)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(25);
module.exports = function create(P, D){
  return $.create(P, D);
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(26).Object.setPrototypeOf;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(39);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(104).set});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = __webpack_require__(25).getDesc
  , isObject = __webpack_require__(27)
  , anObject = __webpack_require__(41);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(40)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
module.exports = __webpack_require__(26).Object.freeze;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(27);

__webpack_require__(55)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = canBeSerialized;

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function canBeSerialized(obj) {
  if (!(obj instanceof _ParseObject2['default'])) {
    return true;
  }
  var attributes = obj.attributes;
  for (var attr in attributes) {
    var val = attributes[attr];
    if (!canBeSerializedHelper(val)) {
      return false;
    }
  }
  return true;
}

function canBeSerializedHelper(value) {
  if (typeof value !== 'object') {
    return true;
  }
  if (value instanceof _ParseRelation2['default']) {
    return true;
  }
  if (value instanceof _ParseObject2['default']) {
    return !!value.id;
  }
  if (value instanceof _ParseFile2['default']) {
    if (value.url()) {
      return true;
    }
    return false;
  }
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      if (!canBeSerializedHelper(value[i])) {
        return false;
      }
    }
    return true;
  }
  for (var k in value) {
    if (!canBeSerializedHelper(value[k])) {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(74);
module.exports = __webpack_require__(116);

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(111)
  , step             = __webpack_require__(72)
  , Iterators        = __webpack_require__(42)
  , toIObject        = __webpack_require__(68);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(59)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $              = __webpack_require__(25)
  , descriptor     = __webpack_require__(73)
  , setToStringTag = __webpack_require__(61)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(36)(IteratorPrototype, __webpack_require__(30)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(49)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(75)
  , defined   = __webpack_require__(48);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(41)
  , get      = __webpack_require__(76);
module.exports = __webpack_require__(26).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var _Object$keys = __webpack_require__(47)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = equals;

var _ParseACL = __webpack_require__(35);

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = __webpack_require__(44);

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function equals(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }

  if (!a || typeof a !== 'object') {
    // a is a primitive
    return a === b;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (var i = a.length; i--;) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (a instanceof _ParseACL2['default'] || a instanceof _ParseFile2['default'] || a instanceof _ParseGeoPoint2['default'] || a instanceof _ParseObject2['default']) {
    return a.equals(b);
  }

  if (_Object$keys(a).length !== _Object$keys(b).length) {
    return false;
  }
  for (var k in a) {
    if (!equals(a[k], b[k])) {
      return false;
    }
  }
  return true;
}

module.exports = exports['default'];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireWildcard = __webpack_require__(46)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getState = getState;
exports.initializeState = initializeState;
exports.removeState = removeState;
exports.getServerData = getServerData;
exports.setServerData = setServerData;
exports.getPendingOps = getPendingOps;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.getObjectCache = getObjectCache;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;
exports.enqueueTask = enqueueTask;
exports.clearAllState = clearAllState;

var _ObjectStateMutations = __webpack_require__(82);

var ObjectStateMutations = _interopRequireWildcard(_ObjectStateMutations);

var objectState = {};

function getState(obj) {
  var classData = objectState[obj.className];
  if (classData) {
    return classData[obj.id] || null;
  }
  return null;
}

function initializeState(obj, initial) {
  var state = getState(obj);
  if (state) {
    return state;
  }
  if (!objectState[obj.className]) {
    objectState[obj.className] = {};
  }
  if (!initial) {
    initial = ObjectStateMutations.defaultState();
  }
  state = objectState[obj.className][obj.id] = initial;
  return state;
}

function removeState(obj) {
  var state = getState(obj);
  if (state === null) {
    return null;
  }
  delete objectState[obj.className][obj.id];
  return state;
}

function getServerData(obj) {
  var state = getState(obj);
  if (state) {
    return state.serverData;
  }
  return {};
}

function setServerData(obj, attributes) {
  var serverData = initializeState(obj).serverData;
  ObjectStateMutations.setServerData(serverData, attributes);
}

function getPendingOps(obj) {
  var state = getState(obj);
  if (state) {
    return state.pendingOps;
  }
  return [{}];
}

function setPendingOp(obj, attr, op) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.setPendingOp(pendingOps, attr, op);
}

function pushPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.pushPendingState(pendingOps);
}

function popPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  return ObjectStateMutations.popPendingState(pendingOps);
}

function mergeFirstPendingState(obj) {
  var pendingOps = getPendingOps(obj);
  ObjectStateMutations.mergeFirstPendingState(pendingOps);
}

function getObjectCache(obj) {
  var state = getState(obj);
  if (state) {
    return state.objectCache;
  }
  return {};
}

function estimateAttribute(obj, attr) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttribute(serverData, pendingOps, obj.className, obj.id, attr);
}

function estimateAttributes(obj) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttributes(serverData, pendingOps, obj.className, obj.id);
}

function commitServerChanges(obj, changes) {
  var state = initializeState(obj);
  ObjectStateMutations.commitServerChanges(state.serverData, state.objectCache, changes);
}

function enqueueTask(obj, task) {
  var state = initializeState(obj);
  return state.tasks.enqueue(task);
}

function clearAllState() {
  objectState = {};
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _WeakMap = __webpack_require__(120)['default'];

var _interopRequireWildcard = __webpack_require__(46)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getState = getState;
exports.initializeState = initializeState;
exports.removeState = removeState;
exports.getServerData = getServerData;
exports.setServerData = setServerData;
exports.getPendingOps = getPendingOps;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.getObjectCache = getObjectCache;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;
exports.enqueueTask = enqueueTask;
exports.duplicateState = duplicateState;
exports.clearAllState = clearAllState;

var _ObjectStateMutations = __webpack_require__(82);

var ObjectStateMutations = _interopRequireWildcard(_ObjectStateMutations);

var _TaskQueue = __webpack_require__(83);

var _TaskQueue2 = _interopRequireDefault(_TaskQueue);

var objectState = new _WeakMap();

function getState(obj) {
  var classData = objectState.get(obj);
  return classData || null;
}

function initializeState(obj, initial) {
  var state = getState(obj);
  if (state) {
    return state;
  }
  if (!initial) {
    initial = {
      serverData: {},
      pendingOps: [{}],
      objectCache: {},
      tasks: new _TaskQueue2['default'](),
      existed: false
    };
  }
  state = initial;
  objectState.set(obj, state);
  return state;
}

function removeState(obj) {
  var state = getState(obj);
  if (state === null) {
    return null;
  }
  objectState['delete'](obj);
  return state;
}

function getServerData(obj) {
  var state = getState(obj);
  if (state) {
    return state.serverData;
  }
  return {};
}

function setServerData(obj, attributes) {
  var serverData = initializeState(obj).serverData;
  ObjectStateMutations.setServerData(serverData, attributes);
}

function getPendingOps(obj) {
  var state = getState(obj);
  if (state) {
    return state.pendingOps;
  }
  return [{}];
}

function setPendingOp(obj, attr, op) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.setPendingOp(pendingOps, attr, op);
}

function pushPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.pushPendingState(pendingOps);
}

function popPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  return ObjectStateMutations.popPendingState(pendingOps);
}

function mergeFirstPendingState(obj) {
  var pendingOps = getPendingOps(obj);
  ObjectStateMutations.mergeFirstPendingState(pendingOps);
}

function getObjectCache(obj) {
  var state = getState(obj);
  if (state) {
    return state.objectCache;
  }
  return {};
}

function estimateAttribute(obj, attr) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttribute(serverData, pendingOps, obj.className, obj.id, attr);
}

function estimateAttributes(obj) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttributes(serverData, pendingOps, obj.className, obj.id);
}

function commitServerChanges(obj, changes) {
  var state = initializeState(obj);
  ObjectStateMutations.commitServerChanges(state.serverData, state.objectCache, changes);
}

function enqueueTask(obj, task) {
  var state = initializeState(obj);
  return state.tasks.enqueue(task);
}

function duplicateState(source, dest) {
  var oldState = initializeState(source);
  var newState = initializeState(dest);
  for (var key in oldState.serverData) {
    newState.serverData[key] = oldState.serverData[key];
  }
  for (var index = 0; index < oldState.pendingOps.length; index++) {
    for (var key in oldState.pendingOps[index]) {
      newState.pendingOps[index][key] = oldState.pendingOps[index][key];
    }
  }
  for (var key in oldState.objectCache) {
    newState.objectCache[key] = oldState.objectCache[key];
  }
  newState.existed = oldState.existed;
}

function clearAllState() {
  objectState = new _WeakMap();
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
__webpack_require__(58);
__webpack_require__(122);
module.exports = __webpack_require__(26).WeakMap;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $            = __webpack_require__(25)
  , redefine     = __webpack_require__(60)
  , weak         = __webpack_require__(123)
  , isObject     = __webpack_require__(27)
  , has          = __webpack_require__(43)
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = __webpack_require__(86)('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide              = __webpack_require__(36)
  , redefineAll       = __webpack_require__(63)
  , anObject          = __webpack_require__(41)
  , isObject          = __webpack_require__(27)
  , strictNew         = __webpack_require__(64)
  , forOf             = __webpack_require__(52)
  , createArrayMethod = __webpack_require__(126)
  , $has              = __webpack_require__(43)
  , WEAK              = __webpack_require__(62)('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(41);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(42)
  , ITERATOR   = __webpack_require__(30)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(40)
  , IObject  = __webpack_require__(69)
  , toObject = __webpack_require__(66)
  , toLength = __webpack_require__(85)
  , asc      = __webpack_require__(127);
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = __webpack_require__(27)
  , isArray  = __webpack_require__(128)
  , SPECIES  = __webpack_require__(30)('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(57);
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unsavedChildren;

var _ParseFile = __webpack_require__(29);

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = __webpack_require__(21);

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = __webpack_require__(31);

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

/**
 * Return an array of unsaved children, which are either Parse Objects or Files.
 * If it encounters any dirty Objects without Ids, it will throw an exception.
 */

function unsavedChildren(obj, allowDeepUnsaved) {
  var encountered = {
    objects: {},
    files: []
  };
  var identifier = obj.className + ':' + obj._getId();
  encountered.objects[identifier] = obj.dirty() ? obj : true;
  var attributes = obj.attributes;
  for (var attr in attributes) {
    if (typeof attributes[attr] === 'object') {
      traverse(attributes[attr], encountered, false, !!allowDeepUnsaved);
    }
  }
  var unsaved = [];
  for (var id in encountered.objects) {
    if (id !== identifier && encountered.objects[id] !== true) {
      unsaved.push(encountered.objects[id]);
    }
  }
  return unsaved.concat(encountered.files);
}

function traverse(obj, encountered, shouldThrow, allowDeepUnsaved) {
  if (obj instanceof _ParseObject2['default']) {
    if (!obj.id && shouldThrow) {
      throw new Error('Cannot create a pointer to an unsaved Object.');
    }
    var identifier = obj.className + ':' + obj._getId();
    if (!encountered.objects[identifier]) {
      encountered.objects[identifier] = obj.dirty() ? obj : true;
      var attributes = obj.attributes;
      for (var attr in attributes) {
        if (typeof attributes[attr] === 'object') {
          traverse(attributes[attr], encountered, !allowDeepUnsaved, allowDeepUnsaved);
        }
      }
    }
    return;
  }
  if (obj instanceof _ParseFile2['default']) {
    if (!obj.url() && encountered.files.indexOf(obj) < 0) {
      encountered.files.push(obj);
    }
    return;
  }
  if (obj instanceof _ParseRelation2['default']) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(function (el) {
      if (typeof el === 'object') {
        traverse(el, encountered, shouldThrow, allowDeepUnsaved);
      }
    });
  }
  for (var k in obj) {
    if (typeof obj[k] === 'object') {
      traverse(obj[k], encountered, shouldThrow, allowDeepUnsaved);
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

module.exports = {
  async: 0,

  getItem: function getItem(path) {
    return localStorage.getItem(path);
  },

  setItem: function setItem(path, value) {
    try {
      localStorage.setItem(path, value);
    } catch (e) {
      // Quota exceeded, possibly due to Safari Private Browsing mode
    }
  },

  removeItem: function removeItem(path) {
    localStorage.removeItem(path);
  },

  clear: function clear() {
    localStorage.clear();
  }
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = __webpack_require__(45);

var _Storage2 = _interopRequireDefault(_Storage);

var iidCache = null;

function hexOctet() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateId() {
  return hexOctet() + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + hexOctet() + hexOctet();
}

module.exports = {
  currentInstallationId: function currentInstallationId() {
    if (typeof iidCache === 'string') {
      return _ParsePromise2['default'].as(iidCache);
    }
    var path = _Storage2['default'].generatePath('installationId');
    return _Storage2['default'].getItemAsync(path).then(function (iid) {
      if (!iid) {
        iid = generateId();
        return _Storage2['default'].setItemAsync(path, iid).then(function () {
          iidCache = iid;
          return iid;
        });
      }
      iidCache = iid;
      return iid;
    });
  },

  _clearCache: function _clearCache() {
    iidCache = null;
  },

  _setInstallationIdCache: function _setInstallationIdCache(iid) {
    iidCache = iid;
  }
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = __webpack_require__(45);

var _Storage2 = _interopRequireDefault(_Storage);

var XHR = null;
if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

var useXDomainRequest = false;
if (typeof XDomainRequest !== 'undefined' && !('withCredentials' in new XMLHttpRequest())) {
  useXDomainRequest = true;
}

function ajaxIE9(method, url, data) {
  var promise = new _ParsePromise2['default']();
  var xdr = new XDomainRequest();
  xdr.onload = function () {
    var response;
    try {
      response = JSON.parse(xdr.responseText);
    } catch (e) {
      promise.reject(e);
    }
    if (response) {
      promise.resolve(response);
    }
  };
  xdr.onerror = xdr.ontimeout = function () {
    // Let's fake a real error message.
    var fakeResponse = {
      responseText: JSON.stringify({
        code: _ParseError2['default'].X_DOMAIN_REQUEST,
        error: 'IE\'s XDomainRequest does not supply error info.'
      })
    };
    promise.reject(fakeResponse);
  };
  xdr.onprogress = function () {};
  xdr.open(method, url);
  xdr.send(data);
  return promise;
}

var RESTController = {
  ajax: function ajax(method, url, data, headers) {
    if (useXDomainRequest) {
      return ajaxIE9(method, url, data, headers);
    }

    var promise = new _ParsePromise2['default']();
    var attempts = 0;

    var dispatch = function dispatch() {
      if (XHR == null) {
        throw new Error('Cannot make a request: No definition of XMLHttpRequest was found.');
      }
      var handled = false;
      var xhr = new XHR();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || handled) {
          return;
        }
        handled = true;

        if (xhr.status >= 200 && xhr.status < 300) {
          var response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            promise.reject(e.toString());
          }
          if (response) {
            promise.resolve(response, xhr.status, xhr);
          }
        } else if (xhr.status >= 500 || xhr.status === 0) {
          // retry on 5XX or node-xmlhttprequest error
          if (++attempts < _CoreManager2['default'].get('REQUEST_ATTEMPT_LIMIT')) {
            // Exponentially-growing random delay
            var delay = Math.round(Math.random() * 125 * Math.pow(2, attempts));
            setTimeout(dispatch, delay);
          } else if (xhr.status === 0) {
            promise.reject('Unable to connect to the Parse API');
          } else {
            // After the retry limit is reached, fail
            promise.reject(xhr);
          }
        } else {
          promise.reject(xhr);
        }
      };

      headers = headers || {};
      headers['Content-Type'] = 'text/plain'; // Avoid pre-flight
      if (_CoreManager2['default'].get('IS_NODE')) {
        headers['User-Agent'] = 'Parse/' + _CoreManager2['default'].get('VERSION') + ' (NodeJS ' + process.versions.node + ')';
      }

      xhr.open(method, url, true);
      for (var h in headers) {
        xhr.setRequestHeader(h, headers[h]);
      }
      xhr.send(data);
    };
    dispatch();

    return promise;
  },

  request: function request(method, path, data, options) {
    options = options || {};
    var url = _CoreManager2['default'].get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += path;

    var payload = {};
    if (data && typeof data === 'object') {
      for (var k in data) {
        payload[k] = data[k];
      }
    }

    if (method !== 'POST') {
      payload._method = method;
      method = 'POST';
    }

    payload._ApplicationId = _CoreManager2['default'].get('APPLICATION_ID');
    var jsKey = _CoreManager2['default'].get('JAVASCRIPT_KEY');
    if (jsKey) {
      payload._JavaScriptKey = jsKey;
    }
    payload._ClientVersion = _CoreManager2['default'].get('VERSION');

    var useMasterKey = options.useMasterKey;
    if (typeof useMasterKey === 'undefined') {
      useMasterKey = _CoreManager2['default'].get('USE_MASTER_KEY');
    }
    if (useMasterKey) {
      if (_CoreManager2['default'].get('MASTER_KEY')) {
        delete payload._JavaScriptKey;
        payload._MasterKey = _CoreManager2['default'].get('MASTER_KEY');
      } else {
        throw new Error('Cannot use the Master Key, it has not been provided.');
      }
    }

    if (_CoreManager2['default'].get('FORCE_REVOCABLE_SESSION')) {
      payload._RevocableSession = '1';
    }

    var installationId = options.installationId;
    var installationIdPromise;
    if (installationId && typeof installationId === 'string') {
      installationIdPromise = _ParsePromise2['default'].as(installationId);
    } else {
      var installationController = _CoreManager2['default'].getInstallationController();
      installationIdPromise = installationController.currentInstallationId();
    }

    return installationIdPromise.then(function (iid) {
      payload._InstallationId = iid;
      var userController = _CoreManager2['default'].getUserController();
      if (options && typeof options.sessionToken === 'string') {
        return _ParsePromise2['default'].as(options.sessionToken);
      } else if (userController) {
        return userController.currentUserAsync().then(function (user) {
          if (user) {
            return _ParsePromise2['default'].as(user.getSessionToken());
          }
          return _ParsePromise2['default'].as(null);
        });
      }
      return _ParsePromise2['default'].as(null);
    }).then(function (token) {
      if (token) {
        payload._SessionToken = token;
      }

      var payloadString = JSON.stringify(payload);

      return RESTController.ajax(method, url, payloadString);
    }).then(null, function (response) {
      // Transform the error into an instance of ParseError by trying to parse
      // the error string as JSON
      var error;
      if (response && response.responseText) {
        try {
          var errorJSON = JSON.parse(response.responseText);
          error = new _ParseError2['default'](errorJSON.code, errorJSON.error);
        } catch (e) {
          // If we fail to parse the error text, that's okay.
          error = new _ParseError2['default'](_ParseError2['default'].INVALID_JSON, 'Received an error with invalid JSON from Parse: ' + response.responseText);
        }
      } else {
        error = new _ParseError2['default'](_ParseError2['default'].CONNECTION_FAILED, 'XMLHttpRequest failed: ' + JSON.stringify(response));
      }

      return _ParsePromise2['default'].error(error);
    });
  },

  _setXHR: function _setXHR(xhr) {
    XHR = xhr;
  }
};

module.exports = RESTController;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Parse.Analytics provides an interface to Parse's logging and analytics
 * backend.
 *
 * @class Parse.Analytics
 * @static
 */

/**
 * Tracks the occurrence of a custom event with additional dimensions.
 * Parse will store a data point at the time of invocation with the given
 * event name.
 *
 * Dimensions will allow segmentation of the occurrences of this custom
 * event. Keys and values should be {@code String}s, and will throw
 * otherwise.
 *
 * To track a user signup along with additional metadata, consider the
 * following:
 * <pre>
 * var dimensions = {
 *  gender: 'm',
 *  source: 'web',
 *  dayType: 'weekend'
 * };
 * Parse.Analytics.track('signup', dimensions);
 * </pre>
 *
 * There is a default limit of 8 dimensions per event tracked.
 *
 * @method track
 * @param {String} name The name of the custom event to report to Parse as
 * having happened.
 * @param {Object} dimensions The dictionary of information by which to
 * segment this event.
 * @param {Object} options A Backbone-style callback object.
 * @return {Parse.Promise} A promise that is resolved when the round-trip
 * to the server completes.
 */


var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.track = track;

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function track(name, dimensions, options) {
  name = name || '';
  name = name.replace(/^\s*/, '');
  name = name.replace(/\s*$/, '');
  if (name.length === 0) {
    throw new TypeError('A name for the custom event must be provided');
  }

  for (var key in dimensions) {
    if (typeof key !== 'string' || typeof dimensions[key] !== 'string') {
      throw new TypeError('track() dimensions expects keys and values of type "string".');
    }
  }

  options = options || {};
  return _CoreManager2['default'].getAnalyticsController().track(name, dimensions)._thenRunCallbacks(options);
}

_CoreManager2['default'].setAnalyticsController({
  track: function track(name, dimensions) {
    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('POST', 'events/' + name, { dimensions: dimensions });
  }
});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.run = run;

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _decode = __webpack_require__(38);

var _decode2 = _interopRequireDefault(_decode);

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 * Contains functions for calling and declaring
 * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
 * <p><strong><em>
 *   Some functions are only available from Cloud Code.
 * </em></strong></p>
 *
 * @class Parse.Cloud
 * @static
 */

/**
 * Makes a call to a cloud function.
 * @method run
 * @param {String} name The function name.
 * @param {Object} data The parameters to send to the cloud function.
 * @param {Object} options A Backbone-style options object
 * options.success, if set, should be a function to handle a successful
 * call to a cloud function.  options.error should be a function that
 * handles an error running the cloud function.  Both functions are
 * optional.  Both functions take a single argument.
 * @return {Parse.Promise} A promise that will be resolved with the result
 * of the function.
 */

function run(name, data, options) {
  options = options || {};

  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud function name must be a string.');
  }

  var requestOptions = {};
  if (options.useMasterKey) {
    requestOptions.useMasterKey = options.useMasterKey;
  }
  if (options.sessionToken) {
    requestOptions.sessionToken = options.sessionToken;
  }

  return _CoreManager2['default'].getCloudController().run(name, data, requestOptions)._thenRunCallbacks(options);
}

_CoreManager2['default'].setCloudController({
  run: function run(name, data, options) {
    var RESTController = _CoreManager2['default'].getRESTController();

    var payload = (0, _encode2['default'])(data, true);

    var requestOptions = {};
    if (options.hasOwnProperty('useMasterKey')) {
      requestOptions.useMasterKey = options.useMasterKey;
    }
    if (options.hasOwnProperty('sessionToken')) {
      requestOptions.sessionToken = options.sessionToken;
    }

    var request = RESTController.request('POST', 'functions/' + name, payload, requestOptions);

    return request.then(function (res) {
      var decoded = (0, _decode2['default'])(res);
      if (decoded && decoded.hasOwnProperty('result')) {
        return _ParsePromise2['default'].as(decoded.result);
      }
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].INVALID_JSON, 'The server returned an invalid response.'));
    })._thenRunCallbacks(options);
  }
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _decode = __webpack_require__(38);

var _decode2 = _interopRequireDefault(_decode);

var _encode = __webpack_require__(34);

var _encode2 = _interopRequireDefault(_encode);

var _escape2 = __webpack_require__(80);

var _escape3 = _interopRequireDefault(_escape2);

var _ParseError = __webpack_require__(28);

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = __webpack_require__(45);

var _Storage2 = _interopRequireDefault(_Storage);

/**
 * Parse.Config is a local representation of configuration data that
 * can be set from the Parse dashboard.
 *
 * @class Parse.Config
 * @constructor
 */

var ParseConfig = (function () {
  function ParseConfig() {
    _classCallCheck(this, ParseConfig);

    this.attributes = {};
    this._escapedAttributes = {};
  }

  /**
   * Gets the value of an attribute.
   * @method get
   * @param {String} attr The name of an attribute.
   */

  _createClass(ParseConfig, [{
    key: 'get',
    value: function get(attr) {
      return this.attributes[attr];
    }

    /**
     * Gets the HTML-escaped value of an attribute.
     * @method escape
     * @param {String} attr The name of an attribute.
     */
  }, {
    key: 'escape',
    value: function escape(attr) {
      var html = this._escapedAttributes[attr];
      if (html) {
        return html;
      }
      var val = this.attributes[attr];
      var escaped = '';
      if (val != null) {
        escaped = (0, _escape3['default'])(val.toString());
      }
      this._escapedAttributes[attr] = escaped;
      return escaped;
    }

    /**
     * Retrieves the most recently-fetched configuration object, either from
     * memory or from local storage if necessary.
     *
     * @method current
     * @static
     * @return {Config} The most recently-fetched Parse.Config if it
     *     exists, else an empty Parse.Config.
     */
  }], [{
    key: 'current',
    value: function current() {
      var controller = _CoreManager2['default'].getConfigController();
      return controller.current();
    }

    /**
     * Gets a new configuration object from the server.
     * @method get
     * @static
     * @param {Object} options A Backbone-style options object.
     * Valid options are:<ul>
     *   <li>success: Function to call when the get completes successfully.
     *   <li>error: Function to call when the get fails.
     * </ul>
     * @return {Parse.Promise} A promise that is resolved with a newly-created
     *     configuration object when the get completes.
     */
  }, {
    key: 'get',
    value: function get(options) {
      options = options || {};

      var controller = _CoreManager2['default'].getConfigController();
      return controller.get()._thenRunCallbacks(options);
    }
  }]);

  return ParseConfig;
})();

exports['default'] = ParseConfig;

var currentConfig = null;

var CURRENT_CONFIG_KEY = 'currentConfig';

function decodePayload(data) {
  try {
    var json = JSON.parse(data);
    if (json && typeof json === 'object') {
      return (0, _decode2['default'])(json);
    }
  } catch (e) {
    return null;
  }
}

_CoreManager2['default'].setConfigController({
  current: function current() {
    if (currentConfig) {
      return currentConfig;
    }

    var config = new ParseConfig();
    var storagePath = _Storage2['default'].generatePath(CURRENT_CONFIG_KEY);
    var configData;
    if (!_Storage2['default'].async()) {
      configData = _Storage2['default'].getItem(storagePath);

      if (configData) {
        var attributes = decodePayload(configData);
        if (attributes) {
          config.attributes = attributes;
          currentConfig = config;
        }
      }
      return config;
    }
    // Return a promise for async storage controllers
    return _Storage2['default'].getItemAsync(storagePath).then(function (configData) {
      if (configData) {
        var attributes = decodePayload(configData);
        if (attributes) {
          config.attributes = attributes;
          currentConfig = config;
        }
      }
      return config;
    });
  },

  get: function get() {
    var RESTController = _CoreManager2['default'].getRESTController();

    return RESTController.request('GET', 'config', {}, {}).then(function (response) {
      if (!response || !response.params) {
        var error = new _ParseError2['default'](_ParseError2['default'].INVALID_JSON, 'Config JSON response invalid.');
        return _ParsePromise2['default'].error(error);
      }

      var config = new ParseConfig();
      config.attributes = {};
      for (var attr in response.params) {
        config.attributes[attr] = (0, _decode2['default'])(response.params[attr]);
      }
      currentConfig = config;
      return _Storage2['default'].setItemAsync(_Storage2['default'].generatePath(CURRENT_CONFIG_KEY), JSON.stringify(response.params)).then(function () {
        return config;
      });
    });
  }
});
module.exports = exports['default'];

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * -weak
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _parseDate = __webpack_require__(81);

var _parseDate2 = _interopRequireDefault(_parseDate);

var _ParseUser = __webpack_require__(53);

var _ParseUser2 = _interopRequireDefault(_ParseUser);

var initialized = false;
var requestedPermissions;
var initOptions;

/**
 * Provides a set of utilities for using Parse with Facebook.
 * @class Parse.FacebookUtils
 * @static
 */
exports['default'] = {
  /**
   * Initializes Parse Facebook integration.  Call this function after you
   * have loaded the Facebook Javascript SDK with the same parameters
   * as you would pass to<code>
   * <a href=
   * "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   * FB.init()</a></code>.  Parse.FacebookUtils will invoke FB.init() for you
   * with these arguments.
   *
   * @method init
   * @param {Object} options Facebook options argument as described here:
   *   <a href=
   *   "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   *   FB.init()</a>. The status flag will be coerced to 'false' because it
   *   interferes with Parse Facebook integration. Call FB.getLoginStatus()
   *   explicitly if this behavior is required by your application.
   */
  init: function init(options) {
    if (typeof FB === 'undefined') {
      throw new Error('The Facebook JavaScript SDK must be loaded before calling init.');
    }
    initOptions = {};
    if (options) {
      for (var key in options) {
        initOptions[key] = options[key];
      }
    }
    if (initOptions.status && typeof console !== 'undefined') {
      var warn = console.warn || console.log || function () {};
      warn.call(console, 'The "status" flag passed into' + ' FB.init, when set to true, can interfere with Parse Facebook' + ' integration, so it has been suppressed. Please call' + ' FB.getLoginStatus() explicitly if you require this behavior.');
    }
    initOptions.status = false;
    FB.init(initOptions);
    _ParseUser2['default']._registerAuthenticationProvider({
      authenticate: function authenticate(options) {
        var _this = this;

        if (typeof FB === 'undefined') {
          options.error(this, 'Facebook SDK not found.');
        }
        FB.login(function (response) {
          if (response.authResponse) {
            if (options.success) {
              options.success(_this, {
                id: response.authResponse.userID,
                access_token: response.authResponse.accessToken,
                expiration_date: new Date(response.authResponse.expiresIn * 1000 + new Date().getTime()).toJSON()
              });
            }
          } else {
            if (options.error) {
              options.error(_this, response);
            }
          }
        }, {
          scope: requestedPermissions
        });
      },

      restoreAuthentication: function restoreAuthentication(authData) {
        if (authData) {
          var expiration = (0, _parseDate2['default'])(authData.expiration_date);
          var expiresIn = expiration ? (expiration.getTime() - new Date().getTime()) / 1000 : 0;

          var authResponse = {
            userID: authData.id,
            accessToken: authData.access_token,
            expiresIn: expiresIn
          };
          var newOptions = {};
          if (initOptions) {
            for (var key in initOptions) {
              newOptions[key] = initOptions[key];
            }
          }
          newOptions.authResponse = authResponse;

          // Suppress checks for login status from the browser.
          newOptions.status = false;

          // If the user doesn't match the one known by the FB SDK, log out.
          // Most of the time, the users will match -- it's only in cases where
          // the FB SDK knows of a different user than the one being restored
          // from a Parse User that logged in with username/password.
          var existingResponse = FB.getAuthResponse();
          if (existingResponse && existingResponse.userID !== authResponse.userID) {
            FB.logout();
          }

          FB.init(newOptions);
        }
        return true;
      },

      getAuthType: function getAuthType() {
        return 'facebook';
      },

      deauthenticate: function deauthenticate() {
        this.restoreAuthentication(null);
      }
    });
    initialized = true;
  },

  /**
   * Gets whether the user has their account linked to Facebook.
   *
   * @method isLinked
   * @param {Parse.User} user User to check for a facebook link.
   *     The user must be logged in on this device.
   * @return {Boolean} <code>true</code> if the user has their account
   *     linked to Facebook.
   */
  isLinked: function isLinked(user) {
    return user._isLinked('facebook');
  },

  /**
   * Logs in a user using Facebook. This method delegates to the Facebook
   * SDK to authenticate the user, and then automatically logs in (or
   * creates, in the case where it is a new user) a Parse.User.
   *
   * @method logIn
   * @param {String, Object} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   */
  logIn: function logIn(permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling logIn.');
      }
      requestedPermissions = permissions;
      return _ParseUser2['default']._logInWith('facebook', options);
    } else {
      var newOptions = {};
      if (options) {
        for (var key in options) {
          newOptions[key] = options[key];
        }
      }
      newOptions.authData = permissions;
      return _ParseUser2['default']._logInWith('facebook', newOptions);
    }
  },

  /**
   * Links Facebook to an existing PFUser. This method delegates to the
   * Facebook SDK to authenticate the user, and then automatically links
   * the account to the Parse.User.
   *
   * @method link
   * @param {Parse.User} user User to link to Facebook. This must be the
   *     current user.
   * @param {String, Object} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   */
  link: function link(user, permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling link.');
      }
      requestedPermissions = permissions;
      return user._linkWith('facebook', options);
    } else {
      var newOptions = {};
      if (options) {
        for (var key in options) {
          newOptions[key] = options[key];
        }
      }
      newOptions.authData = permissions;
      return user._linkWith('facebook', newOptions);
    }
  },

  /**
   * Unlinks the Parse.User from a Facebook account.
   *
   * @method unlink
   * @param {Parse.User} user User to unlink from Facebook. This must be the
   *     current user.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   */
  unlink: function unlink(user, options) {
    if (!initialized) {
      throw new Error('You must initialize FacebookUtils before calling unlink.');
    }
    return user._unlinkFrom('facebook', options);
  }
};
module.exports = exports['default'];

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseObject2 = __webpack_require__(21);

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var Installation = (function (_ParseObject) {
  _inherits(Installation, _ParseObject);

  function Installation(attributes) {
    _classCallCheck(this, Installation);

    _get(Object.getPrototypeOf(Installation.prototype), 'constructor', this).call(this, '_Installation');
    if (attributes && typeof attributes === 'object') {
      if (!this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }
  }

  return Installation;
})(_ParseObject3['default']);

exports['default'] = Installation;

_ParseObject3['default'].registerSubclass('_Installation', Installation);
module.exports = exports['default'];

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.send = send;

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParseQuery = __webpack_require__(51);

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

/**
 * Contains functions to deal with Push in Parse.
 * @class Parse.Push
 * @static
 */

/**
 * Sends a push notification.
 * @method send
 * @param {Object} data -  The data of the push notification.  Valid fields
 * are:
 *   <ol>
 *     <li>channels - An Array of channels to push to.</li>
 *     <li>push_time - A Date object for when to send the push.</li>
 *     <li>expiration_time -  A Date object for when to expire
 *         the push.</li>
 *     <li>expiration_interval - The seconds from now to expire the push.</li>
 *     <li>where - A Parse.Query over Parse.Installation that is used to match
 *         a set of installations to push to.</li>
 *     <li>data - The data to send as part of the push</li>
 *   <ol>
 * @param {Object} options An object that has an optional success function,
 * that takes no arguments and will be called on a successful push, and
 * an error function that takes a Parse.Error and will be called if the push
 * failed.
 * @return {Parse.Promise} A promise that is fulfilled when the push request
 *     completes.
 */

function send(data, options) {
  options = options || {};

  if (data.where && data.where instanceof _ParseQuery2['default']) {
    data.where = data.where.toJSON().where;
  }

  if (data.push_time && typeof data.push_time === 'object') {
    data.push_time = data.push_time.toJSON();
  }

  if (data.expiration_time && typeof data.expiration_time === 'object') {
    data.expiration_time = data.expiration_time.toJSON();
  }

  if (data.expiration_time && data.expiration_interval) {
    throw new Error('expiration_time and expiration_interval cannot both be set.');
  }

  return _CoreManager2['default'].getPushController().send(data, {
    useMasterKey: options.useMasterKey
  })._thenRunCallbacks(options);
}

_CoreManager2['default'].setPushController({
  send: function send(data, options) {
    var RESTController = _CoreManager2['default'].getRESTController();

    var request = RESTController.request('POST', 'push', data, { useMasterKey: !!options.useMasterKey });

    return request._thenRunCallbacks(options);
  }
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter = __webpack_require__(65);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LiveQueryClient = __webpack_require__(89);

var _LiveQueryClient2 = _interopRequireDefault(_LiveQueryClient);

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = __webpack_require__(22);

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 *
 * We expose three events to help you monitor the status of the WebSocket connection:
 *
 * <p>Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
 * 
 * <pre>
 * Parse.LiveQuery.on('open', () => {
 * 
 * });</pre></p>
 *
 * <p>Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
 * 
 * <pre>
 * Parse.LiveQuery.on('close', () => {
 * 
 * });</pre></p>
 *
 * <p>Error - When some network error or LiveQuery server error happens, you'll get this event.
 * 
 * <pre>
 * Parse.LiveQuery.on('error', (error) => {
 * 
 * });</pre></p>
 * 
 * @class Parse.LiveQuery
 * @static
 * 
 */
var LiveQuery = new _EventEmitter2['default']();

/**
 * After open is called, the LiveQuery will try to send a connect request
 * to the LiveQuery server.
 * 
 * @method open
 */
LiveQuery.open = function open() {
  var LiveQueryController = _CoreManager2['default'].getLiveQueryController();
  LiveQueryController.open();
};

/**
 * When you're done using LiveQuery, you can call Parse.LiveQuery.close().
 * This function will close the WebSocket connection to the LiveQuery server,
 * cancel the auto reconnect, and unsubscribe all subscriptions based on it.
 * If you call query.subscribe() after this, we'll create a new WebSocket
 * connection to the LiveQuery server.
 * 
 * @method close
 */

LiveQuery.close = function close() {
  var LiveQueryController = _CoreManager2['default'].getLiveQueryController();
  LiveQueryController.close();
};
// Register a default onError callback to make sure we do not crash on error
LiveQuery.on('error', function () {});

exports['default'] = LiveQuery;

var getSessionToken = function getSessionToken() {
  var promiseUser = _CoreManager2['default'].getUserController().currentUserAsync();
  return promiseUser.then(function (currentUser) {
    return _ParsePromise2['default'].as(currentUser ? currentUser.sessionToken : undefined);
  }).then(function (sessionToken) {
    return _ParsePromise2['default'].as(sessionToken);
  });
};

var getLiveQueryClient = function getLiveQueryClient() {
  return _CoreManager2['default'].getLiveQueryController().getDefaultLiveQueryClient().then(function (defaultLiveQueryClient) {
    return _ParsePromise2['default'].as(defaultLiveQueryClient);
  });
};

var defaultLiveQueryClient = undefined;

_CoreManager2['default'].setLiveQueryController({
  setDefaultLiveQueryClient: function setDefaultLiveQueryClient(liveQueryClient) {
    defaultLiveQueryClient = liveQueryClient;
  },
  getDefaultLiveQueryClient: function getDefaultLiveQueryClient() {
    if (defaultLiveQueryClient) {
      return _ParsePromise2['default'].as(defaultLiveQueryClient);
    }

    var sessionTokenPromise = getSessionToken();
    return sessionTokenPromise.then(function (sessionToken) {
      var liveQueryServerURL = _CoreManager2['default'].get('LIVEQUERY_SERVER_URL');

      if (liveQueryServerURL && liveQueryServerURL.indexOf('ws') !== 0) {
        throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
      }

      // If we can not find Parse.liveQueryServerURL, we try to extract it from Parse.serverURL
      if (!liveQueryServerURL) {
        var tempServerURL = _CoreManager2['default'].get('SERVER_URL');
        var protocol = 'ws://';
        // If Parse is being served over SSL/HTTPS, ensure LiveQuery Server uses 'wss://' prefix
        if (tempServerURL.indexOf('https') === 0) {
          protocol = 'wss://';
        }
        var host = tempServerURL.replace(/^https?:\/\//, '');
        liveQueryServerURL = protocol + host;
        _CoreManager2['default'].set('LIVEQUERY_SERVER_URL', liveQueryServerURL);
      }

      var applicationId = _CoreManager2['default'].get('APPLICATION_ID');
      var javascriptKey = _CoreManager2['default'].get('JAVASCRIPT_KEY');
      var masterKey = _CoreManager2['default'].get('MASTER_KEY');
      // Get currentUser sessionToken if possible
      defaultLiveQueryClient = new _LiveQueryClient2['default']({
        applicationId: applicationId,
        serverURL: liveQueryServerURL,
        javascriptKey: javascriptKey,
        masterKey: masterKey,
        sessionToken: sessionToken
      });
      // Register a default onError callback to make sure we do not crash on error
      // Cannot create these events on a nested way because of EventEmiiter from React Native
      defaultLiveQueryClient.on('error', function (error) {
        LiveQuery.emit('error', error);
      });
      defaultLiveQueryClient.on('open', function () {
        LiveQuery.emit('open');
      });
      defaultLiveQueryClient.on('close', function () {
        LiveQuery.emit('close');
      });

      return _ParsePromise2['default'].as(defaultLiveQueryClient);
    });
  },
  open: function open() {
    var _this = this;

    getLiveQueryClient().then(function (liveQueryClient) {
      _this.resolve(liveQueryClient.open());
    });
  },
  close: function close() {
    var _this2 = this;

    getLiveQueryClient().then(function (liveQueryClient) {
      _this2.resolve(liveQueryClient.close());
    });
  },
  subscribe: function subscribe(query) {
    var _this3 = this;

    var subscriptionWrap = new _EventEmitter2['default']();

    getLiveQueryClient().then(function (liveQueryClient) {
      if (liveQueryClient.shouldOpen()) {
        liveQueryClient.open();
      }
      var promiseSessionToken = getSessionToken();
      // new event emitter
      return promiseSessionToken.then(function (sessionToken) {

        var subscription = liveQueryClient.subscribe(query, sessionToken);
        // enter, leave create, etc

        subscriptionWrap.id = subscription.id;
        subscriptionWrap.query = subscription.query;
        subscriptionWrap.sessionToken = subscription.sessionToken;
        subscriptionWrap.unsubscribe = subscription.unsubscribe;
        // Cannot create these events on a nested way because of EventEmiiter from React Native
        subscription.on('open', function () {
          subscriptionWrap.emit('open');
        });
        subscription.on('create', function (object) {
          subscriptionWrap.emit('create', object);
        });
        subscription.on('update', function (object) {
          subscriptionWrap.emit('update', object);
        });
        subscription.on('enter', function (object) {
          subscriptionWrap.emit('enter', object);
        });
        subscription.on('leave', function (object) {
          subscriptionWrap.emit('leave', object);
        });
        subscription.on('delete', function (object) {
          subscriptionWrap.emit('delete', object);
        });

        _this3.resolve();
      });
    });
    return subscriptionWrap;
  },
  unsubscribe: function unsubscribe(subscription) {
    var _this4 = this;

    getLiveQueryClient().then(function (liveQueryClient) {
      _this4.resolve(liveQueryClient.unsubscribe(subscription));
    });
  }
});
module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
__webpack_require__(74);
__webpack_require__(58);
__webpack_require__(143);
__webpack_require__(146);
module.exports = __webpack_require__(26).Map;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(144);

// 23.1 Map Objects
__webpack_require__(86)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $            = __webpack_require__(25)
  , hide         = __webpack_require__(36)
  , redefineAll  = __webpack_require__(63)
  , ctx          = __webpack_require__(40)
  , strictNew    = __webpack_require__(64)
  , defined      = __webpack_require__(48)
  , forOf        = __webpack_require__(52)
  , $iterDefine  = __webpack_require__(59)
  , step         = __webpack_require__(72)
  , ID           = __webpack_require__(62)('id')
  , $has         = __webpack_require__(43)
  , isObject     = __webpack_require__(27)
  , setSpecies   = __webpack_require__(145)
  , DESCRIPTORS  = __webpack_require__(50)
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core        = __webpack_require__(26)
  , $           = __webpack_require__(25)
  , DESCRIPTORS = __webpack_require__(50)
  , SPECIES     = __webpack_require__(30)('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(39);

$export($export.P, 'Map', {toJSON: __webpack_require__(147)('Map')});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = __webpack_require__(52)
  , classof = __webpack_require__(77);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _get = __webpack_require__(32)['default'];

var _inherits = __webpack_require__(33)['default'];

var _createClass = __webpack_require__(24)['default'];

var _classCallCheck = __webpack_require__(20)['default'];

var _interopRequireDefault = __webpack_require__(19)['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter2 = __webpack_require__(65);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _CoreManager = __webpack_require__(23);

var _CoreManager2 = _interopRequireDefault(_CoreManager);

/**
 * Creates a new LiveQuery Subscription.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 * 
 * @constructor
 * @param {string} id - subscription id
 * @param {string} query - query to subscribe to
 * @param {string} sessionToken - optional session token
 *
 * <p>Open Event - When you call query.subscribe(), we send a subscribe request to 
 * the LiveQuery server, when we get the confirmation from the LiveQuery server,
 * this event will be emitted. When the client loses WebSocket connection to the
 * LiveQuery server, we will try to auto reconnect the LiveQuery server. If we
 * reconnect the LiveQuery server and successfully resubscribe the ParseQuery,
 * you'll also get this event.
 * 
 * <pre>
 * subscription.on('open', () => {
 * 
 * });</pre></p>
 *
 * <p>Create Event - When a new ParseObject is created and it fulfills the ParseQuery you subscribe,
 * you'll get this event. The object is the ParseObject which is created.
 * 
 * <pre>
 * subscription.on('create', (object) => {
 * 
 * });</pre></p>
 *
 * <p>Update Event - When an existing ParseObject which fulfills the ParseQuery you subscribe 
 * is updated (The ParseObject fulfills the ParseQuery before and after changes),
 * you'll get this event. The object is the ParseObject which is updated.
 * Its content is the latest value of the ParseObject.
 * 
 * <pre>
 * subscription.on('update', (object) => {
 * 
 * });</pre></p>
 * 
 * <p>Enter Event - When an existing ParseObject's old value doesn't fulfill the ParseQuery
 * but its new value fulfills the ParseQuery, you'll get this event. The object is the
 * ParseObject which enters the ParseQuery. Its content is the latest value of the ParseObject.
 * 
 * <pre>
 * subscription.on('enter', (object) => {
 * 
 * });</pre></p>
 *
 *
 * <p>Update Event - When an existing ParseObject's old value fulfills the ParseQuery but its new value
 * doesn't fulfill the ParseQuery, you'll get this event. The object is the ParseObject
 * which leaves the ParseQuery. Its content is the latest value of the ParseObject.
 * 
 * <pre>
 * subscription.on('leave', (object) => {
 * 
 * });</pre></p>
 *
 *
 * <p>Delete Event - When an existing ParseObject which fulfills the ParseQuery is deleted, you'll
 * get this event. The object is the ParseObject which is deleted.
 * 
 * <pre>
 * subscription.on('delete', (object) => {
 * 
 * });</pre></p>
 *
 *
 * <p>Close Event - When the client loses the WebSocket connection to the LiveQuery
 * server and we stop receiving events, you'll get this event.
 * 
 * <pre>
 * subscription.on('close', () => {
 * 
 * });</pre></p>
 *
 * 
 */

var Subscription = (function (_EventEmitter) {
  _inherits(Subscription, _EventEmitter);

  function Subscription(id, query, sessionToken) {
    _classCallCheck(this, Subscription);

    _get(Object.getPrototypeOf(Subscription.prototype), 'constructor', this).call(this);
    this.id = id;
    this.query = query;
    this.sessionToken = sessionToken;
  }

  /**
   * @method unsubscribe
   */

  _createClass(Subscription, [{
    key: 'unsubscribe',
    value: function unsubscribe() {
      var _this2 = this;

      var _this = this;
      _CoreManager2['default'].getLiveQueryController().getDefaultLiveQueryClient().then(function (liveQueryClient) {
        liveQueryClient.unsubscribe(_this);
        _this.emit('close');
        _this2.resolve();
      });
    }
  }]);

  return Subscription;
})(_EventEmitter3['default']);

exports['default'] = Subscription;
module.exports = exports['default'];

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

window.Parse = __webpack_require__(91);
Parse.initialize("CekTransferAja");
Parse.serverURL = 'http://localhost:1337/data';

module.exports = function (bind) {
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        return currentUser;
    } else {
        bind.$router.push('/login');
    }
};

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            this.$router.push('/');
        }
    },

    data: function data() {
        return {
            email: '',
            nama_panggilan: '',
            password: ''
        };
    },
    methods: {
        signup: function signup(event) {
            var _this = this;

            event.preventDefault();

            var user = new Parse.User();
            user.set("username", this.email);
            user.set("email", this.email);
            user.set("nama_panggilan", this.nama_panggilan);
            user.set("password", this.password);
            user.signUp(null, {
                success: function success(user) {
                    // Hooray! Let them use the app now.
                    _this.$router.push('/');
                },
                error: function error(user, _error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + _error.code + " " + _error.message);
                }
            });
        }
    }
});

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            this.$router.push('/');
        }
    },

    data: function data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login: function login(event) {
            var _this = this;

            event.preventDefault();

            Parse.User.logIn(this.email, this.password, {
                success: function success(user) {
                    _this.$router.push('/');
                    // Do stuff after successful login.
                },
                error: function error(user, _error) {
                    // The login failed. Check error to see why.
                }
            });
        }
    }
});

/***/ })
/******/ ]);