import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const UploadPung = () => {
  const { placeId } = useParams(); // URL 파라미터에서 placeId를 받아옴
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = () => {
    // TODO: 사진과 텍스트 업로드하기
    console.log('Image:', image);
    console.log('Text:', text);
    console.log('Place ID:', placeId);
    // 업로드 완료 후 이전 페이지로 이동
    navigate(-1);
  };

  return (
    <Wrapper>
      <CenteredArea>
        <h2>
          자유롭게 표현해 보세요
          <br />
          24시간 뒤에 펑! 돼요
        </h2>
        <textarea value={text} onChange={handleTextChange} placeholder="텍스트를 입력하세요" />
        <input type="file" onChange={handleImageUpload} />
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
