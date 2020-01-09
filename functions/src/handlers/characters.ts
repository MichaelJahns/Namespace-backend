import { database } from '../util/admin';

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
        .doc()
        .set({ newCharacter })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

export { getAllCharacters, getCharacterByID, createCharacter };