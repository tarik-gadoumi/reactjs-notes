// useDebugValue: useMedia
/**
 * * useDebugValue n'est utiliser que dans un custom hook
 * * elle nous aide a visualiser dans le devTool la valeur que prend Media (dans le devtool)
 */
import * as React from 'react';

const formatDebugValue = ({ state, query }) => `\`${query}\` => ${state}`;
function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState);
  //the formatted label I use: `\`${query}\` => ${state}`
  React.useDebugValue({ state, query }, formatDebugValue);
  // put \`${query}\` => ${state}` inside React.useDebugValue() will be faster in our case
  // but the reason  why  we transform to the way it looks like
  // bcause when  users don t need to do calculation inside React.useDebugValue()
  // passion object of props +  function that do the calculation are controlled
  // so we can cancel the execution for users or make any type of changes
  // and  manipulation  we  want
  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);

    function onChange() {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    }

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)');
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)');
  const isSmall = useMedia('(max-width: 699px)');
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null;

  return <div style={{ width: 200, height: 200, backgroundColor: color }} />;
}

function App() {
  return <Box />;
}

export default App;
