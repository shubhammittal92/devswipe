import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0d47a1, #1976d2, #42a5f5);
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
  max-width: 500px;
  width: 90%;
  position: relative;
  overflow: hidden;
`;

export const AnimatedLogo = styled(motion.h1)`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const LoadingText = styled(motion.p)`
  color: white;
  font-size: 1.2rem;
  margin: 1rem 0;
  text-align: center;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

export const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #bbdefb);
  border-radius: 5px;
  width: 100%;
`;

export const Particle = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
`;