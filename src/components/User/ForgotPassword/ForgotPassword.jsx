import React from 'react'
import "./ForgotPassword.css"
import { AiOutlineMail } from "react-icons/ai";

import {Fragment,useEffect,useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import Loader from '../../layout/Loader/Loader'
import MetaData from '../../layout/MetaData'
import { clearErrors, forgotPassword } from '../../../actions/userAction'

function ForgotPassword() {
    const dispatch = useDispatch();
    
  
    const { error, message, loading } = useSelector((state) => state.forgotPassword);
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        dispatch(clearErrors());
      }
  
      if (message) {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
    }, [dispatch, error, message]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
  
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <AiOutlineMail />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
}

export default ForgotPassword
