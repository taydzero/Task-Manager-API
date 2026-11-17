const userService = require('../service/userService');
const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) =>{
    try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
    } 
    catch (error) {
        if(error.message === 'user not found'){
            res.status(404).json({ error: error.message })
        } 
        else {
            res.status(500).json({ error: error.message })
        }
    }   
})

router.post('/', async(req, res) => {
    try{
        const userId = Date.now().toString();
        const userData = req.body;
        await userService.createUser(userId, userData);
        res.status(201).json({
            message: 'User created successfully',
            userId: userId
        });
    } catch(error){
        res.status(500).json({ error: error.message })
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const userId = req.params.id;
        const updateUserData = req.body;
        await userService.updateUser(userId, updateUserData);
        res.status(200).json({
            message: 'User updated successfully',
        })
    } catch(error){
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async(req, res) => {
    try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({
        message: 'User deleted successfully'
    })
    } 
    catch (error) {
        if(error.message === 'user not found'){
            res.status(404).json({ error: error.message })
        } 
        else {
            res.status(500).json({ error: error.message })
        }
    }   
})

module.exports = router;