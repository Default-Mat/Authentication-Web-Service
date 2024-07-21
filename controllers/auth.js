const mysql = require('mysql2');

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3412909matin',
    database: 'accounts'
});

//Checking username and repeated password
exports.signup = (req, res) => {
    const {username, password, rpassword} = req.body;
    db.query('SELECT username FROM users WHERE username = ?', [username], (select_error, select_results) => {
        if(select_error) {
            console.log(select_error);
        }

        if(select_results.length > 0) {
            console.log('repeated username');
            return res.render('signup', {
                username_error_msg: 'The username ' + username + ' is already taken!'
            });
        }

        else if(password !== rpassword) {
            console.log('repeated password');
            return res.render('signup', {
                password_error_msg: 'The repeated password is not the same!'
            });
        }

        else {
            db.query('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], (insert_error, insert_results) => {
                if(insert_error) {
                    console.log(insert_error);
                }
                else {
                    console.log(insert_results);
                    return res.render('signup', {
                        signedup_msg: 'You signed up successfully!'
                    });
                }
            });
        }
    });
}