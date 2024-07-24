import { registrarPersona } from "@/Firebase/promesas";
import { Persona } from "@/interfaces/iPersonas";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Formulario.module.css";
import { useRouter } from "next/navigation";

const initialState: Persona = {
  id: "",
  nombre: "",
  apellido: "",
  edad: 0,
  correo: "",
  telefono: "",
  opciones: "",
  comentario: "",
  terminos: false,
};

export const Formulario = () => {
  const [persona, setPersona] = useState<Persona>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  
  const handlePersona = (name: string, value: any) => {
    setPersona({ ...persona, [name]: value });
  };
  
  const validate = () => {
    let formErrors: { [key: string]: string } = {};
    
    if (!persona.nombre) formErrors.nombre = "El nombre es obligatorio";
    if (!persona.apellido) formErrors.apellido = "El apellido es obligatorio";
    if (persona.edad <= 0) formErrors.edad = "La edad debe ser mayor que cero";
    if (!persona.correo) {
      formErrors.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(persona.correo)) {
      formErrors.correo = "El correo no es válido";
    }
    if (!persona.telefono) formErrors.telefono = "El teléfono es obligatorio";
    if (!persona.opciones) formErrors.opciones = "Seleccione una opción";
    if (!persona.terminos) formErrors.terminos = "Debe aceptar los términos y condiciones";
  
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const registrar = () => {
    if (validate()) {
      registrarPersona(persona)
        .then(() => {
          alert("Se logró registrar");
          router.push("/Componentes/Tabla");
          console.log(persona);
        })
        .catch((e) => {
          console.log(e);
          alert("Algo ocurrió");
        });
    } else {
      alert("Por favor, corrige los errores en el formulario");
    }
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className={styles.formWrapper}>
            <h2 className="mb-4 text-center">Registrar Nuevo Usuario</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                />
                {errors.nombre && <Form.Text className="text-danger">{errors.nombre}</Form.Text>}
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGroupApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                />
                {errors.apellido && <Form.Text className="text-danger">{errors.apellido}</Form.Text>}
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGroupEdad">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su edad"
                  name="edad"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                />
                {errors.edad && <Form.Text className="text-danger">{errors.edad}</Form.Text>}
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGroupCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo"
                  name="correo"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                />
                {errors.correo && <Form.Text className="text-danger">{errors.correo}</Form.Text>}
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGroupTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su teléfono"
                  name="telefono"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                />
                {errors.telefono && <Form.Text className="text-danger">{errors.telefono}</Form.Text>}
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formGroupCheck">
                <Form.Select
                  name="opciones"
                  aria-label="Selecciona un valor"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                >
                  <option>Opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Select>
                {errors.opciones && <Form.Text className="text-danger">{errors.opciones}</Form.Text>}
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGroupComentario">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese su comentario"
                  name="comentario"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formGroupCheck">
                <Form.Check
                  type="checkbox"
                  label="Acepto los términos y condiciones"
                  name="terminos"
                  onChange={(e) => handlePersona(e.currentTarget.name, e.currentTarget.checked)}
                />
                {errors.terminos && <Form.Text className="text-danger">{errors.terminos}</Form.Text>}
              </Form.Group>
  
              <Button variant="primary" className="w-100" onClick={registrar}>
                Registrar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Formulario;