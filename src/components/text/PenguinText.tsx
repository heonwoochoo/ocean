import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 1;
`;

const Header = styled.h1`
  position: absolute;
  font-size: 3.5rem;
  width: 100vw;
  text-align: center;
  margin-top: 1rem;
  color: whitesmoke;
  background: rgba(1, 1, 1, 0.6);
`;

const TextContents = styled.div`
  position: absolute;
  background: rgba(1, 1, 1, 0.6);
  display: flex;
  flex-direction: column;
  position: relative;
  color: white;
  top: 40vh;
  left: 5vw;
  gap: 1.5rem;
`;

const SmallHeader = styled.h3`
  font-size: 1.5rem;
`;

const BodyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const BodyText = styled.p`
  font-size: 0.9rem;
`;

const ImgContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2);
`;

const Img = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1rem;
`;

function PenguinText() {
  return (
    <Container>
      <Header>펭귄에게 무슨 일이?</Header>
      <TextContents>
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
      {/* <ImgContainer>
        <Img src="https://img.animalplanet.co.kr/news/2020/02/19/700/62r73m5c6vp032pjios0.jpg" />
        <Img src="http://t1.daumcdn.net/liveboard/share/25dbeb969254436fa07504bfe58e306f.png" />
        <Img src="http://img.khan.co.kr/news/2019/04/25/l_2019042501003289000261625.jpg" />
        <Img src="https://img.khan.co.kr/news/2019/04/25/l_2019042501003289000261622.jpg" />
        <Img src="http://imgnn.seoul.co.kr/img//upload/2008/07/14/SSI_20080714172533_V.jpg" />
        <Img src="https://pbs.twimg.com/media/EK-oquZU4AE14VT.jpg" />
      </ImgContainer> */}
    </Container>
  );
}

export default PenguinText;
