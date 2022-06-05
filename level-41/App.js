/**
 * * là on va découvrire qu'on peux passer n'importe quelle valeur a notre setState
 * * [par la suite ceci prendra la label de dispatch]
 * * je veux dire par n'importe comme valeur : function, object, array, bool, string etc...
 */

//let's change things to have this API
// const [count, changeCount] = React.useReducer(countReducer, initialCount)
// const increment = () => changeCount(step)
import * as React from 'react';
function countReducer(state, action) {
  //the 1 st  arg  here is called "state" - the current value of  count
  //the 2 nd  arg  here is called "action"- the value passed  to  setCount
  return state + action;
}
function Counter({ initialCount = 0, step = 1 }) {
  const [count, changeCount] = React.useReducer(countReducer, initialCount);

  const increment = () => changeCount(step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
