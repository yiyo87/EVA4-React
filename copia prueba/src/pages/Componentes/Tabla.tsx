import React, { useEffect, useState } from 'react';
import { Persona } from '@/interfaces/iPersonas';
import { obtenerPersonas, actualizarPersona, eliminarPersona } from '@/Firebase/promesas';
import { Table, Button } from 'react-bootstrap';
import styles from './Tabla.module.css';
import ActualizarDatos from './Actualizardatos';
import { useRouter } from "next/navigation";

export const Tabla = () => {
    const [mostrarActualizar, setMostrarActualizar] = useState(false);// se definen las variables para poder obtener y setear la informacion de las personas dentro de la tbla 
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [personaSeleccionada,setpersonaSeleccionada] = useState<Persona | null>(null);
    const router = useRouter();
    useEffect(() => {// aqui se define a travez de use effect que se ocupa esa funcion para poder cargar los datos de las personas de
        cargarPersonas();
        
    }, []);

    const cargarPersonas = async () => {
        try {// di es que algo no cargo sale el aviso de alert que esta mas abajo 
            const personas = await obtenerPersonas();
            setPersonas(personas);
            
        } catch (e) {
            console.log(e);
            alert('Algo ocurrió');
        }
    };
    
    const handleActualizar = async (persona: Persona) => {
        try {
            console.log('ActualizarDatos')
            setpersonaSeleccionada(persona);
            setMostrarActualizar(true);
            

        } catch (e) {
            console.log(e);
            alert('Error al actualizar la persona');
        }
    };

    const handleEliminar = async (id:string) => {
        try {
            await eliminarPersona(id);
            cargarPersonas(); 
        } catch (e) {
            console.log(e);
            alert('Error al eliminar la persona');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.tableWrapper}>
                <h2 className="mb-4 text-center">Listado de Personas</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Opción</th>
                            <th>Comentario</th>
                            <th>Términos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((p, idx) => (
                            <tr key={idx}>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.edad}</td>
                                <td>{p.correo}</td>
                                <td>{p.telefono}</td>
                                <td>{p.opciones}</td>
                                <td>{p.comentario}</td>
                                <td>{p.terminos ? 'Acepta términos' : 'No acepta términos'}</td>
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
                <ActualizarDatos personaTabla={personaSeleccionada} />
            )}
        </div>

    );
};

export default Tabla;

