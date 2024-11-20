import { useEffect } from 'react';
import useStore from '../store/store';
import useAuthStore from '../store/auth';
import styled from 'styled-components';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const Profile = () => {
  const { accessToken, clearAuth } = useAuthStore();
  const setShowMap = useStore((state) => state.setShowMap);

  useEffect(() => {
    // 페이지 로드 시 맵 숨기기
    setShowMap(false);

    // 인증되지 않은 경우 로그인 리다이렉트
    if (!accessToken) {
      window.location.href = `${API_URL}/oauth2/authorization/kakao`;
      return;
    }

    // 페이지 떠날 때 맵 보이도록 설정
    return () => {
      setShowMap(true);
    };
  }, [accessToken, setShowMap]);

  const handleLogout = () => {
    //window.location.href = `${API_URL}/logout`;
    window.location.href = '/';
    clearAuth();
  };

  return (
    <Wrapper>
      <h1>User Info</h1>
      <button onClick={handleLogout} type="button" className="btn btn-primary">
        로그아웃
      </button>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const LineWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Content = styled.div`
//   padding: 20px;
//   overflow-y: auto;
//   flex: 1;
// `;

// const DraggableHandle = styled.div`
//   width: 40px;
//   height: 6px;
//   background-color: #ccc;
//   border-radius: 3px;
//   margin: 10px auto;
//   cursor: grab;
// `;

// const Header = styled.div`
//   font-size: 20px;
//   font-weight: bold;
// `;
