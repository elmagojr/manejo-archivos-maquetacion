import './App.css';
import { TarjetaData } from './TarjetaData.jsx';
export function App(param) {
const formatoName = (name) => `@${name}`;
const elemntoHTML = <span>!New</span>;
//props como objetos



const usersD = [{    
  user: "skirrelito",
  message: "Codificar es crear",
  nombre: "Polecat",
  Yestrue: true,

},{    
  user: "Abelardo",
  message: "La ia es lo maximo... uy miren un pn",
  nombre: "Abelardo",
  Yestrue: false,

},
{    
  user: "Sloppygee",
  message: "No al abort, como tu",
  nombre: "jesus",
  Yestrue: false

}];

return (
  <section className='clase-app'>

{
   usersD.map((user) => {
       return (
          <TarjetaData 
          key={user.user} 
          formatoName={formatoName}  
          user={user.user} 
          message={user.message} 
          nombre={user.nombre} 
          initailEstrue={user.Yestrue}
          elemntoHTML={elemntoHTML}
          >
          <h3>{user.nombre}</h3>
          </TarjetaData>
       );
   })  
}

     {/* <TarjetaData formatoName={formatoName}  user="skirrelito" message="Codificar es crear" initailEstrue  >
      <h3>Johann Flores</h3>
     </TarjetaData>


     <TarjetaData formatoName={formatoName}  user="Sloppygee" message="No al abort, como tu"  nombre= "jesus" /> */}

  </section>
 )
}