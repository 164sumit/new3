import React, { useEffect, useState } from 'react';
import './App.css'; // CSS file for styling
import FilterBox from '../FilterBox/FilterBox';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';

import { useLocation, useParams } from "react-router-dom";
import Pagination from '../Pagenation/Pagination';
import MetaData from '../layout/MetaData';


const Test = () => {
  // let query = useQueryHook();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, onPageChange] = useState(1);
  const [filters, applyFilters] = useState({
    priceRange: [0, 50000],
    category: "",
    sortBy: "",
    sortByDate: ""
  });


  const { products,  filteredProductsCount } = useSelector(state => state.product);

  let totalPages = Math.ceil(filteredProductsCount / 8);

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isMobileDisplay, setMobileDisplay] = useState(false);
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  // useEffect(() => {
  //   // Get the query parameters from the current URL
  //   const queryParams = new URLSearchParams(location.search);

  //   // Retrieve the priceRange query parameter
  //   const priceRangeParam = queryParams.get('priceRange');

  //   // Parse the min and max prices from the priceRangeParam
    
  //   if (priceRangeParam) {
  //     var [parsedMinPrice, parsedMaxPrice] = priceRangeParam.split(',');
      
  //   }
  //   else{
  //     parsedMinPrice=0;
  //     parsedMaxPrice=100000;

  //   }
  //   // const [parsedMinPrice, parsedMaxPrice] = priceRangeParam.split(',');
      
    

  //   // Retrieve the sortBy query parameter
  //   const sortByParam = queryParams.get('sortBy');
   

  //   // Retrieve the sortByDate query parameter
  //   const sortByDateParam = queryParams.get('sortByDate');
    

  //   // Retrieve the category query parameter
  //   const categoryParam = queryParams.get('category');
  //   console.log(keyword, currentPage, Number(parsedMaxPrice), Number(parsedMinPrice), categoryParam?categoryParam:"ALL", sortByDateParam?sortByDateParam:"", sortByParam?sortByParam:"");
    
    
  //   // dispatch(getProduct(keyword, currentPage, parsedMaxPrice, parsedMinPrice, categoryParam, sortByDateParam, sortByParam));

  // }, [location.search,dispatch, keyword, currentPage]);
  useEffect(() => {
    // Get the query parameters from the current URL
    const queryParams = new URLSearchParams(location.search);

    // Retrieve the priceRange query parameter
    const priceRangeParam = queryParams.get('priceRange');

    // Parse the min and max prices from the priceRangeParam
    if (priceRangeParam) {
      const [parsedMinPrice, parsedMaxPrice] = priceRangeParam.split(',');
      setMinPrice(Number(parsedMinPrice));
      setMaxPrice(Number(parsedMaxPrice));
      if(Number(parsedMaxPrice)===0){
        setMaxPrice(100000);
      }
    } else {
      // Reset minPrice and maxPrice to their initial values
      setMinPrice(0);
      setMaxPrice(100000);
    }

    // Retrieve the sortBy query parameter
    const sortByParam = queryParams.get('sortBy');
    if (sortByParam) {
      setSortBy(sortByParam);
    } else {
      // Reset sortBy to its initial value
      setSortBy('');
    }

    // Retrieve the sortByDate query parameter
    const sortByDateParam = queryParams.get('sortByDate');
    if (sortByDateParam) {
      setSortByDate(sortByDateParam === 'true');
    } else {
      // Reset sortByDate to its initial value
      setSortByDate(false);
    }

    // Retrieve the category query parameter
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      // Reset selectedCategory to its initial value
      setSelectedCategory('');
    }
    const filters = {priceRange: [minPrice, maxPrice],
      category: selectedCategory,
      sortBy,
      sortByDate};
      applyFilters(filters);
      console.log(filters);
      const timer = setTimeout(() => {
        dispatch(getProduct(keyword, currentPage, filters.priceRange[1], filters.priceRange[0], filters.category, filters.sortByDate, filters.sortBy));
        
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };


  }, [location.search,maxPrice,minPrice,selectedCategory,sortBy,sortByDate,dispatch, keyword, currentPage]);
  // useEffect(() => {

  // }, [dispatch, keyword, currentPage, filters]);

  useEffect(() => {
    const handleResize = () => {
      setMobileDisplay(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <MetaData title={keyword ? keyword : "Products"} />
      <>
        <div className="cont" >
          {isFilterVisible && <FilterBox applyFilters={applyFilters} setFilterVisible={setFilterVisible} />}
          {isFilterVisible ? (
            <div className="hide-button" onClick={() => setFilterVisible(false)}>
              <CloseIcon />
            </div>
          ) : <div className="filter-icon" onClick={() => setFilterVisible(true)}>
            <FilterAltIcon />
          </div>}

        </div>
        <div className="container2" >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />

          ))}

        </div>

      </>

      <div  className={`app-container${isMobileDisplay ? ' mobile-display' : ''}`}>
        {filters?<h1 style={{display:"none"}}>.</h1>:null}
        {/* {isMobileDisplay ? (
          <>

            {isFilterVisible && <FilterBox applyFilters={applyFilters} />}
            {isFilterVisible ? (
              <div className="hide-button" onClick={() => setFilterVisible(false)}>
                <CloseIcon />
              </div>
            ) : <div className="filter-icon" onClick={() => setFilterVisible(true)}>
              <FilterAltIcon />
            </div>}

          </>
        ) : (
          <div className="filter-container">
            <FilterBox setFilterVisible={setFilterVisible} applyFilters={applyFilters} />
          </div>
        )} */}
        {/* <div className="product-container">
          <div className="searchbox">
            <SearchBox />
          </div>
          <div className="container">
            {products.map((product) => (
              <ProductCard className="pro" key={product._id} product={product} />
            ))}
          </div>
        </div> */}
        {/* <div className="container2" >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />

          ))}

        </div> */}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};

export default Test;
