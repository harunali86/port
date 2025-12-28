// FERRARI FXX-K - CINEMATIC HERO DRIFT ENTRY
import { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF, Lightformer, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FerrariFFXK() {
    const { scene } = useGLTF('/models/ferrari_fxx_k_2015__www.vecarz.com.glb');
    const carRef = useRef();

    // Material Enhancement
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.envMapIntensity = 2;
                    if (child.material.metalness !== undefined) {
                        child.material.metalness = Math.min(child.material.metalness + 0.2, 0.95);
                    }
                    if (child.material.roughness !== undefined) {
                        child.material.roughness = Math.max(child.material.roughness - 0.1, 0.05);
                    }
                }
            }
        });
    }, [scene]);

    // CINEMATIC HERO DRIFT ANIMATION - STARTS IMMEDIATELY
    useFrame((state) => {
        if (!carRef.current || !carRef.current.position) return;
        const t = state.clock.elapsedTime;

        if (t < 0.8) {
            // Phase 1: DRAMATIC SLOW REVEAL
            const p = t / 0.8;
            const ease = 1 - Math.pow(1 - p, 3);

            carRef.current.position.x = 60 * (1 - ease);
            carRef.current.position.z = -5 * (1 - ease);
            carRef.current.rotation.y = -Math.PI / 2;
            carRef.current.rotation.z = 0.03;
            carRef.current.position.y = -1;

        } else if (t < 2.2) {
            // Phase 2: CINEMATIC DRIFT
            const dt = t - 0.8;
            const duration = 1.4;
            const p = dt / duration;
            const ease = 1 - Math.pow(1 - p, 2.5);

            carRef.current.position.x = 0;
            carRef.current.position.z = 8 * Math.sin(p * Math.PI * 0.8);
            carRef.current.rotation.y = -Math.PI / 2 + (Math.PI * 1.5 * ease);
            carRef.current.rotation.z = 0.3 * Math.sin(p * Math.PI);
            carRef.current.rotation.y += Math.sin(t * 22) * 0.08 * (1 - p);
            carRef.current.position.y = -1 + Math.abs(Math.sin(t * 15)) * 0.06 * (1 - p);

        } else if (t < 2.8) {
            // Phase 3: HERO POSE SNAP
            const st = t - 2.2;
            const bounce = Math.sin(st * Math.PI * 10) * Math.exp(-st * 18);

            carRef.current.position.x = bounce * 0.3;
            carRef.current.position.z = bounce * 0.2;
            carRef.current.rotation.y = Math.PI + bounce * 0.05;
            carRef.current.rotation.z = bounce * 0.03;
            carRef.current.position.y = -1;

        } else {
            // Phase 4: SHOWCASE
            const ht = t - 2.8;
            carRef.current.position.x = 0;
            carRef.current.position.z = 0;
            carRef.current.rotation.y = Math.PI + Math.sin(ht * 0.3) * 0.5;
            carRef.current.rotation.z = 0;
            carRef.current.position.y = -1 + Math.sin(ht * 0.6) * 0.015;
        }
    });

    return (
        <group ref={carRef} position={[60, -1, -5]} rotation={[0, -Math.PI / 2, 0.03]} scale={100}>
            <primitive object={scene} />
        </group>
    );
}

// CINEMATIC LIGHTING
function ShowroomLighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[12, 18, 12]} angle={0.35} penumbra={1} intensity={4} castShadow color="#ffffff" />
            <spotLight position={[-10, 14, 8]} angle={0.45} penumbra={1} intensity={2.5} color="#fff5e6" />
            <directionalLight position={[0, 10, -15]} intensity={2.5} color="#ffffff" />
            <pointLight position={[0, 5, 10]} intensity={1} color="#ff6666" />
            <Environment preset="city">
                <Lightformer form="rect" intensity={6} position={[15, 7, 0]} scale={[30, 10, 1]} rotation={[0, Math.PI / 2, 0]} color="#ffffff" />
                <Lightformer form="rect" intensity={5} position={[-15, 7, 5]} scale={[30, 10, 1]} rotation={[0, -Math.PI / 2, 0]} color="#ffffff" />
                <Lightformer form="ring" intensity={3} position={[0, 15, 0]} scale={[20, 20, 1]} rotation={[Math.PI / 2, 0, 0]} color="#ffffff" />
            </Environment>
        </>
    );
}

// Sound Button Component
function SoundButton() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleSound = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/sounds/car_drift.mp3');
            audioRef.current.volume = 0.8;
        }

        if (playing) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        } else {
            audioRef.current.play().catch(console.log);
        }
        setPlaying(!playing);
    };

    return (
        <button
            onClick={toggleSound}
            style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 20,
                padding: '10px 15px',
                background: playing ? 'rgba(255,0,0,0.3)' : 'rgba(0,255,0,0.2)',
                border: `2px solid ${playing ? '#ff0000' : '#00ff00'}`,
                borderRadius: '8px',
                color: playing ? '#ff0000' : '#00ff00',
                fontSize: '14px',
                fontFamily: 'monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            {playing ? '🔊 SOUND ON' : '🔇 SOUND OFF'}
        </button>
    );
}

export default function Car3D() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Sound toggle button */}
            <SoundButton />

            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [6, 3, 10], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
            >
                <Suspense fallback={null}>
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        enableRotate={true}
                        minDistance={4}
                        maxDistance={25}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2.2}
                    />
                    <ShowroomLighting />
                    <FerrariFFXK />
                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.5}
                        scale={30}
                        blur={2}
                        far={15}
                        color="#000000"
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload('/models/ferrari_fxx_k_2015__www.vecarz.com.glb');
