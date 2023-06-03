import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import ProductCard from "./ProductCard"
import "./Home.css";
import MetaData from '../layout/MetaData';
import { getProduct, getProduct1 } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import { Toast } from 'react-toastify/dist/components';

// const product={
//   _id: 12345,
//   name:"Shirt",
//   price:234,
//   images:[
//     {
//       url:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSi2wVgwSWpGfOmCKCsEYK0Kvkn8pbzBrxiK7LzN3wSKgKgTwikyy49PZ4wTrRaxKKw8_5AYJ7JhNEGg0VPjMKQaJZ1fdQOYsITPOzqBRZV_JkI2ph6dlDC"
//     }

//   ]
// }

function Home() {
  const dispatch = useDispatch();
  const {products,loading,productsCount,filteredProductsCount,error}=useSelector((state)=>state.product)
  console.log(products);
  useEffect(() => {
    if(error){
      return toast.error(error);
    }
  //  dispatch(getProduct());
  dispatch(getProduct1());

  }, [dispatch,error])
  
  return (
    
    <>
    {loading?<>
      <Loader className="container"/>
      
    </>:
    <Fragment>
          
      
          <MetaData title={"CampusMart"} />
            <div className="banner">
              <p style={{color:"white"}}>Welcome to CampusMart</p>
              <h1 style={{color:"white"}}>FIND AMAZING PRODUCTS BELOW</h1>
  
              <a href="#container">
                <button>
                  Scroll <CgMouse />
                </button>
                
              </a>
              <Link to="/products">
                <button>
                  Products
                </button>
                </Link>
            </div>
  
            <h2 id="container" className="homeHeading"> Total Products: {productsCount}  </h2>
  
            <div className="container2" >
              {products.map((product)=>(
                <ProductCard key={product._id} product={product} />
  
              ))}
              
            </div>
            
          </Fragment>}
    </>
  )
}

export default Home
