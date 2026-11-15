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

  const activeKeysRef = useRef(new Set<string>());
  const currentHandleRef = useRef({} as HotkeysEvent);

  // 处理 keydown 事件
  const handleKeyDown = useCallback((keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
    if (disabled) return;
    
    const shortcut = hotkeysEvent.shortcut;
    const isAlreadyPressed = activeKeysRef.current.has(shortcut);
    
    // 如果不允许重复且已经按下，则跳过
    if (isAlreadyPressed && !allowRepeat) return;
    
    // 记录当前按下的快捷键
    activeKeysRef.current.add(shortcut);
    currentHandleRef.current = hotkeysEvent;
    
    // 触发 onKeyDown 回调
    if (onKeyDown) {
      onKeyDown(shortcut, keyboardEvent, hotkeysEvent);
    }
  }, [disabled, allowRepeat, onKeyDown]);

  // 处理 keyup 事件 - 使用原生事件监听。省略 onKeyUp 时也要清掉按下状态。
  const handleKeyUp = useCallback((keyboardEvent: KeyboardEvent) => {
    // 检查是否有我们关心的按键被释放
    const currentPressed = Hotkeys.getPressedKeyString();
    const releasedKeys = Array.from(activeKeysRef.current).filter(key => {
      // 如果当前按键字符串中不包含这个快捷键，说明它被释放了
      return !currentPressed.includes(key);
    });
    
    // 处理被释放的按键
    releasedKeys.forEach(shortcut => {
      if (activeKeysRef.current.has(shortcut)) {
        activeKeysRef.current.delete(shortcut);

        if (!disabled && onKeyUp) {
          // 构造 HotkeysEvent（基于最后记录的 handle）
          const hotkeysEvent = {
            ...currentHandleRef.current,
            shortcut
          };

          onKeyUp(shortcut, keyboardEvent, hotkeysEvent);
        }
      }
    });
    
    // 清空 handle 如果没有按键被按下
    if (activeKeysRef.current.size === 0) {
      currentHandleRef.current = {} as HotkeysEvent;
    }
  }, [disabled, onKeyUp]);

  useImperativeHandle(ref, () => ({
    get isKeyDown() {
      return activeKeysRef.current.size > 0;
    },
    get handle() {
      return currentHandleRef.current;
    },
    get props() {
      return props;
    },
  }), [props]);

  useEffect(() => {
    // 设置过滤器
    if (filter) {
      Hotkeys.filter = filter;
    }
    
    // 只绑定 keydown。keyup 交给下面的 document 监听，避免 allowRepeat 时 onKeyDown 在松开时再触发。
    if (keyName) {
      Hotkeys.unbind(keyName);
      Hotkeys(keyName, { splitKey, keydown: true, keyup: false }, handleKeyDown);
    }
    
    return () => {
      if (keyName) {
        Hotkeys.unbind(keyName);
      }
      activeKeysRef.current.clear();
      currentHandleRef.current = {} as HotkeysEvent;
    };
  }, [keyName, splitKey, filter, handleKeyDown]);

  // 始终监听 keyup，这样省略 onKeyUp 时也能把 isKeyDown 复位。
  useEffect(() => {
    const handleGlobalKeyUp = (e: KeyboardEvent) => {
      // 使用 setTimeout 确保 hotkeys-js 内部状态已更新
      setTimeout(() => handleKeyUp(e), 0);
    };
    
    if (typeof document !== 'undefined') {
      document.addEventListener('keyup', handleGlobalKeyUp);
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keyup', handleGlobalKeyUp);
      }
    };
  }, [handleKeyUp]);

  return <>{children}</>;
});

ReactHotkeys.displayName = 'ReactHotkeys';

export default ReactHotkeys;
