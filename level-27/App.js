// Lifting state
/**
 * ! c'est à dire que le state des enfants remontre dans le parent
 * * Name + FavoriteAnimal --remonte vers--> App
 * * parceque le composant Display dans le parent a besoin de leur state
 * * si je touche a name  re-render se produit dans <Name/> et <Display/>
 * * si je touche a anime re-render se produit dans <FavoriteAnimal/> et <Display/>
 */
import * as React from 'react';

function Name({ name, onNameChange }) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  );
}

function FavoriteAnimal({ animal, onAnimalChange }) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  );
}

function Display({ name, animal }) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>;
}

function App() {
  const [animal, setAnimal] = React.useState('');
  const [name, setName] = React.useState('');
  return (
    <form>
      <Name name={name} onNameChange={(event) => setName(event.target.value)} />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event) => setAnimal(event.target.value)}
      />
      <Display name={name} animal={animal} />
    </form>
  );
}

export default App;
