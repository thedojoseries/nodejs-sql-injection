const express = require('express');
const app = express();
const config = require('./config/config.json');

var mysql = require('mysql');
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : config.db_password,
    database : 'pentest',
    multipleStatements: true
});

connection.connect();

app.get('/user/:id', function(req, res) {
    const query = `SELECT username FROM USERS where id = ${req.params.id};`;
    console.log(query);

    connection.query(query, function (error, results, fields) {
        if (error) throw error;

        console.log(results);

        let arr = [];
        results.forEach(e => {
            console.log(e);

            if (e instanceof Object && 'username' in e) {
                arr.push(e.username);
            } else if (e instanceof Array && 'username' in e[0]) {
                arr.push(e[0].username);
            }
        });

        console.log(arr);

        res.send(arr);
    });
});

app.get(config.passwordEndpoint, function(req, res) {
    res.set('X-Password', config.password);
	res.send("Ok");
})

app.listen(3000, function() {
    console.log('Server is running...');
});
