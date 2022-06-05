import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from './pokemon';
import './styles.css';
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
function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });
  React.useEffect(() => {
    const promise = asyncCallback();
    if (!promise) {
      return;
    }
    dispatch({ type: 'pending' });
    promise.then(
      (dataD) => {
        dispatch({ type: 'resolved', data: dataD });
      },
      (errorD) => {
        dispatch({ type: 'rejected', error: errorD });
      }
    );
  }, [asyncCallback]);

  return state;
}
function PokemonInfo({ pokemonName }) {
  // ! tu veux comprendre pourquoi useCallback résous le problème de l'infinit loop lorsqu'on la place dans dependency Array du useEffect ?
  // ! celà est lié au fait qu'on a besoin de memoizer la fonction asyncCallback et non la valeur quelle retourn !
  // ! sans memoization  a chauqe rendu useEffect considère asyncCallack une nouvelle fonction
  // ! explication très simple a comprendre sur https://epicreact.dev/memoization-and-react/

  const asyncCallback = React.useCallback(() => {
    if (!pokemonName) {
      return;
    }
    return fetchPokemon(pokemonName);
  }, [pokemonName]);

  const state = useAsync(asyncCallback, {
    status: pokemonName ? 'pending' : 'idle',
  });

  const { data: pokemon, status, error } = state;

  if (status === 'idle' || !pokemonName) {
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
export default App;
