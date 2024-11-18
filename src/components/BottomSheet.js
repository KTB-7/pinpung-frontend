// 장소 상세정보 컴포넌트
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCafeDetails } from '../api/placesApi';
import useStore from '../store/store';
import styled from 'styled-components';

const BottomSheet = ({ placeId }) => {
  const { setSelectedPlaceName } = useStore();
  const [cafeData, setCafeData] = useState(null);
  const [sheetHeight, setSheetHeight] = useState('50%');
  const [dragStartY, setDragStartY] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!placeId) return;

    const fetchCafeData = async () => {
      try {
        const data = await fetchCafeDetails(placeId);
        setCafeData(data);
        setSelectedPlaceName(data.placeName);
      } catch (error) {
        console.error('카페 상세 정보 가져오기 실패:', error);
      }
    };

    fetchCafeData();
  }, [placeId, setSelectedPlaceName]);

  if (!cafeData) return null;

  const handleDragStart = (e) => setDragStartY(e.clientY);

  const handleDragMove = (e) => {
    if (dragStartY !== null) {
      const delta = dragStartY - e.clientY;
      const newHeight = Math.max(
        0,
        Math.min(50, parseFloat(sheetHeight) - (delta / window.innerHeight) * 100),
      );
      setSheetHeight(`${newHeight}%`);
    }
  };

  const handleDragEnd = () => {
    if (parseInt(sheetHeight, 10) < 25) {
      setSheetHeight('0');
    } else {
      setSheetHeight('50%');
    }
    setDragStartY(null);
  };

  const handlePungUpload = () => {
    navigate(`/places/${placeId}/upload-pung`);
  };

  const handleReviewUpload = () => {
    navigate(`/places/${placeId}/upload-review`);
  };

  return (
    <Wrapper style={{ height: sheetHeight }} onMouseMove={handleDragMove} onMouseUp={handleDragEnd}>
      <DraggableHandle onMouseDown={handleDragStart} />
      <Content onClick={(e) => e.stopPropagation()}>
        {/* HeaderWrapper 사용 */}
        <LineWrapper>
          <Header>{cafeData.placeName || '카페명'}</Header>
          <UploadButton onClick={handlePungUpload}>펑 추가</UploadButton>
        </LineWrapper>
        <div>
          <>{cafeData.address || '주소 정보 없음'}</>
          <LineWrapper>
            {cafeData.tags ? cafeData.tags.map((tag) => `#${tag}`).join(' ') : '태그 정보 없음'}
          </LineWrapper>
          {cafeData.representativePung && (
            <img
              src={`${process.env.REACT_APP_S3_BASE_URL}/uploaded-images/${cafeData.representativePung.imageId}`}
              alt="대표 사진"
              width="100%"
            />
          )}
          <LineWrapper>
            <Header>후기</Header>
            <UploadButton onClick={handleReviewUpload}>후기 남기기</UploadButton>
          </LineWrapper>
          {cafeData.reviews?.reviews.map((review) => (
            <div key={review.reviewId}>
              <p>{review.text}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </Content>
    </Wrapper>
  );
};

export default BottomSheet;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  z-index: 10;
  flex-direction: column;
`;

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const DraggableHandle = styled.div`
  width: 40px;
  height: 6px;
  background-color: #ccc;
  border-radius: 3px;
  margin: 10px auto;
  cursor: grab;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const UploadButton = styled.button`
  background-color: #ffde59;
  color: #333;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
