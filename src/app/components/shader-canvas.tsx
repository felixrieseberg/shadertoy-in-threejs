"use client"

import { useEffect, useState } from "react";

import { invalidate, Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import { ShaderMaterial } from "./shader-material";
import { useWindowSize } from "../hooks/use-window-size";

export function ShaderCanvas() {
  const { innerWidth, innerHeight } = useWindowSize();
  const [ key, setKey ] = useState(`${innerWidth}-${innerHeight}`);

  // The shaders tend to be brittle and tend to break when we
  // change the window size or the underlying shader material. 
  // 
  // To force rerenders, we use a unique key for the canvas
  // that changes whenever the window size changes.
  useEffect(() => {
    setKey(`${innerWidth}-${innerHeight}`);
    invalidate();
  }, [innerWidth, innerHeight, key]);

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      camera={{ position: [0, 0, 1] }}
      key={key}
    >
      <OrthographicCamera
        makeDefault
        left={-1}
        right={1}
        top={1}
        bottom={-1}
        near={0.1}
        far={1000}
        position={[0, 0, 1]}
      />
      <mesh scale={[2, 2, 1]}>
        <planeGeometry />
        <ShaderMaterial />
      </mesh>
    </Canvas>
  );
}
