// Lifting state
// 💯 colocating state
/**
 * ! ici on a utiliser un combo de lifting state et de colocating state !
 * ! Pourquoi ?
 * * c'est logic regarde : le nouveau Composant Display n'a plus besoin de Name
 * * donc si name change il ne doit pas causé re-rendering de <Display/> mais que  <Name/>
 * * parcontre si animal change <Display/> et <FavoriteAnimal/> vont re-render
 * */

import * as React from 'react';

function Name() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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

function Display({ animal }) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

function App() {
  const [animal, setAnimal] = React.useState('');
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event) => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  );
}

export default App;
