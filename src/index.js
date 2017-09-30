export const ReactHintFactory = ({Component, createElement}) =>
	class ReactHint extends Component {
		static defaultProps = {
			attribute: 'data-rh',
			className: 'react-hint',
			delay: 0,
			events: false,
			hover: false,
			position: 'top'
		}

		state = {target: null}

		componentDidMount() {
			document.addEventListener('mouseover', this.mouseOver)
			document.addEventListener('touchstart', this.mouseOver)
		}

		componentWillUnmount() {
			document.removeEventListener('mouseover', this.mouseOver)
			document.removeEventListener('touchstart', this.mouseOver)
			clearTimeout(this._timeout)
		}

		shouldComponentUpdate = (props, state) =>
			!this.shallowEqual(state, this.state) ||
				!this.shallowEqual(props, this.props)

		shallowEqual = (a, b) => {
			const keys = Object.keys(a)
			return keys.length === Object.keys(b).length &&
				keys.reduce((result, key) => result &&
					(typeof a[key] === 'function' || a[key] === b[key]), true)
		}

		componentDidUpdate() {
			if (this.state.target) this.setState(this.getHintData)
		}

		findHint = (el) => {
			const {attribute, hover} = this.props
			const {target} = this.state

			while (el) {
				if (el === document) break
				if (hover && el === this._hint) return target
				if (el.hasAttribute(attribute)) return el
				el = el.parentNode
			} return null
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

		mouseOver = ({target}) => {
			const {delay, events} = this.props
			if (!events) return

			clearTimeout(this._timeout)
			this._timeout = setTimeout(() => this.setState(() => ({
				target: this.findHint(target)
			})), delay)
		}

		renderContent = (content) => {
			if (String(content)[0] === '#') {
				const el = document.getElementById(content.slice(1))
				if (el) return createElement('div', {
					dangerouslySetInnerHTML: {__html: el.innerHTML}
				})
			} return content
		}

		render() {
			const {className} = this.props
			const {target, content, at, top, left} = this.state

			return createElement('div', {
					ref: (ref) => this._container = ref,
					style: {position: 'relative'},
				}, target && createElement('div', {
					className: `${className} ${className}--${at}`,
					ref: (ref) => this._hint = ref,
					style: {top, left}
				}, createElement('div', {
					className: `${className}__content`
				}, this.renderContent(content)))
			)
		}
	}