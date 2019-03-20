import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hotkeys from 'hotkeys-js';

export default class ReactHotkeys extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
    this.isKeyDown = false;
    this.handle = {}
  }
  componentDidMount() {
    const { filter } = this.props;
    Hotkeys.filter = filter;
    Hotkeys.unbind(this.props.keyName);
    Hotkeys(this.props.keyName, this.onKeyDown);
    document.addEventListener('keyup', this.handleKeyUpEvent);
  }
  componentWillUnmount() {
    Hotkeys.unbind(this.props.keyName);
    this.isKeyDown = true;
    this.handle = {};
    document.removeEventListener('keyup', this.handleKeyUpEvent);
  }
  onKeyUp(e, handle) {
    const { onKeyUp } = this.props;
    onKeyUp(handle.shortcut, e, handle)
  }
  onKeyDown(e, handle) {
    const { onKeyDown } = this.props;
    if (this.isKeyDown) return;
    this.isKeyDown = true;
    this.handle = handle;
    onKeyDown(handle.shortcut, e, handle)
  }
  handleKeyUpEvent(e) {
    if (!this.isKeyDown) return;
    this.isKeyDown = false;
    if (this.props.keyName.indexOf(this.handle.shortcut) < 0) return;
    this.onKeyUp(e, this.handle);
    this.handle = {};
  }
  render() {
    return this.props.children || null;
  }
}

ReactHotkeys.propTypes = {
  keyName: PropTypes.string,
  filter: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
}

ReactHotkeys.defaultProps = {
  filter(event) {
    var tagName = (event.target || event.srcElement).tagName;
    return !(tagName.isContentEditable || tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  },
  onKeyUp() { },
  onKeyDown() { }
}
