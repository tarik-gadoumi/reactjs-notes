import React from 'react';

function UsernameForm({ onSubmitDiyalLform }) {
  const Tracker = React.useRef();
  const [msg, setMsg] = React.useState();

  function handleSubmit(event) {
    event.preventDefault();
    const { value } = Tracker.current;
    onSubmitDiyalLform(value);
  }
  function watcherFn(event) {
    const { value } = Tracker.current;
    const isLowerCase = value === value.toLowerCase();
    setMsg(isLowerCase ? null : 'Letters must be in Lower Case');
  }

  return (
    <div
      style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        // The onsubmit attribute fires when a form is submitted.
        onSubmit={handleSubmit}
      >
        <label>what's your name</label>
        {/* The onchange attribute fires the moment when the value of the element is changed.*/}
        <input onChange={watcherFn} ref={Tracker} name="foo"></input>
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
        <button disabled={Boolean(msg)}>Cliki me !</button>
      </form>
    </div>
  );
}

function App() {
  const affichageAlerte = (name) => alert(`Hello dear ${name}`);
  return <UsernameForm onSubmitDiyalLform={affichageAlerte} />;
}
export default App;
