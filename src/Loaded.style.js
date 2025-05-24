import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg, 
    #121212 0%, 
    #1a1a1a 50%, 
    #222222 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 500px;
  width: 90%;
  position: relative;
  overflow: hidden;
`;

export const AnimatedLogo = styled(motion.h1)`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
`;

export const LoadingText = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 1rem 0;
  text-align: center;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

export const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(200, 200, 200, 0.6) 100%
  );
  border-radius: 3px;
  width: 100%;
`;

export const Particle = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  pointer-events: none;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
`;