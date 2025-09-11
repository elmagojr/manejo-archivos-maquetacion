import { useState } from "react";


export function TarjetaData({children,nombre, formatoName,elemntoHTML,user='no', message, initailEstrue}) {
  //estado del componente 
  const [Yestrue, Notrue] = useState(initailEstrue || false);
    //const formatoName = (name) => `@${name}`;
    const estadobtn = Yestrue ? 'Parar' : 'Dale';
    const claseBtn = Yestrue ? 'btn-activo' : 'btn-inactivo';
    const elemnto = Yestrue?  <span>!New</span>: <span></span>

    const userHandler = () => {
      Notrue(!Yestrue);
    };
 return (
   <article className='clase-articulos'>
    <header className='clase-encabezado'>
      <img className='clase-imagen' src={`https://unavatar.io/deviantart/${user}`} alt="React Logo" />
      <div className='clase-divCabeza'>
        
        { nombre? <h1>{nombre}</h1>:children}
        <strong>{formatoName(user)} </strong>
        <span className='clase-span'>{message}</span>
        { elemnto}
      </div>
    </header>
<aside>
  <button className={`clase-boton ${claseBtn}`} onClick={userHandler}>
    <span>{estadobtn}</span>

  </button>
</aside>
   </article>   
  );
}