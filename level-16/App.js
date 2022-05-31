/**
 * * maintenant nous allons utiliser notre premier hook
 * ! useRef
 * dans cet exo ref fait référence à l'input
 * je veux dire par là que ref peut etre attacher a n'importe quel html tag
 * est faire référence a lui par la suite
 * on pourra acceder au methods de cet html tag attaché a la ref via la clé current retournée par
 * useRef
 * https://fr.reactjs.org/docs/hooks-reference.html#useref
 */
import * as React from 'react';
function UsernameForm({ onSubmitUsername }) {
  const Tracker = React.useRef();
  function handleSubmit(event) {
    event.preventDefault();
    onSubmitUsername(Tracker.current.value);
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
        <input ref={Tracker} name="boo"></input>
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
