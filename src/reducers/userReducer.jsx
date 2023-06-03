import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    VERIFY_USER_REQUEST,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAIL,
    VERIFY_USER_RESET,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/userConstants";
  
  import { createReducer } from "@reduxjs/toolkit";
  const initialstate={
    loading:true,
    user:null,
    error:null,
    isAuthentication: false,
    message:null,
  }
  export const userReducer=createReducer(initialstate,{
    LOGIN_REQUEST:(state)=>{
        state.loading=true;
    },
    LOGIN_SUCCESS:(state,action)=>{
        state.loading=false;
        state.isAuthentication=true;
        state.user=action.payload;
        state.error=null;
    }
    ,
    LOGIN_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.user=null;
        state.isAuthentication=false;
        
    },
    REGISTER_USER_REQUEST:(state)=>{
        state.loading=true;
    },
    REGISTER_USER_SUCCESS:(state,action)=>{
        state.loading=false;
        state.isAuthentication=false;
        state.user=action.payload.user;
        state.error=null;
        state.message=action.payload.message;
    },
    REGISTER_USER_FAIL:(state,action)=>{
        state.loading=false;    
        state.error=action.payload;
        state.user=null;
        state.isAuthentication=false;
    },
    LOAD_USER_REQUEST:(state)=>{
        // state.loading=true;

    },
    LOAD_USER_SUCCESS:(state,action)=>{
        state.loading=false;
        state.isAuthentication=true;
        state.user=action.payload;
        state.error=null;
    },
    LOAD_USER_FAIL:(state,action)=>{
        state.loading=false;    
        // state.error=action.payload;
        state.user=null;
        state.isAuthentication=false;

    },
    LOGOUT_SUCCESS:(state)=>{
        state.isAuthentication=false;
        state.user=null;
    },
    LOGOUT_FAIL:(state,action)=>{
        state.loading= false;
        state.error= action.payload;
    },
        
    CLEAR_ERRORS:(state)=>{
        state.error=null;
        state.loading=false;
        // state.user=null;
        // state.isAuthentication=false;
    }

  })
  //verify user reducer
export const verifyuserReducer=createReducer({},{
    VERIFY_USER_REQUEST:(state)=>{
        state.loading=true;
        state.error=null;
        state.user=null;
        state.isVerified=false;
        },
        VERIFY_USER_SUCCESS:(state,action)=>{
            state.loading=false;
            state.isVerified=action.payload.success;
            state.user=action.payload.user;
        },
        VERIFY_USER_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        VERIFY_USER_RESET:(state)=>{
            state.loading=false;
            // state.isVerified=false;
            // state.user=null;
            state.message=null;
        }

 })

  //profile reducer
  const profileinitialstate={
    loading:false,
    isDeleted:false,
    isUpdated:false,
    error:null,

  }
  export const profileReducer=createReducer(profileinitialstate,{
    UPDATE_PROFILE_REQUEST:(state,action)=>{
        state.loading=true;
    },
    UPDATE_PROFILE_SUCCESS:(state,action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    },
    UPDATE_PROFILE_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UPDATE_PROFILE_RESET:(state,action)=>{
        state.isUpdated=false;
    },
    UPDATE_PASSWORD_REQUEST:(state)=>{
        state.loading=true;
    },
    UPDATE_PASSWORD_SUCCESS:(state,action)=>{
        state.loading=false;
        state.isUpdated=action.payload;
    },
    UPDATE_PASSWORD_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UPDATE_PASSWORD_RESET:(state,action)=>{
        state.isUpdated=false;
    },
    CLEAR_ERRORS:(state,action)=>{
        state.error=null;
    }

  })

//forgot password reducer
const forgetpassword_initial={
    loading:false,
    error:null,
    message:null,
    success:false,
}
  export const forgotPasswordReducer=createReducer(forgetpassword_initial,{
    FORGOT_PASSWORD_REQUEST:(state,action)=>{
        state.loading=true;
    },
    FORGOT_PASSWORD_SUCCESS:(state,action)=>{
        state.loading=false;
        state.message=action.payload;

    },
    FORGOT_PASSWORD_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    RESET_PASSWORD_REQUEST:(state,action)=>{
        state.loading=true;
    },
    RESET_PASSWORD_SUCCESS:(state,action)=>{
        state.loading=false;
        state.success=action.payload;
    },
    RESET_PASSWORD_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    CLEAR_ERRORS:(state)=>{
        state.error=null;
    }

  })
