/*
 In HTML you’d pass a string of CSS: <div style="margin-top: 20px; background-color: blue;"></div> {kebab-case}
 In React, you’ll pass an object of CSS: <div style={{marginTop: 20, backgroundColor: 'blue'}} /> {camelCase}
 note that  the last  div is a combo  of JSX & Object {{}}
 donc on px l'écrire sous cette forme  aussi
 const monObj = {marginTop: 20, backgroundColor: 'blue'} {camelCase}
 <div style = {monObj}></div>
 L'ordre de priorité du style est tel :
 const appliedStyles = {
  ...inheritedStyles,
  ...tagStyles,
  ...classStyles,
  ...idStyles,
  ...inlineStyles,
  ...importantStyles,
};
*/
import * as React from 'react';
import './box-styles.css';

const smallBox = (
  <div
    className="box box--small"
    style={{ backgroundColor: 'lightblue', fontStyle: 'italic' }}
  >
    small lightblue box
  </div>
);
const mediumBox = (
  <div
    className="box box--medium"
    style={{ backgroundColor: 'pink', fontStyle: 'italic' }}
  >
    medium pink box
  </div>
);
const largeBox = (
  <div
    className="box box--large"
    style={{ backgroundColor: 'orange', fontStyle: 'italic' }}
  >
    large orange box
  </div>
);
function App() {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
    </div>
  );
}

export default App;
