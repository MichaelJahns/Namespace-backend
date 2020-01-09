import * as functions from 'firebase-functions';
import * as express from 'express'

const app = express();

// Import Handlers
const { signup } = require('./handlers/users');
const {
    getAllCharacters,
    getCharacterByID,
    createCharacter } = require('./handlers/characters');



//User Routes
app.post('/signup', signup);
app.get('/signup', (request, response) => {
    return response.json("I exist");
})

//Character Routes
app.get('/characters', getAllCharacters);
app.get('/characters/:id', getCharacterByID);
app.post('/characters', createCharacter);

exports.api = functions.https.onRequest(app);