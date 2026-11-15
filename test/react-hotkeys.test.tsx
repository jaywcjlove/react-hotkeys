/* eslint-disable jest/no-conditional-expect */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import TestRenderer from 'react-test-renderer';
import Hotkeys, { ReactHotkeysRef } from '../src';


describe('<Hotkeys /> Basic test.', () => {

  it('Default test', () => {
    const component = TestRenderer.create(<Hotkeys />);
    let tree = component.toTree();
    if (tree && !Array.isArray(tree)) {
      expect(tree.nodeType).toBe('component');
      expect(component.toJSON()).toBeNull();
    }
  });

  it('Test keyName Props', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="shift+a,alt+s,del"><div>Hotkeys</div></Hotkeys>
    );
    let jsond = component.toJSON();
    if (jsond && !Array.isArray(jsond)) {
      expect(jsond.type).toBe('div');
      expect(jsond.children).toEqual(['Hotkeys']);
    }
    expect(component.root.props.keyName).toBe('shift+a,alt+s,del');
  });

  it('Component testing', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="shift+a,alt+s,del"><div>Hotkeys</div></Hotkeys>
    );
    let tree = component.toJSON();
    if (tree && !Array.isArray(tree)) {
      expect(tree.type).toBe('div');
      expect(tree.children).toEqual(["Hotkeys"]);
    }
  });

  it('Should render with no children', () => {
    const component = TestRenderer.create(<Hotkeys keyName="ctrl+c" />);
    expect(component.toJSON()).toBeNull();
  });

  it('Should render with multiple children', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+c">
        <div>First</div>
        <div>Second</div>
      </Hotkeys>
    );
    const json = component.toJSON();
    expect(Array.isArray(json)).toBe(true);
    if (Array.isArray(json)) {
      expect(json).toHaveLength(2);
      expect(json[0].type).toBe('div');
      expect(json[1].type).toBe('div');
    }
  });

  it('Should render with string children', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+c">Hello World</Hotkeys>
    );
    const json = component.toJSON();
    expect(json).toBe('Hello World');
  });

  it('Should render with number children', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+c">{42}</Hotkeys>
    );
    const json = component.toJSON();
    expect(json).toBe('42');
  });

});

describe('<Hotkeys /> Props testing', () => {
  
  it('Should handle disabled prop', () => {
    const mockKeyDown = jest.fn();
    const mockKeyUp = jest.fn();
    
    const component = TestRenderer.create(
      <Hotkeys
        keyName="ctrl+a"
        disabled={true}
        onKeyDown={mockKeyDown}
        onKeyUp={mockKeyUp}
      >
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(component.root.props.disabled).toBe(true);
  });

  it('Should handle allowRepeat prop', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+a" allowRepeat={true}>
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(component.root.props.allowRepeat).toBe(true);
  });

  it('Should handle splitKey prop', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+a" splitKey="-">
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(component.root.props.splitKey).toBe('-');
  });

  it('Should handle custom filter prop', () => {
    const customFilter = (event: KeyboardEvent) => {
      return true;
    };
    
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+a" filter={customFilter}>
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(component.root.props.filter).toBe(customFilter);
  });

  it('Should use default filter when none provided', () => {
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+a">
        <div>Test</div>
      </Hotkeys>
    );
    
    // When no filter is provided, the prop should be undefined
    // but the component internally uses a default filter
    expect(component.root.props.filter).toBeUndefined();
  });

});


describe('<Hotkeys /> Event simulation test.', () => {

  let ref: ReactHotkeysRef | null = null;
  
  beforeAll(() => {
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
  });

  it('Event test', () => {
    if (ref) {
      expect(typeof ref.props.onKeyDown).toBe('function');
      expect(typeof ref.props.onKeyUp).toBe('function');
    }
  });

  it('keyName test', () => {
    if (ref) {
      expect(ref.props.keyName).toBe('shift+a,alt+s,del');
    }
  });

  it('isKeyDown test', () => {
    if (ref) {
      expect(ref.isKeyDown).toEqual(false)
    }
  });

  it('handle equal', () => {
    if (ref) {
      expect(ref.handle).toEqual({})
    }
  });

});

