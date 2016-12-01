import React from 'react'

export default class ReactHint extends React.Component {
	static _instance = null

	static get instance() {
		return ReactHint._instance
	}

	static set instance(instance) {
		if (instance) {
			document.addEventListener('mouseover', instance.onHover)
		} else {
			document.removeEventListener('mouseover', ReactHint.instance.onHover)
		}

		ReactHint._instance = instance
	}

	static defaultProps = {
		className: 'react-hint'
	}

	state = {
		target: null,
		content: null,
		cls: null,
		at: 'top',
		top: 0,
		left: 0
	}

	shouldComponentUpdate({className}, {target, content, cls, at, top, left}) {
		const {props, state} = this
		return target !== state.target
			|| content !== state.content
			|| cls !== state.cls
			|| at !== state.at
			|| top !== state.top
			|| left !== state.left
			|| className !== props.className
	}

	componentDidMount() {
		if (ReactHint.instance) ReactHint.instance = null
		ReactHint.instance = this
	}

	componentDidUpdate() {
		const {target} = this.state
		if (!target) return

		const {top, left, width, height} = target.getBoundingClientRect()
		if (!(top || left || width || height)) return

		this.setState(this.getHintData(target))
	}

	componentWillUnmount() {
		ReactHint.instance = null
	}

	findHint = (el) => {
		while (el) {
			if (el === document) break
			if (el.hasAttribute('data-rh')) return el
			if (el === this._hint) return this.state.target
			el = el.parentNode
		} return null
	}

	getHintData = (target) => {
		const {_container, _hint} = this
		const content = target.getAttribute('data-rh')
		const cls = target.getAttribute('data-rh-cls')
		const at = target.getAttribute('data-rh-at') || 'top'

		const {
			top: container_top,
			left: container_left,
		} = _container.getBoundingClientRect()

		const {
			width: hint_width,
			height: hint_height,
		} = _hint.getBoundingClientRect()

		const {
			top: target_top,
			left: target_left,
			width: target_width,
			height: target_height,
		} = target.getBoundingClientRect()

		let top, left
		switch (at) {
			case 'left':
				top = target_height - hint_height >> 1
				left = -hint_width
				break

			case 'right':
				top = target_height - hint_height >> 1
				left = target_width
				break

			case 'bottom':
				top = target_height
				left = target_width - hint_width >> 1
				break

			case 'top':
			default:
				top = -hint_height
				left = target_width - hint_width >> 1
		}

		return {
			content, cls, at,
			top: top + target_top - container_top,
			left: left + target_left - container_left
		}
	}

	onHover = ({target}) => {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => {
			target = this.findHint(target)
			this.setState({target})
		}, 100)
	}

	setRef = (name, ref) =>
		this[name] = ref

	renderContent = (content) => {
		if (content && content[0] === '#') {
			const el = document.getElementById(content.slice(1))
			if (el) return <span dangerouslySetInnerHTML={{__html: el.innerHTML}} />
		} return content
	}

	render() {
		const {className} = this.props
		const {target, content, cls, at, top, left} = this.state

		return (
			<div style={{position: 'relative'}}
				ref={this.setRef.bind(this, '_container')}>
					{target &&
						<div className={`${className} ${className}--${at} ${cls}`}
							ref={this.setRef.bind(this, '_hint')}
							style={{top, left}}>
								<div className={`${className}__content`}>
									{this.renderContent(content)}
								</div>
						</div>
					}
			</div>
		)
	}
}