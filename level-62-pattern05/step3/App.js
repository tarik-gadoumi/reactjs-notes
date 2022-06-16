import * as React from 'react';
import { Switch } from '../switch';
function callAllfunction(...fns) {
  return (...args) => {
    return fns.forEach((fn) => fn && fn(...args));
  };
}
const actionType = {
  toggle: 'toggle',
  reset: 'reset',
};
function toggleReducer(state, action) {
  switch (action.type) {
    case actionType.toggle:
      return { on: !state.on };
    case actionType.reset:
      return action.initialState;
    default:
      throw new Error(`unhandled action Type ${action.type}`);
  }
}
function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  // const toggle =()=> setOn(!on)
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { on } = state;
  const toggle = () => dispatch({ type: actionType.toggle });
  const reset = () => dispatch({ type: actionType.reset, initialState });
  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      'aria-pressed': on,
      onClick: callAllfunction(onClick, toggle),
      ...props,
    };
  }
  function getResetterProps({ onClick, ...props }) {
    return {
      onClick: callAllfunction(onClick, reset),
      ...props,
    };
  }
  return {
    on,
    toggle,
    propsSetter: {
      onClick: toggle,
      on: on,
    },
    getTogglerProps,
    getResetterProps,
  };
}

function App() {
  const [counter, setCounter] = React.useState(0);
  const isMoreThan4 = counter >= 4;
  // cette technique est  utiliser pour nous eviter de  recoder la funciton toggle Reducer de 0
  // ce qu'on  fait ici  c est d'ajouter  les nouvelles proprietées que nous souhaitons appliquer
  //puis nous nous retournons la PRE-BUILT-IN fonction togglerReducer
  function NewToggleReducer(state, action) {
    if (action.type === actionType.toggle && isMoreThan4) {
      return { on: state.on };
    }
    return toggleReducer(state, action);
  }

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer: NewToggleReducer,
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          on,
          onClick: () => {
            console.log(`counter value: ${counter}`);
            setCounter((c) => c + 1);
          },
        })}
      />
      <div>
        {isMoreThan4
          ? `Watch out you Clicked ${counter} times`
          : !counter
          ? null
          : `Click N° ${counter}`}
      </div>
      <button
        {...getResetterProps({
          onClick: () => {
            console.log('every thing is clean');
            setCounter((c) => c === 0);
          },
        })}
      >
        Reset
      </button>
    </div>
  );
}
export default App;
