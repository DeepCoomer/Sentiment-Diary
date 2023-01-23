const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const port = 5000;

const mongoURI = process.env.URI;

// Middlewares

app.use(cors());
app.use(express.json());

// Connecting to mongodb

mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongodb Succesfully")
})

// routes

app.use("/api/auth",require('./routes/auth'));
app.use("/api/diary",require('./routes/diary'));

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`)
})