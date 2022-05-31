import * as React from 'react';
import './box-styles.css';

function Box({ className, style, children, ...otherprops }) {
  console.log(otherprops);
  return (
    <div
      className={className}
      style={style}
      children={children}
      {...otherprops}
      /*
      ce qui change entre le code précédent et celui-ci
      c'est l'utilisation du distructuring au niveau des paramètres & le Spread Operator 
      cette pattern nous permet de :
        1- mettre en place les props par defaut (qui biensur peuvent être overwrite via ...otherprops)
        2- pouvoir ajouter dans le futur de nouvelles props a nos composants 
        3- ... si une nouvelle reflexion me vien en tête je revien la noté ici !
     */
    ></div>
  );
}

function App() {
  return (
    /**
     * * remarque très importante :
     * ! la difference entre react fragment et un simple div c'est que react fragment cole les enfants au DOM
     * ! sans ajouter de div (du coup  utilité de react fragment : réduire la taille globale du DOM.)
     */
    <>
      <Box
        className="box box--small"
        style={{ backgroundColor: 'lightblue', fontStyle: 'italic' }}
        id="aa"
        z="BOOOM"
        children="small lightblue box"
      />
      <Box
        className="box box--medium"
        style={{ backgroundColor: 'pink', fontStyle: 'italic' }}
        children="medium pink box"
      />
      <Box
        className="box box--large"
        style={{ backgroundColor: 'orange', fontStyle: 'italic' }}
        children="large orange box"
      />
    </>
  );
}

export default App;
