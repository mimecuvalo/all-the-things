'use client';

import { Suspense, lazy, memo, useEffect, useState } from 'react';

import Help from './Help';
import { styled } from '@mui/material/styles';

const Debug = lazy(() => import('components/internal/Debug'));

// TODO get rid of the !important later
const StyledDebugWrapper = styled('div')`
  position: fixed;
  bottom: ${(props) => props.theme.spacing(1)};
  right: ${(props) => props.theme.spacing(2.5)}; // Swipeable drawer width.

  & button {
    margin-left: ${(props) => props.theme.spacing(1)} !important;
  }
`;

// NB: we memoize here because it has the a11y script included on dev which is expensive.
const DebugWrapper = memo(function DebugWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <StyledDebugWrapper>
      {process.env.NODE_ENV === 'development' && isLoaded && (
        <Suspense fallback={<span />}>
          <Debug />
        </Suspense>
      )}
      <Help />
    </StyledDebugWrapper>
  );
});
export default DebugWrapper;
