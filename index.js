import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const port = 3000;

//this is for public folder on path /imagename.jpg
app.use(express.static('public'));

// JSON Data
// {"hello": "JSON is cool"}
// URL Encoded data
// hello=URLEncoded+is+cool

// JSON
app.use(express.json()); // Both can be setup
// URLEnconded
app.use(express.urlencoded({ extended: true }));

//this is for images folder on path /images/imagename.jpg
app.use('/images', express.static('images'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ROUTES 
app.get('/', (req, res) => {
    // get data first
    // return data to client
    // throw new Error();
    res.json(data);
    // res.redirect('/images/rocket.jpg') 
});

app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Get item from array Data, to use multiple parameters /:categoria/:id 
app.get('/item/:id', (req, res, next) => {

    // this is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);

    //middleware that uses the request(req) object
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type ${req.method}`);

    // everything above is middleware
    res.send(data[user]); // only 1 res per endpoint
    next();
}, (req, res) => {
    console.log('Did you get the right Data?');
});

app.post('/newItem2', (req, res) => {
    res.send(`<h1>Post Request a new Item</h1>`); // HTML response
});

app.put('/item', (req, res) => {
    res.send(`A put request with /item route on port ${port}`)
});

app.delete('/item', (req, res) => {
    res.send(`A delete request with /item route on port ${port}`)
});

// Error handling function: Always at the end before app.listen
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red Alert!: <br><br> ${err.stack}`)
});

// Runs on server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});