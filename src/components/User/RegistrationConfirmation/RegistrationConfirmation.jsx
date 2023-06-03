import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import './RegistrationConfirmation.css';

const RegistrationConfirmation = () => {
  return (
    <div className="registration-confirmation-container">
      <div className="registration-confirmation-content">
        <FiCheckCircle className="registration-confirmation-icon" />
        <h2 className="registration-confirmation-heading">Registration Successful</h2>
        <p className="registration-confirmation-text">Your account has been successfully registered.</p>
        <div className="registration-confirmation-buttons">
          <Link to="/login" className="registration-confirmation-button primary-button">Go to Login</Link>
          <Link to="/" className="registration-confirmation-button secondary-button">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
