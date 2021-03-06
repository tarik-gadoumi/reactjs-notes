import * as React from 'react';
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from './pokemon';
import './styles.css';
/**
 * ! ici on montre la gestion d'erreur comment elle peut se faire
 * ! au niveau du .then il accept un deuxieme arg qui fait réf a l'erreur retournée de notre back
 * ! mais ça que ce code pour l'instant est bugé car lors du seError(error)
 * ! et bah on ne remet plus error a null donc l'erreur sera tjrs la et on ne pourra
 * ! pas ce débarasser du message d'erreur (ligne 32) dans le prochain level on  va débuger ça
 */
function PokemonInfo({ pokemonName }) {
  const [pokemon, updatePokemon] = React.useState(null);
  // const error = {
  //   message: `Jeune padawan you have an Error`
  // };
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    updatePokemon(null);
    fetchPokemon(pokemonName).then(
      (pokemon) => updatePokemon(pokemon),
      (error) => setError(error)
    );
  }, [pokemonName]);
  if (error) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    );
  }
  if (!pokemonName) {
    return 'Submit a Pokemon';
  } else if (pokemonName && !pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else {
    return <PokemonDataView pokemon={pokemon} />;
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
