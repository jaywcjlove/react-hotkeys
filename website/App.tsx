import React from 'react';
import { HotkeysEvent } from 'hotkeys-js';
import { Github } from '@uiw/react-shields';
import GitHubCorners from '@uiw/react-github-corners';
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
        <Github user="jaywcjlove" repo="react-hotkeys">
          <Github.Social type="forks" href="https://github.com/jaywcjlove/react-hotkeys/network/members" />
          <Github.Social type="stars" href="https://github.com/jaywcjlove/react-hotkeys/stargazers" />
          <Github.Social type="watchers" href="https://github.com/jaywcjlove/react-hotkeys/watchers" />
          <Github.Social type="followers" href="https://github.com/jaywcjlove?tab=followers" />
        </Github>
        <GitHubCorners href="https://github.com/jaywcjlove/react-hotkeys" target="__blank" />
        <Hotkeys
          keyName="shift+a,alt+s"
          onKeyDown={this.onKeyDown.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        >
          <div style={{  }}>
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