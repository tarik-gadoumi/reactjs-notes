/**
 * *React.useEffect is a built-in hook that  allows me to run a custome 
 * *code after rendering or re-rendering of my component to the DOM   
 * React.useEffect(() => {
    // your side-effect code here. 
    // this is where you can make HTTP requests or interact with browser APIs. example: local storage
    })
 */
import * as React from 'react';

function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(
    window.localStorage.getItem('name') || initialName
  );
  //for each refresh my storage will get the name property set to
  //the value written in the input if no value is written then he grab
  //initalName which is set to "empty string"
  React.useEffect(() => {
    window.localStorage.setItem('Le Nom =>', name);
  });
  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        {/* attribut value :Cet attribut définit la valeur par défaut qui sera affichée dans l'élément au chargement de la page.*/}
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
