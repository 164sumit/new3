import React, { useEffect, useState } from 'react';
import './App.css'; // CSS file for styling
import FilterBox from '../FilterBox/FilterBox';

import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import SearchBox from '../Searchbox/SearchBox';
import { useParams } from 'react-router-dom';
import Pagination from '../Pagenation/Pagination';
import MetaData from '../layout/MetaData';
// import useQueryHook from '../../customhooks/useQueryHook';

const Test = () => {
  // let query = useQueryHook();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, onPageChange] = useState(1);
  const [filters, applyFilters] = useState({
    priceRange: [0, 50000],
    category: '',
    sortBy: '',
    sortByDate: '',
  });
  const [filterContainerVisible, setFilterContainerVisible] = useState(true);

  const { products,  filteredProductsCount } = useSelector((state) => state.product);

  let totalPages = Math.ceil(filteredProductsCount / 8);

  useEffect(() => {
    dispatch(
      getProduct(
        keyword,
        currentPage,
        filters.priceRange[1],
        filters.priceRange[0],
        filters.category,
        filters.sortByDate,
        filters.sortBy
      )
    );
  }, [dispatch, keyword, currentPage, filters]);

  const toggleFilterContainer = () => {
    setFilterContainerVisible(!filterContainerVisible);
  };

  return (
    <>
      <MetaData title={keyword ? keyword : 'Products'} />

      <div className="app-container">
        <div className={`filter-container ${filterContainerVisible ? 'show' : 'hide'}`}>
          <div className="toggle-icon" onClick={toggleFilterContainer} />
          <FilterBox applyFilters={applyFilters} />
        </div>
        <div className="product-container">
          <div className="searchbox">
            <SearchBox />
          </div>
          <div className="container">
            {products.map((product) => {
              return <ProductCard className="pro" key={product._id} product={product} />;
            })}
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};

export default Test;
