//"start": "react-scripts start",
import React from 'react'  
import { renderToString } from 'react-dom/server'
import express from 'express'
const app = express();
const PORT = process.env.PORT || 3000;

// Traemos el componente
import Component from './src/libros.js'  
// Lo pasamos a string
const App = renderToString(<Component />)

// Lo enviamos al entrar en la ruta, es decir el HTML compilado
app.get('/libro', (req, res) => {  
  res.send(App);
})

app.use(express.static(path.join(__dirname,'/public')));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));