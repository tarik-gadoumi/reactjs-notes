/**
 * * là c'est magique
 * * on va coder notre reducer de façons à accepter les fonctions et les objets
 */
import * as React from 'react';
function countReducer(state, action) {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  };
}
function Counter({ initialCount = 0, step = 1 }) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () =>
    setState((currentState) => ({ count: currentState.count + step }));
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
