import * as React from 'react';
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from './pokemon';
/**
 * * maintenant pourquoi pas afficher les composants en se basant sur un status
 * * ça facilite le résonnement et aussi on aura plus a setError(null) comme on avait fait
 * * au paravant
 */
function PokemonInfo({ pokemonName }) {
  const [status, updateStatus] = React.useState('idle');
  const [pokemon, updatePokemon] = React.useState(null);
  const [error, updateError] = React.useState(null);
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    updateStatus('pending');
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        updatePokemon(pokemon);
        updateStatus('resolved');
        /**
         * ! l'ordre ici est très important
         * ? pourquoi ?
         * * supposant updateStatus('resolved') s'execute en premier
         * * et bah ça va déclancher else if (status === 'resolved') {
         * *   return <PokemonDataView pokemon={pokemon} />;
         * *}
         * ? et alors il est où le problème ?
         * * t srx ... ?
         * * bah on a pas encore eu le temps de fetch l'objet pokemon qui va remplire <PokemonDataView/>
         * * qu'on va le return donc on va se retrouver avec <PokemonDataView pokemon={ici ça sera NULL} />;
         */
      },
      (error) => {
        updateError(error);
        updateStatus('rejected');
        /**
         * ! même raisonnement par rapport a l'ordre ici
         */
      }
    );
  }, [pokemonName]);
  if (status === 'idle') {
    return 'Submit a Pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    );
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  } else {
    throw new Error(`this should be impossible`);
  }
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
