const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/');
const bodyParser = require('body-parser');
const cors = require('cors');

//crear el servidor
const app = express();

//conectar a mongodb
mongoose.Promise = global.Promise;
//Si lo tienes local, la direccion siempre va a ser:
mongoose.connect('mongodb://localhost/veterinaria', { //veterinaria => nombre de la base de datos
    //mongo requiere de estos parámetros
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//configurar cors
const whiteList = ['http://localhost:3000','http://localhost:4000'];
const corsOptions = {
    Origin: (origin, callback) => {
        const existe = whiteList.some(dominio => dominio === origin);

        if (existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use( cors(corsOptions) );


//habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas
app.use('/', routes());


//puerto y arrancar el servidor con un callback

app.listen(4000, () => {
    console.log('Servidor funcionando');
})