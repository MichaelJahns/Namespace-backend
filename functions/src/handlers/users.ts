import { database } from '../util/admin';
import * as firebase from 'firebase';
import { validateSignupData, validateLoginData } from '../util/validators';

// Works
const signup = (request: any, response: any) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        displayName: request.body.displayName
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return response.status(400).json(errors);
    let token: string, userId: string;

    database
        .doc(`/users/${newUser.displayName}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                // TODO: I want names like Discord 'Todd@4975'
                return response
                    .status(400)
                    .json({ displayName: `this displayName is already taken` });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                email: newUser.email,
                displayName: newUser.displayName,
                createdAt: new Date().toISOString(),
                userId
            }
            return database.doc(`/users/${newUser.displayName}`).set(userCredentials);
        })
        .then(() => {
            return response
                .status(201)
                .json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return response
                    .status(400)
                    .json({ email: 'Email is already in use' });
            } else {
                return response
                    .status(500)
                    .json(err);
            }
        });
};

// Works
const login = (request: any, response: any) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(user);

    if (!valid) return response
        .status(400)
        .json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data: any) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token })
        })
        .catch((err) => {
            if (err.code === "auth/wrong-password") {
                response
                    .status(403)
                    .json({ general: "Invalid Credentials" })
            }
            return response
                .status(500)
                .json({ error: err.code })
        });
};

export { signup, login };