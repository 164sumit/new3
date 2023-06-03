import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
// import ProductDetails from "./ProductDetails";
import{useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import "./ProductComponent.css";
import { getProductDetails } from "../../actions/productAction";

const ProductComponent = () => {
    const dispatch = useDispatch();
    const { id } = useParams();


    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );



    //   const options = {
    //     size: "large",
    //     value: product.ratings,
    //     readOnly: true,
    //     precision: 0.5,
    //   };



        

    useEffect(() => {
        // if (error) {
        //     toast.error(error);

        // }




        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);
  return (
    <div className="productContainer">
      <div className="imageSliderContainer">
        {product.images && (
          <SimpleImageSlider
          width={"100vw"}
            height={"100vh"}
            images={product.images}
            showBullets={true}
            showNavs={true}
        />
        )}
      </div>
      <div className="productDetailsContainer">
        {/* <ProductDetails product={product} /> */}
        <h1>tejnfknjddkf</h1>
        <h1>tejnfknjddkf</h1>
        <h1>tejnfknjddkf</h1>
        <h1>tejnfknjddkf</h1>
        <h1>tejnfknjddkf</h1>
        <h1>tejnfknjddkf</h1>
      </div>
    </div>
  );
};

export default ProductComponent;
