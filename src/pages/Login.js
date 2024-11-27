import styled from 'styled-components';
import kakaoLoginImage from '../assets/images/kakao_login_medium_narrow.png';

const Login = () => {
  const handleLogin = () => {
    // 백엔드 OAuth2 인증 엔드포인트로 리다이렉트
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <Wrapper>
      <h2>로그인이 필요합니다.</h2>
      <img src={kakaoLoginImage} alt="카카오 로그인" onClick={handleLogin} />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
