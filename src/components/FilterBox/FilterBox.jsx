import React, { useCallback, useEffect, useState } from 'react';
import { Range } from 'react-range';
import './FilterBox.css'; // CSS file for styling
import { useLocation, useNavigate, useParams  } from 'react-router-dom';

const FilterBox = (props) => {
  const navigate=useNavigate()
  const { keyword } = useParams();
  const location=useLocation();
  const defaultCategories = ["Laptop", "Bicycle", "Shoes"];
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortByDate, setSortByDate] = useState(false);

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = Number(event.target.value);
    if (newMaxPrice < minPrice) {
      setMaxPrice(minPrice);
    } else {
      setMaxPrice(newMaxPrice);
    }
  };

  const handlePriceRangeChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortByDate = () => {
    setSortByDate((prevValue) => !prevValue);
  };

  // const handleApplyFilters = () => {
  //   const filters = {
  //     priceRange: [minPrice, maxPrice],
  //     category: selectedCategory,
  //     sortBy,
  //     sortByDate
  //   };
  //   props.applyFilters(filters);
  //   props.setFilterVisible(false);
  // };
  const handleApplyFilters = useCallback(() => {
    const filters = {priceRange: [minPrice, maxPrice],
          category: selectedCategory,
          sortBy,
          sortByDate};
    const qfilters = {};

    // Add priceRange to filters if it's not in the initial state
    if (minPrice !== 0 || maxPrice !== 100000) {
      qfilters.priceRange = `${minPrice},${maxPrice}`;
      // filters.priceRange = `${minPrice},${maxPrice}`;
    }
    if(maxPrice===0){
      qfilters.priceRange=`${minPrice},${100000}`;
    }

    // Add category to filters if it's not in the initial state
    if (selectedCategory !== '') {
      filters.category = selectedCategory;
      qfilters.category = selectedCategory;
    }

    // Add sortBy to filters if it's not in the initial state
    if (sortBy !== '') {
      filters.sortBy = sortBy;
      qfilters.sortBy = sortBy;
    }

    // Add sortByDate to filters if it's not in the initial state
    if (sortByDate) {
      filters.sortByDate = sortByDate.toString();
      qfilters.sortByDate = sortByDate.toString();
    }

    // Build the query params string
    const queryParams = new URLSearchParams(qfilters).toString();

    // Set the query params in the navigation bar and navigate to the desired URL
    if(keyword){
      navigate(`/products/${keyword}?${queryParams}`);

    }
    else{

      navigate(`/products?${queryParams}`);
    }
    // props.applyFilters(filters);
    const timer = setTimeout(() => {
      props.setFilterVisible(false);
      
    }, 500);

    return () => {
      clearTimeout(timer);
    };

    // props.setFilterVisible(false);
  }, [minPrice, maxPrice, selectedCategory, sortBy, sortByDate, navigate]);
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
    // const filters = {priceRange: [minPrice, maxPrice],
    //   category: selectedCategory,
    //   sortBy,
    //   sortByDate};
    // props.applyFilters(filters);

  }, [location.search]);
  // useEffect(() => {
  //   handleApplyFilters();
  // }, [handleApplyFilters]);

  return (
    <div className="filter-box-container">
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <label htmlFor="min-price">Min Price:</label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <label htmlFor="max-price">Max Price:</label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
        <Range
          step={1}
          min={0}
          max={100000}
          values={[minPrice, maxPrice]}
          onChange={handlePriceRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                background: '#ccc',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                background: '#fff',
                border: '1px solid #ccc',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.16)',
              }}
            />
          )}
        />
        <p>Price: ₹{minPrice} - ₹{maxPrice}</p>
      </div>
      <div className="filter-section">
        <h3>Category</h3>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {defaultCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <h3>Sort By</h3>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="">None</option>
          <option value="f">Price: Low to High</option>
          <option value="true">Price: High to Low</option>
          {/* <option value="dateAsc">Date: Old to New</option>
          <option value="dateDesc">Date: New to Old</option> */}
        </select>
      </div>
      <div className="filter-section">
        <input
          type="checkbox"
          checked={sortByDate}
          onChange={handleSortByDate}
        />
        <label>Sort by Date</label>
      </div>
      <button className="apply-filters-button" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBox;
