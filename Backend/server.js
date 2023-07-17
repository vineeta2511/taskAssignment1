const dotenv = require("dotenv").config();
const express = require('express');
const connectDb = require('./config/dbConnection');
const userRouter = require('./Routes/userRoutes')
const techRouter = require('./Routes/techRoutes');
const projectRouter = require('./Routes/projectRoutes')

const app = express();
app.use(express.json());

app.use('/api', userRouter)
app.use('/api', techRouter)
app.use('/api', projectRouter)

connectDb();
const PORT = process.env.PORT ;
app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
) 