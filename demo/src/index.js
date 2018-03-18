import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: `Hello, I am a component that listens to keydown and keyup of a. <br/> 
      你好，我是一个监听keydown和keyup的组件。<br/> 
      请摁下【shift+a】或者【alt+s】是一下效果`,
      mount: true,
    }
  }
  onKeyUp(keyName, e, handle) {
    console.log("test:onKeyUp", e, handle)
    this.setState({
      output: `onKeyUp ${keyName}`,
    });
  }
  onKeyDown(keyName, e, handle) {
    console.log("test:onKeyDown", keyName, e, handle)
    this.setState({
      output: `onKeyDown ${keyName}`,
    });
  }
  render() {
    const { mount } = this.state;
    return (
      <div>
        {mount && (
          <Example
            keyName="shift+a,alt+s"
            onKeyDown={this.onKeyDown.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
          >
            <div style={{ padding: "10px 20px 0px" }}>
              <h1 style={{ padding: "0px 0px 0px" }}>react-hotkeys</h1>
              <div>
                <a href="https://travis-ci.org/jaywcjlove/react-hotkeys"><img src="https://travis-ci.org/jaywcjlove/react-hotkeys.svg?branch=master" /></a>&nbsp;
            <a href="https://www.npmjs.org/package/react-hot-keys"><img src="https://img.shields.io/npm/v/react-hot-keys.svg" /></a>&nbsp;
            <a href="https://coveralls.io/github/jaywcjlove/react-hotkeys"><img src="https://img.shields.io/coveralls/jaywcjlove/react-hotkeys/master.svg" /></a>
              </div>
              <p style={{ padding: "10px 0px 0px" }}>
                React component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts.
                Uses a fork of <b><a href="https://github.com/jaywcjlove/hotkeys">hotkeys.js</a></b> for keydown detection of special characters. You give it a keymap of shortcuts & it bind it to the mousetrap singleton. The, it'll unbind it when the component unmounts.
              </p>
              <div style={{ padding: "20px 0 20px" }} dangerouslySetInnerHTML={{ __html: this.state.output }} />
            </div>
          </Example>
        )}
        <button onClick={() => {
          this.setState({
            mount: !this.state.mount,
          });
        }}>{mount ? 'Unmount Component' :'Mount Component'}</button>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
