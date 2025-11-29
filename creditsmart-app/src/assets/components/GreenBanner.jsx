import React, { useState } from 'react';
import vehiculoImg from '../images/Credito_Vehiculo.png';

const styles = {
  banner: {
    backgroundColor: '#38761D',
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    margin: '30px 0',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
    borderRadius: '8px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  button: (isHovered) => ({
    backgroundColor: isHovered ? 'white' : '#A9D18E',
    color: '#38761D',
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
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    console.log('Botón de Simular/Pre-Aprobar Clickeado en el banner.');
    window.location.href = '/simulador';
  };

  return (
    <div className="container" style={{ padding: 0 }}>
      <div
        style={styles.banner}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          console.log('Banner Clickeado. Redirigiendo al Simulador.');
        }}
      >
        <div style={styles.title}>
          ¡OFERTA EXCLUSIVA! Tasa Fija garantizada.
        </div>

        <p>
          Financia tu vehículo o vivienda con el <strong>Plazo más flexible del mercado</strong> y recibe un bono especial.
        </p>

        <img
          src={vehiculoImg}
          alt="Crédito Vehículo"
          className="img-fluid"
          style={{
            maxWidth: 'min(1220px, 100%)',
            height: 'auto',
            margin: '20px auto',
            display: 'block',
            borderRadius: '10px',
          }}
        />

        <button
          style={styles.button(isHovered)}
          onClick={handleButtonClick}
        >
          ¡Simular y Pre-Aprobar Ahora!
        </button>

        {isHovered && (
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#f0f0f0' }}>
            Aplican términos y condiciones. Vigencia limitada.
          </p>
        )}
      </div>
    </div>
  );
};

export default GreenBanner;