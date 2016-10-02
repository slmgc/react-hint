import React from 'react'

export default class ReactHint extends React.Component {
	static _instance = null

	static get instance() {
		return ReactHint._instance
	}

	static set instance(instance) {
		if (ReactHint._instance) throw new Error('Only one instance of ReactHint is allowed.')
		ReactHint._instance = instance
	}

	static defaultProps = {
		className: 'react-hint'
	}

	state = {
		target: null,
		at: 'top',
		top: 0,
		left: 0
	}

	shouldComponentUpdate({className}, {target, at, top, left}) {
		const {props, state} = this
		return target !== state.target
			|| at !== state.at
			|| Math.abs(top - state.top) > 1
			|| Math.abs(left - state.left) > 1
			|| className !== props.className
	}

	componentDidMount() {
		ReactHint.instance = this
		document.addEventListener('mouseover', this.onHover)
	}

	componentDidUpdate() {
		const {target} = this.state
		const {hint} = this.refs

		if (!target || !hint) return
		this.setState(this.getHintPosition(hint, target))
	}

	componentWillUnmout() {
		ReactHint.instance = null
		document.removeEventListener('mouseover', this.onHover)
	}

	findHint = (el) => {
		while (el) {
			if (el === document) break
			if (el.hasAttribute('data-rh')) return el
			el = el.parentNode
		} return null
	}

	getHintPosition = (hint, target) => {
		const {offsetWidth, offsetHeight} = hint
		const {width, height, top, left} = target.getBoundingClientRect()
		const at = target.getAttribute('data-rh-at')

		switch (at) {
			case 'left': return {
				at,
				top: top + (height - offsetHeight >> 1),
				left: left - offsetWidth
			}

			case 'right': return {
				at,
				top: top + (height - offsetHeight >> 1),
				left: left + width
			}

			case 'bottom': return {
				at,
				top: top + height,
				left: left + (width - offsetWidth >> 1)
			}

			case 'top':
			default: return {
				at: 'top',
				top: top - offsetHeight,
				left: left + (width - offsetWidth >> 1)
			}
		}
	}

	onHover = ({target}) => {
		this.setState({target: this.findHint(target)})
	}

	render() {
		const {className} = this.props
		const {target, at, top, left} = this.state

		return target &&
			<div className={`${className} ${className}--${at}`}
				style={{top, left}}
				ref="hint">
					<div className={`${className}__content`}>
						{target.getAttribute('data-rh')}
					</div>
			</div>
	}
}