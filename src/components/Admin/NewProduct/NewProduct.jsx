import React from 'react'
import "./NewProduct.css"
import {useDispatch,useSelector} from "react-redux"
import {useState,useEffect,Fragment} from "react"
import {useNavigate} from "react-router-dom"
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar/Sidebar';
import {toast} from "react-toastify"
import { clearErrors, createProduct } from '../../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import DialpadIcon from '@mui/icons-material/Dialpad';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Button from '@mui/material/Button';
import Loader from '../../layout/Loader/Loader'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle';
// import {toast} from "react-toastify"
function NewProduct() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector(state=>state.user);
  
    const { loading, error, success } = useSelector((state) => state.newProduct);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [mobile, setmobille] = useState(0);
    const [merror, setmerror] = useState(null);
    const [images, setImages] = useState([]);
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
  
    useEffect(() => {
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
  
      if (success) {
        toast.success("Product Created Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        
        navigate("/admin/products");
        
        dispatch({ type: NEW_PRODUCT_RESET });
      }
    }, [dispatch, error,navigate, success]);
  
    const createProductSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", user.email);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("available", true);
      if(mobile.length!==10){
        toast.error("Please enter 10 digit Mobile Number", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        
        return;
      }
      myForm.set("mobileNumber", mobile);
      
  
      images.forEach((image) => {
        myForm.append("images", image);
      });
      dispatch(createProduct(myForm));
    };
  
    // const createProductImagesChange = (e) => {
    //   const files = Array.from(e.target.files);
  
    //   setImages([]);
    //   setImagesPreview([]);
  
    //   files.forEach((file) => {
    //     const reader = new FileReader();
  
    //     reader.onload = () => {
    //       if (reader.readyState === 2) {
    //         setImagesPreview((old) => [...old, reader.result]);
    //         setImages((old) => [...old, reader.result]);
    //       }
    //     };
  
    //     reader.readAsDataURL(file);
    //   });
    // };

    const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
    
      setImages([]);
      setImagesPreview([]);
    
      files.forEach((file) => {
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const img = new Image();
    
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_HEIGHT = 500;
            const aspectRatio = img.width / img.height;
            const height = Math.min(img.height, MAX_HEIGHT);
            const width = height * aspectRatio;
    
            canvas.width = width;
            canvas.height = height;
    
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
    
            const dataUrl = canvas.toDataURL(file.type);
    
            setImages((prevImages) => [...prevImages, dataUrl]);
            setImagesPreview((prevPreviews) => [...prevPreviews, dataUrl]);
          };
    
          img.src = event.target.result;
        };
    
        reader.readAsDataURL(file);
      });
    };
    
    
  
    return (
      <>{loading?<Loader/>:
      <Fragment>
        <MetaData title="Create Product" />
        <div style={{minHeight:"100vh"}} className="dashboard">
          <Sidebar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Product</h1>
  
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
                />
              </div>
              <div>
                <DialpadIcon />
                <input
                  type="number"
                  placeholder="Mobile number ..."
                  required
                  onChange={(e) => setmobille(e.target.value)}
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
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div> */}
  
              <div id="createProductFormFile">
                <input
                
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
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
                Create
              </Button>
            </form>
        {/* {merror&&<p>{error}</p>} */}
          </div>
        </div>
      </Fragment>
      }
      </>
                
    );
}

export default NewProduct
