import * as React from 'react';

function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  /**
   * ! for persiting data event after browser Refresh or Key changes
   * * très important aussi prevKeyRef.current retournera toujours la même valeur affectée comme initialValue !!!!  Sauf !
   * * sauf si on la change nous même de façon explicite grêce a ce que j'ai fait dans la ligne 37
   * * ce mechanisme nous permet d'accéder à l'ancienne valeur
   *  */
  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName);
  function handleClick() {
    if (key === 'name') {
      setKey('firstName');
    } else if (key === 'firstName') {
      setKey('Name');
    } else {
      setKey('name');
    }
  }
  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Change key!
      </button>
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
