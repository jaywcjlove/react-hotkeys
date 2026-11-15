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

const modifierAliases: Record<string, string[]> = {
  shift: ['shift', '⇧'],
  '⇧': ['shift', '⇧'],
  alt: ['alt', 'option', '⌥'],
  option: ['alt', 'option', '⌥'],
  '⌥': ['alt', 'option', '⌥'],
  ctrl: ['control', 'ctrl', '⌃'],
  control: ['control', 'ctrl', '⌃'],
  '⌃': ['control', 'ctrl', '⌃'],
  meta: ['meta', 'os', 'cmd', 'command', '⌘'],
  cmd: ['meta', 'os', 'cmd', 'command', '⌘'],
  command: ['meta', 'os', 'cmd', 'command', '⌘'],
  '⌘': ['meta', 'os', 'cmd', 'command', '⌘'],
};

const modifierEventFlag = (part: string): 'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey' | undefined => {
  switch (part.toLowerCase()) {
    case 'shift':
    case '⇧':
      return 'shiftKey';
    case 'alt':
    case 'option':
    case '⌥':
      return 'altKey';
    case 'ctrl':
    case 'control':
    case '⌃':
      return 'ctrlKey';
    case 'meta':
    case 'os':
    case 'cmd':
    case 'command':
    case '⌘':
      return 'metaKey';
    default:
      return undefined;
  }
};

// 这一次 keyup 松开的键，即使 hotkeys-js 还把它记在按下列表里，也算已经松开。
const eventReleasesPart = (event: KeyboardEvent, part: string) => {
  const eventKey = (event.key || '').toLowerCase();
  if (eventKey === part.toLowerCase()) return true;
  const aliases = modifierAliases[part] || modifierAliases[part.toLowerCase()];
  return !!aliases && aliases.includes(eventKey);
};

const isShortcutHeld = (shortcut: string, splitKey: string | undefined, event: KeyboardEvent) => {
  const delimiter = splitKey || '+';
  return shortcut.split(delimiter).every((part) => {
    if (eventReleasesPart(event, part)) return false;
    return Hotkeys.isPressed(part);
  });
};

// macOS 松开 Shift 后会再发一次字母 keydown。修饰键以这次事件上的状态为准，避免快捷键被重新点亮。
const shortcutModifiersHeld = (shortcut: string, splitKey: string | undefined, event: KeyboardEvent) => {
  const delimiter = splitKey || '+';
  return shortcut.split(delimiter).every((part) => {
    const flag = modifierEventFlag(part);
    return !flag || event[flag] === true;
  });
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
  // 回调每次 render 都可能是新函数。放进 ref，避免重新绑定 hotkeys 时把按下状态清掉。
  const latestRef = useRef({ onKeyDown, onKeyUp, disabled, allowRepeat, splitKey });
  latestRef.current = { onKeyDown, onKeyUp, disabled, allowRepeat, splitKey };

  // 处理 keydown 事件
  const handleKeyDown = useCallback((keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
    const { onKeyDown: keyDown, disabled: isDisabled, allowRepeat: repeat, splitKey: delimiter } = latestRef.current;
    if (isDisabled || keyboardEvent.type === 'keyup') return;
    if (!shortcutModifiersHeld(hotkeysEvent.shortcut, delimiter, keyboardEvent)) return;

    const shortcut = hotkeysEvent.shortcut;
    const isAlreadyPressed = activeKeysRef.current.has(shortcut);

    // 命中快捷键就拦住浏览器默认行为，例如 command+f 打开查找。
    keyboardEvent.preventDefault();

    // 如果不允许重复且已经按下，则跳过
    if (isAlreadyPressed && !repeat) return false;

    // 记录当前按下的快捷键
    activeKeysRef.current.add(shortcut);
    currentHandleRef.current = hotkeysEvent;

    // 触发 onKeyDown 回调
    if (keyDown) {
      keyDown(shortcut, keyboardEvent, hotkeysEvent);
    }
    // hotkeys-js 在回调返回 false 时也会 preventDefault。
    return false;
  }, []);

  // 处理 keyup 事件 - 使用原生事件监听。省略 onKeyUp 时也要清掉按下状态。
  const handleKeyUp = useCallback((keyboardEvent: KeyboardEvent) => {
    const { onKeyUp: keyUp, disabled: isDisabled, splitKey: delimiter } = latestRef.current;
    const releasedKeys = Array.from(activeKeysRef.current).filter((shortcut) => {
      return !isShortcutHeld(shortcut, delimiter, keyboardEvent);
    });

    // 处理被释放的按键
    releasedKeys.forEach(shortcut => {
      if (activeKeysRef.current.has(shortcut)) {
        activeKeysRef.current.delete(shortcut);

        if (!isDisabled && keyUp) {
          // 构造 HotkeysEvent（基于最后记录的 handle）
          const hotkeysEvent = {
            ...currentHandleRef.current,
            shortcut
          };

          keyUp(shortcut, keyboardEvent, hotkeysEvent);
        }
      }
    });

    // 清空 handle 如果没有按键被按下
    if (activeKeysRef.current.size === 0) {
      currentHandleRef.current = {} as HotkeysEvent;
    }
  }, []);

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
