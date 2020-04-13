import React from "react";
import { render } from "react-dom";
import ReactHintFactory from "src";
import "css/index.css";
import "./index.css";

const ReactHint = ReactHintFactory(React);
class App extends React.Component {
  onRenderContent = (target, content) => {
    const { catId } = target.dataset;
    const width = 240;
    const url = `https://images.pexels.com/photos/${catId}/pexels-photo-${catId}.jpeg?w=${width}`;

    return (
      <div className="custom-hint__content">
        <img src={url} width={width} />
        <button
          ref={(ref) => ref && ref.focus()}
          onClick={() => this.instance.toggleHint()}
        >
          Ok
        </button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <ReactHint
          auto
          position="top"
          events={{ hover: true }}
          onRenderContent={() => (
            <div
              style={{
                minWidth: "100px",
                padding: "5px",
                border: "1px solid black",
                zIndex: "99999",
              }}
            >
              Hello! Something long that could demonstrate the issue very
              easily. Infinite loop should not happen here. Infinite loop should
              not happen here
            </div>
          )}
          attribute="data-tip1"
        />
        <ReactHint autoPosition events delay={{ show: 100, hide: 1000 }} />
        <ReactHint
          persist
          attribute="data-custom"
          className="custom-hint"
          events={{ click: true }}
          onRenderContent={this.onRenderContent}
          ref={(ref) => (this.instance = ref)}
        />

        <button data-tip1>Long text with content</button>
        <button data-rh="Default">Default</button>
        <button data-rh="This is a very very long text, This is a very very long text, This is a very very long text">
          Long text
        </button>
        <button data-rh="Top" data-rh-at="top">
          Top
        </button>
        <button data-rh="Right" data-rh-at="right">
          Right
        </button>
        <button data-rh="Bottom" data-rh-at="bottom">
          Bottom
        </button>
        <button data-rh="Left" data-rh-at="left">
          Left
        </button>

        <button data-custom data-custom-at="bottom" data-cat-id="10913">
          Click Me
        </button>

        <button data-custom data-custom-at="bottom" data-cat-id="416088">
          Click Me
        </button>
      </div>
    );
  }
}

function App1() {
  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <ReactHint
            autoPosition
            persist
            events={{ hover: true }}
            onRenderContent={() => (
              <div
                style={{
                  minWidth: "100px",
                  padding: "5px",
                  border: "1px solid black",
                  zIndex: "99999",
                }}
              >
                Hello! Something long that could demonstrate the issue even
                longer bla bla
              </div>
            )}
            attribute="data-tip-tltp1"
          />
          <button data-tip-tltp1>Hover me 1 !</button>
        </div>
        <div className="col">something else</div>
      </div>
    </div>
  );
}

render(<App />, demo);
