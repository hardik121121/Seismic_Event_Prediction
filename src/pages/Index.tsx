
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import WaveformVisualizer from '@/components/WaveformVisualizer';
import EventMap from '@/components/EventMap';
import ClassificationDisplay from '@/components/ClassificationDisplay';
import Spectrogram from '@/components/Spectrogram';
import PredictionMetrics from '@/components/PredictionMetrics';
import LatestEvents from '@/components/LatestEvents';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { toast } = useToast();
  const [activeWaveform, setActiveWaveform] = useState<'earthquake' | 'explosion' | 'tremor' | 'noise'>('earthquake');
  
  const handlePredictClick = () => {
    toast({
      title: "Prediction Complete",
      description: "Seismic event classified as earthquake with 94% confidence.",
    });
  };
  
  const handleDatasetChange = () => {
    toast({
      title: "Dataset Changed",
      description: "Now analyzing waveforms from USGS Northern California Network.",
    });
  };

  return (
    <div className="min-h-screen bg-seismic-navy text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Seismic Event Classification & Prediction</h1>
            <p className="text-seismic-slate max-w-3xl">
              Deep learning model for classifying seismic events and predicting earthquake magnitudes using real-time waveform data.
              Combining signal processing with neural networks for faster, more accurate early warning systems.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab system for waveform types */}
              <Tabs defaultValue="earthquake" 
                onValueChange={(value) => setActiveWaveform(value as 'earthquake' | 'explosion' | 'tremor' | 'noise')}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-2">
                  <TabsList className="bg-seismic-blue/30">
                    <TabsTrigger value="earthquake" className="data-[state=active]:bg-seismic-blue data-[state=active]:text-white">
                      Earthquake
                    </TabsTrigger>
                    <TabsTrigger value="explosion" className="data-[state=active]:bg-seismic-blue data-[state=active]:text-white">
                      Explosion
                    </TabsTrigger>
                    <TabsTrigger value="tremor" className="data-[state=active]:bg-seismic-blue data-[state=active]:text-white">
                      Tremor
                    </TabsTrigger>
                    <TabsTrigger value="noise" className="data-[state=active]:bg-seismic-blue data-[state=active]:text-white">
                      Noise
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDatasetChange}
                      className="text-xs bg-transparent border-seismic-slate/30 hover:bg-seismic-lightBlue hover:text-white"
                    >
                      Change Dataset
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handlePredictClick}
                      className="text-xs bg-seismic-teal text-seismic-blue hover:bg-seismic-teal/90"
                    >
                      Run Prediction
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="earthquake" className="mt-0">
                  <WaveformVisualizer type="earthquake" />
                </TabsContent>
                <TabsContent value="explosion" className="mt-0">
                  <WaveformVisualizer type="explosion" />
                </TabsContent>
                <TabsContent value="tremor" className="mt-0">
                  <WaveformVisualizer type="tremor" />
                </TabsContent>
                <TabsContent value="noise" className="mt-0">
                  <WaveformVisualizer type="noise" />
                </TabsContent>
              </Tabs>
              
              {/* Map visualization */}
              <EventMap />
              
              {/* Spectrogram and performance metrics in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Spectrogram />
                <PredictionMetrics />
              </div>
            </div>
            
            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              <ClassificationDisplay />
              <LatestEvents />
            </div>
          </div>
          
          <footer className="mt-8 text-center text-xs text-seismic-slate">
            <p>Data sources: USGS Earthquake Catalog, Stanford Earthquake Dataset (STEAD), IRIS Seismic Data</p>
            <p className="mt-2">Created for demonstration purposes - Not for actual earthquake predictions</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
