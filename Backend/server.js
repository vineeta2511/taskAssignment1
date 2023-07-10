const express = require('express');
const cors = require('cors');
const connectDb = require('./config/dbConnection');
const {userRouter} = require('./Routes/userRoutes')
const {techRouter} = require('./Routes/techRoutes')

const app = express();
app.use(express.json());

app.use('/api', userRouter)
app.use('/api',techRouter)

connectDb();
const port = 4000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
)