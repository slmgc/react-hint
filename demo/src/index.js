import React from 'react'
import {render} from 'react-dom'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'

const Demo = () =>
	<div>
		<button data-rh="Hint">Default</button>
		<button data-rh="Hint" data-rh-at="top">Top</button>
		<button data-rh="Hint" data-rh-at="left">Left</button>
		<button data-rh="Hint" data-rh-at="right">Right</button>
		<button data-rh="Hint" data-rh-at="bottom">Bottom</button>
		<ReactHint />
	</div>

render(<Demo />, document.getElementById('demo'))