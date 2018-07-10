//http://siabuc.ucol.mx:3001/api/fichas/busqueda?searchString=afsasdf
const express = require('express');
const path = require('path');
 
const app = express();

app.get('/prueba', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/'));
  console.log('En prueba');
});

app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/views')));
app.use(express.static(path.join(__dirname,'/node_modules/axios/dist')));

app.listen(3000);