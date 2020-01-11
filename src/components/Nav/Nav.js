import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = props => {
  return (
    <div className='navstyle'>
      <h1>
        <i className={props.icon} />
        {props.title}
      </h1>

      <div>
        <h1>
          <Link to='/' className='navlink'>
            Home
          </Link>
        </h1>
      </div>
      <div>
        <h1>
          <Link to='/ProfileManager' className='navlink'>
            Profile Manager
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Nav;
