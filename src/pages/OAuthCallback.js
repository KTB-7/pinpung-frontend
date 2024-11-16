import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';
import axios from 'axios';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUserInfo } = useAuthStore();

  useEffect(() => {
    // URL에서 query parameter 추출 (code 파라미터 추출)
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // 백엔드에서 리다이렉트된 code 추출

    // 인증 코드가 있는 경우, 백엔드로 API 요청하여 사용자 정보 가져와야함
    const fetchUserInfo = async () => {
      try {
        // 백엔드에 인증 코드를 보내어 액세스 토큰과 사용자 정보 요청
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/login/oauth2/code/kakao`,
          {
            params: { code }, // 카카오 인증 후 받은 인증 코드 전달
          },
        );

        // JSON 데이터에서 필요한 정보 추출
        const { accessToken, userId, userName, userEmail } = response.data;

        if (accessToken && userId && userName && userEmail) {
          // Zustand로 토큰과 사용자 정보 저장
          setAccessToken(accessToken);
          setUserInfo({ userId, userName, userEmail });

          // Profile 페이지로 이동
          navigate('/profile');
        } else {
          console.error('인증에 실패했습니다. 필요한 정보가 누락되었습니다.');
          // 만약 정보가 누락되었다면 홈으로 리다이렉트
          navigate('/');
        }
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
        navigate('/');
      }
    };

    // 인증 코드가 있는 경우에만 함수 호출
    if (code) {
      fetchUserInfo();
    } else {
      console.error('인증 코드가 누락되었습니다.');
      navigate('/');
    }
  }, [navigate, setAccessToken, setUserInfo]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OAuthCallback;
