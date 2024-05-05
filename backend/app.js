const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
const userRouter = require('./routes/userRoutes');

app.use('/api/user', userRouter);

//mongodb connection code + server listening code
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error("db error ::: ",error.message))
db.once('open', () => {
    console.log("database connected...")
    app.listen(process.env.PORT, () => console.log("Server started @ http://localhost:"+process.env.PORT));
})