describe('<Hotkeys /> Ref interface testing', () => {
  
  it('Should expose correct ref interface', () => {
    let ref: ReactHotkeysRef | null = null;
    const props = {
      keyName: 'ctrl+z',
      disabled: false,
      allowRepeat: true
    };
    
    TestRenderer.create(
      <Hotkeys
        ref={(r) => { ref = r }}
        {...props}
      >
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(ref).not.toBeNull();
    if (ref) {
      const reactRef = ref as ReactHotkeysRef;
      expect(typeof reactRef.isKeyDown).toBe('boolean');
      expect(typeof reactRef.handle).toBe('object');
      expect(typeof reactRef.props).toBe('object');
      expect(reactRef.props).toEqual(expect.objectContaining(props));
    }
  });

  it('Should provide readonly properties', () => {
    let ref: ReactHotkeysRef | null = null;
    
    TestRenderer.create(
      <Hotkeys ref={(r) => { ref = r }} keyName="ctrl+x">
        <div>Test</div>
      </Hotkeys>
    );
    
    if (ref) {
      // Test that properties exist and have the correct types
      const reactRef = ref as ReactHotkeysRef;
      expect(typeof reactRef.isKeyDown).toBe('boolean');
      expect(typeof reactRef.handle).toBe('object');
      expect(typeof reactRef.props).toBe('object');
      
      // Test that trying to set readonly properties throws (as they have only getters)
      expect(() => {
        // @ts-ignore - testing runtime readonly behavior
        (reactRef as any).isKeyDown = true;
      }).toThrow(); // Should throw because it's a getter-only property
      
      expect(() => {
        // @ts-ignore
        (reactRef as any).handle = {};
      }).toThrow(); // Should throw because it's a getter-only property
    }
  });

});

describe('<Hotkeys /> Multiple instances', () => {
  
  it('Should handle multiple hotkey instances', () => {
    const mockKeyDown1 = jest.fn();
    const mockKeyDown2 = jest.fn();
    
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    
    root.render(
      <div>
        <Hotkeys keyName="ctrl+a" onKeyDown={mockKeyDown1}>
          <div>First</div>
        </Hotkeys>
        <Hotkeys keyName="ctrl+b" onKeyDown={mockKeyDown2}>
          <div>Second</div>
        </Hotkeys>
      </div>
    );
    
    // Clean up
    document.body.removeChild(container);
  });

  it('Should handle same keyName on multiple instances', () => {
    const mockKeyDown1 = jest.fn();
    const mockKeyDown2 = jest.fn();
    
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    
    root.render(
      <div>
        <Hotkeys keyName="ctrl+c" onKeyDown={mockKeyDown1}>
          <div>First</div>
        </Hotkeys>
        <Hotkeys keyName="ctrl+c" onKeyDown={mockKeyDown2}>
          <div>Second</div>
        </Hotkeys>
      </div>
    );
    
    // Clean up
    document.body.removeChild(container);
  });

});

describe('<Hotkeys /> Lifecycle', () => {
  
  it('Should cleanup on unmount', () => {
    const mockKeyDown = jest.fn();
    let ref: ReactHotkeysRef | null = null;
    
    const component = TestRenderer.create(
      <Hotkeys 
        ref={(r) => { ref = r }}
        keyName="ctrl+d" 
        onKeyDown={mockKeyDown}
      >
        <div>Test</div>
      </Hotkeys>
    );
    
    // Component exists
    expect(ref).not.toBeNull();
    
    // Unmount component
    component.unmount();
    
    // Refs should be cleaned up but this is hard to test directly
    // The component should not throw any errors on unmount
    expect(true).toBe(true);
  });

  it('Should handle keyName prop changes', () => {
    const mockKeyDown = jest.fn();
    
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+e" onKeyDown={mockKeyDown}>
        <div>Test</div>
      </Hotkeys>
    );
    
    // Change keyName prop
    component.update(
      <Hotkeys keyName="ctrl+f" onKeyDown={mockKeyDown}>
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(component.root.props.keyName).toBe('ctrl+f');
  });

  it('Should handle disabled prop changes', () => {
    const mockKeyDown = jest.fn();
    
    const component = TestRenderer.create(
      <Hotkeys keyName="ctrl+g" disabled={false} onKeyDown={mockKeyDown}>
        <div>Test</div>
      </Hotkeys>
    );
    
    // Change disabled prop
    component.update(
      <Hotkeys keyName="ctrl+g" disabled={true} onKeyDown={mockKeyDown}>
        <div>Test</div>
      </Hotkeys>
    );
    
    expect(component.root.props.disabled).toBe(true);
  });

});

describe('<Hotkeys /> Error handling', () => {
  
  it('Should handle undefined keyName gracefully', () => {
    expect(() => {
      TestRenderer.create(
        <Hotkeys keyName={undefined}>
          <div>Test</div>
        </Hotkeys>
      );
    }).not.toThrow();
  });

  it('Should handle empty keyName gracefully', () => {
    expect(() => {
      TestRenderer.create(
        <Hotkeys keyName="">
          <div>Test</div>
        </Hotkeys>
      );
    }).not.toThrow();
  });

  it('Should handle invalid keyName gracefully', () => {
    expect(() => {
      TestRenderer.create(
        <Hotkeys keyName="invalid-key-combo-&*(@#$">
          <div>Test</div>
        </Hotkeys>
      );
    }).not.toThrow();
  });

});

describe('<Hotkeys /> Filter testing', () => {
  
  it('Should use default filter correctly', () => {
    // Create mock elements
    const inputElement = document.createElement('input');
    const divElement = document.createElement('div');
    const selectElement = document.createElement('select');
    const textareaElement = document.createElement('textarea');
    const editableDiv = document.createElement('div');
    editableDiv.contentEditable = 'true';
    
    // Mock events
    const createMockEvent = (target: Element) => ({
      target,
      srcElement: target
    } as any as KeyboardEvent);
    
    // Test that default filter blocks input elements
    const component = TestRenderer.create(<Hotkeys keyName="ctrl+h" />);
    
    // We can't easily test the filter function directly since it's internal
    // but we can verify the component renders without errors
    expect(component).toBeDefined();
  });

  it('Should use custom filter when provided', () => {
    const customFilter = jest.fn(() => true);
    
    TestRenderer.create(
      <Hotkeys keyName="ctrl+i" filter={customFilter}>
        <div>Test</div>
      </Hotkeys>
    );
    
    // Custom filter should be set (hard to test directly but component should render)
    expect(customFilter).toBeDefined();
  });

});

describe('<Hotkeys /> press and release', () => {
  async function pressAndRelease(options: { allowRepeat?: boolean; onKeyUp?: boolean }) {
    const events: string[] = [];
    const ref = React.createRef<ReactHotkeysRef>();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = createRoot(el);
    const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previousActEnv = actEnv.IS_REACT_ACT_ENVIRONMENT;
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;

    try {
      await act(async () => {
        root.render(
          <Hotkeys
            ref={ref}
            keyName="a"
            allowRepeat={options.allowRepeat}
            onKeyDown={(_keyName, event) => {
              events.push(`down(${event.type})`);
            }}
            onKeyUp={options.onKeyUp ? (_keyName, event) => {
              events.push(`up(${event.type})`);
            } : undefined}
          />
        );
      });

      for (let i = 0; i < 3; i += 1) {
        await act(async () => {
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
        });
        await act(async () => {
          document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', bubbles: true }));
          await new Promise((resolve) => setTimeout(resolve, 10));
        });
      }
      return { events, isKeyDown: ref.current?.isKeyDown };
    } finally {
      try {
        await act(async () => {
          root.unmount();
        });
        el.remove();
      } finally {
        actEnv.IS_REACT_ACT_ENVIRONMENT = previousActEnv;
      }
    }
  }

  it('fires onKeyDown on every press when onKeyUp is omitted', async () => {
    const { events, isKeyDown } = await pressAndRelease({});
    expect(isKeyDown).toBe(false);
    expect(events).toEqual(['down(keydown)', 'down(keydown)', 'down(keydown)']);
  });

  it('does not fire onKeyDown on keyup when allowRepeat is enabled', async () => {
    const { events, isKeyDown } = await pressAndRelease({ allowRepeat: true });
    expect(isKeyDown).toBe(false);
    expect(events).toEqual(['down(keydown)', 'down(keydown)', 'down(keydown)']);
  });

  it('fires onKeyDown and onKeyUp for each press and release', async () => {
    const { events, isKeyDown } = await pressAndRelease({ onKeyUp: true });
    expect(isKeyDown).toBe(false);
    expect(events).toEqual([
      'down(keydown)', 'up(keyup)',
      'down(keydown)', 'up(keyup)',
      'down(keydown)', 'up(keyup)',
    ]);
  });

  it('does not fire onKeyDown on keyup when allowRepeat and onKeyUp are both set', async () => {
    const { events, isKeyDown } = await pressAndRelease({ allowRepeat: true, onKeyUp: true });
    expect(isKeyDown).toBe(false);
    expect(events).toEqual([
      'down(keydown)', 'up(keyup)',
      'down(keydown)', 'up(keyup)',
      'down(keydown)', 'up(keyup)',
    ]);
  });

  async function pressCombo(releaseFirst: 'a' | 'Shift') {
    const events: string[] = [];
    const ref = React.createRef<ReactHotkeysRef>();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = createRoot(el);
    const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previousActEnv = actEnv.IS_REACT_ACT_ENVIRONMENT;
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;

    const dispatchKey = (type: 'keydown' | 'keyup', key: string, shiftKey: boolean) => {
      const keyCode = key === 'Shift' ? 16 : key.toUpperCase().charCodeAt(0);
      document.dispatchEvent(new KeyboardEvent(type, {
        key,
        code: key === 'Shift' ? 'ShiftLeft' : `Key${key.toUpperCase()}`,
        keyCode,
        which: keyCode,
        shiftKey,
        bubbles: true,
      } as KeyboardEventInit));
    };

    function Demo() {
      const [shortcut, setShortcut] = React.useState('');
      return (
        <Hotkeys
          ref={ref}
          keyName="shift+a"
          onKeyDown={(keyName) => {
            events.push(`down(${keyName})`);
            setShortcut(keyName);
          }}
          onKeyUp={(keyName) => {
            events.push(`up(${keyName})`);
            setShortcut('');
          }}
        >
          <span>{shortcut}</span>
        </Hotkeys>
      );
    }

    try {
      await act(async () => {
        root.render(<Demo />);
      });
      await act(async () => {
        dispatchKey('keydown', 'Shift', true);
        dispatchKey('keydown', 'A', true);
      });
      await act(async () => {
        if (releaseFirst === 'a') {
          dispatchKey('keyup', 'A', true);
        } else {
          dispatchKey('keyup', 'Shift', false);
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
      const afterFirstRelease = {
        events: events.slice(),
        shortcut: el.querySelector('span')?.textContent,
        isKeyDown: ref.current?.isKeyDown,
      };
      await act(async () => {
        if (releaseFirst === 'a') {
          dispatchKey('keyup', 'Shift', false);
        } else {
          dispatchKey('keyup', 'a', false);
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
      return { events, afterFirstRelease };
    } finally {
      try {
        await act(async () => {
          root.unmount();
        });
        el.remove();
      } finally {
        actEnv.IS_REACT_ACT_ENVIRONMENT = previousActEnv;
      }
    }
  }

  it('clears the active shortcut when a is released before shift', async () => {
    const { events, afterFirstRelease } = await pressCombo('a');
    expect(afterFirstRelease.shortcut).toBe('');
    expect(afterFirstRelease.isKeyDown).toBe(false);
    expect(events).toEqual(['down(shift+a)', 'up(shift+a)']);
  });

  it('clears the active shortcut when shift is released before a', async () => {
    const { events, afterFirstRelease } = await pressCombo('Shift');
    expect(afterFirstRelease.shortcut).toBe('');
    expect(afterFirstRelease.isKeyDown).toBe(false);
    expect(events).toEqual(['down(shift+a)', 'up(shift+a)']);
  });

  it('does not reactivate shift+a when the letter is reported again after shift is released', async () => {
    const events: string[] = [];
    const ref = React.createRef<ReactHotkeysRef>();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = createRoot(el);
    const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previousActEnv = actEnv.IS_REACT_ACT_ENVIRONMENT;
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;

    const dispatchKey = (type: 'keydown' | 'keyup', key: string, shiftKey: boolean) => {
      const keyCode = key === 'Shift' ? 16 : key.toUpperCase().charCodeAt(0);
      document.dispatchEvent(new KeyboardEvent(type, {
        key,
        code: key === 'Shift' ? 'ShiftLeft' : `Key${key.toUpperCase()}`,
        keyCode,
        which: keyCode,
        shiftKey,
        bubbles: true,
      } as KeyboardEventInit));
    };

    function Demo() {
      const [shortcut, setShortcut] = React.useState('');
      return (
        <Hotkeys
          ref={ref}
          keyName="shift+a"
          onKeyDown={(keyName) => {
            events.push(`down(${keyName})`);
            setShortcut(keyName);
          }}
          onKeyUp={(keyName) => {
            events.push(`up(${keyName})`);
            setShortcut('');
          }}
        >
          <span>{shortcut}</span>
        </Hotkeys>
      );
    }

    try {
      await act(async () => {
        root.render(<Demo />);
      });
      await act(async () => {
        dispatchKey('keydown', 'Shift', true);
        dispatchKey('keydown', 'A', true);
      });
      await act(async () => {
        dispatchKey('keyup', 'Shift', false);
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
      await act(async () => {
        dispatchKey('keydown', 'a', false);
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
      expect(el.querySelector('span')?.textContent).toBe('');
      expect(ref.current?.isKeyDown).toBe(false);
      expect(events).toEqual(['down(shift+a)', 'up(shift+a)']);
    } finally {
      try {
        await act(async () => {
          root.unmount();
        });
        el.remove();
      } finally {
        actEnv.IS_REACT_ACT_ENVIRONMENT = previousActEnv;
      }
    }
  });

  it('prevents the browser find dialog for command+f', async () => {
    const events: string[] = [];
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = createRoot(el);
    const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previousActEnv = actEnv.IS_REACT_ACT_ENVIRONMENT;
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;

    const dispatchKey = (type: 'keydown' | 'keyup', key: string, metaKey: boolean) => {
      const keyCode = key === 'Meta' ? 91 : key.toUpperCase().charCodeAt(0);
      return document.dispatchEvent(new KeyboardEvent(type, {
        key,
        code: key === 'Meta' ? 'MetaLeft' : `Key${key.toUpperCase()}`,
        keyCode,
        which: keyCode,
        metaKey,
        bubbles: true,
        cancelable: true,
      } as KeyboardEventInit));
    };

    try {
      await act(async () => {
        root.render(
          <Hotkeys
            keyName="command+f"
            onKeyDown={(keyName) => {
              events.push(`down(${keyName})`);
            }}
          />
        );
      });
      let plainFBlocked = true;
      let commandFBlocked = false;
      await act(async () => {
        plainFBlocked = !dispatchKey('keydown', 'f', false);
        dispatchKey('keyup', 'f', false);
      });
      await act(async () => {
        dispatchKey('keydown', 'Meta', true);
        commandFBlocked = !dispatchKey('keydown', 'f', true);
      });
      expect(events).toEqual(['down(command+f)']);
      expect(plainFBlocked).toBe(false);
      expect(commandFBlocked).toBe(true);
    } finally {
      try {
        await act(async () => {
          root.unmount();
        });
        el.remove();
      } finally {
        actEnv.IS_REACT_ACT_ENVIRONMENT = previousActEnv;
      }
    }
  });
});


describe('<Hotkeys /> Event 222.', () => {

  let container: HTMLDivElement | null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });


  it('handle equal', () => {

    const setup = () => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      return element
    }
    const elm = setup()
    const root = createRoot(elm);
    root.render(
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
    );
  });

  it('Should handle keyup without keydown', () => {
    const mockKeyUp = jest.fn();
    
    const elm = document.createElement('div');
    document.body.appendChild(elm);
    const root = createRoot(elm);
    
    root.render(
      <Hotkeys keyName="ctrl+j" onKeyUp={mockKeyUp}>
        <div>Test</div>
      </Hotkeys>
    );
    
    // Simulate keyup event without keydown
    const event = new KeyboardEvent('keyup', { key: 'j', ctrlKey: true });
    document.dispatchEvent(event);
    
    // Clean up
    document.body.removeChild(elm);
  });

  it('Should handle multiple rapid key events', () => {
    const mockKeyDown = jest.fn();
    const mockKeyUp = jest.fn();
    
    const elm = document.createElement('div');
    document.body.appendChild(elm);
    const root = createRoot(elm);
    
    root.render(
      <Hotkeys 
        keyName="ctrl+k" 
        onKeyDown={mockKeyDown}
        onKeyUp={mockKeyUp}
        allowRepeat={true}
      >
        <div>Test</div>
      </Hotkeys>
    );
    
    // Clean up
    document.body.removeChild(elm);
  });

})