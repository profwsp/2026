## Firebase (Auth + Firestore + Storage) para o SIGALab

Este guia deixa o projeto pronto para atender os requisitos:

- **RF01**: autenticação (Firebase Auth)
- **RF02**: inventário (Firestore)
- **RF03**: reservas (Firestore)
- **RF04**: avarias com foto (Firestore + Storage)
- **RF05**: histórico (Firestore)

### 1) Criar projeto no Firebase

- Acesse o console do Firebase e crie um projeto.
- Ative:
  - **Authentication** → método **Email/Password**
  - **Firestore Database**
  - **Storage**

### 2) Copiar credenciais para o app

No Firebase Console:
- Projeto → Configurações → Seus apps → (Web) → copie o objeto de configuração.

No seu projeto:
- Copie `src/config/firebaseConfig.example.js` para `src/config/firebaseConfig.js`
- Cole os valores no objeto `firebaseConfig`.

### 3) Estrutura (coleções)

#### `users/{uid}`
- `uid`
- `displayName`
- `email`
- `role`: `aluno` | `professor` | `admin`
- `createdAt`

#### `equipments/{id}` (RF02)
- `name`
- `type`
- `serial` (opcional)
- `createdAt`, `updatedAt`

#### `reservations/{benchId}_{slotKey}` (RF03)
Exemplo de ID: `B01_2026-04-14_19-00`
- `benchId`
- `slotKey`
- `date` (YYYY-MM-DD)
- `start`, `end` (HH:MM)
- `userId`, `userEmail`, `userDisplayName`
- `createdAt`

#### `damageReports/{id}` (RF04)
- `description`
- `photoUrl`
- `photoPath`
- `status`: `aberto` | `em_analise` | `resolvido`
- `userId`, `userEmail`, `userDisplayName`
- `createdAt`

Storage:
- `damageReports/{uid}/{timestamp}.jpg`

### 4) Regras (sugestão didática)

Você pode começar permissivo para aula e depois evoluir.

#### Firestore rules (exemplo)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isOwner(uid) { return signedIn() && request.auth.uid == uid; }

    match /users/{uid} {
      allow read: if signedIn();
      allow create: if isOwner(uid);
      allow update: if isOwner(uid);
    }

    match /equipments/{id} {
      allow read: if signedIn();
      // Didático: controlar por role via regras e/ou painel do Firebase.
      allow write: if signedIn(); 
    }

    match /reservations/{id} {
      allow read: if signedIn();
      allow create: if signedIn();
      allow delete, update: if signedIn();
    }

    match /damageReports/{id} {
      allow read: if signedIn();
      allow create: if signedIn();
      allow update: if signedIn();
    }
  }
}
```

#### Storage rules (exemplo)

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /damageReports/{uid}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

### 5) Definir um admin (para testar RF02)

Após criar um usuário pelo app:
- No Firestore: `users/{uid}` → `role = "admin"`

