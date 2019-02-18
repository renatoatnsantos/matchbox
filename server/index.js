const express = require('express');
const app = express();
const cors = require('express-cors')

app.use(cors({
    allowedOrigins: [
        'http://localhost:3001'
    ]
}))

app.set('port' , process.env.PORT || 3000);

app.listen(app.get('port'), (err) => {
    if (err) throw err;
    console.log('Server *-*')
});

const obgJson = require('../routes/index')
app.use(obgJson)

app.use(express.static('public'))