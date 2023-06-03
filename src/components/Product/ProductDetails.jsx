import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./detail.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (product.images && product.images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  }, [product.images]);

  const handlePrevious = useCallback(() => {
    if (product.images && product.images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  }, [product.images]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        handlePrevious();
      } else if (event.keyCode === 39) {
        // Right arrow key
        handleNext();
      }
    },
    [handlePrevious, handleNext]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  useEffect(() => {
    // Add event listener for key press
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

    return (

        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    
                    <MetaData title={`${product.name} -- CampusMart`} />

                    <div className="ProductDetails ">
                        <div className="image" >
                        
                            {product.images?
                            // <SimpleImageSlider
                            //     width={896}
                            //     height={504}
                            //     images={product.images}
                            //     showBullets={true}
                            //     showNavs={true}
                                
                            // />
                            <div className="slider">
                            
                            <img className="slider-image" src={product.images[currentIndex].url}></img>
                            <button className="arrow previous" onClick={handlePrevious} >
          &#8249;
        </button>
        <button className="arrow next" onClick={handleNext} >
          &#8250;
        </button>
        </div>
                            :null
                            }
                            </div>
                        

                        <div className="details">
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>

                            <div className="detailsBlock-3">
                                <h3 >{`Price :₹${product.price}`}</h3>
                                <h3>{`Mobile No. :${product.mobileNumber}`}</h3>
                                <div className="detailsBlock-3-1">

                                    {/* <button
                                    // disabled={product.available === true ? true : false}
                                    // onClick={addToCartHandler}
                                    >
                                        Add to Favourite
                                    </button> */}
                                </div>

                                <h3>
                                    Status :
                                    <b className={product.available === false ? "redColor" : "greenColor"}>
                                        {product.available === false ? " Sold out" : " Available"}
                                    </b>
                                </h3>
                            </div>

                            <div  className="detailsBlock-4">
                                <h2 style={{margin:"5px 3vh"}}>
                                Description 
                                </h2>
                                <p style={{margin:"0px 3vh"}}>{product.description}</p>
                            </div>


                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );

};

export default ProductDetails;