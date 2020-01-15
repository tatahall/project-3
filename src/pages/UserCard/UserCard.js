import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';

const UserCard = props => {
  return (
    // props passed in from AllUsers.js as "user"
    <div className='CardStyle'>
      <h2>{props.user.login}</h2>
      <img src={props.user.avatar_url} alt={''} className='ImgStyle' />
      <div>
        {/* takes you to one user's information page*/}
        <Link to={`/user/${props.user.login}`} className='ProfileButtonStyle'>
          Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
