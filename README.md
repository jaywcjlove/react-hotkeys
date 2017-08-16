react-hotkeys
---

[![Travis][build-badge]][build] [![npm package][npm-badge]][npm] [![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://travis-ci.org/jaywcjlove/react-hotkeys.svg?branch=master "Build Badge"
[build]: https://travis-ci.org/jaywcjlove/react-hotkeys "Build"

[npm-badge]: https://img.shields.io/npm/v/react-hot-keys.svg "Npm Badge"
[npm]: https://www.npmjs.org/package/react-hot-keys "npm"

[coveralls-badge]: https://img.shields.io/coveralls/jaywcjlove/react-hotkeys/master.svg "Coveralls Badge"
[coveralls]: https://coveralls.io/github/jaywcjlove/react-hotkeys "Coveralls"

React component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts. Uses a fork of [hotkeys.js](https://github.com/jaywcjlove/hotkeys) for keydown detection of special characters. You give it a keymap of shortcuts & it bind it to the mousetrap singleton. The, it'll unbind it when the component unmounts.


## Example

### Install

```sh
sudo npm i -S react-hot-keys
```

### Demo

Preview [demo](https://jaywcjlove.github.io/react-hotkeys/).

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
## API 

### keyName

Supported keys `⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, `⌘` .

`⌘` Command()  
`⌃` Control  
`⌥` Option(alt)  
`⇧` Shift  
`⇪` Caps Lock   
~~`fn` Function key is `fn` (not supported)~~  
`↩︎` return/enter
`space` space keys

### onKeyDown

Callback function to be called when user pressed the target buttons
`space` space keys

### onKeyUp

Callback function to be called when user key uped the target buttons

## License

MIT