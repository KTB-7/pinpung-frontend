import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const SearchBar = () => {
  //const setKeyword = useSearch((state) => state.setKeyword);
  const navigate = useNavigate();

  // 검색 입력 핸들링
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const keyword = event.target.value;
      // setKeyword(keyword);

      navigate(`/search-results?keyword=${keyword}&sort=accuracy`);
    }
  };

  // 검색창 클릭 핸들링
  const handleSearchBarClick = () => {
    const searchBarInput = document.querySelector('#home-search-input');
    if (searchBarInput) {
      searchBarInput.focus();
    }
  };

  return (
    <Form className="d-flex" onClick={handleSearchBarClick}>
      <Form.Control
        type="search"
        placeholder="검색..."
        className="me-2"
        aria-label="Search"
        id="home-search-input"
        style={{ height: '45px', flex: 1 }}
        onKeyDown={handleSearch}
      />
    </Form>
  );
};

export default SearchBar;
