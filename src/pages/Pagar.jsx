import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';


export default function Pagar() {

  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito, agregarCantidad, quitarCantidad } = useCartContext();
  const navigate = useNavigate();
  const tokenActual = localStorage.getItem('authToken');

  // Función para finalizar compra

  const comprar = () => {

    alert("¡Compra realizada con éxito!");
    vaciarCarrito(); // Limpiar carrito después de comprar
    navigate("/productos");

  };

  // Definición de estilos para botones

  const buttonBaseStyle = {

    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px', 
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s, transform 0.2s',

  };

  const buttonDangerStyle = {

    ...buttonBaseStyle,
    background: '#dc3545', 
    color: 'white',

  };

  const buttonSuccessStyle = {

    ...buttonBaseStyle,
    background: 'green',
    color: 'white',

  };

  const buttonPrimaryStyle = {

    ...buttonBaseStyle,
    background: '#007bff',
    color: 'white',

  };

  const quantityButtonStyle = {

    background: '#e9ecef',
    color: '#343a40',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    padding: '4px 8px',
    margin: '0 4px',
    cursor: 'pointer',
    fontWeight: 'normal',
    lineHeight: '1',

  };

  return (

    <div className="container py-4"> {/* Contenedor principal para centrado y padding */}
      
      {/* Información del Usuario y Token */}

      <div className="mb-5 p-4 border rounded-3 bg-light shadow-sm">

        <h2 className="mb-1 text-primary">¡Hola, {usuario.nombre}! 👋</h2>
        <p className="text-muted">Email: {usuario.email}</p>
        
        {/* Estilo para el Token */}

        <div style={{

          background: '#f8f9fa',
          padding: '12px',
          borderRadius: '6px',
          margin: '15px 0',
          fontSize: '0.8rem',
          wordBreak: 'break-all',
          border: '1px dashed #ced4da'

        }}>

          <strong className="text-secondary">Token de Sesión:</strong> <span className="text-monospace">{tokenActual}</span>
        
        </div>

        <button onClick={cerrarSesion} style={buttonDangerStyle}>
          Cerrar sesión
        </button>

      </div>

      <hr className="my-4" />
      
      {/* Sección del Carrito */}

      <div className="p-4 border rounded-3 shadow-lg bg-white">

        <h2 className="mb-4 text-dark">🛍️ Resumen de tu Compra:</h2>

        {carrito.length > 0 ? (

          <>

            <div className="list-group">

              {carrito.map((producto) => {

                const cantidad = Number(producto.cantidad || 1);
                const precioUnitario = Number(producto.precio || 0);
                const subtotal = cantidad * precioUnitario;
                
                return (

                  <div key={producto.id} className="list-group-item d-flex align-items-center mb-3 p-3 border rounded-3">
                    
                    {/* Imagen del Producto */}

                    <img 
                      src={producto.avatar} 
                      alt={producto.nombre} 
                      width="80"
                      height="80"
                      className="rounded me-4 object-fit-cover"
                    />
                    
                    {/* Detalles del Producto */}

                    <div className="flex-grow-1">

                      <div className="fs-5 fw-bold text-success mb-1">{producto.nombre}</div>
                      <div className="text-muted small">Precio unitario: ${Number(precioUnitario).toFixed(2)}</div>
                      <div className="d-flex align-items-center mt-2">
                        <strong className="me-2">Cantidad:</strong>
                        <button onClick={() => quitarCantidad(producto.id)} style={quantityButtonStyle}>
                          -
                        </button>
                        <span className="mx-2 fw-bold">{cantidad}</span>
                        <button onClick={() => agregarCantidad(producto.id)} style={quantityButtonStyle}>
                          +
                        </button>

                      </div>

                    </div>
                    
                    {/* Subtotal */}

                    <div className="text-end ms-auto">

                      <div className="mb-1 text-secondary">Subtotal</div>
                      <div className="fs-5 fw-bolder text-dark">
                        ${Number(subtotal).toFixed(2)}
                      </div>
                    </div>
                  </div>
                );

              })}

            </div>

            <hr className="my-4" />
            
            {/* Total */}

            <h3 className="fs-4 fw-bold text-end bg-light rounded-4 p-3 border shadow-sm">
              Total a pagar: <span className="text-danger">${Number(total).toFixed(2)}</span>
            </h3>

          </>

        ) : (

          <div className="alert alert-info text-center" role="alert">
            <p className="mb-0">No hay productos en el carrito. ¡Agrega algunos!</p>
          </div>

        )}

      </div>
      
      {/* Botones de Acción */}

      <div className="d-flex justify-content-between align-items-center mt-4">

        {/* Botones de Limpieza y Navegación */}

        <div>

          <button 
            onClick={vaciarCarrito} 
            style={buttonDangerStyle}
            className="me-3" 
            disabled={carrito.length === 0}
          >
            Vaciar Carrito
          </button>

          <button 
            onClick={() => navigate("/productos")}
            style={buttonSuccessStyle}
          >
            {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
          </button>

        </div>

        {/* Botón de Confirmar y Pagar */}

        {carrito.length > 0 && (

          <button 
            onClick={comprar} 
            style={buttonPrimaryStyle}
            className="shadow-lg" 
          >
            Confirmar y Pagar
          </button>

        )}

      </div>

    </div>

  );
  
}