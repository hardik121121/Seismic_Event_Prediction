import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ActivityIcon } from 'lucide-react';
import { mockPrediction } from '@/utils/mockData';

const ClassificationDisplay = () => {
  const { type, confidence, magnitude, magnitudeError } = mockPrediction;
  
  // Classification options with confidence values
  const classifications = [
    { label: 'Earthquake', value: type === 'earthquake' ? confidence : Math.random() * 0.1 },
    { label: 'Explosion', value: type === 'explosion' ? confidence : Math.random() * 0.1 },
    { label: 'Tremor', value: type === 'tremor' ? confidence : Math.random() * 0.1 },
    { label: 'Noise', value: type === 'noise' ? confidence : Math.random() * 0.1 },
  ];
  
  // Sort by confidence value
  classifications.sort((a, b) => b.value - a.value);
  
  // Get color based on classification
  const getPredictionColor = () => {
    switch(type) {
      case 'earthquake': return 'text-seismic-orange';
      case 'explosion': return 'text-seismic-red';
      case 'tremor': return 'text-seismic-green';
      case 'noise': return 'text-seismic-slate';
      default: return 'text-seismic-blue';
    }
  };
  
  // Get progress color based on value
  const getConfidenceColor = (value: number) => {
    if (value > 0.8) return 'bg-seismic-teal';
    if (value > 0.6) return 'bg-seismic-green';
    if (value > 0.4) return 'bg-seismic-yellow';
    return 'bg-seismic-slate';
  };

  return (
    <Card className="seismic-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono flex items-center gap-2">
          <ActivityIcon className="h-4 w-4" />
          Event Classification
        </CardTitle>
        <CardDescription>
          AI model prediction - {confidence * 100}% confidence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold capitalize">Detected: <span className={getPredictionColor()}>{type}</span></h3>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              M <span className="text-seismic-teal">{magnitude.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground ml-1">±{magnitudeError}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {classifications.map((classification) => (
            <div key={classification.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{classification.label}</span>
                <span className="font-mono">{(classification.value * 100).toFixed(1)}%</span>
              </div>
              <Progress 
                value={classification.value * 100} 
                className="h-2" 
                indicatorClassName={getConfidenceColor(classification.value)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border text-xs flex justify-between">
          <span className="text-muted-foreground">Classification Time:</span>
          <span className="font-mono">0.23s</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassificationDisplay;
