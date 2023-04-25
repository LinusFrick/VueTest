const crypto = require('crypto');
const salt = "keyboardcat".toString('hex');

function getHash(password){
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return hash
}

module.exports = getHash;