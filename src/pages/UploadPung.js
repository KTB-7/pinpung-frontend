import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store';
import { addPung } from '../api/pungApi';
import { compressAndPadImage } from '../utils/imageUtils';
import styled from 'styled-components';

const UploadPung = () => {
  const { placeId } = useParams(); // URL 파라미터에서 placeId를 받아옴
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const selectedPlaceName = useStore((state) => state.selectedPlaceName);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const finalImage = await compressAndPadImage(image);

        //addPung(userId, placeId, imageWithText, pureImage, text); // 원래 이게 맞음
        addPung(18, placeId, finalImage, finalImage, text);

        console.log('Image:', image, 'Text:', text, 'Place ID:', placeId);

        // 업로드 완료 후 이전 페이지로 이동
        navigate(-1);
      } catch (error) {
        console.log('펑 업로드 중 오류 발생:', error);
      }
    }
  };

  return (
    <Wrapper>
      <PlaceArea>{selectedPlaceName}</PlaceArea>
      <CenteredArea>
        <h2>
          자유롭게 표현해 보세요
          <br />
          24시간 뒤에 펑! 돼요
        </h2>
        <textarea value={text} onChange={handleTextChange} placeholder="텍스트를 입력하세요" />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </CenteredArea>
      <UploadButton onClick={handleUpload}>업로드</UploadButton>
    </Wrapper>
  );
};

export default UploadPung;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 수직 중앙 정렬 */
  width: 100vw; /* 화면의 가로를 모두 채움 */
  height: 100vh; /* 화면의 세로를 모두 채움 */
  padding: 20px;
  background-color: #434343;
  box-sizing: border-box; /* 패딩 포함 전체 크기 조정 */
`;

const PlaceArea = styled.div`
  width: 100%;
  text-align: center;
  color: #ffde59;
  font-size: 1.5em; /* 적절히 강조하기 위해 폰트 크기 조정 */
  margin-bottom: 20px;
`;

const CenteredArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  color: #8c8c8c; /* h2 텍스트 색상 */
  margin-bottom: 20px;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffde59;
  color: #434343;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
