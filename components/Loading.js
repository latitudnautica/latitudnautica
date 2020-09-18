import { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, useTransition, useChain } from 'react-spring';

const LoadingStyled = styled.div`
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  height: 50vh;
  align-items: center;
`;

const Loading = () => {
  const [isRunning, setIsRunning] = useState(true);

  const props = useSpring({
    config: { duration: 500 },
    opacity: 1,
    from: { opacity: 0 },
    reset: isRunning,
    reverse: isRunning,
    onRest: () => {
      setIsRunning(!isRunning);
    },
  });

  return (
    <>
      <LoadingStyled>
        <animated.div style={props}>Cargando Productos</animated.div>
      </LoadingStyled>
    </>
  );
};

export default Loading;
