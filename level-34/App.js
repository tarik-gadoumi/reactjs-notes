//on simplefie le code précedent on faisant appel a l'object dans le quel on va
//definir toutes les proprietée dans leur était initial
//ainsi par la suite useEffect qui est déclancher a chaque re render
//qui lui  est provoqué par le changement du pokemonName  au sein  de Pokemoninfo
/**
 * * j'adore ce pattern !
 * * nous avons dans notre composant 3 état
 * * le status,le pokemon,l'erreur
 * * concernant ces 3 états :
 * * quand (l'un depend de l'autre) ou (deux dependent de un [c'est le cas dans notre exemple{ pokemon--->status<---error}])
 * * cette technique permet aussi d'éviter de préter attention quand ou on place setStatus()
 * * est-ce avant ou après setPokemon et setError (incroyable)
 * * par exemple
 * * pour un status resolved la variable pokemon se remplis setState({ pokemon: pokemonData, status: 'resolved' });
 * * ou bien pour un status rejected la variable error se remplis setState({ error: errorData, status: 'rejected' });
 * * etc...
 * * on peux utiliser ce joli pattern qui consiste a regrouper ses trois étas dans un object
 * * puis par la suite on update le state tel les lignes 40/43/46
 * ! cet exemple est la porte d'entrée vers le useReducer
 */
import * as React from 'react';
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from './pokemon';
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
      (pokemonData) => {
        setState({ pokemon: pokemonData, status: 'resolved' });
      },
      (errorData) => {
        setState({ error: errorData, status: 'rejected' });
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
