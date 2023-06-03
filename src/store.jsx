
import { adminproductReducer, newProductReducer, productDetailsReducer, productReducer } from "./reducers/productReducer";
import { configureStore } from "@reduxjs/toolkit";
import { forgotPasswordReducer, profileReducer, userReducer, verifyuserReducer } from "./reducers/userReducer";
const Store = configureStore({
  reducer: {
   product:productReducer,
   productDetails:productDetailsReducer,
   user:userReducer,
   profile:profileReducer,
   forgotPassword:forgotPasswordReducer,
   adminProduct:adminproductReducer,
   newProduct:newProductReducer,
   userVerify:verifyuserReducer,
  },
});

export default Store;
