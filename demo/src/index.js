import {ReactHintFactory} from 'src'
import 'css/index.css'
import './index.css'

const ReactHint = ReactHintFactory(React)
class App extends Component {
	toggleCustomHint = ({target}) => {
		if (this.instance.state.target) target = null
		this.instance.setState({target})
	}

	render() {
		return <div>
			<ReactHint events delay={100} />
			<ReactHint attribute="data-custom" className="custom-hint"
				ref={(ref) => this.instance = ref} />

			<button data-rh="Default">Default</button>
			<button data-rh="Top" data-rh-at="top">Top</button>
			<button data-rh="Right" data-rh-at="right">Right</button>
			<button data-rh="Bottom" data-rh-at="bottom">Bottom</button>
			<button data-rh="Left" data-rh-at="left">Left</button>
			<button data-custom="#content" data-custom-at="bottom"
				onClick={this.toggleCustomHint}>Click Me</button>

			<div id="content" style={{display: 'none'}}>
				Here goes a custom tooltip.<br />
				You can show <b>HTML</b> content in tooltips.
				<img data-rh="Cat" data-rh-at="bottom"
					src="https://images.pexels.com/photos/20787/pexels-photo.jpg?w=240" />
			</div>
		</div>
	}
}

render(<App />, demo)
