import React, { Component } from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';

export class UserProfile extends Component {
  componentDidMount() {
    // you're matching the path='/user/:login' in App.js
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    return (
      <div>
        <Link to='/' className='BackStyle'>
          Return to Search
        </Link>

        {/* User Profile */}
        <div className='ProfileStyle'>
          <h2>
            Name: {''}
            {this.props.user.name}
          </h2>
          <img src={this.props.user.avatar_url} className='UserPix' alt='' />
          <h3>
            {this.props.user.login ? (
              <div>
                Login: {''}
                {this.props.user.login}
              </div>
            ) : null}
          </h3>
          <h3>
            {this.props.user.public_repos ? (
              <div>
                Number of Public Repos: {''}
                {this.props.user.public_repos}
              </div>
            ) : null}
          </h3>
          <h3>
            <a href={this.props.user.html_url} target='_blank'>
              Github Profile
            </a>
          </h3>
          <h3>
            Location: {''}
            {this.props.user.location}
          </h3>

          <h3>
            Hireable: {''} {this.props.user.hireable ? 'Yes' : 'No'}
          </h3>
          <h3>
            {this.props.user.bio ? (
              <div>
                Bio:
                <p>{this.props.user.bio}</p>
              </div>
            ) : null}
          </h3>

          <h3>
            {this.props.user.company ? (
              <div>
                Company: {''}
                {this.props.user.company}
              </div>
            ) : null}
          </h3>

          <h3>
            {this.props.user.blog ? (
              <div>
                Website: {''}
                {this.props.user.blog}
              </div>
            ) : null}
          </h3>
        </div>
      </div>
    );
  }
}

export default UserProfile;
