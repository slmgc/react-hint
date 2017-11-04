export default ({Component, createElement}) =>
	class ReactHint extends Component {
		static defaultProps = {
			attribute: 'data-rh',
			className: 'react-hint',
			delay: 0,
			events: false,
			onRenderContent: null,
			persist: false,
			position: 'top'
		}

		state = {target: null}
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
			clearTimeout(this._timeout)
			this._timeout = setTimeout(() => this.setState(() => ({
				target: this.getHint(target)
			})), this.props.delay)
		}

		getHint = (el) => {
			const {attribute, persist} = this.props
			const {target} = this.state

			while (el) {
				if (el === document) break
				if (persist && el === this._hint) return target
				if (el.hasAttribute(attribute)) return el
				el = el.parentNode
			} return null
		}

		shouldComponentUpdate(props, state) {
			return !this.shallowEqual(state, this.state) ||
				!this.shallowEqual(props, this.props)
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
			if (this.state.target) this.setState(this.getHintData)
		}

		getHintData = ({target}, {attribute, position}) => {
			const content = target.getAttribute(attribute) || ''
			const at = target.getAttribute(`${attribute}-at`) || position

			const {
				top: containerTop,
				left: containerLeft
			} = this._container.getBoundingClientRect()

			const {
				width: hintWidth,
				height: hintHeight
			} = this._hint.getBoundingClientRect()

			const {
				top: targetTop,
				left: targetLeft,
				width: targetWidth,
				height: targetHeight
			} = target.getBoundingClientRect()

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

			return {
				content, at,
				top: top + targetTop - containerTop,
				left: left + targetLeft - containerLeft
			}
		}

		render() {
			const {className, onRenderContent} = this.props
			const {target, content, at, top, left} = this.state

			return <div ref={(ref) => this._container = ref}
				style={this._containerStyle}>
					{target &&
						<div className={`${className} ${className}--${at}`}
							ref={(ref) => this._hint = ref}
							style={{top, left}}>
								{onRenderContent
									? onRenderContent(target, content)
									: <div className={`${className}__content`}>
										{content}
									</div>
								}
						</div>
					}
				</div>
		}
	}
