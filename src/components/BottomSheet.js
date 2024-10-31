import React from 'react';
import styled from 'styled-components';

export const BottomSheet = ({ isOpen, cafe, onClose }) => {
  if (!cafe) return null;

  const tags = cafe.tags ? cafe.tags.join(', ') : '태그 정보 없음'; // 조건부 처리

  return (
    <BottomSheetWrapper isOpen={isOpen}>
      <Header onClick={onClose}> {cafe.place_name}</Header>
      <Content>
        <p>{cafe.address}</p>
        <p>태그: {tags}</p> {/* 안전하게 tags 렌더링 */}
        {cafe.representativePung && (
          <img src={cafe.representativePung.imageWithText} alt="대표 사진" width="100%" />
        )}
        <h3>리뷰</h3>
        {cafe.reviews &&
          cafe.reviews.reviews.map((review) => (
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
  height: ${(isOpen) => (isOpen ? '50%' : '8%')};
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
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
