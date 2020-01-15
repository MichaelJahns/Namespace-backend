import { admin, database } from './admin';

const firebaseAuth = (request: any, response: any, next: any) => {
    let idToken;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return response.status(403).json({ error: 'No token found' });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken: any) => {
            request.user = decodedToken;
            return database
                .collection('users')
                .where('userId', '==', request.user.uid)
                .limit(1)
                .get();
        })
        .then((data: any) => {
            request.user.displayName = data.docs[0].data().displayName;
            console.log("User Authenticated");
            return next();
        })
        .catch((err: any) => {
            console.error('Error while verifying token', err);
            return response.status(403).json(err);
        });
}

export { firebaseAuth };