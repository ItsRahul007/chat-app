import React, {useEffect} from 'react';
import './alert.css';
import { useDispatch } from 'react-redux';
import { removeAlert } from '../../store/slices/alertSlice';

function Alert({ errors }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3500);
  }, [errors]);
  

  return (errors &&
    <div className='alert-compo'>
      <p>{errors}</p>
    </div>
  );
};

export default Alert;