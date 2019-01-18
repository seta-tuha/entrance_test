import app from 'firebase/app';
const config = {
  apiKey: "AIzaSyA2bVQwGhMfKg4zlE2CAH77KyIwJcTcfOg",
  authDomain: "entrance-test-seta.firebaseapp.com",
  databaseURL: "https://entrance-test-seta.firebaseio.com",
  projectId: "entrance-test-seta",
  storageBucket: "entrance-test-seta.appspot.com",
  messagingSenderId: "957244245225"
};

export default app.initializeApp(config);
