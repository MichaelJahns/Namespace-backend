import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { firebaseConfig } from './config';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://namespace-88d70.firebaseio.com"
});
// It seems like every other deploy I get some sort of issue
// where components populated by functions.config() are undefined
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

export { admin, firebase, database };