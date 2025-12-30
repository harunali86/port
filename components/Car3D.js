// FERRARI FXX-K - CINEMATIC HERO DRIFT ENTRY
import { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF, Lightformer, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

function FerrariFFXK({ isMobile, ...props }) {
    // Uses compressed model for 50% faster load
    const { scene } = useGLTF('/models/ferrari_compressed.glb');
    const carRef = useRef();

    // Material Enhancement
    useEffect(() => {
        if (!scene) return;

        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = !isMobile;
                child.receiveShadow = !isMobile;
                if (child.material) {
                    // UNIVERSAL METALLIC LOOK (User Requirement: "Original Color")
                    // We rely on the optimized Environment map for reflections on mobile.
                    child.material.envMapIntensity = isMobile ? 1.5 : 2.5;

                    if (child.material.metalness !== undefined) {
                        // Keep it SHINY
                        child.material.metalness = Math.min(child.material.metalness + 0.3, 0.95);
                    }
                    if (child.material.roughness !== undefined) {
                        // Keep it SMOOTH
                        child.material.roughness = Math.max(child.material.roughness - 0.1, 0.05);
                    }
                }
            }
        });
    }, [scene]);

    // CINEMATIC REAL DRIFT ENTRY
    useFrame((state) => {
        if (!carRef.current) return;
        const t = state.clock.elapsedTime;

        // PHASE 1: HIGH SPEED ENTRY (Right to Left)
        if (t < 0.8) {
            // Faster intro
            const progress = 1 - Math.pow(1 - (t / 0.8), 3);
            carRef.current.position.x = 55 - (50 * progress);
            carRef.current.position.z = -12 + (10 * progress);

            carRef.current.rotation.y = -Math.PI / 2;
            carRef.current.rotation.z = Math.sin(t * 10) * 0.02; // High speed vibration
            carRef.current.rotation.x = -0.02; // Nose down (braking anticipation)
            const baseY = isMobile ? -1.5 : -1.0;
            carRef.current.position.y = baseY;
        }
        // PHASE 2: THE DRIFT (Snap & Whip)
        else if (t < 2.5) {
            const dt = (t - 0.8) / 1.7;
            // Quartic ease out for heavy braking feel
            const ease = 1 - Math.pow(1 - dt, 4);

            carRef.current.position.x = 5 - (6 * ease);
            carRef.current.position.z = -2 + (2.5 * ease);

            // Rotation: Whip effect with Counter-Steer
            const startRot = -Math.PI / 2;
            const endRot = -Math.PI * 0.9;

            // Counter-steer: Go SLIGHTLY past the angle then correct
            const overshoot = Math.sin(dt * Math.PI) * 0.1;
            const rotEase = 1 - Math.pow(1 - dt, 2);
            carRef.current.rotation.y = startRot + (endRot - startRot) * rotEase - overshoot;

            // Body Roll & Suspension (Aggressive Tilt)
            const tilt = Math.sin(dt * Math.PI) * 0.25;
            carRef.current.rotation.z = tilt;

            // Suspension Dip (Squat on stop)
            const squat = Math.sin(dt * Math.PI) * 0.15; // Deeper squat
            const baseY = isMobile ? -1.5 : -1.0;
            carRef.current.position.y = baseY - squat;
        }
        // PHASE 3: IDLE
        else {
            carRef.current.position.x = THREE.MathUtils.lerp(carRef.current.position.x, 0, 0.05);
            carRef.current.position.z = THREE.MathUtils.lerp(carRef.current.position.z, 0.5, 0.05);
            carRef.current.rotation.y = THREE.MathUtils.lerp(carRef.current.rotation.y, -Math.PI * 0.9, 0.05);
            carRef.current.rotation.z = THREE.MathUtils.lerp(carRef.current.rotation.z, 0, 0.1);

            const ht = t - 2.5;
            const baseY = isMobile ? -1.5 : -1.0;
            carRef.current.position.y = baseY + Math.sin(ht) * 0.005;
        }
    });

    // Cleanup on unmount to free GPU memory
    useEffect(() => {
        return () => {
            if (scene) {
                scene.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry?.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(m => m.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            }
        };
    }, [scene]);

    return (
        <group ref={carRef} {...props}>
            <primitive object={scene} />
        </group>
    );
}

