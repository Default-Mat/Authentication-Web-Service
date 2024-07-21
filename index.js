const express = require('express');
//const body_parser = require('body-parser');
const mysql = require('mysql2');

//Database connection and error handling
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3412909matin',
    database: 'accounts'
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
app.use('/auth', require('./routes/auth'));

// app.get('/', (req, res) => {
//     res.render('signup')
// });

// app.get('/signup', (req, res) => {
//     const {username, password, rpassword} = req.body
//     db.query('SELECT username FROM users WHERE username = ?', [username], (error, ress))
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});