import React, { useState, useEffect, useRef } from "react";
import { Headphones, Volume2, VolumeX, Flame, CloudRain, ShieldAlert, BookOpen, Sparkles, X, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState(null); // null, 'rain', 'fire', 'cyber', 'library'
  const [volume, setVolume] = useState(0.4);

  // Audio refs
  const audioCtxRef = useRef(null);
  const pinkNoiseBufferRef = useRef(null);
  const brownNoiseBufferRef = useRef(null);
  const timerRef = useRef(null);
  const nodesRef = useRef({
    mainGain: null,
    sources: [],
    otherNodes: [],
    active: false
  });

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const createPinkNoiseBuffer = (ctx) => {
    if (pinkNoiseBufferRef.current) return pinkNoiseBufferRef.current;
    
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11; // compensation
      b6 = white * 0.115926;
    }
    
    pinkNoiseBufferRef.current = buffer;
    return buffer;
  };

  const createBrownNoiseBuffer = (ctx) => {
    if (brownNoiseBufferRef.current) return brownNoiseBufferRef.current;
    
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // compensation
    }
    
    brownNoiseBufferRef.current = buffer;
    return buffer;
  };

  const stopAll = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (nodesRef.current.sources) {
      nodesRef.current.sources.forEach((src) => {
        try { src.stop(); } catch (e) {}
        try { src.disconnect(); } catch (e) {}
      });
      nodesRef.current.sources = [];
    }
    
    if (nodesRef.current.otherNodes) {
      nodesRef.current.otherNodes.forEach((node) => {
        try { node.disconnect(); } catch (e) {}
      });
      nodesRef.current.otherNodes = [];
    }
    
    nodesRef.current.active = false;
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (nodesRef.current.mainGain) {
      nodesRef.current.mainGain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAll();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playRainSound = (ctx, mainGain) => {
    const noise = ctx.createBufferSource();
    noise.buffer = createPinkNoiseBuffer(ctx);
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    // Wind LFO modulation
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08; // slow gusts

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.15; // modulation depth

    const swellGain = ctx.createGain();
    swellGain.gain.value = 0.45; // baseline gain

    // Connections
    lfo.connect(lfoGain);
    lfoGain.connect(swellGain.gain);

    noise.connect(filter);
    filter.connect(swellGain);
    swellGain.connect(mainGain);

    noise.start();
    lfo.start();

    nodesRef.current.sources.push(noise, lfo);
    nodesRef.current.otherNodes.push(filter, lfoGain, swellGain);
  };

  const playFireplaceSound = (ctx, mainGain) => {
    // Low rumble noise
    const rumbleNode = ctx.createBufferSource();
    rumbleNode.buffer = createBrownNoiseBuffer(ctx);
    rumbleNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(280, ctx.currentTime);

    rumbleNode.connect(filter);
    filter.connect(mainGain);

    rumbleNode.start();
    nodesRef.current.sources.push(rumbleNode);
    nodesRef.current.otherNodes.push(filter);

    // Schedule wood crackles
    const scheduleCrackle = () => {
      if (!nodesRef.current.active) return;

      const clickSrc = ctx.createOscillator();
      const clickGain = ctx.createGain();

      clickSrc.type = "sine";
      clickSrc.frequency.setValueAtTime(800 + Math.random() * 1200, ctx.currentTime);

      clickGain.gain.setValueAtTime(0.0, ctx.currentTime);
      clickGain.gain.linearRampToValueAtTime(0.12 * (Math.random() * 0.7 + 0.3), ctx.currentTime + 0.001);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015 + Math.random() * 0.02);

      clickSrc.connect(clickGain);
      clickGain.connect(mainGain);

      clickSrc.start();
      clickSrc.stop(ctx.currentTime + 0.06);

      const nextDelay = 180 + Math.random() * 550;
      timerRef.current = setTimeout(scheduleCrackle, nextDelay);
    };

    scheduleCrackle();
  };

  const playCyberSound = (ctx, mainGain) => {
    // Detuned low oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    
    osc1.type = "triangle";
    osc2.type = "triangle";
    
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    osc2.frequency.setValueAtTime(55.6, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, ctx.currentTime);

    // LFO for pulsing filter sweep
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 35; // filter sweep range in Hz

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(mainGain);

    osc1.start();
    osc2.start();
    lfo.start();

    nodesRef.current.sources.push(osc1, osc2, lfo);
    nodesRef.current.otherNodes.push(filter, lfoGain);
  };

  const playLibrarySound = (ctx, mainGain) => {
    // Ventilation drone
    const ventilation = ctx.createBufferSource();
    ventilation.buffer = createPinkNoiseBuffer(ctx);
    ventilation.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, ctx.currentTime);

    ventilation.connect(filter);
    filter.connect(mainGain);

    ventilation.start();
    nodesRef.current.sources.push(ventilation);
    nodesRef.current.otherNodes.push(filter);

    // Page turns/rustles scheduler
    const scheduleRustle = () => {
      if (!nodesRef.current.active) return;

      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = createPinkNoiseBuffer(ctx);

      const rustleFilter = ctx.createBiquadFilter();
      rustleFilter.type = "bandpass";
      rustleFilter.frequency.setValueAtTime(1200 + Math.random() * 2500, ctx.currentTime);
      rustleFilter.Q.setValueAtTime(1.8, ctx.currentTime);

      const rustleGain = ctx.createGain();
      rustleGain.gain.setValueAtTime(0, ctx.currentTime);
      rustleGain.gain.linearRampToValueAtTime(0.015 * (Math.random() * 0.4 + 0.6), ctx.currentTime + 0.05);
      rustleGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25 + Math.random() * 0.3);

      noiseSrc.connect(rustleFilter);
      rustleFilter.connect(rustleGain);
      rustleGain.connect(mainGain);

      noiseSrc.start();
      noiseSrc.stop(ctx.currentTime + 0.7);

      const nextDelay = 3500 + Math.random() * 8000;
      timerRef.current = setTimeout(scheduleRustle, nextDelay);
    };

    scheduleRustle();
  };

  const handleSoundSelect = (soundType) => {
    // 1. Stop whatever is running
    stopAll();

    if (activeSound === soundType) {
      setActiveSound(null);
      return;
    }

    // 2. Initialize context and nodes
    const ctx = getAudioContext();
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(volume, ctx.currentTime);
    mainGain.connect(ctx.destination);

    nodesRef.current.mainGain = mainGain;
    nodesRef.current.active = true;
    setActiveSound(soundType);

    // 3. Play selected synth graph
    if (soundType === "rain") {
      playRainSound(ctx, mainGain);
    } else if (soundType === "fire") {
      playFireplaceSound(ctx, mainGain);
    } else if (soundType === "cyber") {
      playCyberSound(ctx, mainGain);
    } else if (soundType === "library") {
      playLibrarySound(ctx, mainGain);
    }
  };

  const soundscapes = [
    { id: "fire", name: "Cozy Hearth", icon: <Flame size={16} />, color: "#ef4444" },
    { id: "rain", name: "Gentle Rain", icon: <CloudRain size={16} />, color: "#3b82f6" },
    { id: "cyber", name: "Cyber Reactor", icon: <Sparkles size={16} />, color: "#a855f7" },
    { id: "library", name: "Focus Library", icon: <BookOpen size={16} />, color: "#10b981" }
  ];

  return (
    <>
      <div 
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.75rem"
        }}
        className="ambient-player-container"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="glass"
              style={{
                width: "280px",
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Music size={16} style={{ color: "var(--accent-primary)" }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: "750", letterSpacing: "0.5px" }}>Sanctuary Soundscapes</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ color: "var(--text-muted)", cursor: "pointer", padding: "0.25rem" }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Volume Controller */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "var(--bg-secondary)", padding: "0.5rem 0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                {volume === 0 ? (
                  <VolumeX size={15} style={{ color: "var(--text-muted)" }} />
                ) : (
                  <Volume2 size={15} style={{ color: "var(--accent-primary)" }} />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{
                    flexGrow: 1,
                    height: "4px",
                    accentColor: "var(--accent-primary)",
                    cursor: "pointer"
                  }}
                />
              </div>

              {/* Soundscape Selector List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {soundscapes.map((sound) => {
                  const isSelected = activeSound === sound.id;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => handleSoundSelect(sound.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: "650",
                        transition: "all 0.2s ease",
                        backgroundColor: isSelected ? `${sound.color}15` : "transparent",
                        border: isSelected ? `1px solid ${sound.color}45` : "1px solid var(--border-color)",
                        color: isSelected ? "var(--text-primary)" : "var(--text-secondary)"
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                          e.currentTarget.style.borderColor = "var(--accent-primary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "var(--border-color)";
                        }
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ color: isSelected ? sound.color : "var(--text-muted)" }}>
                          {sound.icon}
                        </span>
                        <span>{sound.name}</span>
                      </div>
                      
                      {isSelected && (
                        <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "10px" }}>
                          <span className="sound-visualizer-bar" style={{ width: "2px", height: "100%", backgroundColor: sound.color }} />
                          <span className="sound-visualizer-bar" style={{ width: "2px", height: "60%", backgroundColor: sound.color, animationDelay: "0.2s" }} />
                          <span className="sound-visualizer-bar" style={{ width: "2px", height: "80%", backgroundColor: sound.color, animationDelay: "0.4s" }} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="btn-primary glow-animation"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: activeSound 
              ? `0 0 20px rgba(var(--accent-rgb), 0.5)`
              : `0 8px 24px rgba(0,0,0,0.3)`
          }}
        >
          {activeSound ? (
            <Headphones className="spin-slow" size={20} />
          ) : (
            <Music size={20} />
          )}
        </motion.button>
      </div>

      <style>{`
        .sound-visualizer-bar {
          display: inline-block;
          border-radius: 1px;
          animation: visualizerBarPulse 0.8s ease-in-out infinite alternate;
        }
        @keyframes visualizerBarPulse {
          0% { height: 3px; }
          100% { height: 10px; }
        }
        
        /* Elevate the floating player on mobile to clear bottom navigation */
        @media (max-width: 900px) {
          .ambient-player-container {
            bottom: 95px !important;
            right: 1.25rem !important;
          }
        }
      `}</style>
    </>
  );
}
