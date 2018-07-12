import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class BookCard extends Component { 
  showPreview(isbn) {
    console.log("isbn: ", isbn)
  }

  render() {
  const imgStyle = {height: "300px", width: "100%"};
  const columStyle = {marginBottom: "2rem"}
  const maxHeight = {height: "100%"}
  const titleStyle = {color: "#0056b3", textDecoration: "underline"}
    return (
      <div className="col-sm-12 col-md-6 col-lg-4" style={columStyle}>
        <div className="card" style={maxHeight}>
          <div className="card">
            <img className="card-img-top img-thumbnail" style={imgStyle} src={this.props.portada} alt={this.props.clasificacion}></img>
          </div>
          <div className="card-body">
            <a 
              href="#" 
              onClick={ev => {this.showPreview(this.props.isbn)}}
              className="h3" 
              style={titleStyle}  
            >{this.props.titulo}</a>
            <p className="card-text">{this.props.editorial}</p>
            <p className="card-text">{this.props.fecha}</p>
            <span className="card-text pull-right">{this.props.autor}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;