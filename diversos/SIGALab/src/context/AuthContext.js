import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase';
import { ROLES } from '../config/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u || null);
      if (!u) {
        setProfile(null);
        setInitializing(false);
        return;
      }

      try {
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          const fallback = {
            uid: u.uid,
            displayName: u.displayName || '',
            email: u.email || '',
            role: ROLES.ALUNO,
            createdAt: serverTimestamp(),
          };
          await setDoc(ref, fallback);
          setProfile(fallback);
        }
      } finally {
        setInitializing(false);
      }
    });
    return () => unsub();
  }, []);

  const actions = useMemo(() => {
    return {
      async login(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
      },

      async register({ displayName, email, password, role }) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }
        const ref = doc(db, 'users', cred.user.uid);
        const data = {
          uid: cred.user.uid,
          displayName: displayName || '',
          email,
          role: role || ROLES.ALUNO,
          createdAt: serverTimestamp(),
        };
        await setDoc(ref, data);
        setProfile(data);
      },

      async logout() {
        await signOut(auth);
      },
    };
  }, []);

  const value = useMemo(() => {
    return {
      initializing,
      user: firebaseUser,
      profile,
      ...actions,
      isAuthenticated: !!firebaseUser,
      role: profile?.role || null,
      isAdmin: profile?.role === ROLES.ADMIN,
      isProfessor: profile?.role === ROLES.PROFESSOR,
    };
  }, [actions, firebaseUser, initializing, profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

