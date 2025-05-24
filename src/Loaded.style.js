// LoadingScreen.styles.js
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #f5f5f5, #e3f2fd, #bbdefb, #e1f5fe);
  background-size: 400% 400%;
  animation: ${gradient} 8s ease infinite;
`;

export const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #1565c0;  // Darker blue for text
  font-weight: 500;
  animation: ${fadeIn} 1.5s ease-in-out infinite alternate;
`;

export const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2;  // Primary blue
  margin-bottom: 30px;
  animation: ${bounce} 2s ease infinite;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const ProgressBarContainer = styled.div`
  width: 200px; 
  height: 8px; 
  background-color: #e0e0e0; 
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #90caf9, #1976d2);  // Light to dark blue gradient
  transition: width 0.3s ease;
  border-radius: 4px;
`;