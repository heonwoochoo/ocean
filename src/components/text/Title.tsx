import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { clickedEarthState, mouseOnEarthState } from "../../atoms";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  end: {
    opacity: 0,
  },
};

const Container = styled(motion.div)``;

const Header = styled(motion.h1)`
  position: absolute;
  text-align: center;
  padding-top: 10rem;
  font-weight: 800;
  font-size: 5rem;
  color: #1ea2d6e2;
  width: 100%;
`;

const colorChange = keyframes`
    0% {
        color: white;
    }
    50% {
        color: #bdc3c7;
    }
    100% {
        color: white;
    }
`;

const HoverText = styled(motion.span)`
  position: absolute;
  bottom: 30px;
  text-align: center;
  width: 100%;
  font-size: 0.8rem;
  animation: ${colorChange} 0.3s infinite;
`;

function Title(): React.ReactElement {
  const mouseOnEarth = useRecoilValue(mouseOnEarthState);
  const clickedEarth = useRecoilValue(clickedEarthState);
  return (
    <Container>
      <AnimatePresence>
        {clickedEarth ? null : (
          <Header
            key={1}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="end"
            transition={{ duration: 0.5 }}
          >
            2032 EARTH
          </Header>
        )}
        {mouseOnEarth ? (
          <HoverText key={2}>Click to read more</HoverText>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}

export default Title;
