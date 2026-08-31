import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreePrismCanvasProps {
  className?: string;
  interactive?: boolean;
}

export const ThreePrismCanvas: React.FC<ThreePrismCanvasProps> = ({
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      console.warn('WebGL not supported for Prism Canvas:', err);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Prism Geometry (an elegant optical triangular prism / octahedron)
    const prismGroup = new THREE.Group();
    scene.add(prismGroup);

    // Core glass prism geometry (bipyramid/polyhedron)
    const geometry = new THREE.OctahedronGeometry(1.6, 0);

    // Custom Glass Shader Material for subtle chromatic dispersion and warm cream tint
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdedbc8,
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.92,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      ior: 1.52,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const prismMesh = new THREE.Mesh(geometry, glassMaterial);
    prismGroup.add(prismMesh);

    // Inner wireframe edge accents in subtle warm cream
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xe1e0cc,
      transparent: true,
      opacity: 0.35,
      linewidth: 1,
    });
    const wireframeLine = new THREE.LineSegments(wireframeGeo, wireframeMat);
    prismGroup.add(wireframeLine);

    // Spectral light ray lines emerging from prism
    const raysCount = 18;
    const raysGroup = new THREE.Group();
    const rayColors = [
      0xdedbc8, 0xfbf9f1, 0xdfd9c0, 0xbaa882, 0xe1e0cc, 0xc4bfa5,
    ];

    const rayLines: THREE.Line[] = [];
    for (let i = 0; i < raysCount; i++) {
      const rayPoints = [];
      const angle = (i / raysCount) * Math.PI * 2;
      const r1 = 1.6;
      const r2 = 3.2 + (i % 3) * 0.6;
      rayPoints.push(new THREE.Vector3(Math.cos(angle) * r1, Math.sin(angle) * r1, 0));
      rayPoints.push(new THREE.Vector3(Math.cos(angle + 0.3) * r2, Math.sin(angle + 0.3) * r2, (Math.random() - 0.5) * 1.5));

      const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
      const rayMat = new THREE.LineBasicMaterial({
        color: rayColors[i % rayColors.length],
        transparent: true,
        opacity: 0.25,
      });
      const ray = new THREE.Line(rayGeo, rayMat);
      raysGroup.add(ray);
      rayLines.push(ray);
    }
    prismGroup.add(raysGroup);

    // Floating optical particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdedbc8,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xdedbc8, 2.5);
    dirLight1.position.set(4, 5, 6);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xe1e0cc, 3, 10);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation & gentle hover floating
      prismGroup.rotation.y = elapsedTime * 0.35 + mouseX;
      prismGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + mouseY;
      prismGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.15;
      prismGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

      // Pulse rays
      raysGroup.rotation.z = -elapsedTime * 0.2;
      rayLines.forEach((ray, idx) => {
        const mat = ray.material as THREE.LineBasicMaterial;
        mat.opacity = 0.15 + Math.sin(elapsedTime * 2 + idx) * 0.12;
      });

      // Slowly rotate particles
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      resizeObserver.disconnect();
      if (renderer && container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      glassMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      id="three-prism-canvas-container"
      className={`relative w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
