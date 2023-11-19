import { useCallback, useEffect, useState } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [intvl, setIntvl] = useState<number | null>(null);

  const setTimer = useCallback(
    (value: number) => {
      setTime(value);
      if (intvl) clearInterval(intvl);
      setIntvl(setInterval(() => setTime((prev) => prev - 1), 1000));
    },
    [intvl],
  );

  const resetTimer = useCallback(() => {
    if (intvl) clearInterval(intvl);
    setTime(0);
  }, [intvl]);

  useEffect(() => {
    if (time <= 0) resetTimer();
  }, [time, resetTimer]);

  return { time, setTimer, resetTimer };
};
