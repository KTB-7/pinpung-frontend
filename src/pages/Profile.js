import { useEffect } from 'react';
import useStore from '../store/store';

const Profile = () => {
  const { setShowMap } = useStore();

  useEffect(() => {
    setShowMap(false);

    return () => {
      setShowMap(true);
    };
  }, [setShowMap]);

  const handleLogout = () => {
    clearAuth();
    Navigate('/login');
  };

  return (
    <>
      <h1>UserInfo</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default Profile;
