
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEvents } from '@/utils/mockData';
import { Map } from 'lucide-react';

const EventMap = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);
  
  // World map constants
  const mapWidth = 800;
  const mapHeight = 400;
  
  // Convert lat/lng to x/y coordinates for our simple map
  const latLngToXY = (lat: number, lng: number): [number, number] => {
    // Simple equirectangular projection
    const x = (lng + 180) * (mapWidth / 360);
    const y = (90 - lat) * (mapHeight / 180);
    return [x, y];
  };
  
  // Function to get color and size based on magnitude
  const getEventMarkerProps = (magnitude: number, type: string) => {
    // Color based on type
    let color = 'bg-seismic-blue'; // Default
    if (type === 'earthquake') color = 'bg-seismic-orange';
    else if (type === 'explosion') color = 'bg-seismic-red';
    else if (type === 'tremor') color = 'bg-seismic-green';
    
    // Size based on magnitude
    const baseSize = 8;
    const size = baseSize + magnitude * 2;
    
    return { color, size };
  };

  return (
    <Card className="seismic-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-mono flex items-center gap-2">
              <Map className="h-4 w-4" />
              Global Seismic Activity
            </CardTitle>
            <CardDescription>
              Recent events detected by the network
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative w-full h-64 bg-seismic-blue/30 rounded-md overflow-hidden">
          {/* World map outline */}
          <div className="absolute inset-0 border border-seismic-slate/20 rounded-md map-bg">
            {/* Simple world map grid lines */}
            <svg className="w-full h-full" viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
              {/* Longitude lines */}
              {Array.from({ length: 13 }, (_, i) => i * 30 - 180).map((lng) => {
                const x = (lng + 180) * (mapWidth / 360);
                return (
                  <line
                    key={`lng-${lng}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={mapHeight}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                );
              })}
              {/* Latitude lines */}
              {Array.from({ length: 7 }, (_, i) => i * 30 - 90).map((lat) => {
                const y = (90 - lat) * (mapHeight / 180);
                return (
                  <line
                    key={`lat-${lat}`}
                    x1={0}
                    y1={y}
                    x2={mapWidth}
                    y2={y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* Event markers */}
              {mockEvents.map((event) => {
                const [x, y] = latLngToXY(event.location.lat, event.location.lng);
                const { color, size } = getEventMarkerProps(event.magnitude, event.type);
                const isSelected = selectedEvent.id === event.id;
                
                return (
                  <g 
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={size}
                      className={`${color} ${isSelected ? 'stroke-white stroke-2' : ''}`}
                      fillOpacity={0.7}
                    />
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={size + 5}
                        className="fill-transparent stroke-seismic-teal"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Event details overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/40 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{selectedEvent.location.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(selectedEvent.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${
                    selectedEvent.type === 'earthquake' ? 'bg-seismic-orange' : 
                    selectedEvent.type === 'explosion' ? 'bg-seismic-red' :
                    selectedEvent.type === 'tremor' ? 'bg-seismic-green' :
                    'bg-seismic-slate'
                  }`}></span>
                  <span className="text-xs capitalize">{selectedEvent.type}</span>
                </div>
                <div className="font-mono text-sm">
                  M <span className="text-seismic-teal">{selectedEvent.magnitude.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventMap;
