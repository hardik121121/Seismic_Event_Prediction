
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
import { mockEvents } from '@/utils/mockData';

const LatestEvents = () => {
  const events = [...mockEvents].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="seismic-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono flex items-center gap-2">
          <Database className="h-4 w-4" />
          Recent Events
        </CardTitle>
        <CardDescription>
          Last 24 hours of detected seismic activity
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-2">
          {events.map((event) => (
            <div 
              key={event.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-seismic-blue/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${
                  event.type === 'earthquake' ? 'bg-seismic-orange' : 
                  event.type === 'explosion' ? 'bg-seismic-red' :
                  event.type === 'tremor' ? 'bg-seismic-green' :
                  'bg-seismic-slate'
                }`}></span>
                <div>
                  <p className="text-sm font-medium">{event.location.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-mono font-medium">
                  M {event.magnitude.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {event.type}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-2 border-t border-border flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Updated:</span>
          <span className="font-mono">Just now</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestEvents;
