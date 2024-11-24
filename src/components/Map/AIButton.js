import AIIcon from '../../assets/icons/ai-icon.svg';
import styled from 'styled-components';

const AIButton = () => {
  return (
    <Wrapper>
      <img src={AIIcon} alt="AI 아이콘" />
    </Wrapper>
  );
};

export default AIButton;

const Wrapper = styled.div`
  position: fixed;
  bottom: 20%;
  right: 0;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 3%;
  z-index: 2;
  img {
    width: 100%;
    height: 100%;
    max-width: 60px;
    max-height: 60px;
  }
`;
