import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://namespace-88d70.firebaseio.com"
});
const database = admin.firestore();

export { admin, database };