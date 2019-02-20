import Firebase from 'services/firebase';


// eslint-disable-next-line
export const login = (email, password) =>
  Firebase.auth.signInWithEmailAndPassword(email, password);

export const getRole = (uid, onComplete) => {
  const roleRef = Firebase.db.ref(`roles/${uid}`);
  roleRef.once('value', (snapshot) => {
    onComplete(snapshot.val());
  });
};
