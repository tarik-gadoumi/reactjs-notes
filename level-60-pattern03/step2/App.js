// Flexible Compound Components
// sta3mlna  context Provider instaed of React.Children.map .... React.clone...
// bach  n9dr npartagi  state diyal toggle btw (toggleOn/oFF/"Div")
//had l7za9 kolo 3la 9bl  "Div" 7itach child.type=div ma ghdich tkhdm  m3ah
//const newChild = React.cloneElement(child,{on,toggle})
import * as React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext();
function Toggle({ children, props }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider
      value={{ on, toggle }}
      children={children}
      {...props}
    />
  );
}
function useToggle() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error(
      ` useToggle must be used  within  Toogle comoponent :<Toggle />`
    );
  }
  return context;
}

function ToggleOn({ children }) {
  const { on } = useToggle();
  return on ? children : null;
}

function ToggleOff({ children }) {
  const { on } = useToggle();
  return on ? null : children;
}

function ToggleButton({ ...props }) {
  const { on, toggle } = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  );
}

export default App;

/*
eslint
  no-unused-vars: "off",
*/
