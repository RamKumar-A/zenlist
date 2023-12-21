// not used anywhere

import { useEffect, useState } from 'react';

function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(function () {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return { formattedTime };
}

export default useCurrentTime;
