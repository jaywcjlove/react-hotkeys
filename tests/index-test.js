import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

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



const setup = () => {
  const element = document.createElement('div')
  document.body.appendChild(element)
  return element
}

const cleanup = (element) => {
  ReactDOM.unmountComponentAtNode(element)
  document.body.removeChild(element)
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: '',
    }
  }
  onKeyUp(keyName, e, handle) {
    // console.log("test:onKeyUp", e, handle)
    this.setState({
      output: `onKeyUp ${keyName}`,
    });
  }
  onKeyDown(keyName, e, handle) {
    // console.log("test:onKeyDown", keyName, e, handle)
    this.setState({
      output: keyName,
    });
  }
  render() {
    return (
      <Example
        keyName="shift+a,alt+s"
        onKeyDown={this.onKeyDown.bind(this)}
        onKeyUp={this.onKeyUp.bind(this)}
      >
        <div style={{ padding: "20px" }} dangerouslySetInnerHTML={{ __html: this.state.output }} />
      </Example>
    )
  }
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
  ReactDOM.render(
    <div>
      <Example
        ref={(r) => { ref = r }}
        keyName="shift+a,alt+s,del"
        onKeyDown={() => { }}
        onKeyUp={() => { }}
      >
        <div style={{ padding: "20px" }} />
      </Example>
    </div>, el
  )

  it('onKeyUp exists', () => {
    expect(ref.onKeyUp).toBeA('function')
  })

  it('onKeyDown exists', () => {
    expect(ref.onKeyDown).toBeA('function')
  })

  it('keyName exists', () => {
    expect(ref.props.keyName).toBeA('string')
  })

  it('isKeyDown', () => {
    expect(ref.isKeyDown).toEqual(false)
  })

  it('handle equal', () => {
    expect(ref.handle).toEqual({})
  })

})
