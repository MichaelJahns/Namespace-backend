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
    database
        .collection("characters")
        .where("id", "==", request.body.characterID)
        .get()
        .then((data) => {
            console.log(data);
        })
        .catch((err: any) => {
            console.error(err)
            response.status(500)
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
            console.error("Error adding document: ", error);
        });
}
const deleteCharacter = (request: any, response: any) => {
    const characterID = request.body.characterID;
    console.log(characterID);
    database
        .collection("characters")
        .doc(characterID)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
            return response
                .status(201)
                .json({ success: `Deleted character with id ${characterID}` })
        }).catch((error) => {
            console.error("Error removing document: ", error);
            return response
                .status(500)
                .json({ error: error.status })
        });
}

export { getAllCharacters, getCharacterByID, createCharacter, deleteCharacter };