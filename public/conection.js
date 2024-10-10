const { MongoClient } = require('mongodb');

// URL de conexión (modifica según tu configuración)
const uri = "mongodb+srv://davidfr339:DAVIDFELIPE08@practica701.s0yjg.mongodb.net/";

// Nombre de la base de datos
const dbName = "whatsappDB";

async function connectToDatabase() {    
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectar al cliente
    await client.connect();
    console.log("Conectado a MongoDB");

    // Seleccionar base de datos
    const db = client.db(dbName);

    // Puedes interactuar con las colecciones aquí
    return db;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

module.exports = connectToDatabase;