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
    <UploadContainer>
      <h2>펑 업로드하기</h2>
      <input type="file" onChange={handleImageUpload} />
      <textarea value={text} onChange={handleTextChange} placeholder="텍스트를 입력하세요" />
      <UploadButton onClick={handleUpload}>업로드</UploadButton>
    </UploadContainer>
  );
};

export default UploadPung;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffde59;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
