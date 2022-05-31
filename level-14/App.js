import * as React from 'react';
import './box-styles.css';

function Box({ className, size, style, children, ...otherprops }) {
  const sizeClassName = size ? `box--${size}` : '';
  /**
   * * j'aime bien cette technique:
   * * Box est un composant qu'on va surement être utiliser dans differents endroit dans nos projets
   * * ceci dit il se peut qu'il ai different tailles selon l'endroit ou on l'affiche
   * * changer les dimensions de ce dernier a chaque page peut etre embêtant
   * * c'est pour cela  cette pattern nous permet  selon la propriété de l'attribut size qu'on applique
   * * de definir le CSS approprié
   *
   */
  return (
    <div
      className={`box ${className} ${sizeClassName}`}
      style={style}
      children={children}
      {...otherprops}
    ></div>
  );
}

function App() {
  return (
    <div>
      <Box
        size="small"
        style={{ backgroundColor: 'lightblue', fontStyle: 'italic' }}
        id="aa"
        z="otherprops"
        children="small lightblue box"
      />
      <Box
        size="medium"
        style={{ backgroundColor: 'pink', fontStyle: 'italic' }}
        children="medium pink box"
      />
      <Box
        size="large"
        style={{ backgroundColor: 'orange', fontStyle: 'italic' }}
        children="large orange box"
      />
    </div>
  );
}

export default App;
