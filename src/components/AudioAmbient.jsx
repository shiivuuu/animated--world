// ParulVerse 3D - Procedural Web Audio Ambient Soundscape
// Generates gentle campus atmosphere (breeze, birds, evening crickets) with zero asset dependencies

import { useEffect, useRef } from 'react';

export default function AudioAmbient({ muted = true, timeOfDay = 'day' }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (muted) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
      clearInterval(intervalRef.current);
      return;
    }

    // Initialize Web Audio Context on first unmute
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!gainNodeRef.current) {
      const master = ctx.createGain();
      master.gain.value = 0.05; // Gentle subtle background volume
      master.connect(ctx.destination);
      gainNodeRef.current = master;
    }

    gainNodeRef.current.gain.setTargetAtTime(0.06, ctx.currentTime, 0.4);

    // 1. Procedural Wind / Campus Air Breeze (Filtered Pink Noise)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = timeOfDay === 'night' ? 280 : 450;

    whiteNoise.connect(filter);
    filter.connect(gainNodeRef.current);
    whiteNoise.start();

    // 2. Periodic Birds Chirping during Day, or Crickets at Night
    intervalRef.current = setInterval(() => {
      if (muted || ctx.state !== 'running') return;

      if (timeOfDay === 'day') {
        // Synthesize short melodic bird chirp
        const osc = ctx.createOscillator();
        const chirpGain = ctx.createGain();
        osc.type = 'sine';

        const now = ctx.currentTime;
        const startFreq = 2200 + Math.random() * 800;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 600, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 300, now + 0.15);

        chirpGain.gain.setValueAtTime(0.04, now);
        chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(chirpGain);
        chirpGain.connect(gainNodeRef.current);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (timeOfDay === 'night') {
        // Synthesize gentle cricket high frequency pulse
        const osc = ctx.createOscillator();
        const cricketGain = ctx.createGain();
        osc.type = 'triangle';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(4500 + Math.random() * 200, now);

        cricketGain.gain.setValueAtTime(0.015, now);
        cricketGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(cricketGain);
        cricketGain.connect(gainNodeRef.current);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    }, timeOfDay === 'night' ? 700 : 3500);

    return () => {
      clearInterval(intervalRef.current);
      try {
        whiteNoise.stop();
        whiteNoise.disconnect();
      } catch (e) {}
    };
  }, [muted, timeOfDay]);

  return null; // Pure audio component
}
