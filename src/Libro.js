import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from './card.js';

class Libro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libros: [],
      titulo: '',
      autor: ''
    }
  }

  updateInputTitulo(evt) {
    this.setState({
      titulo: evt.target.value
    });
  }

  updateInputAutor(evt) {
    this.setState({
      autor: evt.target.value
    });
  }

  getLibros() {
    console.log(this.state.titulo);
    console.log(this.state.autor);
    let titulo = this.state.titulo;
    let autor = this.state.autor;

    if(titulo === '') {
      if(autor !== '')
        titulo = '[]?autor=' + autor;          
    }
    else {
      if(autor !== '')
        titulo += '?autor=' + autor;  
    }

    axios.get(`http://siabuc.ucol.mx:3001/api/fichas/busqueda/${titulo}`)
      .then(res => {
        res.data.pop();
        const libros = res.data;  
        this.setState({libros});
        this.libros
      })
      .catch(err => console.log(err))
  }

  keyPress(ev) {
    if(ev.keyCode == 13) {
      this.getLibros();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4">
            <div className="form-group">
              <label>Título</label>
              <input name="titulo" placeholder="Título" className="form-control" value={this.state.titulo} onChange={evt => this.updateInputTitulo(evt)} onKeyDown={evt => this.keyPress(evt)}/>
            </div>
            <div className="form-group">
              <label>Autor</label>
              <input name="autor" placeholder="Autor" className="form-control" value={this.state.autor} onChange={evt => this.updateInputAutor(evt)} onKeyDown={evt => this.keyPress(evt)}/>
            </div>
            <div className="form-group">
              <input type="button" className="form-control btn btn-success" value="Buscar" onClick={e => this.getLibros()}/>
            </div>
          </div>  
        </div>
        <div className="row">
          { this.state.libros.map(libro => <Card titulo={libro.titulo} autor={libro.autor} portada={libro.portada || 'http://localhost:3000/default-libro.jpg'} fecha={libro.fecha}  clasificacion={libro.clasificacion}/>)}
        </div>
      </div>
    );
  }
}

export default Libro;