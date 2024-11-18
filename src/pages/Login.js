import { useEffect } from 'react';
import useStore from '../store/store';
import styled from 'styled-components';
import kakaoLoginImage from '../assets/images/kakao_login_medium_narrow.png';

const Login = () => {
  const handleLogin = () => {
    // 백엔드 OAuth2 인증 엔드포인트로 리다이렉트
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  const { setShowMap } = useStore();

  useEffect(() => {
    // 페이지 로드 시 맵 숨기기
    setShowMap(false);

    // 페이지 떠날 때 맵 보이도록 설정
    return () => {
      setShowMap(true);
    };
  }, [setShowMap]);

  return (
    <Wrapper>
      <h2>로그인이 필요합니다.</h2>
      <img src={kakaoLoginImage} onClick={handleLogin} />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
