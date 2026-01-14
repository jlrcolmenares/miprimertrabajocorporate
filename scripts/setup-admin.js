// Setup script to create admin user
// Run this with: node scripts/setup-admin.js

const admin = require('firebase-admin');
const readline = require('readline');

// Initialize Firebase Admin (you'll need to set up your service account)
const serviceAccount = require('../path-to-your-service-account-key.json'); // Update this path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createAdminUser() {
  try {
    console.log('🔧 Configuración de Usuario Administrador\n');
    
    const email = await new Promise((resolve) => {
      rl.question('Email del administrador: ', resolve);
    });
    
    const password = await new Promise((resolve) => {
      rl.question('Contraseña del administrador: ', resolve);
    });
    
    const name = await new Promise((resolve) => {
      rl.question('Nombre del administrador: ', resolve);
    });

    console.log('\n🔄 Creando usuario administrador...');

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });

    console.log('✅ Usuario creado en Firebase Auth:', userRecord.uid);

    // Create user document in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: email.toLowerCase(),
      name: name,
      hasPaid: true, // Admin has access to everything
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Documento de usuario creado en Firestore');
    console.log('\n🎉 ¡Usuario administrador creado exitosamente!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Contraseña: ${password}`);
    console.log('\n📝 No olvides agregar este email a ADMIN_EMAILS en src/lib/admin-config.ts');
    console.log(`   Agrega: "${email}",`);
    
  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

createAdminUser();
