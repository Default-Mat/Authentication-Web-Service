const mysql = require('mysql2');

//Database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

exports.signup = (req, res) => {
    const {username, password, rpassword} = req.body;
    db.query('SELECT username FROM users WHERE username = ?', [username], (select_error, select_results) => {
        if(select_error) {
            console.log(select_error);
        }
        
        //Checking username and repeated password
        if(select_results.length > 0) {
            console.log('repeated username');
            return res.render('signup', {
                error_message: 'The username ' + username + ' is already taken'
            });
        }

        else if(password !== rpassword) {
            console.log('repeated password');
            return res.render('signup', {
                error_message: 'The repeated password is not the same'
            });
        }

        //If everything is in order, send the info to database
        else {
            db.query('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], (insert_error, insert_results) => {
                if(insert_error) {
                    console.log(insert_error);
                }
                else {
                    console.log(insert_results);
                    return res.render('signin', {
                        signedup_message: 'You signed up successfully'
                    });
                }
            });
        }
    });
}

exports.signin = (req, res) => {
    const {username, password} = req.body; 
    db.query('SELECT username FROM users WHERE username = ? AND password = ?', [username, password], (error, result) => {
        if(error) {
            console.log(error);
        }

        if(result.length > 0) {
            res.cookie('username', username);
            res.render('mainpage', {
                username: username
            });
        }

        else{
            res.render('signin', {
                error_message: 'The entered username or password is incorrect'
            });
        }
    });
}

exports.signout = (req, res) => {
    res.clearCookie('username');
    res.render('mainpage');
}