const db = require('./config/database');

console.log('🔍 Verificando conexión a la base de datos...\n');

// Verificar conexión
db.ping((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);
  }
  console.log('✅ Conexión a MySQL exitosa\n');
  
  // Verificar si existe la base de datos
  db.query('SELECT DATABASE() as db_name', (err, result) => {
    if (err) {
      console.error('❌ Error consultando base de datos:', err.message);
      process.exit(1);
    }
    console.log('📊 Base de datos actual:', result[0].db_name);
    
    // Verificar estructura de la tabla turnos
    db.query('DESCRIBE turnos', (err, result) => {
      if (err) {
        console.error('❌ Error: La tabla "turnos" no existe o tiene problemas');
        console.error('💡 Solución: Ejecuta el script fix_database.sql en phpMyAdmin');
        console.error('📍 URL: http://localhost/phpmyadmin');
        process.exit(1);
      }
      
      console.log('✅ Estructura de la tabla "turnos":');
      console.table(result);
      
      // Verificar datos
      db.query('SELECT COUNT(*) as total FROM turnos', (err, result) => {
        if (err) {
          console.error('❌ Error consultando datos:', err.message);
          process.exit(1);
        }
        
        console.log(`📈 Total de turnos en la base de datos: ${result[0].total}`);
        
        if (result[0].total > 0) {
          db.query('SELECT * FROM turnos LIMIT 3', (err, turnos) => {
            if (!err && turnos.length > 0) {
              console.log('\n📋 Últimos turnos:');
              console.table(turnos);
            }
            console.log('\n🎉 ¡Base de datos funcionando correctamente!');
            process.exit(0);
          });
        } else {
          console.log('\n💡 No hay turnos registrados. La aplicación está lista para recibir el primer turno.');
          console.log('🎉 ¡Base de datos funcionando correctamente!');
          process.exit(0);
        }
      });
    });
  });
}); 