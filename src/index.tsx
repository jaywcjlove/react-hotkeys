import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
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
  children?: React.ReactNode;
}

export interface ReactHotkeysRef {
  readonly isKeyDown: boolean;
  readonly handle: HotkeysEvent;
  readonly props: IReactHotkeysProps;
}

const defaultFilter = (event: KeyboardEvent) => {
  const target = (event.target as HTMLElement) || event.srcElement;
  const tagName = target.tagName;
  return !(target.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
};

const ReactHotkeys = React.forwardRef<ReactHotkeysRef, IReactHotkeysProps>((props, ref) => {
  const {
    keyName,
    filter = defaultFilter,
    onKeyUp,
    onKeyDown,
    allowRepeat,
    disabled,
    splitKey,
    children,
  } = props;

  const isKeyDownRef = useRef(false);
  const handleRef = useRef({} as HotkeysEvent);

  const onKeyUpHandler = useCallback((e: KeyboardEvent, handle: HotkeysEvent) => {
    if (!disabled && onKeyUp) {
      onKeyUp(handle.shortcut, e, handle);
    }
  }, [disabled, onKeyUp]);

  const onKeyDownHandler = useCallback((e: KeyboardEvent, handle: HotkeysEvent) => {
    if (isKeyDownRef.current && !allowRepeat) return;
    isKeyDownRef.current = true;
    handleRef.current = handle;
    if (!disabled && onKeyDown) {
      onKeyDown(handle.shortcut, e, handle);
    }
  }, [allowRepeat, disabled, onKeyDown]);

  const handleKeyUpEvent = useCallback((e: KeyboardEvent) => {
    if (!isKeyDownRef.current) return;
    isKeyDownRef.current = false;
    const handle = handleRef.current;
    if (keyName && keyName.indexOf(handle.shortcut) < 0) return;
    onKeyUpHandler(e, handle);
    handleRef.current = {} as HotkeysEvent;
  }, [keyName, onKeyUpHandler]);

  useImperativeHandle(ref, () => ({
    get isKeyDown() {
      return isKeyDownRef.current;
    },
    get handle() {
      return handleRef.current;
    },
    get props() {
      return props;
    },
  }), [props]);

  useEffect(() => {
    Hotkeys.filter = filter;
    if (keyName) {
      Hotkeys.unbind(keyName);
      Hotkeys(keyName, { splitKey }, onKeyDownHandler);
    }
    if (typeof document !== 'undefined') {
      document.body.addEventListener('keyup', handleKeyUpEvent);
    }

    return () => {
      if (keyName) {
        Hotkeys.unbind(keyName);
      }
      isKeyDownRef.current = true;
      handleRef.current = {} as HotkeysEvent;
      if (typeof document !== 'undefined') {
        document.body.removeEventListener('keyup', handleKeyUpEvent);
      }
    };
  }, [filter, handleKeyUpEvent, keyName, onKeyDownHandler, splitKey]);

  return <>{children}</>;
});

ReactHotkeys.displayName = 'ReactHotkeys';

export default ReactHotkeys;
