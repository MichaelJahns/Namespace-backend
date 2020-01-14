import * as firebase from 'firebase';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: functions.config().namespace.key,
    authDomain: functions.config().namespace.auth_domain,
    databaseURL: functions.config().namespace.database_url,
    projectId: functions.config().namespace.project_id,
    storageBucket: functions.config().namespace.storage_bucket,
    messagingSenderId: functions.config().namespace.messaging_sender_id,
    appId: functions.config().namespace.app_id,
    measurementId: functions.config().namespace.measurement_id
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

export { admin, firebase, database };