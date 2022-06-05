import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';
/**
 * * il s'avère que lorsque je fetch un pokemon puis  je unmount l'appli direct ,react me renvoie une erreur
 * !Warning: Can't perform a React state update on an unmounted component.
 * !This is a no-op, but it indicates a memory leak in your app ...
 * * cette erreur est très très importante a connaitre pcq malgré le fait que notre appli soit unmount des calculent sont
 * * inutile sont faites dans le background et cela peux etre très dangereux pcq dans l'exemple d'un fetch  c chiant mais pas autant que dans cette video
 * * https://www.youtube.com/watch?v=8BNdxFzMeVg&t=221s
 * * dans comment résoudre ce problème
 * * en implémentant un mock pour notre dispatch
 * ? quelle est l'utilité de ce mock
 * * sont utilité c'est de detecter si le composant qui utilise ce dispatch est mounted ou unmounted
 * * si mounted execute  le dispatch avec tout les arguments dedans
 * * sinon ne fait rien
 */
function useSafeDispatch(dispatch) {
  const isMounted = React.useRef(false);
  React.useLayoutEffect(
    // ou useEffect
    () => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    },
    []
  );
  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch] //todo tant que le dispatch ne change pas retourne moi la même instance de cette fonction (...args) => (mountedRef.current ? dispatch(...args) : void 0)
  );
}
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });
  const { data, error, status } = state;
  const dispatch = useSafeDispatch(unsafeDispatch); //* dispatch contrôlé maintenant  si l'appli est unmounted =>void 0

  const run = React.useCallback((promise) => {
    dispatch({ type: 'pending' });
    promise.then(
      (data) => {
        dispatch({ type: 'resolved', data });
      },
      (error) => {
        dispatch({ type: 'rejected', error });
      }
    );
  }, []);
  const setData = React.useCallback(
    (data) => dispatch({ type: 'resolved', data }),
    [dispatch]
  );
  const setError = React.useCallback(
    (error) => dispatch({ type: 'rejected', error }),
    [dispatch]
  );
  return {
    error,
    status,
    data,
    run,
    setData, // je l'ai copier de utils.js => sera utiliser pour le cache
    setError, // je l'ai copier de utils.js
  };
}

function PokemonInfo({ pokemonName }) {
  const {
    data: pokemon,
    status,
    error,
    run,
  } = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    run(fetchPokemon(pokemonName));
  }, [pokemonName, run]);

  if (status === 'idle') {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }

  throw new Error('This should be impossible');
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={(e) => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
