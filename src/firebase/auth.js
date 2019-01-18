import Firebase from './firebase';

export const login = (email, password) =>
  Firebase.auth.signInWithEmailAndPassword(email, password)

