export default ({Component, createElement}) =>
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

		state = {target: null, showA: false, showB: false}
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
			target = this.getHint(target)
			clearTimeout(this._timeout)
			this._timeout = setTimeout(() => this.setState(() =>
				({target})), target === null
					? this.props.delay.hide === undefined
						? this.props.delay
						: this.props.delay.hide
					: this.props.delay.show === undefined
						? this.props.delay
						: this.props.delay.show)
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

		componentDidUpdate(prevProps, prevState) {
			if (this.state.target) this.setState(this.getHintData)

			// tooltip creation 
			if (prevState.target === null && this.state.target) this.setState({showA: true, showB: false})

			// tooltip update
			if (prevState.target && this.state.target)
			{
				// skip initial state change after tooltip creation
				if (!(!prevState.showA && !prevState.showB))
				{
					const {left, top} = this.state;
					// tooltip move
					if ((left != prevState.left) || (top != prevState.top)) this.setState({showA: !prevState.showA, showB: !prevState.showB})
				}
			}

			// tooltip removal
			else if (prevState.target && this.state.target === null) this.setState({showA: false, showB: false})
		}

		getHintData = ({target}, {attribute, autoPosition, position}) => {
			const content = target.getAttribute(attribute) || ''
			let at = target.getAttribute(`${attribute}-at`) || position

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

			if (autoPosition) {
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
				top: (top + targetTop - containerTop)|0,
				left: (left + targetLeft - containerLeft)|0
			}
		}

		render() {
			const {className, onRenderContent} = this.props
			const {target, content, at, top, left, showA, showB} = this.state
			const showClassName = showA ? `${className}--show-a` : showB ? `${className}--show-b` : '';

			return <div ref={(ref) => this._container = ref}
				style={this._containerStyle}>
					{target &&
						<div className={`${className} ${className}--${at} ${showClassName}`}
							ref={(ref) => this._hint = ref}
							role="tooltip"
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
