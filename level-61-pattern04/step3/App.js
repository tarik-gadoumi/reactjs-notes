// now the props getter  approach (the best one)
// Prop Collections and Getters

import * as React from 'react';
import { Switch } from '../switch';
import { props } from 'bluebird';

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  function getTogglerProps({ onClick, ...props }) {
    return {
      'aria-pressed': on,
      onClick: () => {
        onclick && onClick();
        toggle();
      },
      ...props,
    };
  }
  return { on, getTogglerProps };
}

function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onBtnclick'),
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}

export default App;

/*
eslint
  no-unused-vars: "off",
*/
