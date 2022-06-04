/**
 * * When it's just an independent element of state you're managing: useState
 * * When one element of your state relies on the value of another element of your state in order to update: useReducer
 */
import * as React from 'react';

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = React.useState(initialCount);

  const increment = () => setCount(count + step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
