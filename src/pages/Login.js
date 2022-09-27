import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { fetchToken, savePlayer } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
    };
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { userName, email } = this.state;
    const { getToken, history, player } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <form>
          <label htmlFor="input-player-name">
            User
            <input
              type="text"
              id="input-player-name"
              data-testid="input-player-name"
              onChange={ this.handleState }
              name="userName"
              value={ userName }
            />
          </label>

          <label htmlFor="input-gravatar-email">
            Email
            <input
              type="email"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
              onChange={ this.handleState }
              name="email"
              value={ email }
            />
          </label>

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ userName === '' || email === '' }
            onClick={ async (event) => {
              event.preventDefault();
              await getToken();
              player({ userName, email });
              localStorage.setItem('user', userName);
              localStorage.setItem('email', email);
              history.push('/game');
            } }
          >
            Play
          </button>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  player: (value) => dispatch(savePlayer(value)),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
