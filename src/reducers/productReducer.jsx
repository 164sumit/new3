import { createReducer } from "@reduxjs/toolkit";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
} from "../constants/productConstants";
const initialState = {
    // link:null,
    products: [],
    loading: true,
    productsCount: 0,
    resultPerPage: 8,
    filteredProductsCount: 0,
    error: "",
    //   product:{}

};
export const productReducer = createReducer(initialState, {
    ALL_PRODUCT_REQUEST: (state) => {
        state.loading = true;

    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false,
            state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;


    }
    , ALL_PRODUCT_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    ADMIN_PRODUCT_REQUEST:(state)=>{
        state.loading=true;
    },
    ADMIN_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.products=action.payload;
    },
    ADMIN_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    }
    ,CLEAR_ERRORS:(state)=> {
        state.loading=false;
        state.error=null;

    },



})


//single product get
const is2 = {
    product: {},
    loading: false,
    error: ""
}
export const productDetailsReducer = createReducer(is2, {
    PRODUCT_DETAILS_REQUEST: (state) => {
        state.loading = true;
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
        state.loading = false;
        state.product = action.payload
    },
    PRODUCT_DETAILS_FAIL: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERRORS:(state)=> {
        state.loading=false;
        state.error=null;

    },
})
const admin_initial_state={
    loading:false,
    error:null,
    isDeleted:false,
    isUpdated:false,

}
export const adminproductReducer= createReducer(admin_initial_state,{
    DELETE_PRODUCT_REQUEST:(state)=>{
        state.loading=true;
    },
    DELETE_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.isDeleted=action.payload;
    },
    DELETE_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    DELETE_PRODUCT_RESET:(state)=>{
        state.isDeleted=false;
    },
    UPDATE_PRODUCT_REQUEST:(state)=>{
        state.loading=true;
    },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;    
        state.isUpdated=action.payload;
    },
    UPDATE_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UPDATE_PRODUCT_RESET:(state,action)=>{
        state.isUpdated=false;
    },
    CLEAR_ERRORS:(state)=>{
        state.loading=false;
        state.error=null;
    }


})
// add new product

const addinitial={
    loading:false,
    success:false,
    product:null,
}
export const newProductReducer=createReducer(addinitial,{
    NEW_PRODUCT_REQUEST:(state)=>{
        state.loading=true;
    },
    NEW_PRODUCT_SUCCESS:(state,action)=>{
        state.loading=false;
        state.success=action.payload.success;
        state.product=action.payload.product;
    },
    NEW_PRODUCT_FAIL:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
        
    NEW_PRODUCT_RESET:(state)=>{
        state.success=false;
    },
    CLEAR_ERRORS:(state)=>{
        state.loading=false;
        state.error=null;
    }
})

