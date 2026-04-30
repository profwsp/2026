// ARQUIVO DE EXEMPLO - firebaseConfig.example.js
// Instruções: Copie este arquivo, renomeie para firebaseConfig.js
// e substitua os valores com suas credenciais do Firebase

const firebaseConfigExample = {
  apiKey: "AIzaSyCAZRQE1234567890ABCDEFGHIJ",
  authDomain: "indusmonitor-12345.firebaseapp.com",
  projectId: "indusmonitor-12345",
  storageBucket: "indusmonitor-12345.appspot.com",
  messagingSenderId: "1234567890123",
  appId: "1:1234567890123:web:abcdefg1234567890"
};

// Exemplo de estrutura de usuário no Firestore:
// Collection: users
// Documents: {userId}
// Fields:
// - displayName: string
// - email: string
// - role: 'aluno' | 'professor' | 'admin'
// - createdAt: timestamp
//
// Coleções didáticas sugeridas:
// - equipments
// - benches
// - reservations (docId: {benchId}_{slotKey})
// - damageReports

export default firebaseConfigExample;
