import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BookCard from './BookCard.jsx';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libros: [],
      buttons: [],
      titulo: '',
      editorial: '',
      autor: '',
      fecha: '',
      search: '',
      limit: 9,
      currentPage: 0,
      results: 0,
      pagesNumber: 1
    }
  }

  updateInputTitulo(ev) {this.setState({ titulo: ev.target.value });}

  updateInputAutor(ev) {this.setState({ autor: ev.target.value });}

  updateInputEditorial(ev) {this.setState({ editorial: ev.target.value });}

  updateInputFecha(ev) {this.setState({ fecha: ev.target.value });}

  getLibros() {
    let paramethers = {
      titulo: this.state.titulo,
      editorial: this.state.editorial,
      autor: this.state.autor,
      fecha: this.state.fecha
    };
    let empty = true;
    let search = '[]?';
    const params = ['titulo', 'autor', 'editorial', 'fecha'];

    params.forEach(param => {
      if(paramethers[param] !== '') {
        search += `${param}=${paramethers[param]}&`;
        empty = false;
      }
    }); 

    if(!empty) {
      this.setState({search: search});
      // params
      //[]? titulo, autor, editorial, count, limit
      //Esta consulta sólo pide el número de libros en esta búsqueda
      axios.get(`http://siabuc.ucol.mx:3001/api/fichas/busqueda/${search}&count`)
        .then(res => {
          this.setState({results: res.data[0].titulos});
          this.setState({pagesNumber: res.data[0].titulos / this.state.limit});

          let botones = []
          for (var i = 0; i < this.state.pagesNumber; i++) 
            botones.push(i);

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
    axios.get(`http://siabuc.ucol.mx:3001/api/fichas/busqueda/${this.state.search}&after=${after}&limit=${this.state.limit}`)
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

          <nav className="navbar navbar-dark bg-dark">
            <center>
              <h1 className="text-white">Búsquedas SIABUC</h1>
            </center>
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
                  onChange={ev => this.updateInputTitulo(ev)} 
                  onKeyDown={ev => this.keyPress(ev)}
                />
              </div>
              <div className="form-group">
                <label>Autor</label>
                <input 
                  name="autor" 
                  placeholder="Autor" 
                  className="form-control" 
                  value={this.state.autor} 
                  onChange={ev => this.updateInputAutor(ev)} 
                  onKeyDown={ev => this.keyPress(ev)}
                />
              </div>
              <div className="form-group">
                <label>Editorial</label>
                <input 
                  name="editorial" 
                  placeholder="Editorial" 
                  className="form-control" 
                  value={this.state.editorial} 
                  onChange={ev => this.updateInputEditorial(ev)} 
                  onKeyDown={ev => this.keyPress(ev)}
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
                  onChange={ev => this.updateInputFecha(ev)} 
                  onKeyDown={ev => this.keyPress(ev)}
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
          <span>results: {this.state.results}</span>
          <br/>
          <div className="row">
            { this.state.libros.map(libro => 
                <BookCard 
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

export default SearchForm;