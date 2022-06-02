/**
 * ! creation de notre premier custom Hook
 * * la logic qui met en place :
 * * une key/value dans le localStorage puis l'affiche si elle existe :
 * * (useState+lazy state initialisation+side Effect quand key/value change(useEffect))
 * * tout ça peut etre englober dans une fonction qu'on appel dans react un custom Hook
 * * l'utilité de cette approche est :
 * * dans mes projet il se peut que j'ai des comportement qui necessite la même logic
 * * donc pour ne pas ce répéter et ré-écrire la même logic dans les scripts qui la nécessite
 * * on crée nos custom hook qu'on stock quelque part puis on les importent depuis cet emplacement
 */
import * as React from 'react';
function useLocalStorageState(key, defaultValue = '') {
  const [value, setValue] = React.useState(() => {
    return window.localStorage.getItem(key) || defaultValue;
  });

  React.useEffect(() => {
    console.log('called after  every render an re render of the compo');
    window.localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue];
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('Nom =>', initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
