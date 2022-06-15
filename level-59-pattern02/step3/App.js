import * as React from 'react';
import { Switch } from '../switch';

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  return React.Children.map(children, (child, i) => {
    if (typeof child.type === 'string') {
      return child;
    }
    const newChild = React.cloneElement(child, { on, toggle });
    return newChild;
  });
}

const ToggleOn = ({ on, children }) => (on ? children : null);

const ToggleOff = ({ on, children }) => (on ? null : children);

const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;

/*
 eslint
   no-unused-vars: "off",
 */
