import React from 'react';
import './AllUsers.css';
import UserCard from '../UserCard/UserCard';

const AllUsers = props => {
  return (
    <div className='GridStyle'>
      {props.users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
