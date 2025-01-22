import oracledb from 'oracledb';

oracledb.initOracleClient({ libDir: 'D:/Oracle/instantclient_19_25' }); // Especifica la ruta

export async function connectToDatabase() {
  try {
    // Crear el pool de conexiones
    const pool = await oracledb.createPool({
      user: process.env.VITE_USER_DB,
      password: process.env.VITE_PWD_DB,
      connectString: `${process.env.VITE_HOST_DB}:${process.env.VITE_PORT_DB}/${process.env.VITE_DB}`,
      poolMin: 5, // Número mínimo de conexiones en el pool
      poolMax: 20, // Número máximo de conexiones en el pool
      poolIncrement: 5 // Incremento cuando el pool alcanza el límite
    });

    console.log({
      user: process.env.VITE_USER_DB,
      password: process.env.VITE_PWD_DB,
      connectString: `${process.env.VITE_HOST_DB}:${process.env.VITE_PORT_DB}/${process.env.VITE_DB}`,
      poolMin: 5,
      poolMax: 20,
      poolIncrement: 5
    });

    console.log('Conexión exitosa a Oracle Database');
    return pool;  // Devuelve el pool de conexiones
  } catch (error) {
    console.error('Error conectando a Oracle Database:', error);
    throw error;
  }
}

export default connectToDatabase;
