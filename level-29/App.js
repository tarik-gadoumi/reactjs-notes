import * as React from 'react';
import VanillaTilt from 'vanilla-tilt';
import './styles.css';
function Tilt({ children }) {
  const tiltRef = React.useRef();

  React.useEffect(() => {
    const { current: tiltNode } = tiltRef;
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    };
    VanillaTilt.init(tiltNode, vanillaTiltOptions);
    return () => tiltNode.vanillaTilt.destroy();
  }, []);

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  );
}
/**
 * * ici ce qu'il faut retenir c'est que :
 * * vue que la ligne 19 le DOM node n'a pas encore été créer
 * * [parceque c'est a la fonction render() {dans index.js} ou les noeux sont créer]
 * * donc un console.log(de tiltRef.current) a la ligne 6 nous donnera undefined
 * * parcontre une fois l'élément a été monté sur l'ecran a l'interrieur du useEffect le tiltRef.current
 * * sera égale cette fois ci au noeud correspondant
 * * et la grâce à VanillaTilt.init(leNoeud ,lesOptions)
 * * des events handler et listener on été posé sur le noeud correspondant
 * * comme ça on peut utiliser les effets magique que nous montre le site demo de vanillaTilt
 * * quand est t'il de la clean Up function ?
 * * supposans que pour x raison on a plus besoin de notre element dans notre UI
 * * les events handler et listener ,les refs etc ... qui on été posé dessus peuvent toujours tourner dans le background
 * * alors que nous avons plus aucune utilité pour cette element , et bah fonctions qui tourne dans le background et qui
 * * ne sont pas utilisé ca engendre un memory leak ( la batterie aussi de l'utilisateur peux se décharger plus rapidement)
 * * parceque des calcules inutile tourne toujours
 * * c'est pour cela que la clean up function rentre en jeux , pour que lorsque l'element est enlevé de la page (unmounted)
 * * et bah debarasse moi des effets non désiré  react implémente cette aproche sous forme de fonction qu'on return du useEffect
 */
export default App;
