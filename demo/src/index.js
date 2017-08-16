import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: `Hello, I am a component that listens to keydown and keyup of a. <br/> 
      你好，我是一个监听keydown和keyup的组件。<br/> 
      请摁下【shift+a】或者【alt+s】是一下效果`,
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
    return (
      <Example 
        keyName="shift+a,alt+s" 
        onKeyDown={this.onKeyDown.bind(this)}
        onKeyUp={this.onKeyUp.bind(this)}
      >
        <div style={{ padding: "20px" }} dangerouslySetInnerHTML={{__html:this.state.output}} />
      </Example>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
