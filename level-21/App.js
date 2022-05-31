import * as React from 'react';
function Greetings({ initialName, setName }) {
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

      {initialName ? (
        <strong>Hello Mr {initialName}</strong>
      ) : (
        'please type something'
      )}
    </div>
  );
}
/**
 * ! a ne surtout pas faire
 * * ici j'ai gérer l'état du component Greetings à l'intérieur
 * * du component App
 * Todo : donc la bonne pratique c'est ce que j'ai fait au level-20
 */
function App() {
  const [name, setName] = React.useState('Koala');
  return <Greetings initialName={name} setName={setName} />;
}
export default App;
