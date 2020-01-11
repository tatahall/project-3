import React from 'react';
import './Alert.css';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className='AlertStyle'>
        <i className='fas fa-exclamation'></i> {alert.message}
      </div>
    )
  );
};

export default Alert;
