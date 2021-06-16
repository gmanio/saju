import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <>
      <BackgroundWrapper>
        <ZodiacBg src="/img/loader.gif" />
      </BackgroundWrapper>
    </>
  );
};

export default Loader;

const rotate = keyframes`
  0% {
    transform: translate(-80px, 200px);
  }
  25% {
    transform: translate(-40px, -200px);
  }
  50% {
    transform: translate(-10px, 100px);
  }
  75% {
    transform: translate(10px, -100px);
  }
  100% {
    transform: translate(-80px, 200px);
  }
`;
const BackgroundWrapper = styled.div`
  display: flex;
  padding-bottom: 300px;
`;

const ZodiacBg = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  animation: ${rotate} 2.5s linear infinite;

`;
