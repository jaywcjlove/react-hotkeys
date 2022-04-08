import React from 'react';
import { HotkeysEvent } from 'hotkeys-js';
import { Github } from '@uiw/react-shields';
import GitHubCorners from '@uiw/react-github-corners';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@wcj/dark-mode';
import Hotkeys from '../';
import MDStr from '../README.md';
import './App.less';

export interface AppProps {}
export interface AppState {
  output?: string;
  info?: string;
  shortcut?: string;
}

export default class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      info: 'Hello, I am a component that listens to keydown and keyup of a',
      output: '',
      shortcut: '',
    }
  }
  onKeyUp(keyName: string, e: KeyboardEvent, handle: HotkeysEvent) {
    console.log("test:onKeyUp", e, handle)
    this.setState({
      output: `onKeyUp ${keyName}`,
      shortcut: '',
    });
  }
  onKeyDown(keyName: string, e: KeyboardEvent, handle: HotkeysEvent) {
    console.log("test:onKeyDown", keyName, e, handle)
    this.setState({
      output: `onKeyDown ${keyName}`,
      shortcut: handle.shortcut,
    });
  }
  render () {
    const {shortcut, output} = this.state;
    return (
      <div className="warpper">
        <dark-mode style={{ position: 'fixed', top: 8, left: 10, zIndex: 9999 }}></dark-mode>
        <h1>React Hotkeys</h1>
        <Github user="jaywcjlove" repo="react-hotkeys">
          <Github.Social type="forks" href="https://github.com/jaywcjlove/react-hotkeys/network/members" />
          <Github.Social type="stars" href="https://github.com/jaywcjlove/react-hotkeys/stargazers" />
          <Github.Social type="watchers" href="https://github.com/jaywcjlove/react-hotkeys/watchers" />
          <Github.Social type="followers" href="https://github.com/jaywcjlove?tab=followers" />
          <a href="https://www.npmjs.com/package/react-hot-keys" target="__blank">
            <img src="https://img.shields.io/npm/dm/react-hot-keys.svg?style=flat" alt="NPM Downloads" />
          </a>
        </Github>
        <GitHubCorners href="https://github.com/jaywcjlove/react-hotkeys" target="__blank" fixed zIndex={9999} />
        <Hotkeys
          keyName="shift+a,alt+s,shift+/"
          onKeyDown={this.onKeyDown.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        >
          <div>
            <div>
              {this.state.info}
            </div>
            <div className="shortcut-info">
              <div className={shortcut === 'shift+a' ? 'active' : ''}>
                <kbd>shift</kbd> + <kbd>a</kbd>
              </div>
              <div className={shortcut === 'alt+s' ? 'active' : ''}>
                <kbd>alt</kbd> + <kbd>s</kbd>
              </div>
              <div className={shortcut === 'shift+/' ? 'active' : ''}>
                <kbd>shift</kbd> + <kbd>/</kbd>
              </div>
            </div>
            {output && (
              <div className="info">
                {output}
              </div>
            )}
          </div>
        </Hotkeys>
        <MarkdownPreview className="App-markdown" source={MDStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
      </div>
    )
  }
}