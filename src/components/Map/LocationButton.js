import { getUserLocation } from '../../api/locationApi';
import LocationIcon from '../../assets/icons/compass-icon.svg';
import styled from 'styled-components';

const LocationButton = () => {
  const handleLocationClick = async () => {
    try {
      const location = await getUserLocation();
      console.log('현재 위치:', location);
      // TODO: 받은 위치대로 다시 맵 불러와야함
    } catch (error) {
      console.error('위치 요청 실패:', error.message);
      // TODO: 사용자에게 알리는 UI 추가
    }
  };

  return (
    <Wrapper onClick={handleLocationClick}>
      <img src={LocationIcon} alt="위치 아이콘" />
    </Wrapper>
  );
};

export default LocationButton;

const Wrapper = styled.div`
  position: fixed;
  bottom: 11%;
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
