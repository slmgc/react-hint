'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
	var _class, _temp2;

	var Component = _ref.Component,
	    createElement = _ref.createElement,
	    createRef = _ref.createRef;
	return _temp2 = _class = function (_Component) {
		_inherits(ReactHint, _Component);

		function ReactHint() {
			var _temp, _this, _ret;

			_classCallCheck(this, ReactHint);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._hint = createRef(), _this._container = createRef(), _this.state = { target: null, hidden: true }, _this.target = null, _this.placement = null, _this._containerStyle = { position: 'relative' }, _this.toggleEvents = function (_ref2, flag) {
				var events = _ref2.events,
				    _ref2$events = _ref2.events,
				    click = _ref2$events.click,
				    focus = _ref2$events.focus,
				    hover = _ref2$events.hover;

				var action = flag ? 'addEventListener' : 'removeEventListener';
				var hasEvents = events === true;(click || hasEvents) && document[action]('click', _this.toggleHint);(focus || hasEvents) && document[action]('focusin', _this.toggleHint);(hover || hasEvents) && document[action]('mouseover', _this.toggleHint);(click || hover || hasEvents) && document[action]('touchend', _this.toggleHint);
			}, _this.toggleHint = function () {
				var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref3$target = _ref3.target,
				    target = _ref3$target === undefined ? null : _ref3$target;

				target = _this.getHint(target);
				clearTimeout(_this._timeout);
				_this._timeout = setTimeout(function () {
					_this.target = target;
					if (_this.target) {
						_this.placement = null;
					}
					_this.getHintData();
				}, target === null ? _this.props.delay.hide === undefined ? _this.props.delay : _this.props.delay.hide : _this.props.delay.show === undefined ? _this.props.delay : _this.props.delay.show);
			}, _this.getHint = function (el) {
				var _this$props = _this.props,
				    attribute = _this$props.attribute,
				    persist = _this$props.persist;

				var target = _this.target;

				while (el) {
					if (el === document) break;
					if (persist && el === _this._hint.current) return target;
					if (el.hasAttribute(attribute)) return el;
					el = el.parentNode;
				}return null;
			}, _this.shallowEqual = function (a, b) {
				var keys = Object.keys(a);
				return keys.length === Object.keys(b).length && keys.reduce(function (result, key) {
					return result && (typeof a[key] === 'function' && typeof b[key] === 'function' || a[key] === b[key]);
				}, true);
			}, _this.getHintData = function () {
				if (!_this.target) {
					_this.setState({ hidden: true });
					return;
				}
				var _this$props2 = _this.props,
				    attribute = _this$props2.attribute,
				    autoPosition = _this$props2.autoPosition,
				    position = _this$props2.position;

				var content = _this.target.getAttribute(attribute) || '';
				var at = _this.placement || _this.target.getAttribute(attribute + '-at') || position;

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

				var top = void 0,
				    left = void 0;
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
					content: content, at: at,
					top: top + targetTop - containerTop | 0,
					left: left + targetLeft - containerLeft | 0,
					hidden: false
				};
				_this.setState(newState);
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		ReactHint.prototype.componentDidMount = function componentDidMount() {
			this.toggleEvents(this.props, true);
		};

		ReactHint.prototype.componentWillUnmount = function componentWillUnmount() {
			this.toggleEvents(this.props, false);
			clearTimeout(this._timeout);
		};

		ReactHint.prototype.componentDidUpdate = function componentDidUpdate() {
			if (this.target && !this.state.hidden) {
				this.getHintData();
			}
		};

		ReactHint.prototype.shouldComponentUpdate = function shouldComponentUpdate(props, state) {
			return !this.shallowEqual(state, this.state) || !this.shallowEqual(props, this.props);
		};

		ReactHint.prototype.render = function render() {
			var _props = this.props,
			    className = _props.className,
			    onRenderContent = _props.onRenderContent;
			var _state = this.state,
			    content = _state.content,
			    at = _state.at,
			    top = _state.top,
			    left = _state.left;

			return createElement(
				'div',
				{ ref: this._container, style: this._containerStyle },
				createElement(
					'div',
					{ className: className + ' ' + className + '--' + at,
						ref: this._hint,
						role: 'tooltip',
						style: { top: top, left: left, display: this.target ? undefined : 'none' } },
					this.target && (onRenderContent ? onRenderContent(this.target, content) : createElement(
						'div',
						{ className: className + '__content' },
						content
					))
				)
			);
		};

		return ReactHint;
	}(Component), _class.defaultProps = {
		attribute: 'data-rh',
		autoPosition: false,
		className: 'react-hint',
		delay: 0,
		events: false,
		onRenderContent: null,
		persist: false,
		position: 'top'
	}, _temp2;
};

module.exports = exports['default'];