import React from 'react';
import * as PropTypes from 'prop-types';
import Hotkeys, { HotkeysEvent } from 'hotkeys-js';

export type OnKeyFun = (shortcut: string, evn: KeyboardEvent, handle: HotkeysEvent) => void;

export interface IReactHotkeysProps {
  keyName?: string;
  filter?: (event: KeyboardEvent) => boolean;
  onKeyUp?: OnKeyFun;
  onKeyDown?: OnKeyFun;
  allowRepeat?: boolean;
  disabled?: boolean;
  splitKey?: string;
}

export default class ReactHotkeys extends React.Component<IReactHotkeysProps> {
  public static defaultProps: IReactHotkeysProps = {
    filter(event: KeyboardEvent) {
      const target = (event.target as HTMLElement) || event.srcElement;
      var tagName = target.tagName;
      return !(target.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
    },
  }
  static propTypes = {
    keyName: PropTypes.string,
    filter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    splitKey: PropTypes.string
  }
  private isKeyDown: boolean = false;
  private handle: HotkeysEvent;
  constructor(props: IReactHotkeysProps) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
    this.handle = {} as HotkeysEvent;
  }
  componentDidMount() {
    const { filter, splitKey } = this.props;
    if (filter) {
      Hotkeys.filter = filter;
    }
    Hotkeys.unbind(this.props.keyName as string);
    Hotkeys(this.props.keyName as string, { splitKey }, this.onKeyDown);
    document && document.body.addEventListener('keyup', this.handleKeyUpEvent);
  }
  componentWillUnmount() {
    Hotkeys.unbind(this.props.keyName as string);
    this.isKeyDown = true;
    this.handle = {} as HotkeysEvent;
    document && document.body.removeEventListener('keyup', this.handleKeyUpEvent);
  }
  onKeyUp(e: KeyboardEvent, handle: HotkeysEvent) {
    const { onKeyUp, disabled } = this.props;
    !disabled && onKeyUp && onKeyUp(handle.shortcut, e, handle)
  }
  onKeyDown(e: KeyboardEvent, handle: HotkeysEvent) {
    const { onKeyDown, allowRepeat, disabled } = this.props;
    if (this.isKeyDown && !allowRepeat) return;
    this.isKeyDown = true;
    this.handle = handle;
    !disabled && onKeyDown && onKeyDown(handle.shortcut, e, handle)
  }
  handleKeyUpEvent(e: KeyboardEvent) {
    if (!this.isKeyDown) return;
    this.isKeyDown = false;
    if (this.props.keyName && this.props.keyName.indexOf(this.handle.shortcut) < 0) return;
    this.onKeyUp(e, this.handle);
    this.handle = {} as HotkeysEvent;
  }
  render() {
    return this.props.children || null;
  }
}
