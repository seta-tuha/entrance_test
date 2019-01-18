import 'firebase/auth';
import firebaseApp from '../../firebase';

const firebaseAuth = firebaseApp.auth();

export default {
    checkLoginSession() {
        return new Promise((resolve, reject) => {
            firebaseAuth.onAuthStateChanged(user => {
                resolve(user);
            })
        })
    },

    doLoginWithEmailAndPassword(email, password) {
        return firebaseAuth.signInWithEmailAndPassword(email, password)
    },

    doRegisterWithEmailAndPassword(email, password) {
        return firebaseAuth.createUserWithEmailAndPassword(email, password)
    },

    doSignOut() {
        firebaseAuth.signOut();
    }
}
