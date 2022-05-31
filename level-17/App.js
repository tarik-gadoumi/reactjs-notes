/*
React.useState accepts a default initial value and returns an array. 
Typically you’ll destructure that array to get the state and a state 
updater function.
----------------------------
*****if we want from our Component to Be Dynamic  we need a state 
Storage ( state can be UI changes,values etc...)
*****A Change Handler on the input in our case on the
Tracker.current.value
*/
import React from 'react';

function UsernameForm({ onSubmitDiyalLform }) {
  const [msg, setMsg] = React.useState();

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitDiyalLform(event.target.elements.foo.value);
  }
  function watcherFn(event) {
    // const minuscule = event.target.value ;
    // const masjuscule = event.target.value.toLowerCase() ;
    /*setMsg(minuscule===masjuscule ? null : ' Letters must be in Lower Case')*/

    const { value } = event.target;
    const isLowerCase = value === value.toLowerCase();
    setMsg(isLowerCase ? null : 'Letters must be in Lower Case');
  }

  return (
    <div
      style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <label>quel est ton nom ?</label>
        <input onChange={watcherFn} name="foo"></input>
        <div
          style={{
            fontWeight: 'bold',
            color: 'black',
            background:
              'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
          }}
        >
          {msg}
        </div>
        <button>Cliki me !</button>
      </form>
    </div>
  );
}

function App() {
  const affichageAlerte = (name) => alert(` Welcome to you dear  ${name}`);
  return <UsernameForm onSubmitDiyalLform={affichageAlerte} />;
}
export default App;
