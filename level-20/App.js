// React.useRef and React.useContext => return Value
// React.useState and React.useReducer = > return pair of Value
// React.useEffect =>  return  nothing but perfom side effects
// State can be defined as: data that changes over time.
// unmounted (removed from the application)

import * as React from 'react';
function Greetings() {
  const [name, setName] = React.useState('');
  function handleChange(event) {
    const { value } = event.target;
    setName(value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name"> Type Something : </label>
        <input id="name" autoComplete="off" onChange={handleChange}></input>
      </form>

      {name ? <strong>Hello Mr {name}</strong> : 'please type something'}
    </div>
  );
}
function App() {
  return <Greetings />;
}
export default App;
