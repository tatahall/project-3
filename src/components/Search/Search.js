import React, { Component } from 'react';
import './Search.css';

export class Search extends Component {
  state = {
    text: ''
  };

  onSubmit = e => {
    e.preventDefault();
    // Sends props back up to App.js with Alert Message when triggered
    if (this.state.text === '') {
      this.props.setAlert('Please enter a search term');
    } else {
      // Sends props back up to App.js with "this.state.text"
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input type='submit' value='Search' className='ButtonStyle' />
        </form>

        {/* Clear Users button is shown only when there are user cards displayed */}
        {/* this.props.clearUsers is sent up to App.js  */}
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
