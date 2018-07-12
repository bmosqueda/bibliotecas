import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from './card.jsx';

class Libro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libros: [],
      buttons: [],
      titulo: 'Javascript',
      editorial: '',
      autor: '',
      fecha: '',
      busqueda: '',
      limit: 9,
      currentPage: 0,
      resultados: 0,
      pagesNumber: 1,
      lastPage: 0
    }
  }

  updateInputTitulo(evt) {this.setState({ titulo: evt.target.value });}

  updateInputAutor(evt) {this.setState({ autor: evt.target.value });}

  updateInputEditorial(ev) {this.setState({ editorial: ev.target.value });}

  updateInputFecha(evt) {this.setState({ fecha: evt.target.value });}

  getLibros() {
    console.log(this.state.titulo);
    console.log(this.state.autor);
    console.log(this.state.editorial);
    let parametros = {
      titulo: this.state.titulo,
      autor: this.state.autor,
      editorial: this.state.editorial,
      fecha: this.state.fecha
    }
    let empty = true;
    let busqueda = '[]?';
    const params = ['titulo', 'autor', 'editorial', 'fecha'];

    params.forEach(param => {
      if(parametros[param] !== '') {
        busqueda += `${param}=${parametros[param]}&`;
        empty = false;
      }
    }); 

    console.log(parametros);
    console.log(busqueda);

    if(!empty) {
      this.setState({busqueda: busqueda});
      // params
      //[]? titulo, autor, editorial, count, limit
      axios.get(`http://siabuc.ucol.mx:3001/api/fichas/busqueda/${busqueda}&count`)
        .then(res => {
          this.setState({resultados: res.data[0].titulos});
          console.log('res.data[0].titulos ', res.data[0].titulos);
          console.log('this.state.limit ',this.state.limit);
          this.setState({pagesNumber: res.data[0].titulos / this.state.limit});
          console.log('this.state.pagesNumber', this.state.pagesNumber);
          let botones = []
          for (var i = 0; i < this.state.pagesNumber; i++) {
            botones.push(i);
          }
          console.log('botones: ', botones);
          this.setState({buttons: botones});
          this.setState({currentPage: 0});
          this.getLibrosPerPage(0);
        })
        .catch(err => console.log(err))
    }
    else
      alert('Debes de llenar por lo menos un campo de búsqueda');
  }

  getLibrosPerPage(after) {
    this.setState({currentPage: after});
    after *= this.state.limit;
    axios.get(`http://siabuc.ucol.mx:3001/api/fichas/busqueda/${this.state.busqueda}&after=${after}&limit=${this.state.limit}`)
      .then(res => {
        res.data.pop(); 
        const libros = res.data;  
        this.setState({libros});
        console.log(this.state.libros);
      })
      .catch(err => console.log(err))
  }

  toBeforePage() {
    let current = this.state.currentPage;
    if(current > 0) {
      current--;
      this.setState({currentPage: current});
      this.getLibrosPerPage(current);
    }
  }

  toNextPage() {
    let current = this.state.currentPage;
    if(current < this.state.pagesNumber - 1) {
      current++;
      this.setState({currentPage: current});
      this.getLibrosPerPage(current);
    }
  }

  keyPress(ev) {
    if(ev.keyCode === 13) {
      this.getLibros();
    }
  }

  render() {
    return (
      <div>

          <nav class="navbar navbar-dark bg-dark text-center">
            <h1 className="text-white">Búsquedas SIABUC</h1>
          </nav>
        <div className="container">
          <div className="row">
            <div className="col-6 offset-3">
              <span className="text-muted">**Se puede buscar por 1 o todos los campos**</span>
              <div className="form-group">
                <label/>Título
                <input 
                  name="titulo" 
                  placeholder="Título" 
                  className="form-control" 
                  value={this.state.titulo} 
                  onChange={evt => this.updateInputTitulo(evt)} 
                  onKeyDown={evt => this.keyPress(evt)}
                />
              </div>
              <div className="form-group">
                <label>Autor</label>
                <input 
                  name="autor" 
                  placeholder="Autor" 
                  className="form-control" 
                  value={this.state.autor} 
                  onChange={evt => this.updateInputAutor(evt)} 
                  onKeyDown={evt => this.keyPress(evt)}
                />
              </div>
              <div className="form-group">
                <label>Editorial</label>
                <input 
                  name="editorial" 
                  placeholder="Editorial" 
                  className="form-control" 
                  value={this.state.editorial} 
                  onChange={evt => this.updateInputEditorial(evt)} 
                  onKeyDown={evt => this.keyPress(evt)}
                />
              </div>
              <div className="form-group">
                <label>Año</label>
                <input 
                  name="fecha" 
                  className="form-control" 
                  type="number"
                  max="2030"
                  min="1950"
                  onChange={evt => this.updateInputFecha(evt)} 
                  onKeyDown={evt => this.keyPress(evt)}
                />
              </div>
              <div className="form-group">
                <input 
                  type="button" 
                  className="form-control btn btn-success" 
                  value="Buscar" 
                  onClick={e => this.getLibros()}
                />
              </div>
            </div>  
          </div>
          <span>Resultados: {this.state.resultados}</span>
          <br/>
          <div className="row">
            { this.state.libros.map(libro => 
                <Card 
                  titulo={libro.titulo} 
                  autor={libro.autor} 
                  libro={libro.isbn} 
                  portada={libro.portada || 'http://localhost:3000/default-libro.jpg'} 
                  fecha={libro.fecha}  
                  clasificacion={libro.clasificacion}
                />
              )
            }
          </div>
          <div className="container">
            <div className="row">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a 
                    className="page-link" 
                    onClick={ev => {this.toBeforePage()}}
                  >Anterior</a>
                </li>
                { 
                  this.state.buttons.map((btn, index) => 
                    <li className="page-item">
                      <a 
                        className="page-link" 
                        onClick={ev => {this.getLibrosPerPage(index)}}
                      >{index + 1}</a>
                    </li>
                  )
                }
                <li>
                  <a 
                    className="page-link" 
                    onClick={ev => {this.toNextPage()}}
                  >Next</a>
                </li>
              </ul>
              <span>Página actual: {this.state.currentPage + 1}</span>
            </nav>
            </div>
          </div> 
        <br/>
        <br/>
        </div>
        
      </div>
    );
  }
}

export default Libro;