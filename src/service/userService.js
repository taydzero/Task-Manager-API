const { client } = require('../config/redis');

async function createUser(userId, userData) {
    const key = `user:${userId}`;
    await client.hSet(key, userData);
}

async function updateUser(userId, updateUserData) {
    const key = `user:${userId}`;
    await getUser(userId);
    await client.hSet(key, updateUserData);
}

async function getUser(userId) {
    
    const key = `user:${userId}`;
    const user = await client.hGetAll(key);
    if (Object.keys(user).length === 0){
        throw new Error('user not found');
    }
    return user;
}

async function deleteUser(userId) {
    await getUser(userId);
    const key = `user:${userId}`;
    await client.del(key);
}

async function deleteUserField(userId, field) {
    await getUser(userId);
    const key = `user:${userId}`;
    await client.hDel(key, field);
}

module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteUser,
    deleteUserField
}