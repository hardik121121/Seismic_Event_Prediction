
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { earthquakeWaveform, explosionWaveform, tremorWaveform, noiseWaveform } from '@/utils/mockData';

interface WaveformVisualizerProps {
  type?: 'earthquake' | 'explosion' | 'tremor' | 'noise';
  animated?: boolean;
}

const WaveformVisualizer = ({
  type = 'earthquake',
  animated = true
}: WaveformVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(animated);
  const [position, setPosition] = useState(0);

  // Select waveform based on type
  const waveformData = type === 'earthquake' ? earthquakeWaveform : 
                       type === 'explosion' ? explosionWaveform :
                       type === 'tremor' ? tremorWaveform : noiseWaveform;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Animation frame handler
    let animationFrameId: number;
    let lastTime = 0;
    const speed = 50; // pixels per second

    const render = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Only move if playing
      if (isPlaying) {
        setPosition(prev => (prev + (speed * deltaTime) / 1000) % (canvas.width));
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      const lineWidth = 2;
      
      // Draw waveform line
      ctx.beginPath();
      ctx.strokeStyle = getWaveformColor(type);
      ctx.lineWidth = lineWidth;
      
      const centerY = canvas.height / 2;
      const amplitude = canvas.height / 3;
      
      // Draw waveform
      for (let i = 0; i < canvas.width; i++) {
        const dataIndex = Math.floor((i + position) % waveformData.length);
        const y = centerY - waveformData[dataIndex] * amplitude;
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
      
      // Draw vertical line at current position
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      
      // Continue animation
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [waveformData, isPlaying, position, type]);
  
  // Get color based on event type
  const getWaveformColor = (type: string) => {
    switch(type) {
      case 'earthquake': return '#4299E1'; // Blue
      case 'explosion': return '#F56565';  // Red
      case 'tremor': return '#68D391';     // Green
      case 'noise': return '#A0AEC0';      // Gray
      default: return '#4299E1';           // Default blue
    }
  };

  return (
    <Card className="seismic-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-mono flex items-center gap-2">
              Waveform Analysis
              <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-seismic-teal animate-pulse' : 'bg-gray-500'}`}></span>
            </CardTitle>
            <CardDescription>
              Real-time seismic signal - {type.charAt(0).toUpperCase() + type.slice(1)} pattern
            </CardDescription>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs bg-seismic-blue/60 hover:bg-seismic-blue px-2 py-1 rounded"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative w-full h-48 bg-seismic-blue/30 rounded-md overflow-hidden">
          <canvas 
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-full"
          />
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sample Rate:</span>
            <span className="font-mono">100 Hz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Signal Strength:</span>
            <span className="font-mono">4.3 dB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frequency Range:</span>
            <span className="font-mono">2-20 Hz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Station:</span>
            <span className="font-mono">USGS-CA12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveformVisualizer;
