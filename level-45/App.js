/**
 * * maintenant nous allons faire ce que la plupart des gens font
 * * appareament cette implementation du reducer est grâce à redux
 */

import * as React from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.step };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
}
function Counter({ initialCount = 0, step = 1 }) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () => dispatch({ type: 'INCREMENT', step });
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
