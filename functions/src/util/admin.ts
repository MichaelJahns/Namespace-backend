import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDhKI5mCL3K2p866aABnW63dZ-eWbFS3e8",
    authDomain: "namespace-88d70.firebaseapp.com",
    databaseURL: "https://namespace-88d70.firebaseio.com",
    projectId: "namespace-88d70",
    storageBucket: "namespace-88d70.appspot.com",
    messagingSenderId: "301430840067",
    appId: "1:301430840067:web:2245d5a5f08691b0a5a736",
    measurementId: "G-VGTKSNFLNW"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

export { firebase, database };