import LocationIcon from '../../assets/icons/compass-icon.svg';
import styled from 'styled-components';
const LocationButton = () => {
  return (
    <Wrapper>
      <img src={LocationIcon} alt="AI 아이콘" />
    </Wrapper>
  );
};

export default LocationButton;

const Wrapper = styled.div`
  position: fixed;
  bottom: 10%;
  right: 8px;
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
    max-width: 60px;
    max-height: 60px;
  }
`;
