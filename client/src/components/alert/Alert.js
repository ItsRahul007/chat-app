import React from 'react';
import './alert.css';

function Alert({ errors }) {
  return (errors &&
    <div className='alert-compo'>
      <p>{errors}</p>
    </div>
  );
};

export default Alert;