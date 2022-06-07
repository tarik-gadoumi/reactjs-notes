/**
 * ! ici nous allons créer un customHook
 * *l'utilité de ce hook est de detecter si notre Consumer est bien englober par le provider ou le bon provider
 */
import * as React from 'react';
const CountContext = React.createContext();
function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error(`useCount must be within the CountProvider`);
  }
  return context;
}
function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
}

function CountDisplay() {
  const [count] = useCount();

  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useCount();
  const increment = () => setCount((count) => count + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
