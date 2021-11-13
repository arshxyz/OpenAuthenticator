import { CircularProgress } from '@chakra-ui/progress';
import { useState, useEffect } from 'react';

const TimeProgress = () => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const timeLeft = Math.floor(Date.now() / 1000) % 30;
      setVal(timeLeft * 3.3333);
    }, 1000);
  }, []);
  return (
    <CircularProgress size="24px" thickness="15" value={val} color="teal.400" />
  );
};

export default TimeProgress;
