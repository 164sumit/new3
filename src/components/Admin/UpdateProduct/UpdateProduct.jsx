// import React from 'react'
import "./UpdateProduct.css"
import {useEffect,useState,Fragment} from "react"
import { useNavigate,useParams } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {toast}from "react-toastify"
import Button from '@mui/material/Button';
import { clearErrors, getProductDetails, updateProduct } from '../../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../../constants/productConstants';
// import { updateProduct } from '../../../../../backend/controller/productcontrolller';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar/Sidebar';

import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Loader from "../../layout/Loader/Loader";


function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    
  
    const { error, product } = useSelector((state) => state.productDetails);
  
    const {
      loading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.adminProduct);

    const {user}=useSelector(state=>state.user);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    const categories = [
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
    ];
  
    const {id:productId} = useParams();
  
    useEffect(() => {
      if (product && product._id !== productId) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.Stock);
        setOldImages(product.images);
      }
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
  
      if (updateError) {
        toast.error(updateError, {
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
        
        toast.success("Product Updated Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        
        navigate("/admin/products")
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
    }, [
      dispatch,
      navigate,
      error,
      isUpdated,
      productId,
      product,
      updateError,
    ]);
  
    const updateProductSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", user.email);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("available", true);
      myForm.set("mobileNumber", user.mobileNumber?user.mobileNumber:1234567890);
  
      images.forEach((image) => {
        myForm.append("images", image);
      });
      dispatch(updateProduct(productId, myForm));
    };
  
    const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
    
      setImages([]);
      setImagesPreview([]);
      setOldImages([]);
    
      files.forEach((file) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            const image = new Image();
            image.src = reader.result;
    
            image.onload = () => {
              const maxHeight = 500;
              const aspectRatio = image.width / image.height;
    
              let width = image.width;
              let height = image.height;
    
              if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
              }
    
              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
    
              const ctx = canvas.getContext("2d");
              ctx.drawImage(image, 0, 0, width, height);
    
              const resizedImage = canvas.toDataURL("image/jpeg");
    
              setImagesPreview((old) => [...old, resizedImage]);
              setImages((old) => [...old, resizedImage]);
            };
          }
        };
    
        reader.readAsDataURL(file);
      });
    };
    
  
    return (

      <>{loading?<Loader/>:
      <Fragment>
        <MetaData title="Create Product" />
        <div className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1>Update Product</h1>
  
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <CurrencyRupeeIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
  
              <div>
                <DescriptionIcon />
  
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
  
              <div>
                <AccountTreeIcon />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={Stock}
                />
              </div>
  
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>
  
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Product Preview" />
                  ))}
              </div>
  
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
  
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      </Fragment>}
      </>
    );
}

export default UpdateProduct
