import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, fetchToken,
  saveAssertions, fetchQuestionsFiltered, updateScore } from '../redux/actions';

let totalAssertions = 0;
class Game extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      triviaIndex: 0,
      nextButton: false,
      countTimer: 30,
      myInterval: '',
      isDisable: false,
      clicked: false,
    };
  }

  componentDidMount() {
    const userName = localStorage.getItem('user');
    const email = localStorage.getItem('email');
    const { userToken, sendQuestionsToStore,
      selectedCategory, sendQuestionsFiltered,
      selectedDifficulty, selectedType } = this.props;
    this.setState({ userName, email });
    const oneSecond = 1000;
    const myInterval = setInterval(this.timer, oneSecond);
    this.setState({
      myInterval,
    });

    const isAnyFilterSelected = selectedCategory.length !== 0
    && selectedDifficulty !== undefined && selectedType !== undefined;

    return isAnyFilterSelected
      ? sendQuestionsFiltered(userToken, selectedCategory,
        selectedDifficulty, selectedType) : sendQuestionsToStore(userToken);
  }

  componentDidUpdate(prevProps) {
    const { apiResponse, getNewToken } = this.props;

    if (prevProps.apiResponse !== apiResponse && apiResponse !== undefined) {
      getNewToken();
    }
  }

  timer = () => {
    const { countTimer, myInterval } = this.state;

    if (countTimer > 0) {
      this.setState((prevState) => ({ countTimer: prevState.countTimer - 1 }));
    } else {
      this.setState({
        isDisable: true,
      });
      clearInterval(myInterval);
    }
  };

  nextQuestion = () => {
    const { history } = this.props;
    this.setState((prevState) => ({
      triviaIndex: prevState.triviaIndex + 1,
      nextButton: !prevState.nextButton,
    }));
    this.setState({
      clicked: false,
    });
    const { triviaIndex } = this.state;
    const lastTriviaQuestion = 4;
    if (triviaIndex === lastTriviaQuestion) {
      history.push('/feedback');
    }
  }

  randomAlternatives = () => {
    const { triviaDataGame } = this.props;
    const { triviaIndex } = this.state;
    if (triviaDataGame) {
      const { correct_answer: correctAnswers,
        incorrect_answers: incorrectAnswers } = triviaDataGame[triviaIndex];

      const alternatives = [correctAnswers, ...incorrectAnswers];
      const randomChance = 0.5;
      // https://flaviocopes.com/how-to-shuffle-array-javascript/
      return alternatives.sort(() => Math.random() - randomChance);
    }
  }

  correctAnswer = () => {
    const { triviaDataGame } = this.props;
    const { triviaIndex } = this.state;
    const correctAnswer = triviaDataGame[triviaIndex].correct_answer;
    return correctAnswer;
  }

  classAnswer = (element) => {
    const { clicked } = this.state;
    let buttonClass = '';
    if (clicked && element === this.correctAnswer()) {
      buttonClass = 'correct';
    } else if (clicked && element !== this.correctAnswer()) {
      buttonClass = 'incorrect';
    }
    return buttonClass;
  }

  handleAnswers = ({ target: { name } }) => {
    const { triviaDataGame, sendAssertionsToStore, score, newScore } = this.props;
    const { triviaIndex, countTimer } = this.state;
    const { correct_answer: correctAnswer, difficulty } = triviaDataGame[triviaIndex];

    this.setState({ clicked: true });

    this.setState((prevState) => ({ nextButton: !prevState.nextButton }));

    if (correctAnswer === name) {
      totalAssertions += 1;
      const numberFormula = 10;
      const point = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      newScore(score + numberFormula + (countTimer * point[difficulty]));
    }
    sendAssertionsToStore(totalAssertions);
  }

  render() {
    const { score, triviaDataGame } = this.props;

    const { userName, email, triviaIndex, nextButton, isDisable,
      countTimer } = this.state;
    const convertEmail = md5(email).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${convertEmail}`;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ urlGravatar }
            alt="avatar do usuario"
          />
          <h2 data-testid="header-player-name">
            Nome do Jogador:
            { userName }
          </h2>
          <h4 data-testid="header-score">
            Score do Jogador:
            { score }
          </h4>
        </header>
        <div>
          {triviaDataGame !== undefined && (
            <h1
              data-testid="question-category"
            >
              {triviaDataGame[triviaIndex].category}
            </h1>
          )}
          {triviaDataGame !== undefined && (
            <h1
              data-testid="question-text"
            >
              {triviaDataGame[triviaIndex].question}
            </h1>
          )}
          <div data-testid="answer-options">
            {triviaDataGame !== undefined && this.randomAlternatives()
              .map((element, index) => (
                <button
                  key={ index }
                  type="button"
                  name={ element }
                  disabled={ isDisable }
                  onClick={ (e) => this.handleAnswers(e) }
                  data-testid={ element === this.correctAnswer()
                    ? 'correct-answer'
                    : `wrong-answer-${index}` }
                  className={ this.classAnswer(element) }
                >
                  {element}
                </button>
              ))}
          </div>
          {
            nextButton && (
              <button
                type="button"
                onClick={ this.nextQuestion }
                data-testid="btn-next"
              >
                Next
              </button>)
          }
          {countTimer}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  userToken: state.token,
  triviaDataGame: state.userReducer.data.results,
  apiResponse: state.userReducer.data.response_code,
  selectedCategory: state.triviaData.selectedCategory,
  selectedDifficulty: state.triviaData.selectedDifficulty,
  selectedType: state.triviaData.selectedType,
});

const mapDispatchToProps = (dispatch) => ({
  newScore: (payload) => dispatch(updateScore(payload)),
  sendQuestionsToStore: (token) => dispatch(fetchQuestions(token)),
  sendQuestionsFiltered: (token, category, difficulty, type) => (
    dispatch(fetchQuestionsFiltered(token, category, difficulty, type))),
  getNewToken: () => dispatch(fetchToken()),
  sendAssertionsToStore: (payload) => dispatch(saveAssertions(payload)),
});

Game.propTypes = {
  triviaDataGame: PropTypes.arrayOf(PropTypes.object).isRequired,
  apiResponse: PropTypes.number.isRequired,
  getNewToken: PropTypes.func.isRequired,
  sendQuestionsToStore: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  newScore: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  sendAssertionsToStore: PropTypes.func.isRequired,
  sendQuestionsFiltered: PropTypes.func.isRequired,
  selectedCategory: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedDifficulty: PropTypes.string.isRequired,
  selectedType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
