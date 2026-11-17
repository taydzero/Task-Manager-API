const { connectRedis } = require('./config/redis');
const userRoutes = require('./routes/userRoutes');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

async function startServer() {
    try{
    await connectRedis();
    app.listen(3000, () => {
    console.log('Server running on port 3000');
    });
    } catch(error) {
       console.log('Error:', error.message);
       process.exit(1);
    }
}

startServer();