//Rendering Arrays
import * as React from 'react';
const monArray = [
  { id: 'apple', value: '🍎 apple' },
  { id: 'orange', value: '🍊 orange' },
  { id: 'grape', value: '🍇 grape' },
  { id: 'pear', value: '🍐 pear' },
];
function App() {
  const [arr, setArr] = React.useState(monArray);
  function removeItem(item) {
    setArr(arr.filter((v) => v.id !== item.id));
    // return  new Arr without the element that contain item.id
  }
  function addItem() {
    const itemsId = arr.map((v) => v.id); // hna arr machi monArr
    setArr([...arr, monArray.find((v) => !itemsId.includes(v.id))]);
  }
  return (
    <div>
      <button disabled={arr.length >= monArray.length} onClick={addItem}>
        add item
      </button>
      <ol>
        {arr.map((item) => (
          <li>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ol>
    </div>
  );
}
/**
 * ! ici note Très Très Très importante
 * * sache que pour afficher un element react crée dabord un DOM virtuel
 * * place chaque elemet dans ce DOM
 * * puis transmet ça dans le window DOM
 * * pourquoi je écris ça ?
 * * et bah sache que lorsqu'une modification est effectuer
 * * react va comparer l'ancien DOM virtuel avec le nouveau (celui qui contient la modification)
 * * lors de l'affichage d'un array react sans cette fameuse Key={"unique key !"}
 * * react ne saura pas que c'est l'élement a l'index 4 qui est maintenant à l'index 3
 * * du coup l'élement a l'index 4 est placé a l'index 3 mais prendra la valeur de l'élement 3
 * * parceque react effectue le rendu est place les élements disponible mais ne sais pas quel élément a été supprimer
 * * ou ajouter ou le nouvel ordre de ces derniers
 */
export default App;
