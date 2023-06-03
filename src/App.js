
import WebFont from 'webfontloader';
import './App.css'
// import Header from './components/layout/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
// import Footer from './components/layout/footer/Footer';
import Home from "./components/Home/Home"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from './components/Product/ProductDetails';

import Products from "./components/products/Products"
import Login from "./components/User/Loginsignup/Login"
import store from "./store"
import { loadUser } from './actions/userAction';
import {useSelector} from "react-redux"
// import Test from './components/Test/Test';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile/UpdateProfile';
import Profile from './components/User/Profile/Profile';
import UpdatePassword from './components/User/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword/ForgotPassword';
import ResetPassword from './components/User/ResetPassword/ResetPassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ProductList from './components/Admin/ProductList/ProductList';
import NewProduct from './components/Admin/NewProduct/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct/UpdateProduct';

import ProductComponent from './components/ProductDetail/ProductComponent';
import FloatingPlusButton from './components/FloatingPlusButton/FloatingPlusButton';


import Test1 from "./components/FilterBox/Test1"

import ResponsiveAppBar from './components/layout/ResponsiveAppBar/ResponsiveAppBar';
import { StyledEngineProvider } from '@mui/material/styles';
import NotFound from './components/layout/NotFoundPage/NotFound';
import About from './components/layout/About/About';
import HelpPage from './components/layout/HelpPage/HelpPage';
import TokenExpired from './components/User/TokenExpired/TokenExpired';
import VerificationMessage from './components/User/VerificationMessage/VerificationMessage';
import Verify from './components/User/Verify/Verify';


function App() {
  const {isAuthentication}=useSelector(state=>state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);


  return (
    
    <BrowserRouter>
    <ToastContainer/>
    <StyledEngineProvider injectFirst>
      
      <ResponsiveAppBar />
    </StyledEngineProvider>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<TokenExpired />} />
        <Route path="/verification/:email" element={<VerificationMessage />} />
        <Route path="/account/verify/:token" element={<Verify />} />
        
        {/* <Route path="/product/:id" element={<Preview />} /> */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product1/:id" element={<ProductComponent />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/help' element={<HelpPage/>}/>
        <Route path="/login/:register" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test1 />} />
        <Route path="password/forgot" element={<ForgotPassword />} />
        <Route path="password/reset/:token" element={<ResetPassword />} />

        {/* protectedroutes */}
        <Route element={<ProtectedRoute isAuthentication={isAuthentication}/>}>
          <Route path='/me/update' element={<UpdateProfile/>} />
          <Route path='/account' element={<Profile/>} />
          <Route path='/password/update' element={<UpdatePassword/>} />
          <Route path='/admin/dashboard' element={<Dashboard/>} />
          <Route path="/admin/products" element={<ProductList/>} />
          <Route path="/admin/product" element={<NewProduct/>} />
          <Route path="/admin/product/:id" element={<UpdateProduct/>} />
          

        </Route>
        <Route path='*' element={<NotFound/>}/>

      </Routes>
      <FloatingPlusButton/>

      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
