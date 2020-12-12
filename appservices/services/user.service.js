const uuidv4  = require('../common/uuid');
const familyService = require('./family.service');

const users = [];
const tokens = [];

module.exports = {
    authenticate,
    createUser,
    validate
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const userWithoutPassword = { id, username, firstName, lastName } = user;
        var token = tokens.find(u=> u.uid === userWithoutPassword.id);
        if(!token)
            tokens.push({id: uuidv4(),uid:userWithoutPassword.id});
        let family = await familyService.getOnlyFamily(userWithoutPassword);
        return {user: userWithoutPassword,family,token: tokens.find(u=> userWithoutPassword.id === u.uid).id};
    }
    return null;
}

async function createUser(userObj) {
    try{
        userObj['id'] = uuidv4();
        var tokenId = uuidv4();
        userObj['token'] = tokenId;
        tokens.push({id: tokenId,uid:userObj.id});
        users.push(userObj);
        familyService.createFamily(userObj.id);
        return userObj;
    }catch(e){
        console.log("Error while creating user");
    }
    
}

async function validate(tokenId) {
    try{
        const toeken = tokens.find(u=> u.id === tokenId);
        if(!toeken)
            return null;
        
        const user = users.find(u => u.id === toeken.uid);
        if (user) {
            const userWithoutPassword = { id, username, firstName, lastName } = user;
            let family = await familyService.getOnlyFamily(userWithoutPassword);
            userWithoutPassword["family"] = family;
            return userWithoutPassword;
        }    
    }catch(e){
        console.log("Error while validating user");
    }
    
}