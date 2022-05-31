/* Stage 1
In React, there actually aren’t a ton of things you have to learn to 
interact with forms beyond what you can do with regular DOM APIs and 
JavaScript. Which I think is pretty awesome.
*/
import * as React from 'react';
function UsernameForm({ onSubmitUsername }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmitUsername(event.target.elements[0].value);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          width: '200px',
        }}
        onSubmit={handleSubmit}
      >
        <label>Write Your name</label>
        <input></input>
        {/*
         ou donne a l'input un *id* ou *name* puis
         on pourra récuperer la valeur inserer dans l'input via 
         event.target.elements.(id/name).value 
        */}
        <button>Click Me !</button>
      </form>
    </div>
  );
}
function App() {
  const affichageAlerte = (name) => {
    return alert(`hello Dear ${name}`);
  };
  return <UsernameForm onSubmitUsername={affichageAlerte} />;
}
export default App;
