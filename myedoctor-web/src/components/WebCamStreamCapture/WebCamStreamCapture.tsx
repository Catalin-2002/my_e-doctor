import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebcamStreamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // New state for captured image

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (webcamRef.current) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream as MediaStream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: { data: BlobPart }) => {
      if (data.toString().length > 0) {
        setRecordedChunks((prev) => [...prev, data]);
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const captureAndProcessFrame = useCallback(() => {
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
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;
          const width = imageData.width;
          const height = imageData.height;
          const pixels = new Array(height);

          for (let y = 0; y < height; y++) {
            pixels[y] = new Array(width);
            for (let x = 0; x < width; x++) {
              const idx = (y * width + x) * 4;
              pixels[y][x] = [data[idx], data[idx + 1], data[idx + 2]]; // RGBA values
            }
          }

          // Now 'pixels' is your 3D array
          console.log(pixels);

          // i WANT TO LOG the shape of the image
          console.log('height', height);
          console.log('width', width);
        };
        img.src = imageSrc;
      }
    }
  }, [webcamRef]);

  // make me a function that captures a frame each 0.2 seconds and then processes it

  return (
    <div className="">
      <Webcam height={200} width={400} audio={false} ref={webcamRef} className="align-end" />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>}
      {/* <button onClick={captureAndProcessFrame}>Capture and Process Frame</button> */}
    </div>
  );
};

export default WebcamStreamCapture;
