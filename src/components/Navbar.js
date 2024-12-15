import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import styled from 'styled-components';
import BrowseIcon from '../assets/icons/browse-icon.svg';
import AddIcon from '../assets/icons/add-pung-icon.svg';
import ProfileIcon from '../assets/icons/profile-icon.svg';

const Navbar = () => {
  const showNavbar = useStore((state) => state.showNavbar);

  if (!showNavbar) return null;

  return (
    <Nav>
      <Menu>
        <li>
          <IconLink to="/">
            <img src={BrowseIcon} alt="Home" style={{ marginTop: '19px', height: '57px' }} />
          </IconLink>
        </li>
        <li>
          <IconLink to="/add-pung">
            <img src={AddIcon} alt="Add" style={{ position: 'relative', bottom: '20px' }} />
          </IconLink>
        </li>
        <li>
          <IconLink to="/profile">
            <img src={ProfileIcon} alt="profile" style={{ marginTop: '20px', height: '56px' }} />
          </IconLink>
        </li>
      </Menu>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0;
  margin: 0 36px;
`;

const IconLink = styled(Link)`
  text-decoration: none;
  color: #333;

  &:hover {
    color: #555;
  }
`;

export default Navbar;
