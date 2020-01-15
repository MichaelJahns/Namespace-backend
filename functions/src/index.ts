import * as functions from 'firebase-functions';
import * as express from 'express'

const app = express();
require('dotenv').config();


// Import Handlers
const {
    signup,
    login } = require('./handlers/users');
const {
    getAllCharacters,
    getCharacterByID,
    createCharacter,
    deleteCharacter } = require('./handlers/characters');
const { firebaseAuth } = require('./util/firebaseAuth');

//User Routes
app.post('/login', login);
app.post('/signup', signup);

app.route('/characters')
    .get(getAllCharacters)
    .post(firebaseAuth, createCharacter)
    .delete(firebaseAuth, deleteCharacter);


app.get('/test', getCharacterByID);

exports.api = functions.https.onRequest(app);