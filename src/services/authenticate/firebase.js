import Firebase from 'services/firebase';


// eslint-disable-next-line
export const login = (email, password) =>
  Firebase.auth.signInWithEmailAndPassword(email, password);
