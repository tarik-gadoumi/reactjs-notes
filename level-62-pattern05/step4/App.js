import * as React from 'react';
import { Switch } from '../switch';
const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));
const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
};
function ToggleReducer(state, { type, init }) {
  switch (type) {
    case 'toggle': {
      return { on: !state.on };
    }
    case 'reset': {
      return init;
    }
    default: {
      throw new Error(`Unhandled Action Type ${type}`);
    }
  }
}

function useToggle({ reducer = ToggleReducer }) {
  const { current: init } = React.useRef({ on: false });
  const [state, dispatch] = React.useReducer(reducer, init);
  // const [on,setOn]= React.useState(false) ;
  const { on } = state;
  const toggle = () => dispatch({ type: actionTypes.toggle });
  const reset = () => dispatch({ type: actionTypes.reset, init });

  function propsGetter({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }
  function propsResetter({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }
  return { on, toggle, reset, propsGetter, propsResetter };
}

function App() {
  const [counter, setCounter] = React.useState(0);
  const isMoreThan5 = counter > 5;
  const isMoreThan4 = counter > 4;
  const { on, propsGetter, propsResetter } = useToggle({
    reducer: NewToggleReducer,
  });
  console.log(`on :${on} --  -- counter :${counter}`);
  function NewToggleReducer(state, { type, init }) {
    if (type === actionTypes.toggle && isMoreThan5) {
      return { on: state.on };
    }
    return ToggleReducer(state, { type, init });
  }

  return (
    <div>
      <div>
        <Switch
          {...propsGetter({
            onClick: () => {
              setCounter((c) => c + 1);
            },
            on,
          })}
        />
        <Switch
          {...propsGetter({
            onClick: () => {
              setCounter((c) => c + 1);
            },
            on,
          })}
        />
      </div>
      {isMoreThan4
        ? `You clicked Too Much : ${counter} times`
        : counter > 0
        ? `Counter : ${counter}`
        : `Counter : 0 `}
      <br />
      <button
        {...propsResetter({
          onClick: () => {
            setCounter(0);
          },
        })}
      >
        Reset
      </button>
    </div>
  );
}
export default App;
