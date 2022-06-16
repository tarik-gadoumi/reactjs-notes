// State Reducer Pattern
import * as React from 'react';
import { Switch } from '../switch';
function CallAllFunctions(...fns) {
  return (...args) => {
    fns.forEach((fn) => fn && fn(...args));
  };
}
function useToggle() {
  const [on, setOn] = React.useState(false);

  const toggle = () => setOn(!on);

  function getTogglerProps({ onClick, ...props }) {
    return {
      'aria-pressed': on,
      onClick: CallAllFunctions(onClick, toggle),
      ...props,
    };
  }

  return { on, getTogglerProps };
}

function App() {
  const { on, getTogglerProps } = useToggle();
  console.log(getTogglerProps({ on }));
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        aria-label="custom-button"
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onBtnclick'),
          onMouseOver: () => {
            console.info('boooo');
          },
        })}
        children={on ? 'on' : 'off'}
      />
    </div>
  );
}

export default App;
