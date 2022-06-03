// useEffect: HTTP requests
// sans oublier que j'ai créer un folder dont le chemin est public/img/pokemon dans le quel j'ai mis l'image fallback (codeSandbox)
import * as React from 'react';
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from './pokemon';
import './styles.css';
function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    /**
     * * resetting pokemon to null
     * * parceque lorsque je click sur pika/chari ou mew
     * * on fetch un pokemon
     *  */
    setPokemon(null);
    fetchPokemon(pokemonName).then((pokemon) => setPokemon(pokemon));
  }, [pokemonName]);

  if (!pokemonName) {
    return 'Submit a pokemon';
  } else if (!pokemon) {
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
  /**
   * ! le handleSubmit du Form provoque le remontée de l'information de l'enfant au parent
   * ? pourquoi on fait ça ?
   * * et bien une fois l'info récupérée elle sera retransmise aux deux enfant Form et Info
   * * A) dans Form elle sera labélisé externalPokemonName (pour éviter variable shadowing)
   *      * puis servira le useState
   * * B) dans Info elle servira à :
   *      * fetch (dans le useEffect)
   *      * a check si !pokemonName affiche 'Submit a pokemon'
   *      * a check si pokemonName exist mais !pokemon donc affiche le PokemonInfoFallback
   *      * a check si  pokemonName et pokemon exists donc affiche le PokemonDataView
   */
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
