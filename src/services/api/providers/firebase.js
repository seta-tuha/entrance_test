import firebaseApp from 'services/firebase';
import 'firebase/database';

const firebaseDB = firebaseApp.database();

export default {
    getUserRoles(uid) {
        return new Promise((resolve, reject) => {
            firebaseDB.ref(`roles/${uid}`).on(
                'value',
                (snapshot) => resolve(snapshot.val()),
                (error) => reject(error)
            );
        })
    },
    createQuestion() {

    },
    updateQuestion() {

    },
    submitResult() {

    }
}
