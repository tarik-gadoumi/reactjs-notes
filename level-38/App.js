import * as React from 'react';
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from './pokemon';
import { ErrorBoundary } from 'react-error-boundary';
import './styles.css';

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    /**
     * * on peut résoudre le problème comme ça mais le problème
     * * status: pokemonName ? 'pending' : 'idle',
     * * du unmounting/remounting persiste
     */
    status: 'idle',
    pokemon: null,
    error: null,
  });
  const { status, pokemon, error } = state;

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({ status: 'pending' });
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        /**
         * todo: je revien du lvl 46 pour écrire une remarque
         * * ces setState provoque à la fois perte de la key error ici
         * * a la fois perte de la key pokemon lors d'une erreur
         * * a la fois perte des deux clef lors du setState({ status: 'pending' }) ligne 28
         * * cette problèmatique ne sera plus d'actualité lors de l'utilisation du  useReducer
         * * car au niveau du reducer selon le case on retourne un objet Overwrited
         */
        setState({ status: 'resolved', pokemon });
      },
      (error) => {
        setState({ status: 'rejected', error });
      }
    );
  }, [pokemonName]);

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

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
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
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
          /**
           * !resetKeys trigerring a re-render of the children so we keep the feature that allow use
           * !to when an error occure we can swith to other pokemon  without trigerring the Try again button
           */
        >
          {
            //* on ce débarasse de la key pour ne plus unmount/remount a chaque changement du pokemonName
            //* on met en place une prop onReset  pour que lordque je declanche resetErrorBoundary dans l'ErrorFallback
            //* et bien onReset ce lance automatiquement
          }
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
