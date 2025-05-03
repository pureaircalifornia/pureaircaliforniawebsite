import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, CalendarPlus } from 'lucide-react';

const StickyServiceButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-50">
      <div className="container mx-auto flex justify-between gap-4">
        <Button 
          variant="outline" 
          className="w-1/2 border-brand-600 text-brand-600 hover:bg-brand-50 flex items-center justify-center gap-2" 
          asChild
        >
          <a href="tel:2137924145">
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
        </Button>
        <Button 
          className="w-1/2 bg-brand-600 hover:bg-brand-700 flex items-center justify-center gap-2" 
          asChild
        >
          <Link to="/quote">
            <CalendarPlus className="w-4 h-4" />
            <span>Schedule</span>
          </Link>
        </Button>
      </div>
      
      {/* Add padding to prevent content from being hidden behind the sticky button */}
      <div className="h-safe-area-bottom bg-white" />
    </div>
  );
};

export default StickyServiceButton; 