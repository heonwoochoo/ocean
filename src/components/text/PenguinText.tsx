import { motion } from "framer-motion";
import styled from "styled-components";

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

function PenguinText() {
  return (
    <Container>
      <Header
        initial={{ y: 50, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        펭귄에게 무슨 일이?
      </Header>
      <TextContents
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <SmallHeader>"펭귄이 위험한가요?"</SmallHeader>
        <BodyTextContainer>
          <BodyText>지금 남극에는 이상기후 현상으로 눈 대신 비가 내려</BodyText>
          <BodyText>새끼 펭귄들이 저체온증으로 죽어가고 있으며,</BodyText>
          <BodyText>빙하가 녹아 펭귄들이 서식지를 잃어가고 있습니다.</BodyText>
          <BodyText>
            지구 온난화로 인한 피해를 가장 현실적으로 보여주는
          </BodyText>
          <BodyText>생태 피해 동물 중 하나인 펭귄은</BodyText>
          <BodyText>자연이 우리에게 주는 경고이자 우리의 미래입니다.</BodyText>
        </BodyTextContainer>
      </TextContents>
    </Container>
  );
}

export default PenguinText;
