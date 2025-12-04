import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IniciarSesion() {

  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {

    e.preventDefault();
    
    // Verificar credenciales (admin/1234@admin)

    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {

      // Guarda el email ingresado y pasa nombre para el token admin

      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/dashboard");

    }

    // Lógica para usuarios normales - SOLO si NO es admin

    else if (

      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"

    ) {

  // Guarda el email ingresado y pasa nombre para el token user

  localStorage.setItem("authEmail", formulario.email);
  iniciarSesion(formulario.nombre, formulario.email);

  // Si venía del carrito, redirige a pagar

      if (ubicacion.state?.carrito) {

        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });

      } else {

        navigate("/productos");

      }

    } else {

      alert(

        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"

      );

    }

  };

  return (

    <div Align="center">

      <br />
      <h1>Inicia sesión para continuar</h1>
      <br />
      <br />
      <form onSubmit={manejarEnvio}>

        <input

          align="center"
          type="text"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={(e) =>
            setFormulario({ ...formulario, nombre: e.target.value })
          }
          required
        />

        <br />
        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) =>
            setFormulario({ ...formulario, email: e.target.value })
          }
          required
        />

        <br />
        <br />
        <br />

        <button type="submit">Iniciar Sesión</button>
        
        <br />
        <br />
        <br />

        <button type="button" onClick={() => navigate("/productos")}>
          Cancelar
        </button>

      </form>

      <br />
      <br />

    </div>

  );
  
}
