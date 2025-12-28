// 3D Particle Background - Emerald + White theme
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 3000 }) {
    const ref = useRef();
    const mousePosition = useRef({ x: 0, y: 0 });

    // Generate random positions for particles
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count]);

    // Track mouse position
    useMemo(() => {
        if (typeof window !== 'undefined') {
            const handleMouseMove = (e) => {
                mousePosition.current = {
                    x: (e.clientX / window.innerWidth) * 2 - 1,
                    y: -(e.clientY / window.innerHeight) * 2 + 1,
                };
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    // Animate particles
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta * 0.03;
            ref.current.rotation.y -= delta * 0.05;

            // Subtle mouse interaction
            ref.current.rotation.x += mousePosition.current.y * 0.0005;
            ref.current.rotation.y += mousePosition.current.x * 0.0005;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#10b981"  // Emerald
                    size={0.012}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function WhiteParticles({ count = 1500 }) {
    const ref = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.02;
            ref.current.rotation.y += delta * 0.03;
        }
    });

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"  // White
                size={0.008}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

function FloatingOrbs() {
    const orb1 = useRef();
    const orb2 = useRef();
    const orb3 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (orb1.current) {
            orb1.current.position.x = Math.sin(t * 0.3) * 2;
            orb1.current.position.y = Math.cos(t * 0.2) * 1.5;
        }
        if (orb2.current) {
            orb2.current.position.x = Math.cos(t * 0.4) * 2.5;
            orb2.current.position.y = Math.sin(t * 0.3) * 1.8;
        }
        if (orb3.current) {
            orb3.current.position.x = Math.sin(t * 0.2) * 1.5;
            orb3.current.position.y = Math.cos(t * 0.4) * 2;
        }
    });

    return (
        <>
            <mesh ref={orb1} position={[-2, 1, -3]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#10b981" transparent opacity={0.12} />
            </mesh>
            <mesh ref={orb2} position={[2, -1, -4]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshBasicMaterial color="#f59e0b" transparent opacity={0.08} />
            </mesh>
            <mesh ref={orb3} position={[0, 2, -5]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
        </>
    );
}

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <ParticleField count={2000} />
                <WhiteParticles count={1000} />
                <FloatingOrbs />
            </Canvas>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f0d] pointer-events-none" />
        </div>
    );
}
