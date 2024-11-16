import { useEffect } from 'react';
import useStore from '../store/store';
import useAuthStore from '../store/auth';

const KAKAO_URL = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;

const Profile = () => {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const { setShowMap } = useStore();

  useEffect(() => {
    // 페이지 로드 시 맵 숨기기
    setShowMap(false);

    // 인증되지 않은 경우 로그인 리다이렉트
    if (!isAuthenticated) {
      window.location.href = KAKAO_URL;
      return;
    }

    // 페이지 떠날 때 맵 보이도록 설정
    return () => {
      setShowMap(true);
    };
  }, [isAuthenticated, setShowMap]);

  const handleLogout = () => {
    // 로그아웃 처리 후 다시 로그인 페이지로 리다이렉트
    clearAuth();
    window.location.href = KAKAO_URL;
  };

  return (
    <>
      <h1>User Info</h1>
      <button onClick={handleLogout} type="button" className="btn btn-primary">
        로그아웃
      </button>
    </>
  );
};

export default Profile;
