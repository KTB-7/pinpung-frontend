import { useEffect } from 'react';
import useStore from '../store/store';
import useAuthStore from '../store/auth';

const Profile = () => {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const { setShowMap } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/oauth2/authorization/kakao';
      return;
    }

    setShowMap(false);

    return () => {
      setShowMap(true);
    };
  }, [isAuthenticated, setShowMap]);

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/oauth2/authorization/kakao';
  };

  return (
    <>
      <h1>UserInfo</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default Profile;
