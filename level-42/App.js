//!Dans cette étape les objects rentre en jeux comme initialCount au lieu de s'imple numbers
import * as React from 'react';

function countReducer(state, action) {
  //!the 1 st  arg  here is called "state" - the current value of  count // here state == {count: initialCount,}
  //!the 2 nd  arg  here is called "action"- the value passed  to  setCount // here action == {count: count + step}
  /**
   * * ne surout pas retourner que action .
   * * pourquoi ?
   * * et bien action (comme mentionné dans la ligne 6) c'est la valeur qu'on passe a setState
   * * dans notre cas :
   *                   *action => { count :  0 + 1}
   *                   *state => { count : 0}
   * * retourner action c est  retourner  { count :  0 + 1}
   * ? encore une fois pourquoi NE PAS RETOURNER que action ???
   * * et et bien si mon state est un object composé de plusieurs key/value
   * * le faite de retourner que action qui elle contient que la key count est une erreur monumental
   * * parcequ'on perd notre object initial
   * * c'est pour cela que rentre en jeux la technique de { ...initialObject,...newKeyValuesToOverwrite}
   */

  return { ...state, ...action };
}
function Counter({ initialCount = 0, step = 1 }) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });

  const { count } = state; //* il faut s'adapter a cette écriture !!!! pour éviter state.count a la place de count
  //* [ regarde ---ligne boo et ---ligne baa pour comprendre de quel count je  parle]

  const increment = () => setState({ count: count + step }); //* state.count a la place de count  ---ligne boo
  return <button onClick={increment}>{count}</button>; //* state.count a la place de count     ---ligne baa
}

function App() {
  return <Counter />;
}

export default App;
