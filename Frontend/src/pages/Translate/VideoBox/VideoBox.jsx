import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as hands from '@mediapipe/hands';
import * as cameraUtils from '@mediapipe/camera_utils';
import './VideoBox.css';

const VideoBox = ({ setText }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      modelRef.current = await tf.loadLayersModel('/model_tfjs/model.json');
    };

    const setupCamera = async () => {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
    };

    const setupMediaPipe = () => {
      const handsDetector = new hands.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
      handsDetector.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      handsDetector.onResults((results) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            processHandImage(canvas, landmarks);
          }
        }
      });

      const camera = new cameraUtils.Camera(videoRef.current, {
        onFrame: async () => {
          await handsDetector.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    };

    const processHandImage = async (canvas, landmarks) => {

      const ctx = canvas.getContext('2d');
      const x = Math.min(...landmarks.map((l) => l.x)) * canvas.width;
      const y = Math.min(...landmarks.map((l) => l.y)) * canvas.height;
      const width = (Math.max(...landmarks.map((l) => l.x)) - Math.min(...landmarks.map((l) => l.x))) * canvas.width;
      const height = (Math.max(...landmarks.map((l) => l.y)) - Math.min(...landmarks.map((l) => l.y))) * canvas.height;

      const imageData = ctx.getImageData(x, y, width, height);

      const tensor = tf.browser.fromPixels(imageData)
        .resizeNearestNeighbor([64, 64]) 
        .toFloat()
        .div(255.0)
        .expandDims();

      const prediction = await modelRef.current.predict(tensor).data();
      const maxIndex = prediction.indexOf(Math.max(...prediction));
      const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const predictedLetter = labels[maxIndex];

      setText(predictedLetter);
    };

    loadModel();
    setupCamera();
    setupMediaPipe();

    return () => {
      // Dọn dẹp
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [setText]);

  return (
    <div className="video-box">
      <video ref={videoRef} width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
};

export default VideoBox;