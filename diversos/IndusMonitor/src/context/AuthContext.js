import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapUserData = (authUser, userDocSnap) => {
    const roleFromDb = userDocSnap && userDocSnap.exists() ? userDocSnap.data().role : null;
    const role = roleFromDb || 'aluno';

    return {
      uid: authUser.uid,
      email: authUser.email,
      displayName:
        userDocSnap && userDocSnap.exists()
          ? userDocSnap.data().displayName
          : authUser.displayName || 'Usuário',
      role,
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          // Obter dados adicionais do usuário do Firestore
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          const userData = mapUserData(authUser, userDocSnap);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Erro ao recuperar dados do usuário:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const authResult = await signInWithEmailAndPassword(auth, email, password);
      
      // Obter dados adicionais do usuário
      const userDocRef = doc(db, 'users', authResult.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      const userData = mapUserData(authResult.user, userDocSnap);
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email, password, displayName, role) => {
    try {
      setError(null);
      const authResult = await createUserWithEmailAndPassword(auth, email, password);
      
      // Salvar dados adicionais no Firestore
      const userDocRef = doc(db, 'users', authResult.user.uid);
      await setDoc(userDocRef, {
        displayName,
        email,
        role: role || 'aluno',
        createdAt: new Date(),
      });
      
      const userData = {
        uid: authResult.user.uid,
        email: authResult.user.email,
        displayName,
        role: role || 'aluno',
      };
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
