
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { spectrogramData } from '@/utils/mockData';

const Spectrogram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Create image data for spectrogram
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Fill imageData based on spectrogramData
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Map canvas coordinates to spectrogram data indices
        const dataY = Math.floor(y / height * spectrogramData.length);
        const dataX = Math.floor(x / width * spectrogramData[0].length);
        
        const value = spectrogramData[dataY][dataX];
        
        // Apply a color gradient from blue (low) to teal (mid) to yellow (high)
        const r = Math.floor(value < 0.5 ? value * 2 * 64 : 64 + (value - 0.5) * 2 * 191);
        const g = Math.floor(value < 0.5 ? value * 2 * 210 : 210);
        const b = Math.floor(value < 0.5 ? 255 : 255 - (value - 0.5) * 2 * 255);
        
        // Set RGBA values
        const pixelIndex = (y * width + x) * 4;
        data[pixelIndex + 0] = r;     // Red
        data[pixelIndex + 1] = g;     // Green
        data[pixelIndex + 2] = b;     // Blue
        data[pixelIndex + 3] = 255;   // Alpha (fully opaque)
      }
    }
    
    // Put the image data onto the canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Draw frequency labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    
    // Y-axis (frequency) labels
    const freqLabels = ['40 Hz', '30 Hz', '20 Hz', '10 Hz', '0 Hz'];
    for (let i = 0; i < freqLabels.length; i++) {
      const y = (i / (freqLabels.length - 1)) * height;
      ctx.fillText(freqLabels[i], 5, y + 10);
    }
    
    // X-axis (time) labels
    const timeLabels = ['0s', '1s', '2s', '3s', '4s'];
    for (let i = 0; i < timeLabels.length; i++) {
      const x = (i / (timeLabels.length - 1)) * width;
      ctx.fillText(timeLabels[i], x - 5, height - 5);
    }
  }, []);

  return (
    <Card className="seismic-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono">Frequency Analysis</CardTitle>
        <CardDescription>
          Time-frequency spectrogram
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="w-full h-48 bg-seismic-blue/30 rounded-md overflow-hidden">
          <canvas 
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-full"
          />
        </div>
        
        <div className="mt-2 flex justify-between text-xs">
          <div className="flex flex-col">
            <span className="text-muted-foreground">P-wave arrival</span>
            <span className="font-mono">0.8s</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Dominant frequency</span>
            <span className="font-mono">12.4 Hz</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground">S-wave arrival</span>
            <span className="font-mono">2.3s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Spectrogram;
