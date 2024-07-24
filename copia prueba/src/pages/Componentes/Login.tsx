"use client";

import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import styles from './Login.module.css'; // Importa tu hoja de estilos personalizada
import { useRouter } from "next/navigation"; // Módulo para poder navegar entre páginas

export const Login = () => {
    const router = useRouter();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsuario, setErrorUsuario] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const vUsuario = (valor: string) => {
        if (valor.length >= 5) {
            setErrorUsuario('');
        } else {
            setErrorUsuario('El nombre de usuario debe contener más de 5 caracteres');
        }
        setUsuario(valor);
    };

    const vPassword = (valor: string) => {
        if (valor.length >= 4) {
            setErrorPassword('');
        } else {
            setErrorPassword('La contraseña debe contener más de 4 caracteres');
        }
        setPassword(valor);
    };

    const handleRegistrar = () => {
        if (usuario.length < 5) {
            setErrorUsuario('El nombre de usuario debe contener más de 5 caracteres');
        }
        if (password.length < 4) {
            setErrorPassword('La contraseña debe contener más de 4 caracteres');
        }
        if (usuario.length >= 5 && password.length >= 4) {
            console.log('Se registró con éxito');
            alert('Listo');
            if (usuario === "admin" && password === "admin") {
                router.push('/Componentes/Rediccionador');
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className="mb-4 text-center">Iniciar Sesión</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => vUsuario(e.currentTarget.value)}
                        />
                        {errorUsuario && <Form.Text className="text-danger">{errorUsuario}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => vPassword(e.currentTarget.value)}
                        />
                        {errorPassword && <Form.Text className="text-danger">{errorPassword}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" className="w-100" onClick={handleRegistrar}>
                        Entrar
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;