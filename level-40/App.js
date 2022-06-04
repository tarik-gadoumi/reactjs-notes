/**
 * * le useReducer ce compose de 2 paramètre
 * * le reducer et la valeur initial
 * * il nous retourne une valeur puis ça fonction update
 * * c'est quoi le reducer ?
 * * c'est une fonction qui prend deux paramètres le state et l'action
 * * state = current value  / action = what we pass to setState
 */
import * as React from 'react';
function countReducer(state, action) {
  //the 1 st  arg  here is called "state" - the current value of  count
  //the 2 nd  arg  here is called "action"- the value passed  to  setCount
  return action;
}
function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = React.useReducer(countReducer, initialCount);

  const increment = () => setCount(count + step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
