import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUserInfo } = useAuthStore();

  useEffect(() => {
    // URL에서 query parameter 추출
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const userId = params.get('userId');
    const userName = params.get('userName');
    const userEmail = params.get('userEmail');

    if (accessToken && userId && userName && userEmail) {
      // Zustand로 토큰과 사용자 정보 저장
      setAccessToken(accessToken);
      setUserInfo({ userId, userName, userEmail });

      // Profile 페이지로 이동
      navigate('/profile');
    } else {
      console.error('인증에 실패했습니다. URL에서 필요한 정보가 누락되었습니다.');
      // 만약 정보가 누락되었다면 로그인 페이지로 다시 리다이렉트
      navigate('/login');
    }

    console.log('accessToken:', accessToken, 'userName:', userName);
  }, [navigate, setAccessToken, setUserInfo]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OAuthCallback;
