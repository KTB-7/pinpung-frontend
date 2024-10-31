/* placeId를 기반으로 장소 상세 정보를 /places/${placeId} api로 받아와서 표시 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export const BottomSheet = ({ isOpen, placeId, onClose }) => {
  const [cafeData, setCafeData] = useState(null);

  useEffect(() => {
    if (!placeId) return;

    const fetchCafeDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/${placeId}`);
        setCafeData(response.data);
      } catch (error) {
        console.error('카페 상세 정보 가져오기 실패:', error);
      }
    };

    fetchCafeDetails();
  }, [placeId]);

  if (!cafeData || !isOpen) return null;
  console.log(cafeData);
  

  return (
    <BottomSheetWrapper $isOpen={isOpen} id='bottomSheet'>
      <Header onClick={onClose}>{cafeData.placeName || '카페명'}</Header>
      <Content>
        <p>{cafeData.address || '주소 정보 없음'}</p>
        <p>태그: {cafeData.tags ? cafeData.tags.join(', ') : '태그 정보 없음'}</p>
        {cafeData.representativePung && (
          <img src={cafeData.representativePung.imageWithText} alt="대표 사진" width="100%" />
        )}
        <h3>후기</h3>
        {cafeData.reviews && cafeData.reviews.reviews.map((review) => (
          <div key={review.reviewId}>
            <p>{review.text}</p>
            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </Content>
    </BottomSheetWrapper>
  );
};

const BottomSheetWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({$isOpen}) => ($isOpen ? '50%' : '8%')};
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 16px;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export default BottomSheet;