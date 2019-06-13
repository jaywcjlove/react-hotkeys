import React from 'react';
import ReactDOM from 'react-dom'
// import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import TestRenderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import Hotkeys from '../src';


describe('<Hotkeys /> Basic test.', () => {

  it('Default test', () => {
    const component = TestRenderer.create(<Hotkeys />);
    let tree = component.toTree();
    expect(tree.nodeType).toBe('component');
    expect(typeof (tree.props.filter)).toBe('function');
    expect(Object.keys(tree.type.propTypes)).toEqual(['keyName', 'filter', 'onKeyDown', 'onKeyUp']);
    expect(component.toJSON()).toBeNull();
  });

  it('Test keyName Props', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="shift+a,alt+s,del"><div>Hotkeys</div></Hotkeys>
    );
    let jsond = component.toJSON();
    expect(jsond.type).toBe('div');
    expect(jsond.children).toEqual(['Hotkeys']);
    const tree = component.toTree();
    expect(tree.props.keyName).toBe('shift+a,alt+s,del');
  });

  it('Component testing', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="shift+a,alt+s,del"><div>Hotkeys</div></Hotkeys>
    );
    let tree = component.toJSON();
    expect(tree.type).toBe('div');
    expect(tree.children).toEqual(["Hotkeys"]);
  });

});


describe('<Hotkeys /> Event simulation test.', () => {

  let ref = null;
  TestRenderer.create(
    <Hotkeys
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
    </Hotkeys>
  );

  it('Event test', () => {
    expect(typeof ref.props.onKeyDown).toBe('function');
    expect(typeof ref.props.onKeyUp).toBe('function');
  });

  it('keyName test', () => {
    expect(ref.props.keyName).toBe('shift+a,alt+s,del');
  });

  it('isKeyDown test', () => {
    expect(ref.isKeyDown).toEqual(false)
  });

  it('handle equal', () => {
    expect(ref.handle).toEqual({})
  });

})


describe('<Hotkeys /> Event 222.', () => {

  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });


  it('handle equal', () => {

    const setup = () => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      return element
    }
    const elm = setup()

    ReactDOM.render(
      <Hotkeys
        keyName="shift+a"
        onKeyDown={(shortcut, e, handle) => {
          console.log('shortcut', shortcut)
          expect(shortcut).toBe('shift+a');
          expect(handle.key).toBe('shift+a');
          expect(handle.shortcut).toBe('shift+a');
          expect(handle.scope).toBe('all');
          expect(handle.mods[0]).toBe(16);
        }}
        onKeyUp={(shortcut, e, handle) => {
          console.log('shortcut222', shortcut)
          expect(shortcut).toBe('shift+a');
          expect(handle.key).toBe('shift+a');
          expect(handle.shortcut).toBe('shift+a');
          expect(handle.scope).toBe('all');
          expect(handle.mods[0]).toBe(16);
        }}
      >
        <div style={{ padding: "20px" }} />
      </Hotkeys>
      ,elm
    );
  });

})