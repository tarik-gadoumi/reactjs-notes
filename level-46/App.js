import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from './pokemon';
import './styles.css';
//* 🐨 this is going to be our generic asyncReducer
function pokemonInfoReducer(state, action) {
  //? ici status,data,error sont une abstraction
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', pokemon: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', pokemon: action.pokemon, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', pokemon: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PokemonInfo({ pokemonName }) {
  const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    dispatch({ type: 'pending' });
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        dispatch({ type: 'resolved', pokemon });
      },
      (error) => {
        dispatch({ type: 'rejected', error });
      }
    );
  }, [pokemonName]);

  const { pokemon, status, error } = state;

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
