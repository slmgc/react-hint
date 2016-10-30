react-hint
==========
**react-hint** is a small tooltip component for [React](https://github.com/facebook/react) which is developed with simplicity and performance in mind. It doesn't include any fancy stuff, but it gets the job done. It also plays nicely with [Preact](https://github.com/developit/preact) and [Inferno](https://github.com/trueadm/inferno) (1.0.0-beta3). [Demo page](https://slmgc.github.io/react-hint/).

![react-hint tooltip](https://raw.githubusercontent.com/slmgc/react-hint/master/demo/react-hint.gif)

How to install
--------------
```
npm i -S react-hint
```

How to use
----------

`<ReactHint />` is a singleton component. To show a tooltip on any DOM element and its children add `data-rh` attribute to the element. The default placement of a tooltip is at the top, but you can add `data-rh-at` attribute to change the placement. Supported values are: `top`, `left`, `right`, `bottom`. You can completely override tooltip style by passing `className` property to `<ReactHint />`.

```jsx
import React from 'react'
import {render} from 'react-dom'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'

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
				<button data-rh="Default">Default</button>
				<button data-rh="Top" data-rh-at="top">Top</button>
				<button data-rh="Left" data-rh-at="left">Left</button>
				<button data-rh="Right" data-rh-at="right">Right</button>
				<button data-rh="Bottom" data-rh-at="bottom">Bottom</button>
				<button data-rh={`Count: ${count}`}>Count: {count}</button>
				<ReactHint />
			</div>
		)
	}
}

render(<Demo />, document.getElementById('demo'))
```

How to rerender
---------------
**react-hint** uses [shouldComponentUpdate](https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate) under the hood to decide if it needs to be updated. You can use `ReactHint.instance.forceUpdate()` in case you want to force an update.

License
-------
MIT