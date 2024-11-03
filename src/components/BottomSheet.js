/* placeId를 기반으로 장소 상세 정보를 /places/${placeId} api로 받아와서 표시 */

import React, { useEffect, useState } from 'react';
import { fetchCafeDetails } from '../api/placesApi';
import styled from 'styled-components';

export const BottomSheet = () => {
  const isBottomSheetOpen = useStore((state) => state.isBottomSheetOpen);
  const selectedPlaceId = useStore((state) => state.selectedPlaceId);
  const closeBottomSheet = useStore((state) => state.closeBottomSheet);

  const [cafeData, setCafeData] = useState(null);

  useEffect(() => {
    if (!selectedPlaceId) return;

    const fetchDetails = async () => {
      const data = await fetchCafeDetails(selectedPlaceId);
      setCafeData(data);
    };

    fetchDetails();
  }, [selectedPlaceId]);

  if (!isBottomSheetOpen || !cafeData) return null;
  //console.log(cafeData);

  return (
    <BottomSheetWrapper onclick={closeBottomSheet}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>{cafeData.placeName || '카페명'}</Header>
        <p>{cafeData.address || '주소 정보 없음'}</p>
        <p>태그: {cafeData.tags ? cafeData.tags.join(', ') : '태그 정보 없음'}</p>
        {cafeData.representativePung && (
          <img src={cafeData.representativePung.imageWithText} alt="대표 사진" width="100%" />
        )}
        <h3>후기</h3>
        {cafeData.reviews &&
          cafeData.reviews.reviews.map((review) => (
            <div key={review.reviewId}>
              <p>{review.text}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
      </Content>
    </BottomSheetWrapper>
  );
  // return (
  //   <BottomSheetWrapper $isOpen={isOpen} id="bottomSheet">
  //     <Header onClick={onClose}>{cafeData.placeName || '카페명'}</Header>
  //     <Content>
  //       <p>{cafeData.address || '주소 정보 없음'}</p>
  //       <p>태그: {cafeData.tags ? cafeData.tags.join(', ') : '태그 정보 없음'}</p>
  //       {cafeData.representativePung && (
  //         <img src={cafeData.representativePung.imageWithText} alt="대표 사진" width="100%" />
  //       )}
  //       <h3>후기</h3>
  //       {cafeData.reviews &&
  //         cafeData.reviews.reviews.map((review) => (
  //           <div key={review.reviewId}>
  //             <p>{review.text}</p>
  //             <small>{new Date(review.createdAt).toLocaleDateString()}</small>
  //           </div>
  //         ))}
  //     </Content>
  //   </BottomSheetWrapper>
  // );
};

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

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 30px 20px 20px 20px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default BottomSheet;
