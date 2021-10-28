//utils
const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const mockUsers = require('./usersMock.json');

//instantiate processes
const app = express();

app.use(compression()); //gzip compression
app.use(express.static(path.join(__dirname, '../public'), { etag: true, maxAge: '5000' }));


app.get('/users', function (req, res) {
    res.send({ users: mockUsers });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/bundle.js'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server listening")
});