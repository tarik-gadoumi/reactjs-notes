import * as React from 'react';
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from './pokemon';
import './styles.css';
/**
 * ! beug corrigé en ajoutant un seule ligne :)
 */
function PokemonInfo({ pokemonName }) {
  const [pokemon, updatePokemon] = React.useState(null);
  const [error, setError] = React.useState(null);
  // const error = {
  //   message: `Jeune padawan you have an Error`
  // };
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setError(null);
    /**
     * * pour que à chaque render cause par le changement du pokemonName
     * * l'erreur ce met a null et ne persiste plus
     */
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
