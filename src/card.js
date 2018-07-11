import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Card extends Component {
  render() {
  const cardStyle = {width: "18rem"};
  const imgStyle = {height: "300px", width: "100%"};
  const columStyle = {marginBottom: "2rem"}
  const maxHeight = {height: "100%"}
    return (
      <div className="col-4" style={columStyle}>
        <div className="card" style={maxHeight}>
          <div className="card">
            <img className="card-img-top img-thumbnail" style={imgStyle} src={this.props.portada} alt={this.props.clasificacion}></img>
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.titulo}</h5>
            <p className="card-text">{this.props.editorial}</p>
            <p className="card-text">{this.props.fecha}</p>
            <p className="card-text pull-right">{this.props.autor}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;