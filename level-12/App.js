import * as React from 'react';
import './box-styles.css';
// l'idée ici c'est de :
// au lieu de créer 3 constant de la même famille (des div) et qui ont les mêmes props (className ,style,children)
// on crée un Seul Composant Box qui va retourner mon élément
// il ne reste plus que l'invoquer <Box /> avec different valeur pour les props <Box className=... style=... childre=... />
function Box(props) {
  // pour éviter de passer{ props.className} & {props.style} & {props.children} le spread Operator {...props}
  // va étaler toutes les proprietées de mon Objet props
  return <div {...props}></div>;
}

function App() {
  return (
    <>
      <Box
        className="box box--small"
        style={{ backgroundColor: 'lightblue', fontStyle: 'italic' }}
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
