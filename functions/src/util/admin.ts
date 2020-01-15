import * as firebase from 'firebase';
const admin = require('firebase-admin');
const firebaseConfig = require('./config');


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://namespace-88d70.firebaseio.com"
});

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

export { admin, firebase, database };