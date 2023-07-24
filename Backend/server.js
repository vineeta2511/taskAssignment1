const dotenv = require("dotenv").config();
const express = require('express');
const connectDb = require('./config/dbConnection2');
const userRouter = require('./Routes/userRoutes')
//const techRouter = require('./Routes/techRoutes');
const projectRouter = require('./Routes/projectRoutes')

const app = express();
app.use(express.json());

app.use('/user', userRouter)
//app.use('/tech',techRouter)
app.use('/project', projectRouter)

connectDb();
const PORT = 4003;
app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
)   