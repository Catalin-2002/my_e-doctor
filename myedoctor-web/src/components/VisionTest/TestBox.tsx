import { useEffect } from 'react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TestBoxProps {
  triggerInitialLoad: () => void;
  testCharacters: string;
  size?: number;
}

const TestBox = ({ triggerInitialLoad, testCharacters, size }: TestBoxProps) => {
  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (timer > 0) setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(checkInterval);
  }, []);

  if (timer === 0) {
    triggerInitialLoad();
    setTimer((prev) => prev - 1);
  }

  return (
    <div
      className={twMerge(
        'flex h-[290px] w-full max-w-[700px] items-center justify-center rounded-3xl  text-center',
        timer < 1 ? 'border-[1px] border-gray-400' : ''
      )}
    >
      {timer > 0 && <span className="text-[48px] tracking-wider text-gray-400">CALIBRATING... {timer}</span>}
      {!!size && (
        <span className="font-medium" style={{ fontSize: size }}>
          {testCharacters}
        </span>
      )}
    </div>
  );
};

export default TestBox;
