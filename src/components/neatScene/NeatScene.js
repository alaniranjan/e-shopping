import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNeat } from '@firecms/neat';

const NeatScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const config = {
      colors: [
        { color: "#cdb4db", enabled: true },
        { color: "#ffc8dd", enabled: true },
        { color: "#ffafcc", enabled: true },
        { color: "#bde0fe", enabled: true },
        { color: "#a2d2ff", enabled: false },
      ],
      speed: 4,
      horizontalPressure: 3,
      verticalPressure: 3,
      waveFrequencyX: 2,
      waveFrequencyY: 4,
      waveAmplitude: 5,
      shadows: 0,
      highlights: 2,
      colorBrightness: 1,
      colorSaturation: 3,
      wireframe: false,
      colorBlending: 5,
      backgroundColor: "#003FFF",
      backgroundAlpha: 1,
      resolution: 1
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    const neat = createNeat(scene, config);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      neat.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      neat.dispose();
    };
  }, []);

  return  <div ref={mountRef}/>;
};

export default NeatScene;
