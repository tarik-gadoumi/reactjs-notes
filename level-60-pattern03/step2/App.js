//! Flexible Compound Components
//*We used context Provider instaed of React.Children.map... React.clone...
//*so we can share the state btw (toggleOn/oFF/"Div")
//*tout ce changement à cause du "Div" pcq child.type = div
//*et la condition ternaire vas nous retourner child et non
//*React.cloneElement(child,{on,toggle})

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
