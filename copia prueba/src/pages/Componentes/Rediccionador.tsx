import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Rediccionador.module.css'; 

function Rediccionador() {
  return (
    
    <div className={styles.container}>
      
      <div className={styles.buttonWrapper}>
        <Link href="/Componentes/Tabla" passHref>
          <Button className='primary mb-2 block'>
            Revisar Tabla
          </Button>
        </Link>
        <Link href="/Componentes/Formulario" passHref>
          <Button className='primary'>
            Registrar Nuevo Usuario
          </Button>
        </Link>
        <Link href="/Componentes/FormularioJugador" passHref>
          <Button className='primary'>
            Registrar Jugador
          </Button>
        </Link>
        <Link href="/Componentes/TablaJugadores" passHref>
          <Button className='primary'>
            Tabla Jugadores
          </Button>
        </Link>
        <Link href="/Componentes/Login" passHref>
          <Button className='primary block'>
            Salir
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Rediccionador;