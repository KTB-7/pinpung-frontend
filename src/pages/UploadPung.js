import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/store';
import { addPung } from '../api/pungApi';
import { compressImage, addPadding, convertToWebP } from '../utils/imageUtils';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        const compressedFile = await compressImage(image); // 압축만 처리
        const paddedFile = await addPadding(compressedFile); // 패딩 추가
        const finalImage = await convertToWebP(paddedFile); // WebP로 변환

        addPung(placeId, finalImage, finalImage, text);

        navigate(-1);
      } catch (error) {
        console.log('펑 업로드 중 오류 발생:', error);
      }
    }
  };

  const handleClose = async () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Header className="container-fluid">
        <PlaceName> {selectedPlaceName} </PlaceName>
        <CloseButton
          onClick={handleClose}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></CloseButton>
      </Header>
      <Form className="container-fluid">
        <CenteredArea className="row w-100">
          <div className="col-12 text-center mb-4">
            <h3>
              자유롭게 표현해 보세요
              <br /> 24시간 뒤에 펑! 돼요
            </h3>
          </div>
          <div className="col-12 d-flex justify-content-center mb-3">
            <div className="input-group" style={{ width: 'auto' }}>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && <ImagePreview src={URL.createObjectURL(image)} alt="미리보기" />}
            </div>
          </div>
          <div className="col-12 mb-4">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="텍스트를 입력하세요"
              className="form-control"
              rows="1"
              style={{ width: '100%' }}
            />
          </div>
        </CenteredArea>
        <div className="d-flex justify-content-center">
          <UploadButton onClick={handleUpload}>업로드</UploadButton>
        </div>
      </Form>
    </Wrapper>
  );
};

export default UploadPung;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #434343;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  color: white;
  top: 20px;
`;

const PlaceName = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  font-weight: bold;
  font-size: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 2px;
  filter: invert(1);
`;

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
`;

const CenteredArea = styled.div`
  width: 100%;
  max-width: 500px;
  color: #8c8c8c;
`;

const UploadButton = styled.button`
  background-color: #6398f2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-left: 10px;
`;
