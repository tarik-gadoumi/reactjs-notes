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
          <li key={item.id}>
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
 * * pourquoi je parle de  ça ?
 * * et bah sache que lorsque une modification est effectuer
 * * react va comparer l'ancien DOM virtuel avec le nouveau (celui qui contient la modification)
 * * supposans je supprime un élément
 * * lors de l'affichage d'un ARRAY react sans cette fameuse Key={"unique key !"}
 * * ne saura pas si j'ai supprimer 4 puis ajouter 3 element ou j ai changer l'ordre puis supprimer 1 ou j ai modiefier etc..
 * * bref sans la key il ne peux pas tracker l'état de l'élément
 * ! ne surtout pas mettre l'index comme key sinon le beug persiste
 * ! https://app.egghead.io/lessons/react-use-the-key-prop-when-rendering-a-list-with-react-3a0661b6/embed?preload=false
 */
export default App;
