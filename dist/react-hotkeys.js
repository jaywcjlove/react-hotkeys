/*!
 * react-hotkeys v2.7.2
 * React component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts.
 * Copyright (c) 2023 kenny wang <wowohoo@qq.com>
 * Licensed under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-hot-keys"] = factory(require("react"));
	else
		root["react-hot-keys"] = factory(root["React"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__787__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 787:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__787__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ReactHotkeys)
});

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(787);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);
;// CONCATENATED MODULE: ./node_modules/hotkeys-js/dist/hotkeys.esm.js
/**! 
 * hotkeys-js v3.13.2 
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies. 
 * 
 * Copyright (c) 2023 kenny wong <wowohoo@qq.com> 
 * https://github.com/jaywcjlove/hotkeys-js.git 
 * 
 * @website: https://jaywcjlove.github.io/hotkeys-js
 
 * Licensed under the MIT license 
 */

const isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false;

// 绑定事件
function addEvent(object, event, method, useCapture) {
  if (object.addEventListener) {
    object.addEventListener(event, method, useCapture);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), () => {
      method(window.event);
    });
  }
}

// 修饰键转换成对应的键码
function getMods(modifier, key) {
  const mods = key.slice(0, key.length - 1);
  for (let i = 0; i < mods.length; i++) mods[i] = modifier[mods[i].toLowerCase()];
  return mods;
}

// 处理传的key字符串转换成数组
function getKeys(key) {
  if (typeof key !== 'string') key = '';
  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等
  const keys = key.split(','); // 同时设置多个快捷键，以','分割
  let index = keys.lastIndexOf('');

  // 快捷键可能包含','，需特殊处理
  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }
  return keys;
}

// 比较修饰键的数组
function compareArray(a1, a2) {
  const arr1 = a1.length >= a2.length ? a1 : a2;
  const arr2 = a1.length >= a2.length ? a2 : a1;
  let isIndex = true;
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
  }
  return isIndex;
}

// Special Keys
const _keyMap = {
  backspace: 8,
  '⌫': 8,
  tab: 9,
  clear: 12,
  enter: 13,
  '↩': 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff ? 173 : 189,
  '=': isff ? 61 : 187,
  ';': isff ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
};

// Modifier Keys
const _modifier = {
  // shiftKey
  '⇧': 16,
  shift: 16,
  // altKey
  '⌥': 18,
  alt: 18,
  option: 18,
  // ctrlKey
  '⌃': 17,
  ctrl: 17,
  control: 17,
  // metaKey
  '⌘': 91,
  cmd: 91,
  command: 91
};
const modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey',
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
const _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
const _handlers = {};

// F1~F12 special key
for (let k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}

let _downKeys = []; // 记录摁下的绑定键
let winListendFocus = false; // window是否已经监听了focus事件
let _scope = 'all'; // 默认热键范围
const elementHasBindEvent = []; // 已绑定事件的节点记录

// 返回键码
const code = x => _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
const getKey = x => Object.keys(_keyMap).find(k => _keyMap[k] === x);
const getModifier = x => Object.keys(_modifier).find(k => _modifier[k] === x);

// 设置获取当前范围（默认为'所有'）
function setScope(scope) {
  _scope = scope || 'all';
}
// 获取当前范围
function getScope() {
  return _scope || 'all';
}
// 获取摁下绑定键的键值
function getPressedKeyCodes() {
  return _downKeys.slice(0);
}
function getPressedKeyString() {
  return _downKeys.map(c => getKey(c) || getModifier(c) || String.fromCharCode(c));
}
function getAllKeyCodes() {
  const result = [];
  Object.keys(_handlers).forEach(k => {
    _handlers[k].forEach(_ref => {
      let {
        key,
        scope,
        mods,
        shortcut
      } = _ref;
      result.push({
        scope,
        shortcut,
        mods,
        keys: key.split('+').map(v => code(v))
      });
    });
  });
  return result;
}

// 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true
function filter(event) {
  const target = event.target || event.srcElement;
  const {
    tagName
  } = target;
  let flag = true;
  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>
  if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
    flag = false;
  }
  return flag;
}

// 判断摁下的键是否为某个键，返回true或者false
function isPressed(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // 转换成键码
  }
  return _downKeys.indexOf(keyCode) !== -1;
}

// 循环删除handlers中的所有 scope(范围)
function deleteScope(scope, newScope) {
  let handlers;
  let i;

  // 没有指定scope，获取scope
  if (!scope) scope = getScope();
  for (const key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  }

  // 如果scope被删除，将scope重置为all
  if (getScope() === scope) setScope(newScope || 'all');
}

