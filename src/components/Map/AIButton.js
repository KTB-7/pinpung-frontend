import { Link } from 'react-router-dom';
import AIIcon from '../../assets/icons/ai-button-icon.svg';
import styled from 'styled-components';

const AIButton = () => {
  return (
    <StyledLink to="/ai-home?view=map">
      <img src={AIIcon} alt="AI 아이콘" />
    </StyledLink>
  );
};

export default AIButton;

const StyledLink = styled(Link)`
  position: fixed;
  bottom: 20%;
  right: 0px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 2%;
  z-index: 2;
  img {
    width: 100%;
    height: 100%;
  }
`;
