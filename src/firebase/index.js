import React from 'react';
import FirebaseContext from './context';
import Firebase from './firebase';

export default Firebase;

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext };
