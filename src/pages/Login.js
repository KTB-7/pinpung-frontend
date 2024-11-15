import { kakaoLogin } from '../api/kakaoAuthApi';
import kakao_login from '../assets/images/kakao_login_medium_narrow.png';

const Login = () => {
  const onClickLoginButton = () => {
    kakaoLogin();
  };

  return (
    <>
      <h2>카카오 로그인</h2>
      <button onClick={onClickLoginButton}>
        <img src={kakao_login} alt="카카오 로그인" />
      </button>
    </>
  );
};

export default Login;
