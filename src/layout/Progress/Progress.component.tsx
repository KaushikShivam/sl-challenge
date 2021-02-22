import { withNProgress } from '@tanem/react-nprogress';
import React from 'react';

const Progress: React.FC<{
  animationDuration: number;
  isFinished: boolean;
  progress: number;
}> = ({ isFinished, progress, animationDuration }) => (
  <div
    style={{
      display: isFinished ? 'none' : 'block',
      background: 'white',
      height: 2,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'fixed',
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
      zIndex: 1031,
    }}
  >
    <div
      style={{
        boxShadow: '0 0 10px white, 0 0 5px white',
        display: 'block',
        height: '100%',
        opacity: isFinished ? 0 : 1,
        position: 'absolute',
        right: 0,
        transform: 'rotate(3deg) translate(0px, -4px)',
        width: 100,
      }}
    />
  </div>
);

export default withNProgress(Progress);
