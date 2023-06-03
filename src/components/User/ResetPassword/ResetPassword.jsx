import React from 'react'
import "./ResetPassword.css"
import {Fragment,useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"
import {useNavigate,useParams,Navigate} from "react-router-dom"
import { clearErrors, resetPassword } from '../../../actions/userAction'
import Loader from '../../layout/Loader/Loader'
import MetaData from '../../layout/MetaData'

import { BiLockOpen ,BiLock} from "react-icons/bi";

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { token } = useParams();
    const{isAuthentication}=useSelector(state=>state.user);
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
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
      if(isAuthentication){
        navigate("/account")
      }
  
      if (success) {
        
        toast.success("Password Updated Successfully ", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
  
        navigate("/login")
      }
    }, [dispatch, error, navigate, success,isAuthentication]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Profile</h2>
  
                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <div>
                    <BiLockOpen />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <BiLock />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
}

export default ResetPassword
