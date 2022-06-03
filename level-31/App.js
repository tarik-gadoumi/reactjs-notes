import * as React from 'react';
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from './pokemon';

function PokemonInfo({ pokemonName }) {
  const [pokemon, updatePokemon] = React.useState(null);
  const error = {
    message: `Jeune padawan you have an Error`,
  };
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    updatePokemon(null);
    fetchPokemon(pokemonName).then((pokemon) => {
      updatePokemon(pokemon);
    });
  }, [pokemonName]);
  if (!pokemonName) {
    return 'Submit a Pokemon';
  } else if (pokemonName && !pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (error) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    );
  } else {
    return <PokemonDataView pokemon={pokemon} />;
    //3ndak fachi 7tit {pokemonName} blast {pokemon} error 7itach data type li khassani hna hiya "OBJECT" machi "STRING"
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
