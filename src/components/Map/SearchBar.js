import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ onSearchBarClick }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearchBarClick(event.target.value);
    }
  };

  return (
    <div
      style={{ position: 'absolute', top: '0', left: '0', right: '0', margin: '0.5rem', zIndex: 2 }}
    >
      <Form className="d-flex" onClick={onSearchBarClick}>
        <Form.Control
          type="search"
          placeholder="검색..."
          className="me-2"
          aria-label="Search"
          style={{ height: '45px', flex: 1 }}
          onKeyDown={handleKeyDown}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
