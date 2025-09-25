import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const handleLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const resetForm = () => {
        setCorreo("");
        setPassword("");
    }
    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const resDataPersona = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ password, correo })
        });

        const dataPersona = await resDataPersona.json();

        if (resDataPersona.ok) {
            localStorage.setItem("token", dataPersona.token);
            const token = dataPersona.token;
            login(token);
            navigate("/inicio");
            alert("Inicio de sesión exitoso");
        } else {
            alert(dataPersona.message);
            resetForm();
            return false;
        }
    }

    return{
        correo,
        setCorreo,
        password,
        setPassword,
        handleLoginSubmit
    }

}