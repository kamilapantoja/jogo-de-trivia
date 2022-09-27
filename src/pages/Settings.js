import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories, selectedCategory,
  selectDifficulty, selectType } from '../redux/actions';
import { difficulty, type } from '../Constantes';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      difficultySelected: '',
      typeSelected: '',
    };
  }

  componentDidMount() {
    const { sendCategoriesToStore } = this.props;
    sendCategoriesToStore();
  }

  handleCategoryChange = ({ target: { value } }) => {
    const { sendCategoryToStore, categories } = this.props;

    const userSelectedCategory = categories
      .filter(({ name }) => name.includes(value))
      .map(({ id }) => id);

    sendCategoryToStore(userSelectedCategory);
  }

  handleChange = ({ target: { name, value } }) => {
    const { sendDifficultyToStore, sendTypeToStore } = this.props;
    this.setState({ [name]: value });

    if (name === 'typeSelected') {
      sendTypeToStore(value);
    }
    if (name === 'difficultySelected') {
      sendDifficultyToStore(value);
    }
  }

  renderDropdowns = () => {
    const { categories } = this.props;
    const { difficultySelected, typeSelected } = this.state;

    return (
      <div>
        <select onChange={ (e) => this.handleCategoryChange(e) }>
          {categories !== undefined && categories.map(({ name, id }) => (
            <option key={ id }>{name}</option>
          ))}
        </select>
        <select
          name="difficultySelected"
          value={ difficultySelected }
          onChange={ (e) => this.handleChange(e) }
        >
          {difficulty.map((element, index) => (
            <option key={ index }>{element}</option>
          ))}
        </select>
        <select
          name="typeSelected"
          value={ typeSelected }
          onChange={ (e) => this.handleChange(e) }
        >
          {type.map((element, index) => (
            <option key={ index }>{element}</option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">
          Settings
        </h1>
        {this.renderDropdowns()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCategoriesToStore: () => dispatch(fetchCategories()),
  sendCategoryToStore: (payload) => dispatch(selectedCategory(payload)),
  sendDifficultyToStore: (payload) => dispatch(selectDifficulty(payload)),
  sendTypeToStore: (payload) => dispatch(selectType(payload)),
});

const mapStateToProps = (state) => ({
  categories: state.triviaData.categories.trivia_categories,
});

Settings.propTypes = {
  categories: PropTypes.func.isRequired,
  sendCategoriesToStore: PropTypes.func.isRequired,
  sendCategoryToStore: PropTypes.func.isRequired,
  sendDifficultyToStore: PropTypes.func.isRequired,
  sendTypeToStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
