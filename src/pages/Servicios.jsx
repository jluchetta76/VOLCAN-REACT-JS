import React, { useState } from 'react';
import './Servicios.css'; 

const Servicios = () => {

  // Estado para los datos del formulario

  const [formData, setFormData] = useState({

    asunto: '',
    nombre: '',
    telefono: '',
    mensaje: ''

  });

  // Estado para manejar los errores de validación

  const [errors, setErrors] = useState({});

  // Estado para el estatus del envío (loading, success, error)

  const [status, setStatus] = useState(null);

  // Manejar cambios en los inputs

  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({

      ...formData,
      [name]: value

    });

    // Limpiar el error del campo cuando el usuario empieza a escribir

    if (errors[name]) {

      setErrors({

        ...errors,
        [name]: false

      });

    }

  };

  // Validar campos antes de enviar

  const validate = () => {

    let tempErrors = {};
    let isValid = true;

    // Verificamos si los campos están vacíos (trim elimina espacios en blanco)

    if (!formData.asunto.trim()) tempErrors.asunto = true;
    if (!formData.nombre.trim()) tempErrors.nombre = true;
    if (!formData.telefono.trim()) tempErrors.telefono = true;
    if (!formData.mensaje.trim()) tempErrors.mensaje = true;

    setErrors(tempErrors);
    
    // Si el objeto tempErrors tiene claves, es que hay errores

    if (Object.keys(tempErrors).length > 0) {

      isValid = false;

    }

    return isValid;

  };

  // Manejar el envío del formulario

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validate()) {

      setStatus('sending');

      try {
        
        const response = await fetch("https://formspree.io/f/mpwvqveg", {

          method: "POST",
          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(formData)

        });

        if (response.ok) {

          setStatus('success');
          // Resetear formulario
          setFormData({ asunto: '', nombre: '', telefono: '', mensaje: '' });

        } else {

          setStatus('error');

        }

      } catch (error) {

        setStatus('error');

      }

    }

  };

  return (

    <>

      <h1 align="center">Atención al cliente 0800 - VOLCAN</h1>
      <hr />

      <div className="servicios-container">
        
        <h2>Contactate con nosotros</h2>

        <br />
        
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Campo: Asunto */}

          <div className="form-group">

            <label htmlFor="asunto">Asunto:</label>

            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              className={errors.asunto ? 'input-error' : ''}
              placeholder="Ej: ¿Cuando llega mi producto?"
            />
            {errors.asunto && <span className="error-text">El asunto es obligatorio.</span>}

          </div>

          {/* Campo: Nombre y Apellido */}

          <div className="form-group">

            <label htmlFor="nombre">Nombre y Apellido:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'input-error' : ''}
              placeholder="Ej: Alfredo Lopez "
            />
            {errors.nombre && <span className="error-text">El nombre es obligatorio.</span>}

          </div>

          {/* Campo: Teléfono */}

          <div className="form-group">

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={errors.telefono ? 'input-error' : ''}
              placeholder="Ej: 11..."
            />
            {errors.telefono && <span className="error-text">El teléfono es obligatorio.</span>}

          </div>

          {/* Campo: Mensaje */}

          <div className="form-group">

            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              maxLength="300"
              className={errors.mensaje ? 'input-error' : ''}
              placeholder="Escribe tu consulta aquí..."
            ></textarea>
            <div className="char-count">
              {formData.mensaje.length}/300 caracteres
            </div>
            {errors.mensaje && <span className="error-text">El mensaje es obligatorio.</span>}

          </div>

          {/* Botón de envío y mensajes de estado */}

          <button className='button-form' type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          {status === 'success' && (
            <p className="success-msg">¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.</p>
          )}
          {status === 'error' && (
            <p className="error-msg">Hubo un error al enviar el mensaje. Inténtalo nuevamente.</p>
          )}

        </form>

      </div>

    </>
    
  );

};

export default Servicios;