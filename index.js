const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser')
const db = require("./db/db.js");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bc = require("./db/bcrypt.js")
const bcrypt = require('./db/bcrypt')
const csurf = require('csurf')
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require("./s3");
const config = require("./config");
const server = require('http').Server(app);

let domain
if (process.env.NODE_ENV == "production") {
    domain = 'https://null.com:*'
} else {
    domain = 'localhost:8082'
}

// const io = require('socket.io')(server, { origins: domain });

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const sessMiddleware = cookieSession({
       secret: `I'm always angry.`,
       maxAge: 1000 * 60 * 60 * 24 * 14
   })

app.use(sessMiddleware);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(express.static("./public"))

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////// ROUTES ///////////////////

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8082, function() {
    console.log("I'm listening.");
});
