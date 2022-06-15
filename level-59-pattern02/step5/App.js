//let s make shared state valaible  for  only 3 private compound components
import * as React from 'react';
import { Switch } from '../switch';

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  return React.Children.map(children, (child, i) => {
    if (privateCompo.includes(child.type)) {
      const newChild = React.cloneElement(child, { on, toggle });
      return newChild;
    }
    return child;
  });
}
function MytoggleDisplay({ on }) {
  return on ? 'yooo' : 'blaaaaa';
}

const ToggleOn = ({ on, children }) => (on ? children : null);

const ToggleOff = ({ on, children }) => (on ? null : children);

const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;
const privateCompo = [ToggleOn, ToggleOff, ToggleButton];

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span> hello</span>
        <ToggleButton />
        <MytoggleDisplay />
      </Toggle>
    </div>
  );
}

export default App;

/*
 eslint
   no-unused-vars: "off",
 */
