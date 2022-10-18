import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { textAnimationFinish } from "../../atoms";

const Container = styled.div`
  position: absolute;
  z-index: 1;
`;

const Header = styled(motion.h1)`
  position: absolute;
  font-size: 4rem;
  width: 100vw;
  text-align: center;
  margin-top: 3rem;
  color: whitesmoke;
  font-family: "Do Hyeon", sans-serif;
`;

const TextContents = styled(motion.div)`
  position: absolute;
  background: rgba(1, 1, 1, 0.6);
  padding: 2rem 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  color: white;
  top: 40vh;
  left: 5vw;
  gap: 1.5rem;
  font-family: "Noto Serif KR", serif;
`;

const SmallHeader = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const BodyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const BodyText = styled.p`
  font-size: 0.9rem;
  color: #bdc3c7;
`;

function PolarText() {
  const setTextAniEnd = useSetRecoilState(textAnimationFinish);
  return (
    <Container>
      <Header
        initial={{ y: 50, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        북극곰의 위기
      </Header>
      <TextContents
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onAnimationEnd={() => {
          console.log("애니끝");
        }}
        onAnimationStart={() => {
          console.log("애니시작");
          setTextAniEnd(true);
        }}
      >
        <SmallHeader>"최근 20년 사이 북극의 빙하 면적 50% 감소"</SmallHeader>
        <BodyTextContainer>
          <BodyText>북극곰의 주 서식지이자 사냥터인 빙하는</BodyText>
          <BodyText>지금 이 순간에도 녹아 내리고 있습니다.</BodyText>
          <BodyText>
            이대로 빙하가 사라진다면 굶주려 죽거나, 먹이를 찾아 민가로 내려와
          </BodyText>
          <BodyText>인간과의 갈등을 초래하는 일이 빈번해 질 것입니다.</BodyText>
          <BodyText>이렇듯, 여전히 기후 변화와 북극곰의 멸종위기는 </BodyText>
          <BodyText>현재 진행형 문제입니다.</BodyText>
        </BodyTextContainer>
      </TextContents>
    </Container>
  );
}

export default PolarText;
