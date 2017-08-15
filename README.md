react-hotkeys
---

React component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts. Uses a fork of [hotkeys.js](https://github.com/jaywcjlove/hotkeys) for keydown detection of special characters.


## Example

### Install

```sh
npm i -S react-hot-keys
```

### Demo

```js
import React, { Component } from 'react';
import Hotkeys from 'react-hot-keys';

export default class HotkeysDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: 'Hello, I am a component that listens to keydown and keyup of a',
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
      <Hotkeys 
        keyName="shift+a,alt+s" 
        onKeyDown={this.onKeyDown.bind(this)}
        onKeyUp={this.onKeyUp.bind(this)}
      >
        <div style={{ padding: "50px" }}>
          {this.state.output}
        </div>
      </Hotkeys>
    )
  }
}

```