const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();

app.use( express.json() );

const posts = [
    { email: "achraf", post: "I like javascript" },
    { email: "othman", post: "I like Python" }
];

function authUser(req, res, next){
    
    const authHeader = req.headers["authorization"];

    const token = authHeader.split(' ')[1];

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, (err, encoded) => {
        if ( err ) return res.sendStatus(401);

        req.email = encoded.email;
        next();
    } );

    

    
}

app.get('/posts', authUser, (req, res) => {
    const email = req.email;

    const post = posts.filter( (p) => p.email === email );

    res.json(post);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if ( email == process.env.EMAIL1 && password == process.env.PASSWORD1 ){
        const accessToken = jwt.sign( { email : email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" } );

        res.json({ accessToken: accessToken });
        return;
    }
    if ( email == process.env.EMAIL2 && password == process.env.PASSWORD2 ){
        const accessToken = jwt.sign( { email : email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" } );

        res.json({ accessToken: accessToken });
        return;
    }

    res.json( { message: "Not allowed" } );
})


app.listen(82, () => console.log("server is runnnig on port 82"));