/*!
 * react-hint v3.2.1 - https://react-hint.js.org
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactHintFactory"] = factory();
	else
		root["ReactHintFactory"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var _class, _temp;

  var Component = _ref.Component,
      createElement = _ref.createElement,
      createRef = _ref.createRef;
  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inheritsLoose(ReactHint, _Component);

    function ReactHint() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "_hint", createRef());

      _defineProperty(_assertThisInitialized(_this), "_container", createRef());

      _defineProperty(_assertThisInitialized(_this), "state", {
        target: null,
        hidden: true
      });

      _defineProperty(_assertThisInitialized(_this), "target", null);

      _defineProperty(_assertThisInitialized(_this), "placement", null);

      _defineProperty(_assertThisInitialized(_this), "_containerStyle", {
        position: 'relative'
      });

      _defineProperty(_assertThisInitialized(_this), "toggleEvents", function (_ref2, flag) {
        var events = _ref2.events,
            _ref2$events = _ref2.events,
            click = _ref2$events.click,
            focus = _ref2$events.focus,
            hover = _ref2$events.hover;
        var action = flag ? 'addEventListener' : 'removeEventListener';
        var hasEvents = events === true;
        (click || hasEvents) && document[action]('click', _this.toggleHint);
        (focus || hasEvents) && document[action]('focusin', _this.toggleHint);
        (hover || hasEvents) && document[action]('mouseover', _this.toggleHint);
        (click || hover || hasEvents) && document[action]('touchend', _this.toggleHint);
      });

      _defineProperty(_assertThisInitialized(_this), "toggleHint", function (_temp2) {
        var _ref3 = _temp2 === void 0 ? {} : _temp2,
            _ref3$target = _ref3.target,
            target = _ref3$target === void 0 ? null : _ref3$target;

        target = _this.getHint(target);
        clearTimeout(_this._timeout);
        _this._timeout = setTimeout(function () {
          _this.target = target;

          if (_this.target) {
            _this.placement = null;
          }

          _this.getHintData();
        }, target === null ? _this.props.delay.hide === undefined ? _this.props.delay : _this.props.delay.hide : _this.props.delay.show === undefined ? _this.props.delay : _this.props.delay.show);
      });

      _defineProperty(_assertThisInitialized(_this), "getHint", function (el) {
        var _this$props = _this.props,
            attribute = _this$props.attribute,
            persist = _this$props.persist;
        var target = _this.target;

        while (el) {
          if (el === document) break;
          if (persist && el === _this._hint.current) return target;
          if (el.hasAttribute(attribute)) return el;
          el = el.parentNode;
        }

        return null;
      });

      _defineProperty(_assertThisInitialized(_this), "shallowEqual", function (a, b) {
        var keys = Object.keys(a);
        return keys.length === Object.keys(b).length && keys.reduce(function (result, key) {
          return result && (typeof a[key] === 'function' && typeof b[key] === 'function' || a[key] === b[key]);
        }, true);
      });

      _defineProperty(_assertThisInitialized(_this), "getHintData", function () {
        if (!_this.target) {
          _this.setState({
            hidden: true
          });

          return;
        }

        var _this$props2 = _this.props,
            attribute = _this$props2.attribute,
            autoPosition = _this$props2.autoPosition,
            position = _this$props2.position;
        var content = _this.target.getAttribute(attribute) || '';
        var at = _this.placement || _this.target.getAttribute(attribute + "-at") || position;

        var _this$_container$curr = _this._container.current.getBoundingClientRect(),
            containerTop = _this$_container$curr.top,
            containerLeft = _this$_container$curr.left;

        var _this$_hint$current$g = _this._hint.current.getBoundingClientRect(),
            hintWidth = _this$_hint$current$g.width,
            hintHeight = _this$_hint$current$g.height;

        var _this$target$getBound = _this.target.getBoundingClientRect(),
            targetTop = _this$target$getBound.top,
            targetLeft = _this$target$getBound.left,
            targetWidth = _this$target$getBound.width,
            targetHeight = _this$target$getBound.height;

        if (autoPosition && !_this.placement) {
          var isHoriz = ['left', 'right'].includes(at);
          var _document$documentEle = document.documentElement,
              clientHeight = _document$documentEle.clientHeight,
              clientWidth = _document$documentEle.clientWidth;
          var directions = {
            left: (isHoriz ? targetLeft - hintWidth : targetLeft + (targetWidth - hintWidth >> 1)) > 0,
            right: (isHoriz ? targetLeft + targetWidth + hintWidth : targetLeft + (targetWidth + hintWidth >> 1)) < clientWidth,
            bottom: (isHoriz ? targetTop + (targetHeight + hintHeight >> 1) : targetTop + targetHeight + hintHeight) < clientHeight,
            top: (isHoriz ? targetTop - (hintHeight >> 1) : targetTop - hintHeight) > 0
          };

          if (!at || !directions[at]) {
            switch (at) {
              case 'left':
                if (!directions.left) at = 'right';
                if (!directions.top) at = 'bottom';
                if (!directions.bottom) at = 'top';
                break;

              case 'right':
                if (!directions.right) at = 'left';
                if (!directions.top) at = 'bottom';
                if (!directions.bottom) at = 'top';
                break;

              case 'bottom':
                if (!directions.bottom) at = 'top';
                if (!directions.left) at = 'right';
                if (!directions.right) at = 'left';
                break;

              case 'top':
              default:
                if (!directions.top) at = 'bottom';
                if (!directions.left) at = 'right';
                if (!directions.right) at = 'left';
                break;
            }
          }
        }

        var top, left;

        switch (at) {
          case 'left':
            top = targetHeight - hintHeight >> 1;
            left = -hintWidth;
            break;

          case 'right':
            top = targetHeight - hintHeight >> 1;
            left = targetWidth;
            break;

          case 'bottom':
            top = targetHeight;
            left = targetWidth - hintWidth >> 1;
            break;

          case 'top':
          default:
            top = -hintHeight;
            left = targetWidth - hintWidth >> 1;
        }

        if (hintHeight > 0 || hintWidth > 0) {
          // This prevents react-hint from rotating the placements 
          _this.placement = at;
        }

        var newState = {
          content: content,
          at: at,
          top: top + targetTop - containerTop | 0,
          left: left + targetLeft - containerLeft | 0,
          hidden: false
        };

        _this.setState(newState);
      });

      return _this;
    }

    var _proto = ReactHint.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.toggleEvents(this.props, true);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.toggleEvents(this.props, false);
      clearTimeout(this._timeout);
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this.target && !this.state.hidden) {
        this.getHintData();
      }
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(props, state) {
      return !this.shallowEqual(state, this.state) || !this.shallowEqual(props, this.props);
    };

    _proto.render = function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          onRenderContent = _this$props3.onRenderContent;
      var _this$state = this.state,
          content = _this$state.content,
          at = _this$state.at,
          top = _this$state.top,
          left = _this$state.left;
      return createElement("div", {
        ref: this._container,
        style: this._containerStyle
      }, createElement("div", {
        className: className + " " + className + "--" + at,
        ref: this._hint,
        role: "tooltip",
        style: {
          top: top,
          left: left,
          display: this.target ? undefined : 'none'
        }
      }, this.target && (onRenderContent ? onRenderContent(this.target, content) : createElement("div", {
        className: className + "__content"
      }, content))));
    };

    return ReactHint;
  }(Component), _defineProperty(_class, "defaultProps", {
    attribute: 'data-rh',
    autoPosition: false,
    className: 'react-hint',
    delay: 0,
    events: false,
    onRenderContent: null,
    persist: false,
    position: 'top'
  }), _temp;
});

/***/ })
/******/ ])["default"];
});