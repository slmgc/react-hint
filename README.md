React-hint
==========

[![npm package][npm-badge]][npm] [![npm package][npm-downloads]][npm]

**React-hint** is a small tooltip component for [React](https://github.com/facebook/react) which is developed with simplicity and performance in mind. It also plays nicely with [Preact](https://github.com/developit/preact) and [Inferno](https://github.com/trueadm/inferno).

![react-hint tooltip](https://raw.githubusercontent.com/slmgc/react-hint/master/demo/react-hint.gif)
![custom tooltip](https://raw.githubusercontent.com/slmgc/react-hint/master/demo/custom-tooltip.png)

How to install
--------------
```
npm i -S react-hint
```

How to import
-------------

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
const ReactHint = window.ReactHintFactory(window.React)
```

You don't need to include ReactHint in every component which uses tooltips, just include it once in the topmost container component.

Use
---

ReactHint is (in 99% of cases) a singleton-component which is used to render tooltips which appear on multiple elements :
 
```jsx
<ReactHint autoPosition events />
<button data-rh="tooltip 1">Hover me 1 !</button>
<button data-rh="tooltip 2">Hover me 2 !</button>
<button data-rh="tooltip 3">Hover me 3 !</button>
<button data-rh="tooltip 4">Hover me 4 !</button>
```

The text content which appears inside the tooltip is set by `data-rh` attribute.

Tooltip will appear on hover on every element with `data-rh` attribute.

*Note : tooltip can also be toggled by calling `toggleHint()` on the ref of a the component:*
 
```jsx
<ReactHint autoPosition events ref={(ref) => { this.tooltip = ref; }} />
<div data-rh="tooltip">Element with tooltip</div>
<button onClick={() => { this.tooltip.toggleHint(); }}>Click me to toggle React Hint on element !</button>
```

### custom content

In case you need to define custom content (HTML), you must use the `onRenderContent` prop of ReactHint:

```jsx
<ReactHint
	autoPosition
	events
	onRenderContent={(target) => (<div><p>`tooltip ${target.number}`</p></div>)}
/>
<button data-rh data-number="1">Hover me 1 !</button>
<button data-rh data-number="2">Hover me 2 !</button>
<button data-rh data-number="3">Hover me 3 !</button>
<button data-rh data-number="4">Hover me 4 !</button>
```

Use `data-abcdef` attribute on component which uses tooltip to pass data which can be accessed via `target.abcdef` in `onRenderContent()`.

*ReactHint is not your regular wrapping tooltip component library, e.g. this is **incorrect**:*

```jsx
<ReactHint>
	<div>Content of the tooltip</div>
</ReactHint>
```

### multiple instances

In case you need to define multiple instances of `ReactHint` (ex to show tooltips with different content layout), you can customize the attribute name per instance.
ReactHint also supports custom tooltip content with attached event handlers by overriding the content renderer and returning a react node.

```jsx

// default tooltip
<ReactHint autoPosition events />

// custom tooltip 1
<ReactHint
	persist
	attribute="data-custom-1"
	events={{click: true}}
	onRenderContent={(target) => (<div><p>`tooltip ${target.number}`</p></div>)}
/>

// custom tooltip 2
<ReactHint
	persist
	attribute="data-custom-2"
	events={{click: true}}
	onRenderContent={(target) => (<h1>`tooltip ${target.title}`</h1>)}
/>

<button data-rh="default tooltip 1">Hover me 1 to show default tooltip !</button>
<button data-rh="default tooltip 2">Hover me 2 to show default tooltip !</button>

<button data-custom-1	data-custom-1-number="123">Hover me to show custom tooltip 1 !</button>
<button data-custom-1	data-custom-1-number="456">Hover me to show custom tooltip 1 !</button>

<button data-custom-2	data-custom-2-title="Hello">Hover me to show custom tooltip 2 !</button>
<button data-custom-2	data-custom-2-title="World">Hover me to show custom tooltip 2 !</button>
```

*Note : when using custom attribute name, data should be passed prefixed with attribute name as shown above.*

Options
-------

| ReactHint Property | Type                                                        | Default Value | Description
| :----------------- | :---------------------------------------------------------- | :------------ | :----------
| attribute          | String                                                      | "data-rh"     | Allows setting a custom tooltip attribute instead of the default one.
| autoPosition       | Boolean                                                     | false         | Autopositions tooltips based on closeness to window borders.
| className          | String                                                      | "react-hint"  | You can override the tooltip style by passing the `className` property.
| delay              | Number or {show: Number, hide: Number}                      | 0             | The default delay (in milliseconds) before showing/hiding the tooltip.
| events             | Boolean or {click: Boolean, focus: Boolean, hover: Boolean} | false         | Enables/disables all events or a subset of events.
| onRenderContent    | Function                                                    |               | Allows rendering of custom HTML content (with attached event handlers). Pass a function which returns a react node.
| persist            | Boolean                                                     | false         | Hide the tooltip only on outside click, hover, etc.
| position           | "top", "left", "right", "bottom"                            | "top"         | Allows setting the default tooltip placement.
| ref                | Function                                                    |               | You can pass a function which will get a reference to the tooltip instance.

| DOM Element Attribute | Type                             | Default Value | Description
| :-------------------- | :------------------------------- | :------------ | :----------
| data-rh               | String                           |               | Sets the tooltip's text content (if `onRenderContent` is not used to set custom HTML content).
| data-rh-at            | "top", "left", "right", "bottom" | "top"         | Allows overriding the default tooltip placement.

Full Example
------------

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
			<ReactHint autoPosition events delay={{show: 100, hide: 1000}} />
			<ReactHint persist
				attribute="data-custom"
				className="custom-hint"
				events={{click: true}}
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
