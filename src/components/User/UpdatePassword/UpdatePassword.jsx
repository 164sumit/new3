import React from 'react'
import "./UpdatePassword.css"
import {Fragment,useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader/Loader'
import { clearErrors, updatePassword } from '../../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstants'

import { BiLockOpen ,BiLock} from "react-icons/bi";
import { MdOutlineVpnKey} from "react-icons/md";

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
  
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(myForm));
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
  
      if (isUpdated) {
        toast.success("Profile Updated Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        
        navigate("/account");
        
  
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, navigate, isUpdated]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Change Password" />
            <div className="updatePasswordContainer">
              <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Profile</h2>
  
                <form
                  className="updatePasswordForm"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="loginPassword">
                    <MdOutlineVpnKey />
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
  
                  <div className="loginPassword">
                    <BiLockOpen />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                    value="Change"
                    className="updatePasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  
}

export default UpdatePassword
