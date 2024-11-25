import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import styled from 'styled-components';
import HomeIcon from '../assets/icons/home.svg';
import AddIcon from '../assets/icons/add.svg';
import ProfileIcon from '../assets/icons/profile.svg';

const Navbar = () => {
  const showNavbar = useStore((state) => state.showNavbar);

  if (!showNavbar) return null;

  return (
    <Nav>
      <Menu>
        <li>
          <IconLink to="/">
            <img src={HomeIcon} alt="Home" />
          </IconLink>
        </li>
        <li>
          <IconLink to="/add-pung">
            <img src={AddIcon} alt="Add" />
          </IconLink>
        </li>
        <li>
          <IconLink to="/profile">
            <img src={ProfileIcon} alt="profile" />
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
  max-width: 500px;
  padding: 0;
  margin: 0;
`;

const IconLink = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #555;
  }
`;

export default Navbar;
