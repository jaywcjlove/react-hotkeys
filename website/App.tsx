import React from 'react';
import { HotkeysEvent } from 'hotkeys-js';
import Hotkeys from '../';
import './App.less';

export interface AppProps {}
export interface AppState {
  output?: string;
}

export default class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      output: 'Hello, I am a component that listens to keydown and keyup of a',
    }
  }
  onKeyUp(keyName: string, e: KeyboardEvent, handle: HotkeysEvent) {
    console.log("test:onKeyUp", e, handle)
    this.setState({
      output: `onKeyUp ${keyName}`,
    });
  }
  onKeyDown(keyName: string, e: KeyboardEvent, handle: HotkeysEvent) {
    console.log("test:onKeyDown", keyName, e, handle)
    this.setState({
      output: `onKeyDown ${keyName}`,
    });
  }
  render () {
    return (
      <div className="warpper">
        <Hotkeys
          keyName="shift+a,alt+s"
          onKeyDown={this.onKeyDown.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        >
          <div style={{ padding: "50px" }}>
            {(this.state as any).output}
            <hr />
            <kbd>shift</kbd> + <kbd>a</kbd>
            <hr />
            <kbd>alt</kbd> + <kbd>s</kbd>
          </div>
        </Hotkeys>
      </div>
    )
  }
}