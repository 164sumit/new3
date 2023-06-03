import React from 'react';
import { useParams } from 'react-router-dom';
import "./VerificationMessage.css"
import {useSelector} from "react-redux"
const VerificationMessage = () => {
//   const { email } = useParams();
  const {user,loading}=useSelector(state=>state.user);

  const handleOpenEmail = () => {
    // Open the user's email client with the verification email
    // window.open(`mailto:${user?user.email:null}`);
    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
  };

  return (
    <div className="verification-message">
      <h2>Please Verify Your Email</h2>
      <p>
        An email has been sent to <strong>{user?user.email:null}</strong> with a verification link.
        Please check your email and click the verification link to complete the registration process.
      </p>
      <button className="open-email-button" onClick={handleOpenEmail}>Open Email</button>
    </div>
  );
};

export default VerificationMessage;
