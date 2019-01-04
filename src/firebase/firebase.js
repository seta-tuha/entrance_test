import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA2bVQwGhMfKg4zlE2CAH77KyIwJcTcfOg",
  authDomain: "entrance-test-seta.firebaseapp.com",
  databaseURL: "https://entrance-test-seta.firebaseio.com",
  projectId: "entrance-test-seta",
  storageBucket: "entrance-test-seta.appspot.com",
  messagingSenderId: "957244245225"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
