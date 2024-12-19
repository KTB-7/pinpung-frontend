import HomeIcon from '../../assets/icons/browse-icon.svg'; // 나중에 변경
import styled from 'styled-components';

const HomeButton = () => {
  return (
    <Wrapper>
      <img src={HomeIcon} alt="Home 아이콘" />
    </Wrapper>
  );
};

export default HomeButton;

const Wrapper = styled.div`
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
    max-width: 65px;
    max-height: 65px;
  }
`;
