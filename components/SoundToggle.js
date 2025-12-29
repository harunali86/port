// PROFESSIONAL HACKER SOUND EFFECTS - Deep, Dark, Cyberpunk
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

let audioCtx = null;
let isEnabled = false;

const getAudioContext = () => {
    if (typeof window !== 'undefined' && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
};

// === DEEP CYBERPUNK CLICK - Like Blade Runner UI ===
export const playCyberClick = () => {
    const ctx = getAudioContext();
    if (!ctx || !isEnabled) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Deep bass hit
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(80, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
    gain1.gain.setValueAtTime(0.4, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.15);

    // High freq snap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'square';
    osc2.frequency.value = 3000;
    gain2.gain.setValueAtTime(0.08, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc2.start();
    osc2.stop(ctx.currentTime + 0.03);
};

// === DARK HOVER SWEEP - Low rumble ===
export const playHoverSound = () => {
    const ctx = getAudioContext();
    if (!ctx || !isEnabled) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

    filter.type = 'lowpass';
    filter.frequency.value = 400;

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
};

// === MATRIX DATA SCROLL - Digital noise ===
export const playScrollSound = () => {
    const ctx = getAudioContext();
    if (!ctx || !isEnabled) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Create noise
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    noise.buffer = buffer;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    filter.type = 'bandpass';
    filter.frequency.value = 1000 + Math.random() * 2000;
    filter.Q.value = 10;

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    noise.start();
    noise.stop(ctx.currentTime + 0.05);
};

// === SYSTEM BOOT - Dark cyberpunk startup ===
export const playBootSound = () => {
    const ctx = getAudioContext();
    if (!ctx || !isEnabled) return;
    if (ctx.state === 'suspended') ctx.resume();

    // Deep drone
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.connect(droneGain);
    droneGain.connect(ctx.destination);
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(40, ctx.currentTime);
    drone.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
    droneGain.gain.setValueAtTime(0.15, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.15, ctx.currentTime + 0.4);
    droneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    drone.start();
    drone.stop(ctx.currentTime + 0.8);

    // Rising tone
    setTimeout(() => {
        const rise = ctx.createOscillator();
        const riseGain = ctx.createGain();
        rise.connect(riseGain);
        riseGain.connect(ctx.destination);
        rise.type = 'sine';
        rise.frequency.setValueAtTime(200, ctx.currentTime);
        rise.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
        riseGain.gain.setValueAtTime(0.2, ctx.currentTime);
        riseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        rise.start();
        rise.stop(ctx.currentTime + 0.35);
    }, 200);

    // Final click
    setTimeout(() => {
        playCyberClick();
    }, 500);
};

// Enable/Disable
export const enableSound = () => {
    getAudioContext();
    isEnabled = true;
    playBootSound();
};

export const disableSound = () => {
    isEnabled = false;
};

export const toggleSound = () => {
    if (isEnabled) {
        disableSound();
    } else {
        enableSound();
    }
    return isEnabled;
};

export const isSoundEnabled = () => isEnabled;

// Auto Sound Hook
export function useAutoSounds() {
    const lastScrollY = useRef(0);
    const scrollTimer = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            if (!isEnabled) return;
            const diff = Math.abs(window.scrollY - lastScrollY.current);
            if (diff > 100) {
                if (scrollTimer.current) clearTimeout(scrollTimer.current);
                scrollTimer.current = setTimeout(() => {
                    playScrollSound();
                    lastScrollY.current = window.scrollY;
                }, 80);
            }
        };

        const handleClick = (e) => {
            if (!isEnabled) return;
            if (e.target.closest('[data-sound-toggle]')) return;
            playCyberClick();
        };

        const handleMouseEnter = (e) => {
            if (!isEnabled) return;
            const el = e.target;
            if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')) {
                playHoverSound();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('click', handleClick);
        document.addEventListener('mouseenter', handleMouseEnter, true);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
        };
    }, []);
}

// Sound Toggle Button - BOTTOM LEFT
export function SoundToggleButton() {
    const [enabled, setEnabled] = useState(false);
    useAutoSounds();

    const handleToggle = () => {
        const newState = toggleSound();
        setEnabled(newState);
    };

    return (
        <button
            data-sound-toggle
            onClick={handleToggle}
            className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-xl bg-black/90 border-2 flex items-center justify-center transition-all hover:scale-110"
            style={{
                borderColor: enabled ? '#00ff41' : '#333',
                boxShadow: enabled ? '0 0 25px rgba(0,255,65,0.4), inset 0 0 10px rgba(0,255,65,0.1)' : 'none'
            }}
            aria-label={enabled ? "Mute" : "Enable sounds"}
            title={enabled ? "🔊 SOUND ON" : "🔇 SOUND OFF"}
        >
            {enabled ? (
                <Volume2 className="w-5 h-5 text-[#00ff41]" />
            ) : (
                <VolumeX className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
            )}
            {enabled && <span className="absolute inset-0 rounded-xl border-2 border-[#00ff41] animate-ping opacity-20" />}
        </button>
    );
}

export default SoundToggleButton;
