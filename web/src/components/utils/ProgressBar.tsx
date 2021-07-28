import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const [color, setColor] = useState<string>('#f63a0f');

  useEffect(() => {
    if (progress <= 5 && progress > 0) {
      setColor('#f63a0f');
    }

    if (progress <= 25 && progress > 5) {
      setColor('#f27011');
    }

    if (progress <= 50 && progress > 25) {
      setColor('#f2b01e');
    }

    if (progress <= 75 && progress > 50) {
      setColor('#f2d31b');
    }

    if (progress <= 100 && progress > 75) {
      setColor('#86e01e');
    }
  }, [progress]);

  return (
    <div className="w-full">
      <h2 className="text-gray-700 text-center text-4xl">{progress}%</h2>
      <div className='progress'>
        <div
          className='progress-bar'
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};
