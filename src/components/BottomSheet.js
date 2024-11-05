// 장소 상세정보 컴포넌트
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCafeDetails } from '../api/placesApi';
import useStore from '../store';
import styled from 'styled-components';

const BottomSheet = () => {
  const { isBottomSheetOpen, selectedPlaceId, closeBottomSheet } = useStore();
  const [cafeData, setCafeData] = useState(null);
  const [sheetHeight, setSheetHeight] = useState(isBottomSheetOpen ? '50%' : '0');
  const [dragStartY, setDragStartY] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPlaceId) return;

    const fetchCafeData = async () => {
      try {
        const data = await fetchCafeDetails(selectedPlaceId);
        setCafeData(data);
      } catch (error) {
        console.error('카페 상세 정보 가져오기 실패:', error);
      }
    };

    if (isBottomSheetOpen) fetchCafeData();
  }, [selectedPlaceId, isBottomSheetOpen]);

  useEffect(() => {
    setSheetHeight(isBottomSheetOpen ? '50%' : '0');
  }, [isBottomSheetOpen]);

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
      closeBottomSheet();
    } else {
      setSheetHeight('50%');
    }
    setDragStartY(null);
  };

  if (!cafeData) return null;

  const handlePungUpload = () => {
    closeBottomSheet();
    navigate(`/places/${selectedPlaceId}/upload-pung`);
  };

  //if (!isBottomSheetOpen || !cafeData) return null;

  return (
    <BottomSheetWrapper
      $isOpen={isBottomSheetOpen}
      style={{ height: sheetHeight }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      <DraggableHandle onMouseDown={handleDragStart} />
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>{cafeData.placeName || '카페명'}</Header>
        <UploadButton onClick={handlePungUpload}>펑 추가</UploadButton>
        <Details>
          <p>{cafeData.address || '주소 정보 없음'}</p>
          <p>태그: {cafeData.tags ? cafeData.tags.join(', ') : '태그 정보 없음'}</p>
          {cafeData.representativePung && (
            <img src={cafeData.representativePung.imageWithText} alt="대표 사진" width="100%" />
          )}
          <h3>후기</h3>
          {cafeData.reviews?.reviews.map((review) => (
            <div key={review.reviewId}>
              <p>{review.text}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </Details>
      </Content>
    </BottomSheetWrapper>
  );
};

export default BottomSheet;

const BottomSheetWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '50%' : '8%')};
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  z-index: 10;
`;

const DraggableHandle = styled.div`
  width: 40px;
  height: 6px;
  background-color: #ccc;
  border-radius: 3px;
  margin: 10px auto;
  cursor: grab;
`;

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const UploadButton = styled.button`
  background-color: #ffde59;
  color: #333;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
`;

const Details = styled.div`
  padding: 10px;
`;
