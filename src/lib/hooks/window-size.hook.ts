import React from 'react';

const onWindowSizeChange = (onChange: () => void) => {
  window.addEventListener('resize', onChange);

  return () => window.removeEventListener('resize', onChange);
};

const windowWidthSnapshot = (selector = (width: number) => width) =>
  selector(window.innerWidth);

const windowHeightSnapshot = (selector = (height: number) => height) =>
  selector(window.innerHeight);

export const useWindowSize = ({
  heightSelector,
  widthSelector,
}: {
  heightSelector?: (h: number) => number;
  widthSelector?: (w: number) => number;
}) => {
  const windowWidth = React.useSyncExternalStore(onWindowSizeChange, () =>
    windowWidthSnapshot(widthSelector),
  );

  const windowHeight = React.useSyncExternalStore(onWindowSizeChange, () =>
    windowHeightSnapshot(heightSelector),
  );

  return { width: windowWidth, height: windowHeight };
};
