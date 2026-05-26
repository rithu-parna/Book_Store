import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Flame, CloudRain, Sparkles, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SOUNDS = [
  {
    id: "fireplace",
    name: "Library Fireplace",
    icon: Flame,
    url: "https://assets.mixkit.co/active_storage/sfx/2433/2433-84.wav",
    color: "#f59e0b"
  },
  {
    id: "rain",
    name: "Rain on Skylight",
    icon: CloudRain,
    url: "https://assets.mixkit.co/active_storage/sfx/2526/2526-84.wav",
    color: "#0ea5e9"
  },
  {
    id: "cosmic",
    name: "Cosmic Library",
    icon: Sparkles,
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    color: "#8b5cf6"
  }
];

export default function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(SOUNDS[0]);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef(new Audio(SOUNDS[0].url));

  useEffect(() => {
    // Enable looping
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      audioRef.current.pause();
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    audioRef.current = new Audio(currentTrack.url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    if (wasPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play error: ", err));
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log("Playback blocked by browser autoplay rules.", err);
          // Standard browser behavior fallback: toggle play state anyway for visualizer demo
          setIsPlaying(true);
        });
    }
  };

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass"
            style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              width: "280px",
              marginBottom: "0.75rem",
              boxShadow: `0 15px 35px -5px ${currentTrack.color}33`,
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Music size={16} style={{ color: currentTrack.color }} />
                <span style={{ fontSize: "0.8rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Cozy Soundscapes
                </span>
              </div>
              
              {/* Visualizer bars */}
              <div style={{ display: "flex", gap: "2px", height: "14px", alignItems: "flex-end" }}>
                {[1, 2, 3, 4, 5].map((bar) => (
                  <motion.div
                    key={bar}
                    animate={isPlaying ? { height: ["4px", "14px", "4px"] } : { height: "4px" }}
                    transition={{
                      duration: 0.6 + bar * 0.1,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut"
                    }}
                    style={{
                      width: "3px",
                      backgroundColor: currentTrack.color,
                      borderRadius: "1px"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Track Selector Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SOUNDS.map((sound) => {
                const SoundIcon = sound.icon;
                const isSelected = currentTrack.id === sound.id;
                return (
                  <button
                    key={sound.id}
                    onClick={() => handleTrackChange(sound)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: isSelected ? `${sound.color}15` : "transparent",
                      border: `1px solid ${isSelected ? sound.color : "rgba(255,255,255,0.05)"}`,
                      color: isSelected ? "#ffffff" : "var(--text-secondary)",
                      fontSize: "0.85rem",
                      fontWeight: isSelected ? "700" : "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <SoundIcon size={14} style={{ color: isSelected ? sound.color : "inherit" }} />
                      <span>{sound.name}</span>
                    </div>
                    {isSelected && (
                      <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: sound.color, fontWeight: "800" }}>
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
              <button
                onClick={handleTogglePlay}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: currentTrack.color,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: `0 4px 10px ${currentTrack.color}44`,
                  flexShrink: 0
                }}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: "2px" }} />}
              </button>

              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => setVolume(v => v === 0 ? 0.4 : 0)}
                  style={{ color: "var(--text-secondary)", cursor: "pointer" }}
                >
                  {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{
                    flex: 1,
                    height: "3px",
                    accentColor: currentTrack.color,
                    cursor: "pointer"
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          color: currentTrack.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: `0 8px 20px ${isOpen ? currentTrack.color + "22" : "rgba(0,0,0,0.3)"}`
        }}
      >
        <Music size={20} className={isPlaying ? "float-animation" : ""} />
      </motion.button>
    </div>
  );
}
