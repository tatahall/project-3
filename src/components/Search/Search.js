import React, { Component } from 'react';
import './Search.css';

export class Search extends Component {
  state = {
    name: '',
    location: '',
    repositories: '',
    language: ''
  };

  onSubmit = event => {
    event.preventDefault();

    // logic for triggering the alert
    if (
      this.state.name === '' &&
      this.state.location === '' &&
      this.state.repositories === '' &&
      this.state.language === ''
    ) {
      this.props.showAlert('Please enter a search term...');
    } // but if a search term has been entered into any of the fields, we proceed with searches
    else {
      if (this.state.name) {
        this.props.searchUsers(this.state.name);
        this.setState({ name: '' });
      } else {
        this.props.searchManyParams(
          this.state.location,
          this.state.repositories,
          this.state.language
        );
        this.setState({ location: '' });
        this.setState({ repositories: '' });
        this.setState({ language: '' });
      }
      console.log('In Search.js, name is ' + this.state.name);
      console.log('In Search.js, location is ' + this.state.location);
      console.log('In Search.js, repositories is ' + this.state.repositories);
      console.log('In Search.js, language is ' + this.state.language);
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='FormStyle'>
          <p>
            <strong>
              <h2>Search...</h2> by user name
            </strong>
          </p>
          <input
            type='text'
            name='name'
            placeholder='Search Users'
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          {/* <input type='submit' value='Search' className='ButtonStyle' />
        </form>

        <form onSubmit={this.onSubmit} className='form'> */}
          <span>
            {' '}
            <p>
              <h3>Or...</h3>
            </p>
            <p>
              <strong>by two search parameters:</strong> location + min. # of
              repos
            </p>
            <p>
              <strong>by three search parameters:</strong> location + min. # of
              repos + programming language{' '}
            </p>
          </span>
          <input
            type='text'
            name='location'
            placeholder='Location'
            value={this.state.location}
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            name='repositories'
            placeholder='Min # of Repos'
            value={this.state.repositories}
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            name='language'
            placeholder='Programming Language'
            value={this.state.language}
            onChange={this.handleInputChange}
          />
          <input type='submit' value='Search' className='ButtonStyle' />
        </form>

        {/* Clear Users button is shown only when a boolean value of true is passed from App.js, meaning that there are user cards displayed */}
        {/* this.props.clearUsers is sent back up to App.js  */}
        {this.props.showClearUsers ? (
          <button className='ButtonStyle2' onClick={this.props.clearUsers}>
            Clear Users
          </button>
        ) : null}
      </div>
    );
  }
}

export default Search;
