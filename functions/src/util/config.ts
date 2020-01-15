import { config } from 'firebase-functions'
const firebaseConfig = {
    apiKey: config().namespace.key,
    authDomain: config().namespace.auth_domain,
    databaseURL: config().namespace.database_url,
    projectId: config().namespace.project_id,
    storageBucket: config().namespace.storage_bucket,
    messagingSenderId: config().namespace.messaging_sender_id,
    appId: config().namespace.app_id,
    measurementId: config().namespace.measurement_id
};
export { firebaseConfig };