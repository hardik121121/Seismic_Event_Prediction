
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { accuracyMetrics } from '@/utils/mockData';

const PredictionMetrics = () => {
  // Convert progress array to points for mini chart
  const progressPoints = accuracyMetrics.trainingProgress.map((value, index) => {
    const x = index * (100 / (accuracyMetrics.trainingProgress.length - 1));
    const y = 100 - value * 100; // Invert for SVG coordinates
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <Card className="seismic-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Model Performance
        </CardTitle>
        <CardDescription>
          Classification and regression metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Classification</h4>
            
            <div className="grid grid-cols-2 gap-y-1 text-xs">
              <div className="text-muted-foreground">Accuracy</div>
              <div className="text-right font-mono">{(accuracyMetrics.classification.accuracy * 100).toFixed(1)}%</div>
              
              <div className="text-muted-foreground">Precision</div>
              <div className="text-right font-mono">{(accuracyMetrics.classification.precision * 100).toFixed(1)}%</div>
              
              <div className="text-muted-foreground">Recall</div>
              <div className="text-right font-mono">{(accuracyMetrics.classification.recall * 100).toFixed(1)}%</div>
              
              <div className="text-muted-foreground">F1 Score</div>
              <div className="text-right font-mono">{(accuracyMetrics.classification.f1Score * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Magnitude Prediction</h4>
            
            <div className="grid grid-cols-2 gap-y-1 text-xs">
              <div className="text-muted-foreground">MSE</div>
              <div className="text-right font-mono">{accuracyMetrics.regression.mse.toFixed(2)}</div>
              
              <div className="text-muted-foreground">MAE</div>
              <div className="text-right font-mono">{accuracyMetrics.regression.mae.toFixed(2)}</div>
              
              <div className="text-muted-foreground">R² Score</div>
              <div className="text-right font-mono">{accuracyMetrics.regression.r2.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Training Progress</span>
            <span className="font-mono text-seismic-teal">{(accuracyMetrics.trainingProgress.slice(-1)[0] * 100).toFixed(1)}%</span>
          </div>
          
          <div className="h-16 w-full bg-seismic-blue/30 rounded-md overflow-hidden p-2">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.1)" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.1)" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.1)" />
              
              {/* Progress line */}
              <polyline
                points={progressPoints}
                fill="none"
                stroke="#64ffda"
                strokeWidth="2"
              />
              
              {/* Filled area under the line */}
              <polyline
                points={`0,100 ${progressPoints} 100,100`}
                fill="rgba(100, 255, 218, 0.1)"
              />
              
              {/* Dots for data points */}
              {accuracyMetrics.trainingProgress.map((value, index) => {
                const x = index * (100 / (accuracyMetrics.trainingProgress.length - 1));
                const y = 100 - value * 100;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="#64ffda"
                  />
                );
              })}
            </svg>
          </div>
          
          <div className="flex justify-between text-xs mt-1">
            <span className="text-muted-foreground">Epoch 0</span>
            <span className="text-muted-foreground">Epoch {accuracyMetrics.trainingProgress.length - 1}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionMetrics;
