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

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
          {/*
           * à chaque fois on change le pokemonName l'ErrorBoundary va completement ce UNMOUNT (s'enlever de l'écran)
           * qui par la suite va UNMOUNT tout ces enfants (PokemonInfo ici)
           * puis ça va mount une nouvelle instance de ErrorBoundary et ces enfants (PokemonInfo)
           * c'est comme ça la prop key marche
           * tout ca ça va provoquer un behavior indisérable au niveau de l'expérience utilisateur
           * pour simuler ce behavior switch entre pikachu/charizard/mew tu vas t'appercevoir  que lors
           * d'une fraction de ms 'Submit a pokemon' avant d'afficher le prochain pokemon
           * ceci est causé par l'unmounting/re-mounting de l'ErrorBoundary
           * c.à.d :
           *        mounting de l'ErrorBoundary puis de PokemonInfo
           *        PokemonInfo initial Status to idle donc return 'Submit a pokemon'
           *        après le rendering déclanchement du useEffect fetch/update status etc ...
           */}
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
