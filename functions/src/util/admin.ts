import * as admin from 'firebase-admin';
const config = require('./config');

admin.initializeApp(config);
const database = admin.firestore();

export { admin, database };