// CINEMATIC LIGHTING
function ShowroomLighting({ isMobile }) {
    return (
        <>
            {/* Mobile Lighting - BALANCED for Metallic Look */}
            <ambientLight intensity={isMobile ? 2.0 : 0.5} />
            <hemisphereLight intensity={isMobile ? 1.0 : 0} groundColor="#444444" skyColor="#ffffff" />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={isMobile ? 5 : 4} castShadow={!isMobile} color="#ffffff" />
            <directionalLight position={[0, 5, 10]} intensity={isMobile ? 3 : 0} color="#ffffff" />
            <pointLight position={[-5, 5, -5]} intensity={isMobile ? 3 : 1} color="#ff6666" />

            {/* ENVIRONMENT IS CRITICAL FOR METALLIC LOOK */}
            {/* Replaced 'city' preset with PROCEDURAL environment (Lightformers) to fix "Failed to fetch" error on localhost */}
            {/* This generates an HDR map on the fly, requiring no internet logic. */}

            {/* Reduced resolution for memory: 128 on mobile, 256 on desktop */}
            <Environment resolution={isMobile ? 128 : 256}>
                {/* Ceiling Light */}
                <Lightformer form="rect" intensity={isMobile ? 2 : 5} position={[0, 5, 0]} scale={[10, 10, 1]} rotation={[-Math.PI / 2, 0, 0]} color="#ffffff" />

                {/* Side Lights (Warm/Cold) - Lower intensity on mobile to fix texture */}
                <Lightformer form="rect" intensity={isMobile ? 1 : 2} position={[-5, 0, -5]} scale={[10, 5, 1]} color="#ff4444" />
                <Lightformer form="rect" intensity={isMobile ? 0.5 : 2} position={[5, 0, -5]} scale={[10, 5, 1]} color="#ccccff" />

                {/* Front Fill */}
                <Lightformer form="ring" intensity={1} position={[0, 0, 5]} scale={[10, 10, 1]} color="#ffffff" />
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

export default function Car3D({ isMobile }) {

    // Mobile adjustments - AGGRESSIVE
    const carScale = isMobile ? 40 : 58; // Slightly smaller for mobile
    const carPosition = isMobile ? [0, -1.5, 0] : [0, -1.0, 0.5]; // Visible in viewport
    const shadowRes = isMobile ? 128 : 256; // Optimized shadows (256 is enough)

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Sound toggle button */}
            <SoundButton />

            <Canvas
                shadows={!isMobile} // Disable shadows globally on mobile
                dpr={isMobile ? 0.6 : [1, 1.5]} // AGGRESSIVE OPTIMIZATION: 0.6x resolution on mobile (crisp enough on small screens, huge perf gain)
                camera={{ position: [0, 0.5, 8.5], fov: 50 }}
                gl={{
                    antialias: !isMobile, // Disable MSAA on mobile for raw speed
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: "high-performance",
                    precision: isMobile ? "lowp" : "mediump" // Force low precision shaders on mobile
                }}
            >
                <Suspense fallback={
                    <Html center>
                        <div className="flex flex-col items-center justify-center w-48">
                            <div className="w-6 h-6 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin mb-2" />
                            <div className="text-[#00ff41] font-mono text-[10px] tracking-widest animate-pulse">LOADING MODEL...</div>
                        </div>
                    </Html>
                }>
                    <OrbitControls
                        enableZoom={true}
                        enablePan={!isMobile}
                        enableRotate={true}
                        enableDamping={true}
                        dampingFactor={0.05}
                        autoRotate={true}
                        autoRotateSpeed={isMobile ? 0.5 : 2.0} // Very slow rotate on mobile
                        target={[0, -1.0, 0.5]}
                        minDistance={5}
                        maxDistance={25}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                    />
                    <ShowroomLighting isMobile={isMobile} />

                    {/* Pass logic-driven props to the car */}
                    <FerrariFFXK position={carPosition} scale={carScale} rotation={[0, -Math.PI * 0.9, 0]} isMobile={isMobile} />

                    {/* Shadows are KILLING the mobile score. Disable them. */}
                    {!isMobile && (
                        <ContactShadows
                            resolution={shadowRes}
                            scale={isMobile ? 30 : 80}
                            blur={isMobile ? 2 : 1.5}
                            opacity={isMobile ? 0.6 : 0.8}
                            far={100}
                            color="#000000"
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}

