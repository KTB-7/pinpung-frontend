// UploadPungWithSearch.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/store';
import { addPung } from '../api/pungApi';
import { compressImage, addPadding, convertToWebP } from '../utils/imageUtils';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { Modal, Button } from 'react-bootstrap';
import SearchBar from '../components/Map/SearchBar';
import SearchResultListForPung from '../components/SearchResultListForPung';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadPungWithSearch = () => {
  const { placeId: routePlaceId } = useParams();
  const navigate = useNavigate();
  const [placeId, setPlaceId] = useState(routePlaceId || null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const selectedPlaceName = useStore((state) => state.selectedPlaceName);

  useEffect(() => {
    if (!placeId) {
      setShowSearchModal(true); // placeId가 없으면 모달 열기
    }
  }, [placeId]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async () => {
    if (!placeId) {
      alert('먼저 장소를 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      let finalImage = null;
      if (image) {
        const compressedFile = await compressImage(image); // 압축 처리
        const paddedFile = await addPadding(compressedFile); // 패딩 추가
        finalImage = await convertToWebP(paddedFile); // WebP로 변환
      }

      await addPung(placeId, finalImage, finalImage, text);

      setLoading(false);
      navigate(`/places/${placeId}`, { state: { pungAdded: true } });
    } catch (error) {
      setLoading(false);
      console.log('펑 업로드 중 오류 발생:', error);
      alert('펑 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  const handleClose = () => {
    if (placeId) {
      navigate(`/places/${placeId}`);
    } else {
      navigate(-1);
    }
  };

  const handlePlaceSelect = (selectedPlaceId) => {
    setPlaceId(selectedPlaceId);
    setShowSearchModal(false);
  };

  return (
    <Wrapper>
      <Header className="container-fluid">
        {placeId ? <PlaceName> {selectedPlaceName} </PlaceName> : <SearchBar />}
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
          <div className="d-flex justify-content-center">
            {/* 숨겨진 파일 입력 */}
            <HiddenInput
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* 버튼 */}
            <SquareButton
              onClick={handleButtonClick}
              image={image ? URL.createObjectURL(image) : null}
            >
              {!image && <span style={{ fontSize: '40px' }}>+</span>}
            </SquareButton>
          </div>
          <p></p>
          <div className="col-12 mb-4">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="소감을 남겨주세요"
              className="form-control"
              rows="1"
              style={{ width: '100%', resize: 'none' }}
            />
          </div>
        </CenteredArea>
        <div className="d-flex justify-content-center">
          {loading ? (
            <ClipLoader color={'#FFFFFF'} size={50} />
          ) : (
            <UploadButton onClick={handleUpload}>업로드</UploadButton>
          )}
        </div>
      </Form>

      {/* 장소 검색 모달 */}
      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>장소 검색 및 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBar />
          <SearchResultListForPung onPlaceSelect={handlePlaceSelect} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSearchModal(false)}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
};

export default UploadPungWithSearch;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  margin-bottom: 10%;
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
  background-color: #ff9c0e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none; // 화면에 보이지 않도록 숨김
`;

// 정사각형 버튼 스타일
const SquareButton = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;

  span {
    color: #888;
    font-size: 14px;
  }
`;
