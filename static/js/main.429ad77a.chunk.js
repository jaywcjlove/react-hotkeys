(this["webpackJsonpreact-hot-keys"]=this["webpackJsonpreact-hot-keys"]||[]).push([[0],{382:function(e,t,n){},383:function(e,t,n){"use strict";n.r(t);var o=n(3),s=n.n(o),a=n(64),i=n.n(a),c=n(2),r=n(18),h=n(6),l=n(7),p=n(20),y=n(66),d=n(72),u=n(4),k=n(0),b=n(23),j=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).isKeyDown=!1,o.handle=void 0,o.onKeyDown=o.onKeyDown.bind(Object(u.a)(o)),o.onKeyUp=o.onKeyUp.bind(Object(u.a)(o)),o.handleKeyUpEvent=o.handleKeyUpEvent.bind(Object(u.a)(o)),o.handle={},o}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.filter,n=e.splitKey;t&&(b.a.filter=t),b.a.unbind(this.props.keyName),Object(b.a)(this.props.keyName,{splitKey:n},this.onKeyDown),document&&document.body.addEventListener("keyup",this.handleKeyUpEvent)}},{key:"componentWillUnmount",value:function(){b.a.unbind(this.props.keyName),this.isKeyDown=!0,this.handle={},document&&document.body.removeEventListener("keyup",this.handleKeyUpEvent)}},{key:"onKeyUp",value:function(e,t){var n=this.props,o=n.onKeyUp;!n.disabled&&o&&o(t.shortcut,e,t)}},{key:"onKeyDown",value:function(e,t){var n=this.props,o=n.onKeyDown,s=n.allowRepeat,a=n.disabled;this.isKeyDown&&!s||(this.isKeyDown=!0,this.handle=t,!a&&o&&o(t.shortcut,e,t))}},{key:"handleKeyUpEvent",value:function(e){this.isKeyDown&&(this.isKeyDown=!1,this.props.keyName&&this.props.keyName.indexOf(this.handle.shortcut)<0||(this.onKeyUp(e,this.handle),this.handle={}))}},{key:"render",value:function(){return this.props.children||null}}]),n}(s.a.Component);j.defaultProps={filter:function(e){var t=e.target||e.srcElement,n=t.tagName;return!(t.isContentEditable||"INPUT"===n||"SELECT"===n||"TEXTAREA"===n)}},j.propTypes={keyName:k.string,filter:k.func,onKeyDown:k.func,onKeyUp:k.func,disabled:k.bool,splitKey:k.string};n(382);var m=n(1),f=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={info:"Hello, I am a component that listens to keydown and keyup of a",output:"",shortcut:""},o}return Object(r.a)(n,[{key:"onKeyUp",value:function(e,t,n){console.log("test:onKeyUp",t,n),this.setState({output:"onKeyUp ".concat(e),shortcut:""})}},{key:"onKeyDown",value:function(e,t,n){console.log("test:onKeyDown",e,t,n),this.setState({output:"onKeyDown ".concat(e),shortcut:n.shortcut})}},{key:"render",value:function(){var e=this.state,t=e.shortcut,n=e.output;return Object(m.jsxs)("div",{className:"warpper",children:[Object(m.jsx)("h1",{children:"React Hotkeys"}),Object(m.jsxs)(p.a,{user:"jaywcjlove",repo:"react-hotkeys",children:[Object(m.jsx)(p.a.Social,{type:"forks",href:"https://github.com/jaywcjlove/react-hotkeys/network/members"}),Object(m.jsx)(p.a.Social,{type:"stars",href:"https://github.com/jaywcjlove/react-hotkeys/stargazers"}),Object(m.jsx)(p.a.Social,{type:"watchers",href:"https://github.com/jaywcjlove/react-hotkeys/watchers"}),Object(m.jsx)(p.a.Social,{type:"followers",href:"https://github.com/jaywcjlove?tab=followers"}),Object(m.jsx)("a",{href:"https://www.npmjs.com/package/react-hot-keys",target:"__blank",children:Object(m.jsx)("img",{src:"https://img.shields.io/npm/dm/react-hot-keys.svg?style=flat",alt:"NPM Downloads"})})]}),Object(m.jsx)(y.a,{href:"https://github.com/jaywcjlove/react-hotkeys",target:"__blank",fixed:!0,zIndex:9999}),Object(m.jsx)(j,{keyName:"shift+a,alt+s,shift+/",onKeyDown:this.onKeyDown.bind(this),onKeyUp:this.onKeyUp.bind(this),children:Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{children:this.state.info}),Object(m.jsxs)("div",{className:"shortcut-info",children:[Object(m.jsxs)("div",{className:"shift+a"===t?"active":"",children:[Object(m.jsx)("kbd",{children:"shift"})," + ",Object(m.jsx)("kbd",{children:"a"})]}),Object(m.jsxs)("div",{className:"alt+s"===t?"active":"",children:[Object(m.jsx)("kbd",{children:"alt"})," + ",Object(m.jsx)("kbd",{children:"s"})]}),Object(m.jsxs)("div",{className:"shift+/"===t?"active":"",children:[Object(m.jsx)("kbd",{children:"shift"})," + ",Object(m.jsx)("kbd",{children:"/"})]})]}),n&&Object(m.jsx)("div",{className:"info",children:n})]})}),Object(m.jsx)(d.a,{className:"App-markdown",source:'react-hotkeys\n---\n\n[![NPM Downloads](https://img.shields.io/npm/dm/react-hot-keys.svg?style=flat)](https://www.npmjs.com/package/react-hot-keys)\n[![Build & Deploy](https://github.com/jaywcjlove/react-hotkeys/workflows/Build%20&%20Deploy/badge.svg)](https://github.com/jaywcjlove/react-hotkeys/actions)\n[![npm package](https://img.shields.io/npm/v/react-hot-keys.svg)](https://www.npmjs.org/package/react-hot-keys) [![Coveralls](https://img.shields.io/coveralls/jaywcjlove/react-hotkeys/master.svg)](https://coveralls.io/github/jaywcjlove/react-hotkeys)\n\n\x3c!--dividing--\x3e\n\nReact component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts. Uses a fork of [hotkeys.js](https://github.com/jaywcjlove/hotkeys) for keydown detection of special characters. You give it a keymap of shortcuts & it bind it to the mousetrap singleton. The, it\'ll unbind it when the component unmounts.\n\n> [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook) - React hook for using keyboard shortcuts in components. Make sure that you have at least version 16.8 of react and react-dom installed, or otherwise hooks won\'t work for you.\n\n## Example\n\n### Install\n\n```sh\nnpm i -S react-hot-keys\n```\n\n### Demo\n\nPreview [demo](https://jaywcjlove.github.io/react-hotkeys/). \n\n- [Codepen example](https://codepen.io/jaywcjlove/pen/bJxbwG?editors=0010).\n- [CodesandBox Example](https://codesandbox.io/s/hotkeys-116-8rge8)\n\n```js\nimport React from \'react\';\nimport Hotkeys from \'react-hot-keys\';\n\nexport default class HotkeysDemo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      output: \'Hello, I am a component that listens to keydown and keyup of a\',\n    }\n  }\n  onKeyUp(keyName, e, handle) {\n    console.log("test:onKeyUp", e, handle)\n    this.setState({\n      output: `onKeyUp ${keyName}`,\n    });\n  }\n  onKeyDown(keyName, e, handle) {\n    console.log("test:onKeyDown", keyName, e, handle)\n    this.setState({\n      output: `onKeyDown ${keyName}`,\n    });\n  }\n  render() {\n    return (\n      <Hotkeys \n        keyName="shift+a,alt+s" \n        onKeyDown={this.onKeyDown.bind(this)}\n        onKeyUp={this.onKeyUp.bind(this)}\n      >\n        <div style={{ padding: "50px" }}>\n          {this.state.output}\n        </div>\n      </Hotkeys>\n    )\n  }\n}\n```\n## API \n\n### keyName\n\nSupported keys `\u21e7`, `shift`, `option`, `\u2325`, `alt`, `ctrl`, `control`, `command`, `\u2318` .\n\n`\u2318` Command(\uf8ff)  \n`\u2303` Control  \n`\u2325` Option(alt)  \n`\u21e7` Shift  \n`\u21ea` Caps Lock   \n~~`fn` Function key is `fn` (not supported)~~  \n`\u21a9\ufe0e` return/enter\n`space` space keys\n\n### onKeyDown\n\nCallback function to be called when user pressed the target buttons\n`space` space keys\n\n### onKeyUp\n\nCallback function to be called when user key uped the target buttons\n\n### allowRepeat\n\n> allowRepeat?: boolean;\n\n`allowRepeat` to allow auto repeating key down\n\n\n### disabled\n\n> disabled?: boolean;\n\nDisable `onKeyDown` and `onKeyUp` events. Default: `undefined`\n\n### filter\n\n`INPUT` `SELECT` `TEXTAREA` default does not handle. `filter` to return to the true shortcut keys set to play a role, flase shortcut keys set up failure.\n\n```diff\n<Hotkeys \n  keyName="shift+a,alt+s" \n+  filter={(event) => {\n+    return true;\n+  }}\n  onKeyDown={this.onKeyDown.bind(this)}\n  onKeyUp={this.onKeyUp.bind(this)}\n/>\n```\n\n## License\n\nMIT\n'.replace(/([\s\S]*)<!--dividing-->/,"")})]})}}]),n}(s.a.PureComponent);i.a.render(Object(m.jsx)(f,{}),document.getElementById("root"))}},[[383,1,2]]]);
//# sourceMappingURL=main.429ad77a.chunk.js.map