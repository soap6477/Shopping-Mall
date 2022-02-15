"use strict";

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const app = express();

// 라우팅
const home = require('./src/routes');

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // URL을 통해 전달되는 데이터에 한글, 공백 깨짐 현상 해결

app.use(session({                   // 세션 설정
    secret: 'asdkjasd!@#!*&$%!312',
    resave: false,
    saveUninitialized: true,
    store: new mysqlstore({
        user : 'root',
        password : 'node',
        database : 'mall'
    })
}));

app.use("/", home); // 미들웨어 등록 메서드

module.exports = app;