// 清除修饰键
function clearModifier(event) {
  let key = event.keyCode || event.which || event.charCode;
  const i = _downKeys.indexOf(key);

  // 从列表中清除按压过的键
  if (i >= 0) {
    _downKeys.splice(i, 1);
  }
  // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题
  if (event.key && event.key.toLowerCase() === 'meta') {
    _downKeys.splice(0, _downKeys.length);
  }

  // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除
  if (key === 93 || key === 224) key = 91;
  if (key in _mods) {
    _mods[key] = false;

    // 将修饰键重置为false
    for (const k in _modifier) if (_modifier[k] === key) hotkeys[k] = false;
  }
}
function unbind(keysInfo) {
  // unbind(), unbind all keys
  if (typeof keysInfo === 'undefined') {
    Object.keys(_handlers).forEach(key => delete _handlers[key]);
  } else if (Array.isArray(keysInfo)) {
    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach(info => {
      if (info.key) eachUnbind(info);
    });
  } else if (typeof keysInfo === 'object') {
    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === 'string') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    // support old method
    // eslint-disable-line
    let [scope, method] = args;
    if (typeof scope === 'function') {
      method = scope;
      scope = '';
    }
    eachUnbind({
      key: keysInfo,
      scope,
      method,
      splitKey: '+'
    });
  }
}

// 解除绑定某个范围的快捷键
const eachUnbind = _ref2 => {
  let {
    key,
    scope,
    method,
    splitKey = '+'
  } = _ref2;
  const multipleKeys = getKeys(key);
  multipleKeys.forEach(originKey => {
    const unbindKeys = originKey.split(splitKey);
    const len = unbindKeys.length;
    const lastKey = unbindKeys[len - 1];
    const keyCode = lastKey === '*' ? '*' : code(lastKey);
    if (!_handlers[keyCode]) return;
    // 判断是否传入范围，没有就获取范围
    if (!scope) scope = getScope();
    const mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].filter(record => {
      // 通过函数判断，是否解除绑定，函数相等直接返回
      const isMatchingMethod = method ? record.method === method : true;
      return !(isMatchingMethod && record.scope === scope && compareArray(record.mods, mods));
    });
  });
};

// 对监听对应快捷键的回调函数进行处理
function eventHandler(event, handler, scope, element) {
  if (handler.element !== element) {
    return;
  }
  let modifiersMatch;

  // 看它是否在当前范围
  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;
    for (const y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    }

    // 调用处理程序，如果是修饰键不做处理
    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
      handler.keys = [];
      handler.keys = handler.keys.concat(_downKeys);
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
}

// 处理keydown事件
function dispatch(event, element) {
  const asterisk = _handlers['*'];
  let key = event.keyCode || event.which || event.charCode;

  // 表单控件过滤 默认表单控件不触发快捷键
  if (!hotkeys.filter.call(this, event)) return;

  // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右 command 键值不一样
  if (key === 93 || key === 224) key = 91;

  /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */
  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  /**
   * Jest test cases are required.
   * ===============================
   */
  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(keyName => {
    const keyNum = modifierMap[keyName];
    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {
      /**
       * Fix if Command is pressed:
       * ===============================
       */
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  /**
   * -------------------------------
   */

  if (key in _mods) {
    _mods[key] = true;

    // 将特殊字符的key注册到 hotkeys 上
    for (const k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = true;
    }
    if (!asterisk) return;
  }

  // 将 modifierMap 里面的修饰键绑定到 event 中
  for (const e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */
  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }
    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }
    _mods[17] = true;
    _mods[18] = true;
  }

  // 获取范围 默认为 `all`
  const scope = getScope();
  // 对任何快捷键都需要做的处理
  if (asterisk) {
    for (let i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope, element);
      }
    }
  }
  // key 不在 _handlers 中返回
  if (!(key in _handlers)) return;
  for (let i = 0; i < _handlers[key].length; i++) {
    if (event.type === 'keydown' && _handlers[key][i].keydown || event.type === 'keyup' && _handlers[key][i].keyup) {
      if (_handlers[key][i].key) {
        const record = _handlers[key][i];
        const {
          splitKey
        } = record;
        const keyShortcut = record.key.split(splitKey);
        const _downKeysCurrent = []; // 记录当前按键键值
        for (let a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code(keyShortcut[a]));
        }
        if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
          // 找到处理内容
          eventHandler(event, record, scope, element);
        }
      }
    }
  }
}

