import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from './pokemon';
import { useAsync } from './utils';
import './styles.css';
const PokemonCacheContext = React.createContext();
function PokemonCacheProvider(props) {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {});
  const value = [cache, dispatch];
  return <PokemonCacheContext.Provider value={value} {...props} />;
}
function pokemonCacheReducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return { ...state, [action.pokemonName]: action.pokemonData };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PokemonInfo({ pokemonName }) {
  const { data: pokemon, status, error, run, setData } = useAsync();
  const [cache, dispatch] = React.useContext(PokemonCacheContext);
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName]);
    } else {
      run(
        fetchPokemon(pokemonName).then((pokemonData) => {
          dispatch({ type: 'ADD_POKEMON', pokemonName, pokemonData });
          return pokemonData;
        })
      );
    }
  }, [cache, pokemonName, run, setData]);

  if (status === 'idle') {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

function PreviousPokemon({ onSelect }) {
  const [cache] = React.useContext(PokemonCacheContext);

  return (
    <div>
      Previous Pokemon
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.keys(cache).map((pokemonName) => (
          <li key={pokemonName} style={{ margin: '4px auto' }}>
            <button
              style={{ width: '100%' }}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PokemonSection({ onSelect, pokemonName }) {
  return (
    <div style={{ display: 'flex' }}>
      <PreviousPokemon onSelect={onSelect} />
      <div className="pokemon-info" style={{ marginLeft: 10 }}>
        <PokemonErrorBoundary
          onReset={() => onSelect('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null);

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonCacheProvider>
        <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
      </PokemonCacheProvider>
    </div>
  );
}

export default App;
