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

  setAlert = message => {
    this.setState({ alert: { message } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  searchUsers = async text => {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items });
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
          <Nav title='Techie Finder' icon='fas fa-user-cog' />

          <div className='container'>
            <Switch>
              {/* route to the home page */}
              <Route
                exact
                path='/'
                render={props => (
                  <div>
                    {/* calls on the function searchUsers with props passed up from Search.js */}
                    <Search
                      setAlert={this.setAlert}
                      searchUsers={this.searchUsers}
                      showClearUsers={
                        this.state.users.length > 0 ? true : false
                      }
                      clearUsers={this.clearUsers}
                    />
                    <AllUsers users={this.state.users} />
                  </div>
                )}
              />

              {/* route to the profile manager app */}
              <Route exact path='/about' component={ProfileManager} />

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

            <Alert alert={this.state.alert} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
