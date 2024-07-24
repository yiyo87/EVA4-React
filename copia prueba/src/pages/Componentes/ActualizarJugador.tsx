import { registrarPersona } from "@/Firebase/promesas";
import { Jugador } from "@/interfaces/iJugador";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Formulario.module.css";
import { actualizarJugador } from "@/Firebase/promesas";

export const ActualizarDatosJugador = ({jugadorTabla,}: {jugadorTabla: Jugador | null;}) => {
  const [jugador, setJugador] = useState<Jugador | null>(jugadorTabla);

  useEffect(() => {
    if (jugadorTabla) {
      setJugador(jugadorTabla);
    }
  }, [jugadorTabla]);

  const handleJugador = (name: string, value: string) => {
    if (jugador) {
      setJugador({ ...jugador, [name]: value });
    }
  };

  const registrar = async () => {
    if (jugador) {
      try {
        await actualizarJugador(jugador);
        alert("Se actualizó correctamente");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
        alert("fallo la actualizacion");
      }
    }
  };

  if (!jugador) {
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
                  value={jugador.nombre || ""}
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  value={jugador.apellido || ""}
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEdad">
                <Form.Label>Posicion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su posicion"
                  name="posicion"
                  value={jugador.posicion || 0}
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupCorreo">
                <Form.Label>Altura</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su altura"
                  name="altura"
                  value={jugador.altura || ""}
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupTelefono">
                <Form.Label>Equipo Favorito</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su equipo favorito"
                  name="equipoFavorito"
                  value={jugador.equipoFavorito || ""}
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
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

export default ActualizarDatosJugador;
