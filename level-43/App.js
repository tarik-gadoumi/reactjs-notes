import * as React from 'react';

function countReducer(state, action) {
  return action(state);
}
function Counter({ initialCount = 0, step = 1 }) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });

  const increment = () =>
    setState((currentState) => ({ count: currentState.count + step })); //c'est beau *_*
  return <button onClick={increment}>{state.count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
