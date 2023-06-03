import React from 'react'
import "./ProductList.css"
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,Link} from "react-router-dom"
import {toast} from "react-toastify"
import {useEffect,Fragment} from "react"
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar/Sidebar';
import Button from '@mui/material/Button';
import { clearErrors, deleteProduct, getAdminProduct } from '../../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstants';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../layout/Loader/Loader';
function ProductList() {
    const dispatch = useDispatch();

    const navigate=useNavigate()
    const {user}=useSelector(state=>state.user)
  
    const { error, products } = useSelector((state) => state.product);
  
    const { error: deleteError, isDeleted,loading } = useSelector(
      (state) => state.adminProduct
    );
  
    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));

    };
  
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
  
      if (deleteError) {
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
  
      if (isDeleted) {
        toast.success("Product Deleted Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        // navigate("/admin/dashboard")
        
        dispatch(getAdminProduct(user.email));
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
      // if(loading){

      //   dispatch(getAdminProduct(user.email));
      // }
  
      dispatch(getAdminProduct(user.email));
    }, [dispatch,  error, deleteError,  isDeleted,user,navigate]);
  
    const columns = [
      // { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 250,
        flex: 1,
      },
      // {
      //   field: "avilable",
      //   headerName: "Available",
      //   type: "number",
      //   minWidth: 150,
      //   flex: 0.3,
      // },
  
      {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 100,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/product/${params.row.id}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteProductHandler(params.row.id)
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    products &&
      products.forEach((item,index) => {
        rows.push({
          id: item._id,
          stock: item.Stock,
          price: item.price,
          name: item.name,
          rowStyle: {
            backgroundColor: index % 2 === 0 ? "" : "rgb(221, 221, 221)",
          },
        });
      });
  
    return (
      <>{loading?<Loader/>:
      <Fragment>

        <MetaData title={`ALL PRODUCTS - Admin`} />
  
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer" style={{overflow:"auto"}}>
            <h1 id="productListHeading">ALL PRODUCTS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>}
      </>
    );
}

export default ProductList
