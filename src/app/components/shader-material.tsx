"use client"

import { useRef, useState, useEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'

export function ShaderMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const dpr = window.devicePixelRatio

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to Shadertoy's coordinate system
      // (pixels from bottom-left)
      setMouse({ 
        x: event.clientX * dpr, 
        y: (window.innerHeight - event.clientY) * dpr 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const uniforms = useMemo(() => ({
    iTime: { value: 0.0 },
    iTimeDelta: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
    iMouse: { value: new THREE.Vector3(0, 0, 1) }
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      const { uniforms } = materialRef.current;
      const { elapsedTime } = state.clock;

      uniforms.iTime.value = elapsedTime;
      uniforms.iTimeDelta.value = elapsedTime - uniforms.iTime.value;
      uniforms.iResolution.value.set(
        window.innerWidth * dpr,
        window.innerHeight * dpr,
        1
      );
      uniforms.iMouse.value.set(mouse.x, mouse.y, 1);
    }
  })

  return (
    <shaderMaterial
      ref={materialRef as React.RefObject<THREE.ShaderMaterial>}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={false}
      opacity={1}
    />
  )
}
