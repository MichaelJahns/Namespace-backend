import { database } from '../util/admin';

// Works
const getAllCharacters = (request: any, response: any) => {
    database
        .collection("characters")
        .where("campaign", "==", "iqNOydMMd4hJY5uxmveW")
        .get()
        .then((querySnapshot: any) => {
            const characters: any[] = []
            querySnapshot.forEach((doc: any) => {
                characters.push({
                    characterID: doc.id,
                    data: doc.data()
                })
            })
            return response.json(characters);
        })
        .catch((err: any) => {
            console.error(err)
            response.status(500)
        })
}

const getCharacterByID = (request: any, response: any) => {
    const characterID = request.body.characterID;
    console.log(request.body);
    database
        .collection("characters")
        .where("id", "==", characterID)
        .get()
        .then((querySnapshot: any) => {
            const characters: any[] = []
            querySnapshot.forEach((doc: any) => {
                characters.push({
                    characterID: doc.id,
                    data: doc.data()
                })
            })
            return response.json(characters);
        })
        .catch((err: any) => {
            response
                .status(500)
                .json({ error: err.code })
        })
}

const createCharacter = (request: any, response: any) => {
    const newCharacter = {
        name: request.body.name,
        title: request.body.title
    }
    database
        .collection("characters")
        .add(newCharacter)
        .then((docRef) => {
            return response
                .status(201)
                .json({ id: docRef.id });
        })
        .catch((error) => {
            return response
                .status(500)
                .json({ error: error.code })
        });
}
const deleteCharacter = (request: any, response: any) => {
    const characterID = request.body.characterID;
    database
        .collection("characters")
        .doc(characterID)
        .delete()
        .then(() => {
            return response
                .status(200)
                .json({ delete: `character with id ${characterID} has been deleted` })
        }).catch((error) => {
            return response
                .status(500)
                .json({ error: error.code })
        });
}

export { getAllCharacters, getCharacterByID, createCharacter, deleteCharacter };