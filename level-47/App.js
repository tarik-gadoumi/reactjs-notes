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
function asyncReducer(state, action) {
  //* bcause it's a generic thing we need to generecize all the genereic thing : example {changing pokemon-to->data}
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
function useAsync(asyncCallback, initialState, dependencies) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null, //?generecizing {changing from pokemon-to->data}
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  //* waaaw déliiire [asyncCallback] va provoquer ici une infinit request from the server
  //* App rendering -> useEffect-> fetch -> dispatch -> re-rendering -> useEffect-> fetch -> dispatch -> re-rendering
  //? pourquoi donc ?
  //? à cause de fetch ?
  //? parceque dans javascript [] !== [] & {} !== {} etc ... ?
  //! en faite je me suis trompé ce qu'on compare ici ce n'est pas ce que ma fonction retourne
  //! mais plutôt la fonction elle même [c'est dans useMemo qu'on compare ce que la fonction retourne]
  //! Sans le useCallback :
  //************sache que le useEffect va la considérer dans sont dependecy array comme nouvelle fonction a chaque re rendring
  //************ parceque selon le referential equality dans js fn !== fn sauf si on les égalise par réference
  /**
   * Exemple
   * const a = () => 'hey'
   * const b = () => 'hey'
   * a == b (FALSE)
   * const c = (fn) => fn
   * a == c(a) (TRUE)
   */

  //! Avec le useCallback :
  //* la fn est tjr la même SAUF si les paramètres dans le array change
  return state;
}
function PokemonInfo({ pokemonName }) {
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return;
      }
      return fetchPokemon(pokemonName);
    },
    { status: pokemonName ? 'pending' : 'idle' },
    [pokemonName]
  );

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
