import React from 'react';
import styled from 'styled-components';

const Login = () => {
  const handleLogin = () => {
    // 백엔드 OAuth2 인증 엔드포인트로 리다이렉트
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };
  return (
    <Wrapper>
      <h2>로그인이 필요합니다.</h2>
      <button img="src/assets/images/kakao_login_medium_narrow.png" onClick={handleLogin}></button>}
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  background-color: white;
  flex-direction: column;
`;
