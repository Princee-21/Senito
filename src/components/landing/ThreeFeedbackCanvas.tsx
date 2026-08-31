import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeFeedbackCanvasProps {
  className?: string;
  interactive?: boolean;
}

export const ThreeFeedbackCanvas: React.FC<ThreeFeedbackCanvasProps> = ({
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080c, 0.08);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported for 3D canvas:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lifecycle Node Waypoints: FEEDBACK -> RATING -> INSIGHT -> ISSUE -> ACTION -> IMPROVEMENT
    const nodes = [
      { name: 'Feedback', pos: new THREE.Vector3(-4.2, 1.2, 0), color: 0xdedbc8 },
      { name: 'Rating', pos: new THREE.Vector3(-2.4, -0.8, 0.5), color: 0xe1e0cc },
      { name: 'Insight', pos: new THREE.Vector3(-0.6, 1.4, -0.4), color: 0xd4ceb5 },
      { name: 'Issue', pos: new THREE.Vector3(1.2, -1.0, 0.6), color: 0xe8c1a0 },
      { name: 'Action', pos: new THREE.Vector3(2.8, 1.0, -0.2), color: 0xb5d4c8 },
      { name: 'Improvement', pos: new THREE.Vector3(4.5, -0.4, 0.4), color: 0xdedbc8 },
    ];

    // Node spheres & halo rings
    const nodeSpheres: THREE.Mesh[] = [];
    const nodeHalos: THREE.Mesh[] = [];

    nodes.forEach((n) => {
      // Core sphere
      const geo = new THREE.SphereGeometry(0.14, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: n.color,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(n.pos);
      rootGroup.add(mesh);
      nodeSpheres.push(mesh);

      // Outer delicate orbital ring
      const ringGeo = new THREE.RingGeometry(0.24, 0.26, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: n.color,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(n.pos);
      ring.rotation.x = Math.PI / 3;
      rootGroup.add(ring);
      nodeHalos.push(ring);
    });

    // Spline curve through the 6 nodes
    const curvePoints = nodes.map((n) => n.pos);
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.4);

    // Render smooth background flow line
    const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.018, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xdedbc8,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    rootGroup.add(tubeMesh);

    // Particle Feedback Signals flowing along the spline curve
    const particleCount = prefersReducedMotion ? 200 : 800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const offsets = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);

    // Subtle palette: Warm Cream, Soft Sage (Positive), Warm Coral (Negative/Issue), Muted Gold
    const colorPalette = [
      new THREE.Color(0xdedbc8), // Warm cream
      new THREE.Color(0xe8e5d5), // Soft white
      new THREE.Color(0xa8d5b8), // Positive green
      new THREE.Color(0xe8aa90), // Issue coral
      new THREE.Color(0xd4c28c), // Amber
    ];

    for (let i = 0; i < particleCount; i++) {
      offsets[i] = Math.random();
      speeds[i] = 0.0008 + Math.random() * 0.0018;
      radii[i] = (Math.random() - 0.5) * 0.45;

      const pt = curve.getPoint(offsets[i]);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // Ambient floating dust particles for subtle cinematic depth
    const ambientCount = 350;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount * 3; i += 3) {
      ambientPos[i] = (Math.random() - 0.5) * 16;
      ambientPos[i + 1] = (Math.random() - 0.5) * 10;
      ambientPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    const ambientMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xdedbc8,
      transparent: true,
      opacity: 0.3,
    });
    const ambientSystem = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientSystem);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.5;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize handling
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
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth camera mouse follow
        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        rootGroup.rotation.y = mouseX * 0.4 + Math.sin(elapsed * 0.15) * 0.08;
        rootGroup.rotation.x = -mouseY * 0.3 + Math.cos(elapsed * 0.12) * 0.05;
        rootGroup.position.y = Math.sin(elapsed * 0.4) * 0.08;

        // Animate particles along the curve
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          offsets[i] = (offsets[i] + speeds[i]) % 1.0;
          const pt = curve.getPoint(offsets[i]);
          const tangent = curve.getTangent(offsets[i]);
          const normal = new THREE.Vector3(-tangent.y, tangent.x, tangent.z).normalize();

          posArray[i * 3] = pt.x + normal.x * radii[i] + Math.sin(elapsed * 2 + i) * 0.02;
          posArray[i * 3 + 1] = pt.y + normal.y * radii[i] + Math.cos(elapsed * 2 + i) * 0.02;
          posArray[i * 3 + 2] = pt.z + normal.z * radii[i];
        }
        posAttr.needsUpdate = true;

        // Pulse node halos
        nodeHalos.forEach((halo, idx) => {
          halo.rotation.z = elapsed * 0.4 * (idx % 2 === 0 ? 1 : -1);
          const s = 1 + Math.sin(elapsed * 1.5 + idx) * 0.12;
          halo.scale.set(s, s, s);
        });

        // Rotate ambient dust
        ambientSystem.rotation.y = elapsed * 0.02;
      }

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
      geoDispose();
    };

    function geoDispose() {
      particleGeo.dispose();
      particleMat.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();
      if (renderer) {
        renderer.dispose();
      }
    }
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      id="three-feedback-canvas"
      className={`relative w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
