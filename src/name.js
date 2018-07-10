import React, { Component } from 'react';

class HolaMundo extends Component {
  render() {
    return (
      <h1>Hola mundo {this.props.name}</h1>
    );
  }
}

export default HolaMundo;