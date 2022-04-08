react-hotkeys
===

[![NPM Downloads](https://img.shields.io/npm/dm/react-hot-keys.svg?style=flat)](https://www.npmjs.com/package/react-hot-keys)
[![CI](https://github.com/jaywcjlove/react-hotkeys/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/react-hotkeys/actions/workflows/ci.yml)
[![npm package](https://img.shields.io/npm/v/react-hot-keys.svg)](https://www.npmjs.org/package/react-hot-keys) [![Coveralls](https://jaywcjlove.github.io/react-hotkeys/coverage/badges.svg)](https://jaywcjlove.github.io/react-hotkeys/coverage/lcov-report/)

<!--dividing-->

React component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts. Uses a fork of [hotkeys.js](https://github.com/jaywcjlove/hotkeys) for keydown detection of special characters. You give it a keymap of shortcuts & it bind it to the mousetrap singleton. The, it'll unbind it when the component unmounts.

> [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook) - React hook for using keyboard shortcuts in components. Make sure that you have at least version 16.8 of react and react-dom installed, or otherwise hooks won't work for you.

## Example

### Install

```sh
npm i -S react-hot-keys
```

### Demo

Preview [demo](https://jaywcjlove.github.io/react-hotkeys/). 

- [Codepen example](https://codepen.io/jaywcjlove/pen/bJxbwG?editors=0010).
- [CodesandBox Example](https://codesandbox.io/s/hotkeys-116-8rge8)

```js
import React from 'react';
import Hotkeys from 'react-hot-keys';

export default class HotkeysDemo extends React.Component {
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

### allowRepeat

> allowRepeat?: boolean;

`allowRepeat` to allow auto repeating key down


### disabled

> disabled?: boolean;

Disable `onKeyDown` and `onKeyUp` events. Default: `undefined`

### filter

`INPUT` `SELECT` `TEXTAREA` default does not handle. `filter` to return to the true shortcut keys set to play a role, flase shortcut keys set up failure.

```diff
 <Hotkeys 
   keyName="shift+a,alt+s" 
+   filter={(event) => {
+     return true;
+   }}
   onKeyDown={this.onKeyDown.bind(this)}
   onKeyUp={this.onKeyUp.bind(this)}
 />
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/react-hotkeys/graphs/contributors">
  <img src="https://jaywcjlove.github.io/react-hotkeys/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
