export function friendlyFirebaseAuthError(err) {
  const code = err?.code || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'Email inválido.';
    case 'auth/missing-email':
      return 'Informe o email.';
    case 'auth/missing-password':
      return 'Informe a senha.';
    case 'auth/weak-password':
      return 'Senha fraca (mínimo 6 caracteres).';
    case 'auth/email-already-in-use':
      return 'Este email já está cadastrado.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Email ou senha incorretos.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
    case 'auth/network-request-failed':
      return 'Sem conexão. Verifique a internet ou use os emuladores.';
    case 'auth/invalid-api-key':
    case 'auth/configuration-not-found':
      return 'Firebase não configurado. Preencha `src/config/firebaseConfig.js` ou habilite os emuladores.';
    default:
      return code ? `Erro: ${code}` : 'Erro desconhecido ao autenticar.';
  }
}

