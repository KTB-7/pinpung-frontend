import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMyProfilePungs, fetchMyProfileReviews } from '../api/profileApi';
import profileImg from '../assets/images/profile-img.png';
import styled from 'styled-components';

const S3_URL = `${process.env.REACT_APP_S3_BASE_URL}`;

const UserPage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('pungs'); // 'pungs' 또는 'reviews'
  const [profileData, setProfileData] = useState(null);
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    if (activeTab === 'pungs') {
      fetchMyProfilePungs(userId)
        .then((data) => {
          setProfileData(data.defaultProfile);
          setContentData(data.pungs);
        })
        .catch((error) => console.error('펑 데이터를 불러오는 데 실패했습니다:', error));

      // console.log('pungs contentData:', contentData);
    } else if (activeTab === 'reviews') {
      fetchMyProfileReviews(userId)
        .then((data) => {
          setProfileData(data.defaultProfile);
          setContentData(data.reviews);
        })
        .catch((error) => console.error('리뷰 데이터를 불러오는 데 실패했습니다:', error));

      // console.log('reviews contendData:', contentData);
    }
  }, [activeTab]);

  const handleFollow = () => {};

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: '90vh',
        backgroundColor: 'white',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 2,
      }}
    >
      {/* 프로필 */}
      <div className="p-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fs-4 fw-bold" style={{ fontSize: '1.5rem' }}>
            {profileData.userName || ' '}
          </h2>
          <button
            style={{
              color: '#fff',
              backgroundColor: '#ff9c0e',
              padding: '0.3rem 0.5rem',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
            onClick={handleFollow}
          >
            팔로우
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <img
            src={profileImg}
            alt="프로필 이미지"
            style={{ height: '3rem', marginTop: '0.5rem', borderRadius: '50%' }}
          />
          {profileData && (
            <div
              className="d-flex justify-content-between align-items-center ms-auto mt-2"
              style={{ gap: '1rem' }}
            >
              <div className="text-center">
                <div style={{ fontSize: '0.9rem' }}>펑</div>
                <div style={{ fontSize: '0.9rem' }}>{profileData.pungCount}</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '0.9rem' }}>리뷰</div>
                <div style={{ fontSize: '0.9rem' }}>{profileData.reviewCount}</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '0.9rem' }}>팔로워</div>
                <div style={{ fontSize: '0.9rem' }}>{profileData.followerCount}</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '0.9rem' }}>팔로잉</div>
                <div style={{ fontSize: '0.9rem' }}>{profileData.followingCount}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 탭 */}
      <div className="d-flex justify-content-center">
        <button
          style={{
            color: activeTab === 'pungs' ? '#fff' : '#6c757d', // 선택되지 않은 버튼은 기본 텍스트 색상
            backgroundColor: activeTab === 'pungs' ? '#ff9c0e' : 'transparent', // 선택되지 않은 버튼은 투명
            marginLeft: '1rem',
            flex: 1,
            fontSize: '1rem',
            border: 'none', // 선택되지 않은 버튼에 테두리 추가
            borderRadius: '0.25rem',
          }}
          onClick={() => setActiveTab('pungs')}
        >
          펑
        </button>
        <button
          style={{
            color: activeTab === 'reviews' ? '#fff' : '#6c757d', // 선택되지 않은 버튼은 기본 텍스트 색상
            backgroundColor: activeTab === 'reviews' ? '#ff9c0e' : 'transparent', // 선택되지 않은 버튼은 투명
            marginRight: '1rem',
            flex: 1,
            fontSize: '1rem',
            border: 'none', // 선택되지 않은 버튼에 테두리 추가
            borderRadius: '0.25rem',
          }}
          onClick={() => setActiveTab('reviews')}
        >
          리뷰
        </button>
      </div>

      {/* 콘텐츠 */}
      <div
        className="flex-grow-1 overflow-auto p-3"
        style={
          {
            // 높이 자동조정..
          }
        }
      >
        {activeTab === 'pungs' ? (
          <div className="container-fluid">
            <div className="row">
              {contentData.map((item, index) => (
                <div key={index} className="col-4 mb-3">
                  <div className="card h-100">
                    <img
                      src={`${S3_URL}/uploaded-images/${item.imageId}`}
                      className="card-img-top"
                      alt="펑 사진"
                      style={{ height: '10rem', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container-fluid px-0">
            {contentData.map((item, index) => (
              <div key={index} className="card border-0 shadow-none">
                <div className="card-body">
                  <div className="card-text" style={{ fontSize: '1rem' }}>
                    {item.placeName}
                  </div>
                  <small className="text-muted">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </small>
                  <p className="card-text mb-1" style={{ marginTop: '1.5vh', fontSize: '0.95rem' }}>
                    {item.reviewText}
                  </p>
                  {item.imageId && (
                    <img
                      src={`${S3_URL}/original-images/${item.imageId}`}
                      alt="리뷰 사진"
                      className="img-fluid mt-1"
                      style={{ width: '100vw', objectFit: 'cover', borderRadius: '3%' }}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20%;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  z-index: 2;
`;

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileWrapper = styled.div`
  padding: 20px;
  flex: 1;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const UploadButton = styled.button`
  background-color: #ff9c0e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 10px 0;
`;

const TabButton = styled.button.attrs((props) => ({
  isactive: undefined,
}))`
  background-color: ${(props) => (props.isactive ? '#ff9c0e' : 'transparent')};
  color: ${(props) => (props.isactive ? 'white' : 'black')};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #ff9c0e;
    color: white;
  }
`;

const Content = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
`;
