// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import { useState, useEffect, useRef } from "react";
import { 
  MotionConfig,
  motion,
  useAnimation,
  useTransform,
  useMotionValue,
  animate
} from "framer-motion";
import { 
  LoadingContainer,
  LoadingText,
  ProgressBarContainer,
  ProgressBar,
  AnimatedLogo,
  Particle,
  GradientBackground
} from "./Loaded.style.js";

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 10 + 5,
  delay: Math.random() * 1,
  duration: Math.random() * 2 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100
}));

function App() {
  const [loading, setLoading] = useState(true);
  const progress = useMotionValue(0);
  const controls = useAnimation();
  const loadingTextRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const loadingTexts = [
    "Initializing components...",
    "Optimizing performance...",
    "Loading your experience...",
    "Almost there...",
    "Ready to go!"
  ];

  useEffect(() => {
    const animateProgress = async () => {
      await animate(progress, 100, {
        duration: 4,
        ease: "easeInOut",
        onUpdate: (latest) => {
          // Change text every 20% progress
          const textIndex = Math.min(
            Math.floor(latest / 20),
            loadingTexts.length - 1
          );
          setCurrentTextIndex(textIndex);
        }
      });
      setLoading(false);
    };

    animateProgress();

    // Logo animation sequence
    controls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });

    return () => {
      progress.stop();
    };
  }, []);

  const progressText = useTransform(progress, (value) => `${Math.round(value)}%`);

  if (loading) {
    return (
      <MotionConfig transition={{ type: "spring", damping: 10 }}>
        <GradientBackground>
          <LoadingContainer>
            <motion.div
              animate={controls}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <AnimatedLogo>DevSwipe</AnimatedLogo>
            </motion.div>
            
            {particles.map((particle) => (
              <Particle
                key={particle.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [particle.y, particle.y + 50],
                  x: [particle.x, particle.x + (Math.random() * 40 - 20)]
                }}
                transition={{
                  delay: particle.delay,
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  borderRadius: '50%'
                }}
              />
            ))}
            
            <motion.div
              ref={loadingTextRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={currentTextIndex}
            >
              <LoadingText>{loadingTexts[currentTextIndex]}</LoadingText>
            </motion.div>
            
            <motion.div style={{ width: '80%', marginTop: '20px' }}>
              <ProgressBarContainer>
                <ProgressBar
                  as={motion.div}
                  style={{
                    scaleX: progress,
                    transformOrigin: 'left center'
                  }}
                  transition={{ duration: 0.1 }}
                />
              </ProgressBarContainer>
              <motion.div
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  fontSize: '1rem',
                  color: 'white'
                }}
              >
                {progressText}
              </motion.div>
            </motion.div>
            
            <motion.div
              style={{ marginTop: '40px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.8)'
                }}
              >
                Crafting your digital experience...
              </motion.div>
            </motion.div>
          </LoadingContainer>
        </GradientBackground>
      </MotionConfig>
    );
  }

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;