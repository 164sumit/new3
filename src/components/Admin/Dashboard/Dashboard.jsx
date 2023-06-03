import React from 'react'
import "./Dashboard.css"
import {useEffect,useState} from "react"
import {Link} from "react-router-dom"
import MetaData from '../../layout/MetaData';
import {useDispatch,useSelector} from "react-redux"
import { getAdminProduct } from '../../../actions/productAction';
import Sidebar from '../Sidebar/Sidebar';
const Dashboard = () => {
    const dispatch = useDispatch();
    const {user}=useSelector(state=>state.user);
    
  
    const { products } = useSelector((state) => state.product);
  
    // const { orders } = useSelector((state) => state.allOrders);
  
    // const { users } = useSelector((state) => state.allUsers);
  
    
  
    
  
    useEffect(() => {
      dispatch(getAdminProduct(user.email));
    //   dispatch(getAllOrders());
    //   dispatch(getAllUsers());
    }, [dispatch,user]);
  
    // let totalAmount = 0;
    // orders &&
    //   orders.forEach((item) => {
    //     totalAmount += item.totalPrice;
    //   });
  
    // const lineState = {
    //   labels: ["Initial Amount", "Amount Earned"],
    //   datasets: [
    //     {
    //       label: "TOTAL AMOUNT",
    //       backgroundColor: ["tomato"],
    //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
    //       data: [0, totalAmount],
    //     },
    //   ],
    // };
  
    // const doughnutState = {
    //   labels: ["Out of Stock", "InStock"],
    //   datasets: [
    //     {
    //       backgroundColor: ["#00A6B4", "#6800B4"],
    //       hoverBackgroundColor: ["#4B5000", "#35014F"],
    //       data: [outOfStock, products.length - outOfStock],
    //     },
    //   ],
    // };
  
    return (
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />
  
        <div className="dashboardContainer">
          {/* <Typography component="h1">Dashboard</Typography> */}
          <h1>Dashboard</h1>
          {/* <div>Dashboard</div> */}
  
          <div className="dashboardSummary">
            {/* <div> */}
              {/* <p> */}
                {/* Total Amount <br /> ₹{totalAmount} */}
              {/* </p> */}
            {/* </div> */}
            
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Products Count</p>
                <p>{products && products.length}</p>
              </Link>
              {/* <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link> */}
              {/* <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link> */}
            </div>
          </div>
  
          <div className="lineChart">
            {/* <Line data={lineState} /> */}
          </div>
  
          <div className="doughnutChart">
            {/* <Doughnut data={doughnutState} /> */}
          </div>
        </div>
      </div>
    );
};
  
export default Dashboard;