
// Mock data for seismic events
export interface SeismicEvent {
  id: string;
  timestamp: string;
  magnitude: number;
  depth: number;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  type: 'earthquake' | 'explosion' | 'tremor' | 'noise';
  confidence: number;
}

export interface PredictionResult {
  type: 'earthquake' | 'explosion' | 'tremor' | 'noise';
  confidence: number;
  magnitude: number;
  magnitudeError: number;
  depthEstimate: number;
}

export const mockPrediction: PredictionResult = {
  type: 'earthquake',
  confidence: 0.94,
  magnitude: 4.7,
  magnitudeError: 0.3,
  depthEstimate: 12.4,
};

export const mockEvents: SeismicEvent[] = [
  {
    id: 'ev1',
    timestamp: '2025-04-29T08:24:13Z',
    magnitude: 4.7,
    depth: 12.3,
    location: {
      lat: 36.2048,
      lng: -117.4971,
      name: 'Central California, USA',
    },
    type: 'earthquake',
    confidence: 0.94,
  },
  {
    id: 'ev2',
    timestamp: '2025-04-29T07:58:32Z',
    magnitude: 3.2,
    depth: 5.7,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      name: 'Los Angeles, California, USA',
    },
    type: 'earthquake',
    confidence: 0.88,
  },
  {
    id: 'ev3',
    timestamp: '2025-04-29T06:37:21Z',
    magnitude: 2.1,
    depth: 1.3,
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: 'San Francisco, California, USA',
    },
    type: 'tremor',
    confidence: 0.76,
  },
  {
    id: 'ev4',
    timestamp: '2025-04-29T05:12:45Z',
    magnitude: 3.8,
    depth: 8.5,
    location: {
      lat: 19.4326,
      lng: -155.2832,
      name: 'Hilo, Hawaii, USA',
    },
    type: 'earthquake',
    confidence: 0.92,
  },
  {
    id: 'ev5',
    timestamp: '2025-04-29T04:03:17Z',
    magnitude: 1.4,
    depth: 0.7,
    location: {
      lat: 39.7392,
      lng: -104.9903,
      name: 'Denver, Colorado, USA',
    },
    type: 'explosion',
    confidence: 0.85,
  },
];

// Generate waveform data points
export const generateWaveformData = (pointCount: number = 200, type: string = 'earthquake'): number[] => {
  const result: number[] = [];
  
  // Base frequency and amplitude varies by type
  let baseFreq = type === 'earthquake' ? 0.05 : 
                 type === 'explosion' ? 0.1 : 
                 type === 'tremor' ? 0.03 : 0.02;
                 
  let baseAmp = type === 'earthquake' ? 0.5 : 
               type === 'explosion' ? 0.7 : 
               type === 'tremor' ? 0.3 : 0.1;
  
  for (let i = 0; i < pointCount; i++) {
    // Create more complex waveforms with multiple frequencies
    const x = i / pointCount;
    let y = 0;
    
    // Different wave patterns for different event types
    if (type === 'earthquake') {
      // P-wave followed by larger S-wave
      const pWave = Math.sin(x * 50) * (x < 0.3 ? baseAmp : 0) * Math.exp(-10 * x);
      const sWave = Math.sin(x * 30) * baseAmp * (x > 0.3 ? 1 : 0) * Math.exp(-3 * (x - 0.3));
      y = pWave + sWave;
    } else if (type === 'explosion') {
      // Sudden spike followed by rapid decay
      y = Math.sin(x * 80) * baseAmp * Math.exp(-8 * x);
    } else if (type === 'tremor') {
      // More consistent oscillation
      y = Math.sin(x * 40) * baseAmp * 0.5 * (1 + Math.sin(x * 5));
    } else {
      // Random noise
      y = (Math.random() - 0.5) * baseAmp * 0.5;
    }
    
    // Add some random noise
    y += (Math.random() - 0.5) * 0.1;
    
    result.push(y);
  }
  
  return result;
};

export const earthquakeWaveform = generateWaveformData(300, 'earthquake');
export const explosionWaveform = generateWaveformData(300, 'explosion');
export const tremorWaveform = generateWaveformData(300, 'tremor');
export const noiseWaveform = generateWaveformData(300, 'noise');

// Generate frequency data for spectrograms
export const generateSpectrogramData = (rows: number = 40, cols: number = 100, type: string = 'earthquake'): number[][] => {
  const result: number[][] = [];
  
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      let value = 0;
      const x = j / cols;
      const y = i / rows;
      
      if (type === 'earthquake') {
        // Higher frequencies at the start, then lower frequencies
        value = Math.exp(-10 * Math.pow(y - 0.7 * Math.exp(-3 * x), 2)) * Math.exp(-2 * x);
        value += Math.exp(-10 * Math.pow(y - 0.3 * Math.exp(-x), 2)) * Math.exp(-x) * (x > 0.3 ? 1 : 0);
      } else if (type === 'explosion') {
        // Sudden intensity across many frequencies
        value = Math.exp(-15 * Math.pow(x, 2)) * Math.exp(-4 * Math.pow(y - 0.5, 2));
        value += Math.exp(-5 * Math.pow(x - 0.1, 2)) * Math.exp(-10 * Math.pow(y - 0.7, 2));
      } else if (type === 'tremor') {
        // More consistent patterns
        value = Math.exp(-3 * Math.pow(y - 0.3 - 0.1 * Math.sin(x * 20), 2)) * (0.5 + 0.5 * Math.sin(x * 10));
      } else {
        // Random noise across frequencies
        value = Math.random() * 0.3;
      }
      
      // Add some random variation
      value = Math.max(0, Math.min(1, value + (Math.random() - 0.5) * 0.1));
      
      row.push(value);
    }
    result.push(row);
  }
  
  return result;
};

export const spectrogramData = generateSpectrogramData(40, 100, 'earthquake');

export const accuracyMetrics = {
  classification: {
    accuracy: 0.93,
    precision: 0.91,
    recall: 0.94,
    f1Score: 0.92,
  },
  regression: {
    mse: 0.18,
    mae: 0.31,
    r2: 0.89,
  },
  trainingProgress: [0.65, 0.72, 0.78, 0.84, 0.87, 0.89, 0.91, 0.92, 0.93, 0.93]
};
