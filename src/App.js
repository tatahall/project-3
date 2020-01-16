import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import AllUsers from './pages/AllUsers/AllUsers';
import ProfileManager from './pages/ProfileManager/ProfileManager';
import Search from './components/Search/Search';
import Alert from './components/Alert/Alert';
import UserProfile from './pages/UserProfile/UserProfile';

class App extends Component {
  state = {
    users: [],
    user: {},
    alert: null
  };

  async componentDidMount() {
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data });
  }

  searchUsers = async name => {
    let query = ``;
    if (name) {
      query = `${name}`;
    }
    const res = await axios.get(
      `https://api.github.com/search/users?q=${query}&per_page=100&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items });
  };

  searchManyParams = async (location, repositories, language) => {
    console.log(
      'In App.js, location is ' +
        location +
        ' and repositories is ' +
        repositories +
        ' and language is ' +
        language
    );
    let query = ``;
    if (location) {
      query = `location:${location}`;
    }

    if ((location, repositories)) {
      query = `location:${location}+repos:>${repositories}`;
    }

    if ((location, language)) {
      query = `location:${location}+language:${language}`;
    }

    if ((location, repositories, language)) {
      query = `location:${location}+repos:>${repositories}+language:${language}`;
    }

    const res = await axios.get(
      `https://api.github.com/search/users?q=${query}&per_page=100&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items });
  };

  showAlert = message => {
    this.setState({ alert: { message } });
    setTimeout(() => this.setState({ alert: null }), 1750);
  };

  getUser = async username => {
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data });
  };

  clearUsers = () => this.setState({ users: [] });

  render() {
    return (
      <Router>
        <div className='App'>
          <Nav title='Git Techie' icon='fas fa-user-cog' />

          <div className='container'>
            <Switch>
              {/* route to the home page */}
              <Route
                exact
                path='/'
                render={props => (
                  <div>
                    {/* calls on the function searchUsers with props passed up from Search.js */}
                    <Alert alert={this.state.alert} />
                    <Search
                      searchUsers={this.searchUsers}
                      searchManyParams={this.searchManyParams}
                      showAlert={this.showAlert}
                      showClearUsers={
                        // boolean value is passed to "this.props.showClearUsers" in Search.js
                        this.state.users.length > 0 ? true : false
                      }
                      clearUsers={this.clearUsers}
                    />
                    <AllUsers users={this.state.users} />
                  </div>
                )}
              />

              {/* route to the profile manager app */}
              <Route exact path='/profilemanager' component={ProfileManager} />

              {/* route to page displaying one user  */}
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <UserProfile
                    {...props}
                    getUser={this.getUser}
                    // response data object for one user from the state as set by getUser method
                    user={this.state.user}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
