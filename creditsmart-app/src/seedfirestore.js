import { db }  from './firebase/config'
import { collection, addDoc } from 'firebase/firestore';


const creditos = [
  {
    nombre: "Crédito Libre Inversión",
    tasa: 1.8,
    montoMin: 1000000,
    montoMax: 30000000,
    plazo: 60,
    img: "💸"
  },
  {
    nombre: "Crédito Vehículo",
    tasa: 1.5,
    montoMin: 10000000,
    montoMax: 80000000,
    plazo: 84,
    img: "🚗"
  },
  {
    nombre: "Crédito Vivienda",
    tasa: 0.9,
    montoMin: 20000000,
    montoMax: 500000000,
    plazo: 240,
    img: "🏠"
  },
  {
    nombre: "Crédito Educativo",
    tasa: 1.2,
    montoMin: 2000000,
    montoMax: 40000000,
    plazo: 72,
    img: "🎓"
  },
  {
    nombre: "Crédito Empresarial",
    tasa: 1.6,
    montoMin: 5000000,
    montoMax: 200000000,
    plazo: 120,
    img: "🏢"
  },
  {
    nombre: "Crédito Consumo",
    tasa: 2.1,
    montoMin: 500000,
    montoMax: 15000000,
    plazo: 48,
    img: "🛍️"
  }
];

const seeFirestore = async () => {
    try {
        console.log("Iniciando carga de datos a Firestore");

        for (const credito of creditos) {
            const docRef = await addDoc(collection(db, "creditos"), credito);
            console.log(`${credito.name} agregado con ID: ${docRef.id}`);
        }

        console.log("Todos los creditos han sido agregados exitosamente");
        console.log("En cuanto se persistan los registros, borrar este archivo");
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
};

seeFirestore();
