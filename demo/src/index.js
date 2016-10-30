import React from 'react'
import {render} from 'react-dom'
import ReactHint from 'react-hint'
import 'primer-buttons/build/build.css'
import 'react-hint/css/index.css'
import './index.css'

class Demo extends React.Component {
	state = {count: 0}

	componentDidMount() {
		setInterval(() => {
			this.setState({count: this.state.count + 1})
			ReactHint.instance.forceUpdate()
		}, 1000)
	}

	render() {
		const {count} = this.state
		return (
			<div>
				<button className="btn" data-rh="Default">Default</button>
				<button className="btn" data-rh="Top" data-rh-at="top">Top</button>
				<button className="btn" data-rh="Left" data-rh-at="left">Left</button>
				<button className="btn" data-rh="Right" data-rh-at="right">Right</button>
				<button className="btn" data-rh="Bottom" data-rh-at="bottom">Bottom</button>
				<button className="btn" data-rh={`Count: ${count}`}>Count: {count}</button>
				<ReactHint />
			</div>
		)
	}
}

render(<Demo />, document.getElementById('demo'))