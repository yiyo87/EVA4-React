import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./FormularioJugador.module.css";
import { Jugador } from "@/interfaces/iJugador";
import { registrarJugador } from "@/Firebase/promesas";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const initialState:Jugador ={

    id:"",
    nombre: "",
    apellido: "",
    posicion: "",
    altura: 0,
    equipoFavorito: "",
    jugadorFavorito: "",
  };
export const FormularioBasquetball: React.FC = () => {
  const [jugador,setJugador] = useState<Jugador>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  // Función para manejar cambios en los campos de entrada
  const handleJugador = (name: string, value: any) => {
    setJugador({ ...jugador, [name]: value });
  };

  // Función para validar los datos del formulario
  const validate = () => {
    let formErrors: { [key: string]: string } = {};
    if (!jugador.nombre) formErrors.nombre = "El nombre es obligatorio";
    if (!jugador.apellido) formErrors.apellido = "El apellido es obligatorio";
    if (!jugador.posicion) formErrors.posicion = "Seleccione una posición";
    if (jugador.altura <= 0)
      formErrors.altura = "La altura debe ser mayor que cero";
    if (!jugador.equipoFavorito)
      formErrors.equipoFavorito = "Ingrese su equipo favorito de la NBA";
    if (!jugador.jugadorFavorito)
      formErrors.jugadorFavorito = "Ingrese su jugador favorito de la NBA";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Función para registrar un nuevo jugador
  const registrar = () => {
    if (validate()) {
      registrarJugador(jugador).then(()=>{
        alert ("se logro registrar");
        router.push("/Componentes/TablaJugadores");

      })
      console.log("Jugador registrado:", jugador);
      alert("¡Jugador registrado exitosamente!");
      // Limpiar el formulario
      setJugador({
        id:"",
        nombre: "",
        apellido: "",
        posicion: "",
        altura: 0,
        equipoFavorito: "",
        jugadorFavorito: "",
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
            <h2 className="mb-4 text-center">
              Registrar Jugador de Básquetball
            </h2>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
                {errors.nombre && (
                  <Form.Text className="text-danger">{errors.nombre}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
                {errors.apellido && (
                  <Form.Text className="text-danger">
                    {errors.apellido}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Posicion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su posicion"
                  name="posicion"
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
                {errors.posicion && (
                  <Form.Text className="text-danger">
                    {errors.posicion}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Altura</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su altura"
                  name="altura"
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
                {errors.altura && (
                  <Form.Text className="text-danger">
                    {errors.altura}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Equipo Favorito</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Equipo Favorito"
                  name="equipoFavorito"
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
                {errors.equipoFavorito && (
                  <Form.Text className="text-danger">
                    {errors.equipoFavorito}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupNombre">
                <Form.Label>Jugador Favorito</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jugador Favorito"
                  name="jugadorFavorito"
                  onChange={(e) =>
                    handleJugador(e.currentTarget.name, e.currentTarget.value)
                  }
                />
                {errors.jugadorFavorito && (
                  <Form.Text className="text-danger">
                    {errors.jugadorFavorito}
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                variant="primary"
                className="w-100"
                onClick={registrar}
              >
                Registrar Jugador
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioBasquetball;
