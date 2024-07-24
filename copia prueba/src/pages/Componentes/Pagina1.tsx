import React, { useState } from "react";
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';




export const Pagina1= () => {
    const [nombre, setNombre] = useState('Joselito')
    const [apellido, setApellido] = useState('')
    const [errorNom, setErrorNom] = useState('')

    const vlNombre=(valor:string)=>{
        if(valor.length >= 4){
            setErrorNom ('')
        }else{
            setErrorNom('Debes ingresar 4 caracteres como minimo')
        }
        setNombre(valor)

    }

const handleRegistrar = ()=>{
    console.log('Se registro con exito')
    alert('Listo! '+nombre +apellido)

}

    return (
        <>
        <h1>Bienvenido {nombre} {apellido}</h1>
        <p>{errorNom}</p>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre: </Form.Label>
                <Form.Control type="text" placeholder="Nombre" onChange={(e)=>vlNombre(e.currentTarget.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Apellido: </Form.Label>
                <Form.Control type="text" placeholder="Apellido" onChange={(e)=>setApellido(e.currentTarget.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleRegistrar}>Registrar</Button>

        </Form>
        </>
    )

}
export default Pagina1