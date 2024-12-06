import { useState, useEffect } from 'react';
import useAuthStore from '../store/auth';
import { fetchMyProfilePungs, fetchMyProfileReviews } from '../api/profileApi';
import profileImg from '../assets/images/profile-img.png';
import styled from 'styled-components';

const API_URL = `${process.env.REACT_APP_API_URL}`;
const S3_URL = `${process.env.REACT_APP_S3_BASE_URL}`;

const Profile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const userInfo = useAuthStore((state) => state.userInfo);
  const [activeTab, setActiveTab] = useState('pungs'); // 'pungs' 또는 'reviews'
  const [profileData, setProfileData] = useState(null);
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    // 인증되지 않은 경우 로그인 리다이렉트
    if (!accessToken) {
      window.location.href = `${API_URL}/oauth2/authorization/kakao`;
      return;
    }
  }, [accessToken]);

  useEffect(() => {
    if (activeTab === 'pungs') {
      fetchMyProfilePungs()
        .then((data) => {
          setProfileData(data.defaultProfile);
          setContentData(data.pungs);
        })
        .catch((error) => console.error('펑 데이터를 불러오는 데 실패했습니다:', error));

      // console.log('pungs contentData:', contentData);
    } else if (activeTab === 'reviews') {
      fetchMyProfileReviews()
        .then((data) => {
          setProfileData(data.defaultProfile);
          setContentData(data.reviews);
        })
        .catch((error) => console.error('리뷰 데이터를 불러오는 데 실패했습니다:', error));

      // console.log('reviews contendData:', contentData);
    }
  }, [activeTab]);

  const handleLogout = () => {
    try {
      clearAuth();
      window.location.href = `${API_URL}/logout`;
    } catch (error) {
      console.error('로그아웃 처리 중 에러 발생:', error);
    }
  };

  return (
    <Wrapper>
      <ProfileWrapper>
        <LineWrapper>
          <Header>{userInfo?.userName || ' '}</Header>
          <UploadButton onClick={handleLogout}>로그아웃</UploadButton>
        </LineWrapper>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={profileImg} alt="프로필 이미지" style={{ height: '45px', marginTop: '8px' }} />
          {profileData && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '60%',
                marginLeft: 'auto',
                marginTop: '10px',
              }}
            >
              <div>
                펑
                <br />
                <div style={{ textAlign: 'center' }}>{profileData.pungCount}</div>
              </div>
              <div style={{ marginLeft: '20px' }}>
                리뷰
                <br />
                <div style={{ textAlign: 'center' }}>{profileData.reviewCount}</div>
              </div>
              <div style={{ marginLeft: '20px' }}>
                팔로워
                <br />
                <div style={{ textAlign: 'center' }}>{profileData.followerCount}</div>
              </div>
              <div style={{ marginLeft: '20px' }}>
                팔로잉
                <br />
                <div style={{ textAlign: 'center' }}>{profileData.followingCount}</div>
              </div>
            </div>
          )}
        </div>
      </ProfileWrapper>
      <TabWrapper>
        <TabButton isactive={activeTab === 'pungs'} onClick={() => setActiveTab('pungs')}>
          펑
        </TabButton>
        <TabButton isactive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
          리뷰
        </TabButton>
      </TabWrapper>
      <Content>
        <ItemList>
          {contentData.map((item, index) => (
            <Item key={index}>
              {activeTab === 'pungs' ? (
                <p>
                  <img
                    src={`${S3_URL}/uploaded-images/${item.imageId}`}
                    alt="펑 사진"
                    width="30%"
                  />
                </p>
              ) : (
                <>
                  <h6 style={{ fontWeight: 'bold' }}>{item.userName}</h6>
                  <small>{new Date(item.updatedAt).toLocaleDateString()}</small>
                  <br />
                  <p>{item.reviewText}</p>
                  <p>
                    {' '}
                    {item.imageId && (
                      <img
                        src={`${S3_URL}/original-images/${item.imageId}`}
                        alt="리뷰 사진"
                        style={{ height: '15vh' }}
                      />
                    )}
                  </p>
                </>
              )}
            </Item>
          ))}
        </ItemList>
      </Content>
    </Wrapper>
  );
};

export default Profile;

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
  background-color: #6398f2;
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

const TabButton = styled.button`
  background-color: ${(props) => (props.isactive ? '#6398f2' : 'transparent')};
  color: ${(props) => (props.isactive ? 'white' : 'black')};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #6398f2;
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
