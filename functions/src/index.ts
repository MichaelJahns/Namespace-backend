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
    createCharacter } = require('./handlers/characters');

//User Routes
app.post('/login', login);
app.post('/signup', signup);


//Character Routes
app.get('/characters', getAllCharacters);
app.get('/characters/:id', getCharacterByID);
app.post('/characters', createCharacter);

exports.api = functions.https.onRequest(app);