import axios from "axios";
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
export const getProduct= (keyword="",page=1,maxprice=50000,minprice=0,category="ALL",sortByDate="",sortBy="")=> async (dispatch) =>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })
        // const urlWithProxy = "/api/v1";
        let url=`/api/v1/products?&keyword=${keyword}&page=${page}&minprice=${minprice}&maxprice=${maxprice}&category=${category}`;
        url=`/api/v1/products?&keyword=${keyword}&page=${page}&minprice=${minprice}&maxprice=${maxprice}&category=${category}&sortByPrice=${sortBy}&sortBydate=${sortByDate}`;
    //     if(sortByDate){
    // }
        const product = await axios.get( url);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:product.data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}

export const getProduct1= ()=> async (dispatch) =>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })
        // const urlWithProxy = "/api/v1";
        let url=`/api/v1/products`;
        // url=`/api/v1/products?&keyword=${keyword}&page=${page}&minprice=${minprice}&maxprice=${maxprice}&category=${category}&sortByPrice=${sortBy}&sortBydate=${sortByDate}`;
    //     if(sortByDate){
    // }
        const product = await axios.get( url);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:product.data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
        
    }
}
export const getProductDetails= (id)=> async (dispatch) =>{
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        // const urlWithProxy = "/api/v1";
        const {data} = await axios.get( `/api/v1/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
        
    }
}

// Get All Products For Admin
export const getAdminProduct = (email,keyword="",page=1) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      let url=`/api/v1/admin/products/${email}?&keyword=${keyword}&page=${page}`;
  
      const { data } = await axios.get(url);
  
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//   createProduct

  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      // const config = {
      //   headers: { "Content-Type": "application/json" },
      // };
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        `/api/v1/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Product
  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(
        `/api/v1/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//clear error


export const clearErrors= ()=> async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS, 
    })
}