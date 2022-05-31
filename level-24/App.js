/**
 * * un autre problème ce présente concernant le useEffect
 * * pour chaque re-rendering de notre appli causé par un parent qui n'a
 * * rien a voir avec le code qui doit s'executer a l'interrieur de notre
 * * useEffect bah notre useEffect excecute sa callbacl quand même
 * * et ça c'est très très mauvais , c'est pour cela React on mis en place
 * * dans L'API useEffect un deuxième argument qui est un tableau []
 * * ce tableau s'appel  dependecy array
 * * quel est son utilité ?
 * ! son utilité est précieuse ,l'execution de la callback dans notre useEffect
 * ! sera attaché aux variables qu'on met dans cet array
 * TODO : c.a.d a chaque fois que une de ces variables change elle causera
 * * l'execution de la callback dans le useEffect
 * * ça c'est beau !!!
 * * du coup notre code deviendra
 */
function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(() => {
    return window.localStorage.getItem('Le Nom =>') || initialName;
  });

  React.useEffect(() => {
    window.localStorage.setItem('Le Nom =>', name);
  }, [name]);
  /**
   *! le changement s'applique ici ↑
   */
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
