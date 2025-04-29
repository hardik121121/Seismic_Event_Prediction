
import React from 'react';
import { Activity, Database, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const { toast } = useToast();

  const handleAlertClick = () => {
    toast({
      title: "Real-time Alert System",
      description: "No new seismic events detected in monitored regions.",
    });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-seismic-blue border-b border-seismic-lightBlue/50">
      <div className="flex items-center space-x-2">
        <Activity className="h-6 w-6 text-seismic-teal" />
        <span className="font-bold text-xl text-white">SeismicSense<span className="text-seismic-teal">AI</span></span>
      </div>
      
      <div className="flex items-center space-x-1">
        <div className="px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 bg-seismic-teal/10 text-seismic-teal rounded-full">
          <span className="h-2 w-2 rounded-full bg-seismic-teal animate-pulse"></span>
          <span>LIVE DATA</span>
        </div>
        
        <button 
          className="p-2 rounded-full hover:bg-seismic-lightBlue transition-colors"
          onClick={handleAlertClick}
        >
          <AlertTriangle className="h-5 w-5 text-seismic-yellow" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-seismic-lightBlue transition-colors">
          <Database className="h-5 w-5 text-seismic-slate" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
