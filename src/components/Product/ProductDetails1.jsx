import styles from "./ProductDetails.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// import spinnerImg from "../../../assets/spinner.jpg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProductDetails } from "../../actions/productAction";
import SimpleImageSlider from "react-simple-image-slider";

// import useFetchDocument from "../../../customHooks/useFetchDocument";
// import useFetchCollection from "../../../customHooks/useFetchCollection";
// import Card from "../../card/Card";
// import StarsRating from "react-star-rate";

const ProductDetails1 = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    useEffect(() => {
        if (error) {
            toast.error(error);
        } dispatch(getProductDetails(id));
    }, [dispatch, id, error]);


    return (
        // <>
        // <h1>dcsdlcksldk</h1>
        // <h1>dcsdlcksldk</h1>
        // <h1>dcsdlcksldk</h1>
        // <h1>dcsdlcksldk</h1>
        // <h1>dcsdlcksldk</h1>
        // <h1>dcsdlcksldk</h1>
        // <h1>dcsdlcksldk</h1>
        // </>
        <section>
            <div className={`container ${styles.product}`}>
                <h2>Product Details</h2>
                <div>
                    <Link to="/#products">&larr; Back To Products</Link>
                </div>
                {product === null ? (
                    <img src="abc.jpg" alt="Loading" style={{ width: "50px" }} />
                ) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                {product.images ?
                                    <SimpleImageSlider
                                        width={896}
                                        height={504}
                                        images={product.images}
                                        showBullets={true}
                                        showNavs={true}
                                    /> : null
                                }
                            </div>
                            <div className={styles.content}>
                                <h3>{product.name}</h3>
                                <p className={styles.price}>{`$${product.price}`}</p>
                                <p>{product.description}</p>
                                <p>
                                    <b>SKU</b> {product._id}
                                </p>
                                

                                
                                <button
                                    className="--btn --btn-danger"
                                    // onClick={() => addToCart(product)}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </>
                )}
                
            </div>
        </section>
    );
};

export default ProductDetails1;