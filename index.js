const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(3000, () => { console.log('Server started at port 3000'); });

const mainController = require('./controllers/main');
const songsController = require('./controllers/songs');
const artistsController = require('./controllers/artists');
const albumController = require('./controllers/albums');
const genresController = require('./controllers/gender');


app.get('/', mainController.home);
app.get('/generos', genresController.findAll)
app.get('/canciones', songsController.findOne)

app.post('/genero', genresController.createGenero)
app.post('/artistas', artistsController.createArtist);
app.post('/albumes', albumController.createAlbum);
app.post('/canciones', songsController.createSong);

app.put('/canciones/:id', songsController.editSong);

app.delete('/canciones/:id', songsController.deleteSongById);