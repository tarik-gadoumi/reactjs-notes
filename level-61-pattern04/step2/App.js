// this pattern called props collections  /
// let  s do the naive approach
import * as React from 'react';
import { Switch } from '../switch';

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return {
    on,
    toggle,
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle,
    },
  };
}

function App() {
  const { on, togglerProps } = useToggle();
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button
        aria-label="custom-button"
        {...togglerProps}
        onClick={() => {
          console.info('onButtonClick');
          togglerProps.onClick();
        }}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}

export default App;
