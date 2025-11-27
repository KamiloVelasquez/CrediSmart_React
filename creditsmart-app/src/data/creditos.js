import libreImg from '../assets/IMAGES/libre.png';
import vehiculoImg from '../assets/IMAGES/vehiculo.png';
import viviendaImg from '../assets/IMAGES/vivienda.png';
import educativoImg from '../assets/IMAGES/educativo.png';
import empresarialImg from '../assets/IMAGES/empresarial.png';
import consumoImg from '../assets/IMAGES/consumo.png';

export const creditos = [
  {
    id: 1,
    nombre: "Crédito Libre Inversión",
    tasa: 1.8,
    montoMin: 1000000,
    montoMax: 30000000,
    plazo: 60,
    img: libreImg
  },
  {
    id: 2,
    nombre: "Crédito Vehículo",
    tasa: 1.5,
    montoMin: 10000000,
    montoMax: 80000000,
    plazo: 84,
    img: vehiculoImg
  },
  {
    id: 3,
    nombre: "Crédito Vivienda",
    tasa: 0.9,
    montoMin: 20000000,
    montoMax: 500000000,
    plazo: 240,
    img: viviendaImg
  },
  {
    id: 4,
    nombre: "Crédito Educativo",
    tasa: 1.2,
    montoMin: 2000000,
    montoMax: 40000000,
    plazo: 72,
    img: educativoImg
  },
  {
    id: 5,
    nombre: "Crédito Empresarial",
    tasa: 1.6,
    montoMin: 5000000,
    montoMax: 200000000,
    plazo: 120,
    img: empresarialImg
  },
  {
    id: 6,
    nombre: "Crédito Consumo",
    tasa: 2.1,
    montoMin: 500000,
    montoMax: 15000000,
    plazo: 48,
    img: consumoImg
  }
];
