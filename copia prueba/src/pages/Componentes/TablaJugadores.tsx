import React, { useEffect, useState } from 'react';
import { Jugador } from '@/interfaces/iJugador';
import { actualizarPersona, eliminarPersona,obtenerJugador,eliminarJugador } from '@/Firebase/promesas';
import { Table, Button } from 'react-bootstrap';
import styles from './Tabla.module.css';
import ActualizarDatosJugador from './ActualizarJugador';


export const TablaJugador = () => {
    const [mostrarActualizar, setMostrarActualizar] = useState(false);// se definen las variables para poder obtener y setear la informacion de las personas dentro de la tbla 
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [personaSeleccionada,setpersonaSeleccionada] = useState<Jugador | null>(null);

    useEffect(() => {// aqui se define a travez de use effect que se ocupa esa funcion para poder cargar los datos de las personas de
        cargarJugadores();
    }, []);

    const cargarJugadores = async () => {
        try {// si es que algo no cargo sale el aviso de alert que esta mas abajo 
            const jugadores = await obtenerJugador();
            setJugadores(jugadores);
        } catch (e) {
            console.log(e);
            alert('Algo ocurrió');
        }
    };
    
    const handleActualizar = async (jugador: Jugador) => {
        try {
            console.log('ActualizarDatos')
            setpersonaSeleccionada(jugador);
            setMostrarActualizar(true);


        } catch (e) {
            console.log(e);
            alert('Error al actualizar al jugador');
        }
    };

    const handleEliminar = async (id:string) => {
        try {
            await eliminarJugador(id);
            cargarJugadores(); 
        } catch (e) {
            console.log(e);
            alert('Error al eliminar al jugador');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.tableWrapper}>
                <h2 className="mb-4 text-center">Listado de Jugadores</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Posicion</th>
                            <th>Altura</th>
                            <th>Equipo Favorito</th>
                            <th>Jugador Favorito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadores.map((p, idx) => (
                            <tr key={idx}>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.posicion}</td>
                                <td>{p.altura}</td>
                                <td>{p.equipoFavorito}</td>
                                <td>{p.jugadorFavorito}</td>
                                <td>
                                    <Button variant="dark" className="me-2" onClick={() => handleActualizar(p)}>Actualizar</Button>
                                    <Button variant="secondary" onClick={() => handleEliminar(p.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
                   
            {mostrarActualizar && personaSeleccionada && (
                <ActualizarDatosJugador jugadorTabla={personaSeleccionada} />
            )}
        </div>

    );
};

export default TablaJugador;