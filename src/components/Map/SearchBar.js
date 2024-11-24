import styled from 'styled-components';

const SearchBar = ({ onSearchBarClick }) => {
  return (
    <SearchBarWrapper onClick={onSearchBarClick}>
      <Input type="text" placeholder="검색..." />
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  width: 94%;
  margin: 3% auto;
  position: relative;
  top: 0;
  height: 8%;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
`;
