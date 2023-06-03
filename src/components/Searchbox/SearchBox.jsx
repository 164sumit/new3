import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBox.css'; // CSS file for styling
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/${keyword}`);
  };

  // const handleSearch = (e) => {
  //   // alert(searchText);
  //   // setWord(searchText);
  //   e.preventDefault();
  //   navigate(`/products/${searchText}`);
  //   // if (searchText.trim()) {
  //   // } else {
  //   //   navigate("/products");
  //   // }
  // };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setWord(searchText);
    }
  };

  return (
      <form onSubmit={handleSearch}>
        {/* <MetaData title={keyword}/> */}
    <div className="search-box-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={keyword}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search-button" type='submit'>
        <AiOutlineSearch className="search-icon" />
      </button>
    </div>
      </form>
  );
};

export default SearchBox;
