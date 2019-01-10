import Firebase from 'services/firebase';

export const login = (email, password) =>
  Firebase.auth.signInWithEmailAndPassword(email, password)
