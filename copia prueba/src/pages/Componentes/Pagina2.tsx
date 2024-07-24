import React, { useState } from "react";
import { Form } from "react-bootstrap";

import { Button } from 'react-bootstrap';


export const Pagina2 = () => {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [resultado, setResultado] = useState(0)
    


    const getn1 = (valor:string)=>{
        const n1 = parseInt(valor)
        setNum1(n1)
        handleRegistrar()
    }
    const getn2 = (valor:string)=>{
        const n2 = parseInt(valor)
        setNum2(n2)
        handleRegistrar()
    }
    const handleRegistrar= ()=>{
        const t = num1 + num2
        setResultado(t)
        
    }

    
  return (
    <>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre: </Form.Label>
                <Form.Control type="text" placeholder="Nombre" onChange={(e)=>getn1(e.currentTarget.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Apellido: </Form.Label>
                <Form.Control type="text" placeholder="Apellido" onChange={(e)=>getn2(e.currentTarget.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleRegistrar}>Registrar</Button>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>resultado: </Form.Label>
                <Form.Control type="text" value={resultado} />
            </Form.Group>
            

        </Form>
        </>
  )
}
export default Pagina2
