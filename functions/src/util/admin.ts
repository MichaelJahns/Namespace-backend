import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://namespace-88d70.firebaseio.com"
});
// It seems like every other deploy I get some sort of issue
// where components populated by functions.config() are undefined
const database = admin.firestore();

export { admin, database };