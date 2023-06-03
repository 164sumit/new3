import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState('');

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);

    if (Number.isInteger(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {currentPage > 1 && (
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
      <div className="pagination-info">
        <p>Total Pages: {totalPages}</p>
        <form onSubmit={handleInputSubmit}>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={handleInputChange}
            placeholder="Go to page..."
          />
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  );
};

export default Pagination;
