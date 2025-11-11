import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { database } from './firebase';

const auth = getAuth();

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create admin role in database
    await set(ref(database, `user_roles/${userCredential.user.uid}`), {
      role: 'admin',
      email: email,
      createdAt: new Date().toISOString()
    });
    
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if user has admin role
    const roleSnapshot = await get(ref(database, `user_roles/${userCredential.user.uid}`));
    if (!roleSnapshot.exists() || roleSnapshot.val().role !== 'admin') {
      await signOut(auth);
      return { user: null, error: 'Unauthorized access' };
    }
    
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export { auth };
