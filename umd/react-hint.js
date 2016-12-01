/*!
 * react-hint v1.3.1 - https://github.com/slmgc/react-hint
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
			var _this3 = this;

			var _temp, _this, _ret;

			_classCallCheck(this, ReactHint);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
				target: null,
				content: null,
				cls: null,
				at: 'top',
				top: 0,
				left: 0
			}, _this.findHint = function (el) {
				while (el) {
					if (el === document) break;
					if (el.hasAttribute('data-rh')) return el;
					if (el === _this._hint) return _this.state.target;
					el = el.parentNode;
				}return null;
			}, _this.getHintData = function (target) {
				var _this2 = _this;
				var _container = _this2._container;
				var _hint = _this2._hint;

				var content = target.getAttribute('data-rh');
				var cls = target.getAttribute('data-rh-cls');
				var at = target.getAttribute('data-rh-at') || 'top';

				var _container$getBoundin = _container.getBoundingClientRect();

				var container_top = _container$getBoundin.top;
				var container_left = _container$getBoundin.left;

				var _hint$getBoundingClie = _hint.getBoundingClientRect();

				var hint_width = _hint$getBoundingClie.width;
				var hint_height = _hint$getBoundingClie.height;

				var _target$getBoundingCl = target.getBoundingClientRect();

				var target_top = _target$getBoundingCl.top;
				var target_left = _target$getBoundingCl.left;
				var target_width = _target$getBoundingCl.width;
				var target_height = _target$getBoundingCl.height;


				var top = void 0,
				    left = void 0;
				switch (at) {
					case 'left':
						top = target_height - hint_height >> 1;
						left = -hint_width;
						break;

					case 'right':
						top = target_height - hint_height >> 1;
						left = target_width;
						break;

					case 'bottom':
						top = target_height;
						left = target_width - hint_width >> 1;
						break;

					case 'top':
					default:
						top = -hint_height;
						left = target_width - hint_width >> 1;
				}

				return {
					content: content, cls: cls, at: at,
					top: top + target_top - container_top,
					left: left + target_left - container_left
				};
			}, _this.onHover = function (_ref) {
				var target = _ref.target;

				clearTimeout(_this.timeout);
				_this.timeout = setTimeout(function () {
					target = _this.findHint(target);
					_this.setState({ target: target });
				}, 100);
			}, _this.setRef = function (name, ref) {
				return _this[name] = ref;
			}, _this.renderContent = function (content) {
				if (content && content[0] === '#') {
					var el = document.getElementById(content.slice(1));
					if (el) return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: el.innerHTML }, __source: {
							fileName: _jsxFileName,
							lineNumber: 139
						},
						__self: _this3
					});
				}return content;
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		ReactHint.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref2, _ref3) {
			var className = _ref2.className;
			var target = _ref3.target;
			var content = _ref3.content;
			var cls = _ref3.cls;
			var at = _ref3.at;
			var top = _ref3.top;
			var left = _ref3.left;
			var props = this.props;
			var state = this.state;

			return target !== state.target || content !== state.content || cls !== state.cls || at !== state.at || top !== state.top || left !== state.left || className !== props.className;
		};

		ReactHint.prototype.componentDidMount = function componentDidMount() {
			if (ReactHint.instance) ReactHint.instance = null;
			ReactHint.instance = this;
		};

		ReactHint.prototype.componentDidUpdate = function componentDidUpdate() {
			var target = this.state.target;

			if (!target) return;

			var _target$getBoundingCl2 = target.getBoundingClientRect();

			var top = _target$getBoundingCl2.top;
			var left = _target$getBoundingCl2.left;
			var width = _target$getBoundingCl2.width;
			var height = _target$getBoundingCl2.height;

			if (!(top || left || width || height)) return;

			this.setState(this.getHintData(target));
		};

		ReactHint.prototype.componentWillUnmount = function componentWillUnmount() {
			ReactHint.instance = null;
		};

		ReactHint.prototype.render = function render() {
			var className = this.props.className;
			var _state = this.state;
			var target = _state.target;
			var content = _state.content;
			var cls = _state.cls;
			var at = _state.at;
			var top = _state.top;
			var left = _state.left;


			return _react2.default.createElement(
				'div',
				{ style: { position: 'relative' },
					ref: this.setRef.bind(this, '_container'), __source: {
						fileName: _jsxFileName,
						lineNumber: 148
					},
					__self: this
				},
				target && _react2.default.createElement(
					'div',
					{ className: className + ' ' + className + '--' + at + ' ' + cls,
						ref: this.setRef.bind(this, '_hint'),
						style: { top: top, left: left }, __source: {
							fileName: _jsxFileName,
							lineNumber: 151
						},
						__self: this
					},
					_react2.default.createElement(
						'div',
						{ className: className + '__content', __source: {
								fileName: _jsxFileName,
								lineNumber: 154
							},
							__self: this
						},
						this.renderContent(content)
					)
				)
			);
		};

		_createClass(ReactHint, null, [{
			key: 'instance',
			get: function get() {
				return ReactHint._instance;
			},
			set: function set(instance) {
				if (instance) {
					document.addEventListener('mouseover', instance.onHover);
				} else {
					document.removeEventListener('mouseover', ReactHint.instance.onHover);
				}

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