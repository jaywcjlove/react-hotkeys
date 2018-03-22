import expect from 'expect'
import React, { Component} from 'react'
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom'

import Example from 'src/'


// 模拟键盘摁键
// http://output.jsbin.com/awenaq/3
function __triggerKeyboardEvent(el, keyCode, opt) {
  var eventObj = document.createEventObject ?
    document.createEventObject() : document.createEvent("Events");

  if (eventObj.initEvent) {
    eventObj.initEvent("keydown", true, true);
  }
  eventObj.keyCode = keyCode;
  eventObj.which = keyCode;

  if (opt) {
    for (var a in opt) {
      eventObj[a] = opt[a];
    }
  }
  el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);
}

function __triggerKeyboardUp(el, keyCode, opt) {
  var eventObj = document.createEventObject ?
    document.createEventObject() : document.createEvent("Events");
  if (eventObj.initEvent) {
    eventObj.initEvent("keyup", true, true);
  }
  if (keyCode) {
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
  }
  if (opt) {
    for (var a in opt) {
      eventObj[a] = opt[a];
    }
  }
  el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeyup", eventObj);
}


const setup = () => {
  const element = document.createElement('div')
  document.body.appendChild(element)
  return element
}

const cleanup = (element) => {
  ReactDOM.unmountComponentAtNode(element)
  document.body.removeChild(element)
}

let node
beforeEach(() => {
  node = document.createElement('div')
})

afterEach(() => {
  unmountComponentAtNode(node)
})

describe('Component', () => {

  it('displays a welcome message', () => {
    render(<Example />, node, () => {
      expect(node.innerHTML).toContain('')
    })
  })

  it('Component Exist', () => {
    expect(<Example />).toExist();
  })
  // cleanup(el)

})


describe('Component testing', () => {

  const el = setup()
  let ref = null
  let _onKeyDown = null

  before(function () {
    ReactDOM.render(
      <div>
        <Example
          ref={(r) => { ref = r }}
          keyName="shift+a,alt+s,del"
          onKeyDown={() => {
            console.log("test")
          }}
          onKeyUp={() => {
            console.log("test")
          }}
        >
          <div style={{ padding: "20px" }} />
        </Example>
      </div>, el
    )
  });

  it('onKeyUp exists', () => {
    expect(ref.onKeyUp).toBeA('function')
  })

  it('onKeyDown exists', () => {
    expect(ref.onKeyDown).toBeA('function')
  })

  it('keyName exists', () => {
    expect(ref.props.keyName).toBe('shift+a,alt+s,del')
    expect(ref.props.keyName).toBeA('string')
  })

  it('isKeyDown', () => {
    expect(ref.isKeyDown).toEqual(false)
  })

  it('handle equal', () => {
    expect(ref.handle).toEqual({})
  })


  it('onKeyDown Event test case', () => {
    ReactDOM.render(
      <Example
        keyName="shift+a"
        onKeyDown={(shortcut, e, handle) => {
          expect(shortcut).toBe('shift+a');
          expect(handle.key).toBe('shift+a');
          expect(handle.shortcut).toBe('shift+a');
          expect(handle.scope).toBe('all');
          expect(handle.mods[0]).toBe(16);
        }}
        onKeyUp={(shortcut, e, handle) => {
          expect(shortcut).toBe('shift+a');
          expect(handle.key).toBe('shift+a');
          expect(handle.shortcut).toBe('shift+a');
          expect(handle.scope).toBe('all');
          expect(handle.mods[0]).toBe(16);
        }}
      >
        <div style={{ padding: "20px" }} />
      </Example>
      , el
    )
    __triggerKeyboardEvent(document.body, 65, {
      shiftKey: true
    });
    __triggerKeyboardUp(document.body, 65, {
      shiftKey: true
    });
  })
})
