import { registrarPersona } from "@/Firebase/promesas";
import { Persona } from "@/interfaces/iPersonas";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Formulario.module.css";
import { actualizarPersona } from "@/Firebase/promesas";

export const ActualizarDatos = ({ personaTabla }: { personaTabla: Persona | null }) => {
  const [persona, setPersona] = useState<Persona | null>(personaTabla);

  useEffect(() => {
    if (personaTabla) {
      setPersona(personaTabla);
    }
  }, [personaTabla]);

  const handlePersona = (name: string, value: string) => {
    if (persona) {
      setPersona({ ...persona, [name]: value });
    }
  };

  const registrar = async () => {
    if (persona) {
      try {
        await actualizarPersona(persona);
        alert("Se actualizó correctamente");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
        alert("fallo la actualizacion");
      }
    }
  };

  if (!persona) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className={styles.container}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className={styles.formWrapper}>
            <h2 className="mb-4 text-center">Actualizar Persona</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  value={persona.nombre || ""}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  value={persona.apellido || ""}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEdad">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su edad"
                  name="edad"
                  value={persona.edad || 0}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupCorreo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo"
                  name="correo"
                  value={persona.correo || ""}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su teléfono"
                  name="telefono"
                  value={persona.telefono || ""}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupCheck">
                <Form.Select
                  name="opciones"
                  aria-label="Selecciona un valor"
                  value={persona.opciones || ""}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                >
                  <option value="">Opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupComentario">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese su comentario"
                  name="comentario"
                  value={persona.comentario || ""}
                  onChange={(e) =>
                    handlePersona(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupCheck">
                <Form.Check
                  type="checkbox"
                  label="Acepto los términos y condiciones"
                  name="terminos"
                  checked={persona.terminos}
                  onChange={(e) =>
                    handlePersona(
                      e.currentTarget.name,
                      e.currentTarget.checked.toString()
                    )
                  }
                />
              </Form.Group>

              <Button variant="primary" className="w-100" onClick={registrar}>
                Actualizar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ActualizarDatos;
