import React from 'react';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './TokenExpired.css';

const TokenExpired = () => {
  return (
    <div className="token-expired-container">
      <ErrorOutlineIcon className="cross-logo" color="error" />
      <h4 className="token-expired-heading">Token Expired</h4>
      <p className="token-expired-text">
        The token has expired or is invalid.
      </p>
      <div>
        <Link to="/login" className="register-button">
          Register Again
        </Link>
        <Link to="/" className="home-button">
          Home
        </Link>
      </div>
    </div>
  );
};

export default TokenExpired;
