import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
    };
  }

  componentDidMount() {
    const userName = localStorage.getItem('user');
    const email = localStorage.getItem('email');

    this.setState({
      userName,
      email,
    });
  }

  feedbackText = () => {
    const { assertions } = this.props;
    const greaterThanHalfOfTotalQuestions = 3;
    return (
      assertions >= greaterThanHalfOfTotalQuestions
        ? <h1 data-testid="feedback-text">Well Done!</h1>
        : <h1 data-testid="feedback-text">Could be better...</h1>
    );
  }

  render() {
    const { userName, email } = this.state;
    const { score, assertions } = this.props;
    const convertEmail = md5(email).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${convertEmail}`;
    return (
      <div>
        <img
          src={ urlGravatar }
          alt={ userName }
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{userName}</h1>
        <span data-testid="header-score">{score}</span>
        {this.feedbackText()}
        <p>
          Final score:
          {' '}
          <span data-testid="feedback-total-score">0</span>
        </p>

        <p>
          Right answers:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
