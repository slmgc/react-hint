<link rel="stylesheet" href="https://unpkg.com/react-hint@3/css/index.css">
<style>
.highlight .err {
	color: inherit;
	background-color: inherit;
}

.primer-btn {
	position: relative;
	display: inline-block;
	padding: 6px 12px;
	font-size: 13px;
	font-weight: bold;
	line-height: 20px;
	color: #333;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	background-color: #eee;
	background-image: -webkit-linear-gradient(#fcfcfc, #eee);
	background-image: linear-gradient(#fcfcfc, #eee);
	border: 1px solid #d5d5d5;
	border-radius: 3px;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none
}

.primer-btn:focus {
	text-decoration: none;
	border-color: #51a7e8;
	outline: none;
	box-shadow: 0 0 5px rgba(81,167,232,0.5);
}

.primer-btn:focus:hover {
	border-color: #51a7e8;
}

.primer-btn:hover,.btn:active {
	text-decoration: none;
	background-color: #ddd;
	background-image: -webkit-linear-gradient(#eee, #ddd);
	background-image: linear-gradient(#eee, #ddd);
	border-color: #ccc;
}

.primer-btn:active {
	background-color: #dcdcdc;
	background-image: none;
	border-color: #b5b5b5;
	box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
}

.custom-hint {
	position: absolute;
	z-index: 8888;
	cursor: default;
}

.custom-hint__content > img {
	display: block;
}

.custom-hint__content {
	margin: 10px;
	padding: 10px;
	box-shadow: 0 0 5px rgba(0,0,0,.5);
	background: floralwhite;
	color: #000;
}
</style>

React-hint
==========

[![npm package][npm-badge]][npm] [![npm package][npm-downloads]][npm]

**React-hint** is a small tooltip component for [React](https://github.com/facebook/react) which is developed with simplicity and performance in mind. It also plays nicely with [Preact](https://github.com/developit/preact) and [Inferno](https://github.com/trueadm/inferno).

<p>
	<div id="demo"></div>
	<button class="primer-btn" data-rh="Default">Default</button>
	<button class="primer-btn" data-rh="Top" data-rh-at="top">Top</button>
	<button class="primer-btn" data-rh="Left" data-rh-at="left">Left</button>
	<button class="primer-btn" data-rh="Right" data-rh-at="right">Right</button>
	<button class="primer-btn" data-rh="Bottom" data-rh-at="bottom">Bottom</button>
	<button class="primer-btn" data-custom data-custom-at="bottom" data-cat-id="10913">Click Me</button>
	<button class="primer-btn" data-custom data-custom-at="bottom" data-cat-id="416088">Click Me</button>
</p>

How to install
--------------
```
npm i -S react-hint
```

How to use
----------

```jsx
// React
import React from 'react'
import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(React)

// Preact
import {h, Component} from 'preact'
import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory({createElement: h, Component})

// Inferno
import Inferno from 'inferno-compat'
import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(Inferno)

// UMD
const ReactHint = window.ReactHintFactory.default(window.React)
```

Options
-------
| ReactHint Property | Type                                                        | Default Value | Description
| :----------------- | :---------------------------------------------------------- | :------------ | :----------
| attribute          | String                                                      | "data-rh"     | Allows setting a custom tooltip attribute instead of the default one.
| className          | String                                                      | "react-hint"  | You can override the tooltip style by passing the `className` property.
| delay              | Number                                                      | 0             | The default delay before showing/hiding the tooltip.
| events             | Boolean or {click: Boolean, focus: Boolean, hover: Boolean} | false         | Enables/disables all events or a subset of events.
| onRenderContent    | Function                                                    |               | Passing a function which returns a react node allows rendering custom content with attached event handlers.
| persist            | Boolean                                                     | false         | Hide the tooltip only on outside click, hover, etc.
| position           | "top", "left", "right", "bottom"                            | "top"         | Allows setting the default tooltip placement.
| ref                | Function                                                    |               | You can pass a function which will get a reference to the tooltip instance.

| DOM Element Attribute | Type                             | Default Value | Description
| :-------------------- | :------------------------------- | :------------ | :----------
| data-rh               | String                           |               | Sets the tooltip's content.
| data-rh-at            | "top", "left", "right", "bottom" | "top"         | Allows overriding the default tooltip placement.

Example
-------
You don't need to include ReactHint in every component which uses tooltips, just include it once in the topmost container component. In case you need to define multiple instances of ReactHint, you can customise the attribute name per instance. ReactHint also supports custom tooltip content with attached event handlers by overriding the content renderer and returning a react node.

```jsx
import React from 'react'
import {render} from 'react-dom'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'

const ReactHint = ReactHintFactory(React)
class App extends React.Component {
	onRenderContent = (target, content) => {
		const {catId} = target.dataset
		const width = 240
		const url = `https://images.pexels.com/photos/${catId}/pexels-photo-${catId}.jpeg?w=${width}`

		return <div className="custom-hint__content">
			<img src={url} width={width} />
			<button ref={(ref) => ref && ref.focus()}
				onClick={() => this.instance.toggleHint()}>Ok</button>
		</div>
	}

	render() {
		return <div>
			<ReactHint events delay={100} />
			<ReactHint persist
				attribute="data-custom"
				className="custom-hint"
				events={% raw %}{{click: true}}{% endraw %}
				onRenderContent={this.onRenderContent}
				ref={(ref) => this.instance = ref} />

			<button data-rh="Default">Default</button>
			<button data-rh="Top" data-rh-at="top">Top</button>
			<button data-rh="Right" data-rh-at="right">Right</button>
			<button data-rh="Bottom" data-rh-at="bottom">Bottom</button>
			<button data-rh="Left" data-rh-at="left">Left</button>

			<button data-custom
				data-custom-at="bottom"
				data-cat-id="10913">Click Me</button>

			<button data-custom
				data-custom-at="bottom"
				data-cat-id="416088">Click Me</button>
		</div>
	}
}

render(<App />, demo)
```

License
-------
MIT

[npm-badge]: https://img.shields.io/npm/v/react-hint.png
[npm-downloads]: https://img.shields.io/npm/dm/react-hint.svg
[npm]: https://www.npmjs.org/package/react-hint

<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-hint@3/umd/react-hint.min.js"></script>
<script>
	const ReactHint = ReactHintFactory.default(React)
	const className = 'custom-hint'
	const onRenderContent = (target) => {
		const {catId} = target.dataset
		const width = 240
		const src = `https://images.pexels.com/photos/${catId}/pexels-photo-${catId}.jpeg?w=${width}`
		return React.createElement('div', {className: `${className}__content`},
			React.createElement('img', {src, width}))
	}

	ReactDOM.render(React.createElement(() => [
		React.createElement(ReactHint, {events: true, delay: 100}),
		React.createElement(ReactHint, {className, events: {click: true}, onRenderContent})
	]), demo)
</script>
