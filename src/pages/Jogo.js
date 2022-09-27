import React, { Component } from 'react';
import { connect } from 'react-redux';

class Jogo extends Component {
  render() {
    return (
      <div>
        Jogo de Trivia
      </div>
    );
  }
}

export default connect()(Jogo);
