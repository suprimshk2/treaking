import { useState, useEffect, useRef } from 'react';

interface ICountdownTimerProps {
  timeInSecs: number;
  handleTimeUp: VoidFunction;
  resetCount?: number;
}

export function CountdownTimer({
  timeInSecs,
  handleTimeUp,
  resetCount = 0,
}: ICountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeInSecs); // 300 seconds = 5 minutes

  const timeUpCallbackRef = useRef(handleTimeUp);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (resetCount > 0) {
      setTimeLeft(timeInSecs);
    }
  }, [resetCount, setTimeLeft, timeInSecs]);

  const formatTime = (time: number) => {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      timeUpCallbackRef.current();
    }
  }, [minutes, seconds]);

  return (
    <>
      {minutes}:{formatTime(seconds)}
    </>
  );
}

CountdownTimer.defaultProps = {
  resetCount: 0,
};

export default CountdownTimer;
