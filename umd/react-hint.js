/*!
 * react-hint v1.0.0 - https://github.com/slmgc/react-hint
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactHint"] = factory(require("react"));
	else
		root["ReactHint"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class,
	    _temp2,
	    _jsxFileName = '/Users/slmgc/Workspace/react-hint/src/index.js';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactHint = (_temp2 = _class = function (_React$Component) {
		_inherits(ReactHint, _React$Component);

		function ReactHint() {
			var _temp, _this, _ret;

			_classCallCheck(this, ReactHint);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
				target: null,
				at: 'top',
				top: 0,
				left: 0
			}, _this.findHint = function (el) {
				while (el) {
					if (el === document) break;
					if (el.hasAttribute('data-rh')) return el;
					el = el.parentNode;
				}return null;
			}, _this.getHintPosition = function (hint, target) {
				var offsetWidth = hint.offsetWidth;
				var offsetHeight = hint.offsetHeight;

				var _target$getBoundingCl = target.getBoundingClientRect();

				var width = _target$getBoundingCl.width;
				var height = _target$getBoundingCl.height;
				var top = _target$getBoundingCl.top;
				var left = _target$getBoundingCl.left;

				var at = target.getAttribute('data-rh-at');

				switch (at) {
					case 'left':
						return {
							at: at,
							top: top + (height - offsetHeight >> 1),
							left: left - offsetWidth
						};

					case 'right':
						return {
							at: at,
							top: top + (height - offsetHeight >> 1),
							left: left + width
						};

					case 'bottom':
						return {
							at: at,
							top: top + height,
							left: left + (width - offsetWidth >> 1)
						};

					case 'top':
					default:
						return {
							at: 'top',
							top: top - offsetHeight,
							left: left + (width - offsetWidth >> 1)
						};
				}
			}, _this.onHover = function (_ref) {
				var target = _ref.target;

				_this.setState({ target: _this.findHint(target) });
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		ReactHint.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref2, _ref3) {
			var className = _ref2.className;
			var target = _ref3.target;
			var at = _ref3.at;
			var top = _ref3.top;
			var left = _ref3.left;
			var props = this.props;
			var state = this.state;

			return target !== state.target || at !== state.at || Math.abs(top - state.top) > 1 || Math.abs(left - state.left) > 1 || className !== props.className;
		};

		ReactHint.prototype.componentDidMount = function componentDidMount() {
			ReactHint.instance = this;
			document.addEventListener('mouseover', this.onHover);
		};

		ReactHint.prototype.componentDidUpdate = function componentDidUpdate() {
			var target = this.state.target;
			var hint = this.refs.hint;


			if (!target || !hint) return;
			this.setState(this.getHintPosition(hint, target));
		};

		ReactHint.prototype.componentWillUnmout = function componentWillUnmout() {
			ReactHint.instance = null;
			document.removeEventListener('mouseover', this.onHover);
		};

		ReactHint.prototype.render = function render() {
			var className = this.props.className;
			var _state = this.state;
			var target = _state.target;
			var at = _state.at;
			var top = _state.top;
			var left = _state.left;


			return target && _react2.default.createElement(
				'div',
				{ className: className + ' ' + className + '--' + at,
					style: { top: top, left: left },
					ref: 'hint', __source: {
						fileName: _jsxFileName,
						lineNumber: 103
					},
					__self: this
				},
				_react2.default.createElement(
					'div',
					{ className: className + '__content', __source: {
							fileName: _jsxFileName,
							lineNumber: 106
						},
						__self: this
					},
					target.getAttribute('data-rh')
				)
			);
		};

		_createClass(ReactHint, null, [{
			key: 'instance',
			get: function get() {
				return ReactHint._instance;
			},
			set: function set(instance) {
				if (ReactHint._instance) throw new Error('Only one instance of ReactHint is allowed.');
				ReactHint._instance = instance;
			}
		}]);

		return ReactHint;
	}(_react2.default.Component), _class._instance = null, _class.defaultProps = {
		className: 'react-hint'
	}, _temp2);
	exports.default = ReactHint;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;