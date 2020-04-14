export default ({Component, createElement, createRef}) =>
	class ReactHint extends Component {
		static defaultProps = {
			attribute: 'data-rh',
			autoPosition: false,
			className: 'react-hint',
			delay: 0,
			events: false,
			onRenderContent: null,
			persist: false,
			position: 'top'
		}
		_hint = createRef();
		_container = createRef();

		state = {target: null, hidden: true}
		target = null;
		placement = null;
		_containerStyle = {position: 'relative'}

		componentDidMount() {
			this.toggleEvents(this.props, true)
		}

		componentWillUnmount() {
			this.toggleEvents(this.props, false)
			clearTimeout(this._timeout)
		}

		toggleEvents = ({events, events: {click, focus, hover}}, flag) => {
			const action = flag ? 'addEventListener' : 'removeEventListener'
			const hasEvents = events === true

			;(click || hasEvents) && document[action]('click', this.toggleHint)
			;(focus || hasEvents) && document[action]('focusin', this.toggleHint)
			;(hover || hasEvents) && document[action]('mouseover', this.toggleHint)
			;(click || hover || hasEvents) && document[action]('touchend', this.toggleHint)
		}

		toggleHint = ({target = null} = {}) => {
			target = this.getHint(target);
			clearTimeout(this._timeout);
			this._timeout = setTimeout(() => {
				this.target = target;
				if (this.target) {
					this.placement = null;
				}
				this.getHintData();
			}, target === null
					? this.props.delay.hide === undefined
						? this.props.delay
						: this.props.delay.hide
					: this.props.delay.show === undefined
						? this.props.delay
						: this.props.delay.show)
		}

		getHint = (el) => {
			const {attribute, persist} = this.props
			const target = this.target;

			while (el) {
				if (el === document) break
				if (persist && el === this._hint.current) return target
				if (el.hasAttribute(attribute)) return el
				el = el.parentNode
			} return null
		}

		shallowEqual = (a, b) => {
			const keys = Object.keys(a)
			return keys.length === Object.keys(b).length &&
				keys.reduce((result, key) => result &&
					((typeof a[key] === 'function' &&
						typeof b[key] === 'function') ||
							a[key] === b[key]), true)
		}

		componentDidUpdate() {
			if (this.target && !this.state.hidden) {
				this.getHintData();
			}
		}

		shouldComponentUpdate(props, state) {
			return !this.shallowEqual(state, this.state) || !this.shallowEqual(props, this.props)
		}

		getHintData = () => {
			if (!this.target) {
				this.setState({hidden: true});
				return;
			}
			const {attribute, autoPosition, position} = this.props;
			const content = this.target.getAttribute(attribute) || '';
			let at = this.placement || this.target.getAttribute(`${attribute}-at`) || position;

			const {
				top: containerTop,
				left: containerLeft
			} = this._container.current.getBoundingClientRect()

			const {
				width: hintWidth,
				height: hintHeight
			} = this._hint.current.getBoundingClientRect()

			const {
				top: targetTop,
				left: targetLeft,
				width: targetWidth,
				height: targetHeight
			} = this.target.getBoundingClientRect()

			if (autoPosition && !this.placement) {
				const isHoriz = ['left', 'right'].includes(at)

				const {
					clientHeight,
					clientWidth
				} = document.documentElement

				const directions = {
					left: (isHoriz
						? targetLeft - hintWidth
						: targetLeft + (targetWidth - hintWidth >> 1)) > 0,
					right: (isHoriz
						? targetLeft + targetWidth + hintWidth
						: targetLeft + (targetWidth + hintWidth >> 1)) < clientWidth,
					bottom: (isHoriz
						? targetTop + (targetHeight + hintHeight >> 1)
						: targetTop + targetHeight + hintHeight) < clientHeight,
					top: (isHoriz
						? targetTop - (hintHeight >> 1)
						: targetTop - hintHeight) > 0
				}
				if (!at || !directions[at]) {
					switch (at) {
						case 'left':
							if (!directions.left) at = 'right'
							if (!directions.top) at = 'bottom'
							if (!directions.bottom) at = 'top'
							break

						case 'right':
							if (!directions.right) at = 'left'
							if (!directions.top) at = 'bottom'
							if (!directions.bottom) at = 'top'
							break

						case 'bottom':
							if (!directions.bottom) at = 'top'
							if (!directions.left) at = 'right'
							if (!directions.right) at = 'left'
							break

						case 'top':
						default:
							if (!directions.top) at = 'bottom'
							if (!directions.left) at = 'right'
							if (!directions.right) at = 'left'
							break
					}
				}
			}

			let top, left
			switch (at) {
				case 'left':
					top = targetHeight - hintHeight >> 1
					left = -hintWidth
					break

				case 'right':
					top = targetHeight - hintHeight >> 1
					left = targetWidth
					break

				case 'bottom':
					top = targetHeight
					left = targetWidth - hintWidth >> 1
					break

				case 'top':
				default:
					top = -hintHeight
					left = targetWidth - hintWidth >> 1
			}

			if (hintHeight > 0 || hintWidth > 0) {
				// This prevents react-hint from rotating the placements 
				this.placement = at;
			}
			const newState = {
				content, at,
				top: (top + targetTop - containerTop)|0,
				left: (left + targetLeft - containerLeft)|0,
				hidden: false,
			}
			this.setState(newState);
		}

		render() {
			const {className, onRenderContent} = this.props;
			const {content, at, top, left} = this.state;
			return <div ref={this._container} style={this._containerStyle}>
					<div className={`${className} ${className}--${at}`}
						ref={this._hint}
						role="tooltip"
						style={{top, left, display: this.target ? undefined : 'none'}}>
							{this.target && (onRenderContent
								? onRenderContent(this.target, content)
								: <div className={`${className}__content`}>
									{content}
								</div>
							)}
					</div>
				</div>
		}
	}
