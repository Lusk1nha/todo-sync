import { useLayoutEffect, useState } from "react";

export const useDelay = (delay: number) => {
  const [isDelay, setIsDelay] = useState(true);
  const [counter, setCounter] = useState(millisecondsToSeconds(delay));

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsDelay(false);
          return millisecondsToSeconds(delay);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setIsDelay(true);
    };
  }, [delay]);

  function millisecondsToSeconds(ms: number) {
    return Math.floor(ms / 1000);
  }

  return {
    counter,
    isDelay,
  };
};
