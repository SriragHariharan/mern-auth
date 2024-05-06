const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

//routes
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

//mongodb connection code + server listening code
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error("db error ::: ",error.message))
db.once('open', () => {
    console.log("database connected...")
    app.listen(process.env.PORT, () => console.log("Server started @ http://localhost:"+process.env.PORT));
})