// 判断 element 是否已经绑定事件
function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}
function hotkeys(key, option, method) {
  _downKeys = [];
  const keys = getKeys(key); // 需要处理的快捷键列表
  let mods = [];
  let scope = 'all'; // scope默认为all，所有范围都有效
  let element = document; // 快捷键事件绑定节点
  let i = 0;
  let keyup = false;
  let keydown = true;
  let splitKey = '+';
  let capture = false;
  let single = false; // 单个callback

  // 对为设定范围的判断
  if (method === undefined && typeof option === 'function') {
    method = option;
  }
  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line
    if (option.element) element = option.element; // eslint-disable-line
    if (option.keyup) keyup = option.keyup; // eslint-disable-line
    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line
    if (option.capture !== undefined) capture = option.capture; // eslint-disable-line
    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
    if (option.single === true) single = true; // eslint-disable-line
  }
  if (typeof option === 'string') scope = option;

  // 如果只允许单个callback，先unbind
  if (single) unbind(key, scope);

  // 对于每个快捷键进行处理
  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey); // 按键列表
    mods = [];

    // 如果是组合快捷键取得组合快捷键
    if (key.length > 1) mods = getMods(_modifier, key);

    // 将非修饰键转化为键码
    key = key[key.length - 1];
    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键

    // 判断key是否在_handlers中，不在就赋一个空数组
    if (!(key in _handlers)) _handlers[key] = [];
    _handlers[key].push({
      keyup,
      keydown,
      scope,
      mods,
      shortcut: keys[i],
      method,
      key: keys[i],
      splitKey,
      element
    });
  }
  // 在全局document上设置快捷键
  if (typeof element !== 'undefined' && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, 'keydown', e => {
      dispatch(e, element);
    }, capture);
    if (!winListendFocus) {
      winListendFocus = true;
      addEvent(window, 'focus', () => {
        _downKeys = [];
      }, capture);
    }
    addEvent(element, 'keyup', e => {
      dispatch(e, element);
      clearModifier(e);
    }, capture);
  }
}
function trigger(shortcut) {
  let scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
  Object.keys(_handlers).forEach(key => {
    const dataList = _handlers[key].filter(item => item.scope === scope && item.shortcut === shortcut);
    dataList.forEach(data => {
      if (data && data.method) {
        data.method();
      }
    });
  });
}
const _api = {
  getPressedKeyString,
  setScope,
  getScope,
  deleteScope,
  getPressedKeyCodes,
  getAllKeyCodes,
  isPressed,
  filter,
  trigger,
  unbind,
  keyMap: _keyMap,
  modifier: _modifier,
  modifierMap
};
for (const a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}
if (typeof window !== 'undefined') {
  const _hotkeys = window.hotkeys;
  hotkeys.noConflict = deep => {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }
    return hotkeys;
  };
  window.hotkeys = hotkeys;
}



;// CONCATENATED MODULE: ./src/index.tsx
class ReactHotkeys extends (external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component{constructor(props){super(props);this.isKeyDown=false;this.handle=void 0;this.onKeyDown=this.onKeyDown.bind(this);this.onKeyUp=this.onKeyUp.bind(this);this.handleKeyUpEvent=this.handleKeyUpEvent.bind(this);this.handle={};}componentDidMount(){const{filter,splitKey}=this.props;if(filter){hotkeys.filter=filter;}hotkeys.unbind(this.props.keyName);hotkeys(this.props.keyName,{splitKey},this.onKeyDown);document&&document.body.addEventListener('keyup',this.handleKeyUpEvent);}componentWillUnmount(){hotkeys.unbind(this.props.keyName);this.isKeyDown=true;this.handle={};document&&document.body.removeEventListener('keyup',this.handleKeyUpEvent);}onKeyUp(e,handle){const{onKeyUp,disabled}=this.props;!disabled&&onKeyUp&&onKeyUp(handle.shortcut,e,handle);}onKeyDown(e,handle){const{onKeyDown,allowRepeat,disabled}=this.props;if(this.isKeyDown&&!allowRepeat)return;this.isKeyDown=true;this.handle=handle;!disabled&&onKeyDown&&onKeyDown(handle.shortcut,e,handle);}handleKeyUpEvent(e){if(!this.isKeyDown)return;this.isKeyDown=false;if(this.props.keyName&&this.props.keyName.indexOf(this.handle.shortcut)<0)return;this.onKeyUp(e,this.handle);this.handle={};}render(){return this.props.children||null;}}ReactHotkeys.defaultProps={filter(event){const target=event.target||event.srcElement;var tagName=target.tagName;return!(target.isContentEditable||tagName==='INPUT'||tagName==='SELECT'||tagName==='TEXTAREA');}};
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});