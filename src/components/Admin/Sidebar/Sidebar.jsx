import React from "react";
import "./Sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import TreeView from '@mui/lab/TreeView';

import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from '@mui/icons-material/ImportExport';

import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <h1>CampusMart</h1>
        {/* <img src={logo} alt="Ecommerce" /> */}
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products" style={{color:"black",}}>
            <Link className="pv" to="/admin/products">
              {/* <p>products</p> */}
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      {/* <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link> */}
    </div>
  );
};

export default Sidebar;
