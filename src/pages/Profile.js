import { useEffect } from 'react';
import useAuthStore from '../store/auth';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const Profile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const userInfo = useStore((state) => state.userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    // 인증되지 않은 경우 로그인 리다이렉트
    if (!accessToken) {
      window.location.href = `${API_URL}/oauth2/authorization/kakao`;
      return;
    }
  }, [accessToken]);

  const handleLogout = () => {
    try {
      window.location.href = `${API_URL}/logout`;

      clearAuth();
      navigate('/logout-success');
    } catch (error) {
      console.log('로그아웃에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Content>
        <LineWrapper>
          <Header>{userInfo.userName || ' '}</Header>
          <UploadButton onClick={handleLogout}>로그아웃</UploadButton>
        </LineWrapper>
      </Content>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
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
