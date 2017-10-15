// TODO read from database instead of local data
// or add an option to use local or database

import Promise from 'bluebird';

import character from '../data/character.json';

export default {

    /**
     * Read the character from data
     * @return {Promise} Promise that returns when the character data is read
     */
    readCharacter() {
        return new Promise((resolve, reject) => {
            resolve(character);
        });
    }

};
