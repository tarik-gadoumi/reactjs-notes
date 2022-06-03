/**
 * * concepte ultra mega giga stylé
 * * ErrosBoundary catch  errors in its children
 * * it can be weird runtime errors that causes white screen of dead
 * * it can be errors from our backend
 * * ErrorBoundary est le seule composant qu'on
 * * ne peux pas l'écrire en functional based component
 * * https://learn.react-js.dev/advanced-concepts/error-boundaries
 */
import * as React from 'react';
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from './pokemon';
import './styles.css';
class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error }; // we return an object of the state that we wan t this error boundary to have itself or for any of its children
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <this.props.FallbackComponent error={error} />;
    }

    return this.props.children;
  }
}

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
    // this will be handled by an error boundary
    /**
     * !ici avant c'était comme ça avant   
     *  return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    );
     * ! vue que c'est error boundary qui se charge maintenant de afficher l'erreur ici
     * ! [ regarde ErrorBoundary prend comme children PokemonInfo ]
     * ! je n'affiche plus rien je throw l'erreur puis elle sera capturé par ErrorBoundary,
     * ! 
     */
    throw error;
  } else if (status === 'resolved') {
    /**
     * ! runtimes errors qui ce produisent et qui entraîne le white screen of dead
     * ! peuvent nous arriver souvent
     * todo : simulation du white screen of dead
     * * injecte null comme valeur a la props pokemon
     * *<PokemonDataView pokemon={null} />
     * todo on aura une simulation du white screen of dead lors de la recherche d'un pokemon
     */
    return <PokemonDataView pokemon={pokemon} />; //replace with null then type on the form valid pokemon name puis un pokemon inexistant
    //to see that we handle  error , nous allons voir que les erreurs autre que le serveur renvoie sont gérer aussi  comme les erreur que affiche
    //le Browser
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
          {/* //key={pokemonName} here help us to reset the error  boundary to avoid the persistance  of the error in my  Class ErrorBoundary video71 */}
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
