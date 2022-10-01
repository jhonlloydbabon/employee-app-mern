const PORT = 5000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const router = require('./routes/route');
app.use('/api/v1', router);

app.listen(PORT, ()=>{
    console.log(`Connected to port: ${PORT}`)
})