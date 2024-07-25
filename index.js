const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config({path: './.env'});

//Database connection and error handling
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});
db.connect((error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log('MYSQL connected.')
    }
});

//Express app configs
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'hbs');

//Routes
app.use('/', require('./routes/pages'));
app.use('/signup-page', require('./routes/pages'));
app.use('/signin-page', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});