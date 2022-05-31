/**
 * * une problèmatique ce présente au level-22 qui peut affecter les performances
 * * de notre application voici les détails  :
 * * a chaque fois je écris dans mon input on a un re-rendering qui s'applique
 * * (hé oui a chaque lettre je crée re-rendering)
 * * le problème c'est que mon hooks useState va executer window.localStorage.getItem('le Nom =>') || initialName
 * * alors que moi j'ai  besoin a ce que l'update du name soit délégué que a setName(event.target.value)
 * * a chaque rendu => imaginons que à la place de window.localStorage... on a une fonction someExpensiveComputation()
 * * bah ça serait couteux !
 * TODO : c'est pour cela que react nous permet d'executer ce qui ce trouve à l'interieur du useState qu'au premier rendering
 * * grâce au fait d'englober notre code dans une fonction !! cela s'appel :
 * ! Lazy state initialization
 */
import * as React from 'react';

function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(() => {
    return window.localStorage.getItem('Le Nom =>') || initialName;
  });

  React.useEffect(() => {
    window.localStorage.setItem('Le Nom =>', name);
  }); //le useEffect est appliqué a la fin du remplissage de l'input
  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
