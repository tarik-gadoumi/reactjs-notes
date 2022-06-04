/**
 * * ici au lieu de créer notre propre ErrorBoundary j'importe le module existant sur npm
 * * il implémente bcp plus d'options
 */
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
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          {
            //* on ce débarasse de la key pour ne plus unmount/remount a chaque changement du pokemonName
          }
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
