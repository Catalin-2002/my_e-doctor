import { characterSizeAtom, testIdAtom } from '@/src/utils/atoms';
import { updateCameraFrame } from '@/src/utils/queries/vision';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamStreamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const setCharacterSize = useSetAtom(characterSizeAtom);
  const testId = useAtomValue(testIdAtom);

  const captureAndProcessFrame = useCallback(() => {
    let capturedImage = undefined;

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          if (!ctx) return;
          ctx.drawImage(img, 0, 0);

          capturedImage = canvas.toDataURL();
          if (capturedImage && testId) {
            updateCameraFrame({ testId, cameraFrame: capturedImage })
              .catch((err) => console.error(err))
              .then((data) => {
                data && setCharacterSize(data.levelSize);
              });
          }
        };

        img.src = imageSrc;
      }
    }
    return capturedImage;
  }, [webcamRef, testId]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      captureAndProcessFrame();
    }, 300);

    return () => clearInterval(checkInterval);
  }, [testId]);

  return <Webcam height={200} width={400} audio={false} ref={webcamRef} className="align-end" />;
};

export default WebcamStreamCapture;
