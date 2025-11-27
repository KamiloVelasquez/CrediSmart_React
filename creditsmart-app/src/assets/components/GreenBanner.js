import React, { useState } from 'react';

// Definición de estilos en JavaScript (JSX)
// Es una alternativa simple al CSS externo y funciona bien para componentes pequeños.
const styles = {
  // Estilo base del banner (Verde Oscuro Corporativo)
  banner: {
    backgroundColor: '#38761D', // Verde Oscuro
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    margin: '30px 0', 
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s', // Transiciones suaves
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  // Estilo del botón: usa una función para cambiar el color con el estado 'isHovered'
  button: (isHovered) => ({
    backgroundColor: isHovered ? 'white' : '#A9D18E', // Invierte el color del botón al hacer hover
    color: '#38761D', // Color de texto verde oscuro
    border: 'none',
    padding: '12px 25px',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s',
    boxShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
  }),
};


const GreenBanner = () => {
  // Estado para controlar el efecto hover en el componente
  const [isHovered, setIsHovered] = useState(false);
  // Estado opcional para manejar la apertura de un Modal (si lo implementas)
  // const [showModal, setShowModal] = useState(false); 

  const handleButtonClick = (e) => {
    // Detiene la propagación para evitar que el click en el botón active el evento del banner
    e.stopPropagation(); 
    
    // Aquí implementas la acción principal del banco:
    // Por ejemplo:
    // 1. Redirigir al simulador:
    // window.location.href = '/simulador'; 
    // 2. O abrir un modal:
    // setShowModal(true);
    
    console.log('Botón de Simular/Pre-Aprobar Clickeado en el banner.');
  };

  return (
    // Aplica el contenedor para que el banner use el ancho del grid de Bootstrap/Contenedor
    <div 
      className="container" 
      style={{ padding: 0 }} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        style={{ 
          ...styles.banner, 
          // Efectos de interactividad con el estado 'isHovered'
          transform: isHovered ? 'scale(1.01)' : 'scale(1)', // Pequeño crecimiento al hacer hover
          boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.4)' : 'none' // Sombra
        }}
      >
        <div style={styles.title}>
          ¡OFERTA EXCLUSIVA! 🏦 Tasa Fija garantizada.
        </div>
        <p>
          Financia tu vehículo o vivienda con el <strong>Plazo más flexible del mercado</strong> y recibe un bono especial.
        </p>
        
        <button style={styles.button(isHovered)} onClick={handleButtonClick}>
          ¡Simular y Pre-Aprobar Ahora!
        </button>
        
        {/* Texto de incentivo que aparece únicamente al hacer hover */}
        {isHovered && (
            <p style={{marginTop: '10px', fontSize: '14px', color: '#f0f0f0'}}>
                Aplican términos y condiciones. Vigencia limitada.
            </p>
        )}
      </div>

      {/* Aquí podrías renderizar un componente Modal */}
      {/* {showModal && <SimuladorModal onClose={() => setShowModal(false)} />} */}
    </div>
  );
};

export default GreenBanner;