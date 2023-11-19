import { Box, BoxProps, styled } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowButton } from './arrow-button';

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'arrowVisible',
})<BoxProps & { arrowVisible?: boolean }>(({ arrowVisible, theme }) => ({
  position: 'relative',
  width: '100%',
  padding: arrowVisible ? `0 ${theme.spacing(2)}` : 0,
}));

const ScrollContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',

  overflowX: 'auto',

  height: '100%',
  width: '100%',

  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  ['&::-webkit-scrollbar']: {
    display: 'none',
  },
});

const ArrowLeft = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  zIndex: 1,
});

const ArrowRight = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: 0,
  zIndex: 1,
});

interface P {
  children: React.ReactNode;
  className?: string;
  component?: 'nav' | 'div';
}

export const HorizontalScrollContainer = ({
  className,
  children,
  component = 'div',
}: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const [displayLeftBtn, setDisplayLeftBtn] = useState<boolean>(false);
  const [displayRightBtn, setDisplayRightBtn] = useState<boolean>(false);

  const displayArrows = useCallback((tgt: HTMLElement) => {
    const touchscreen =
      typeof navigator !== 'undefined' &&
      'maxTouchPoints' in navigator &&
      navigator.maxTouchPoints > 0;

    if (touchscreen) return;
    if (tgt.scrollWidth === tgt.clientWidth) return;

    const scrollPercentage =
      (100 * tgt.scrollLeft) / (tgt.scrollWidth - tgt.clientWidth);

    setDisplayLeftBtn(scrollPercentage !== 0);
    setDisplayRightBtn(scrollPercentage !== 100);
  }, []);

  const handleScroll = (event: React.SyntheticEvent<HTMLDivElement>) =>
    displayArrows(event.currentTarget);

  useEffect(() => {
    const current = ref.current;

    if (current) displayArrows(current);
  }, [displayArrows]);

  return (
    <Root
      arrowVisible={displayLeftBtn || displayRightBtn}
      className={className}
      component={component}
    >
      <ArrowLeft>
        <ArrowButton
          variant="left"
          style={displayLeftBtn ? undefined : { display: 'none' }}
          onClick={() =>
            ref.current?.scrollBy({ top: 0, left: -169, behavior: 'smooth' })
          }
        />
      </ArrowLeft>

      <ScrollContainer ref={ref} onScroll={handleScroll}>
        {children}
      </ScrollContainer>

      <ArrowRight>
        <ArrowButton
          variant="right"
          style={displayRightBtn ? undefined : { display: 'none' }}
          onClick={() =>
            ref.current?.scrollBy({ top: 0, left: 169, behavior: 'smooth' })
          }
        />
      </ArrowRight>
    </Root>
  );
};
