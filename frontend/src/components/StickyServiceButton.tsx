import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPhoneCall, trackCTAClick } from '@/utils/analytics';

const StickyServiceButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-[100] pb-safe">
      <div className="px-4 py-3">
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14 shadow-lg animate-pulse-subtle"
            asChild
          >
            <a href="tel:2137924145" onClick={() => trackPhoneCall('sticky_button')} className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                <Phone className="w-6 h-6 fill-current" />
              </motion.div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-normal opacity-90">Expedited Service</span>
                <span>Call Now</span>
              </div>
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-[35%] border-gray-300 bg-gray-50 text-gray-700 h-14 font-semibold"
            asChild
          >
            <Link to="/quote" onClick={() => trackCTAClick('get_quote', 'sticky_button', '/quote')} className="flex flex-col items-center justify-center leading-tight">
              <span className="text-xs text-gray-500">Online</span>
              <span>Quote</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyServiceButton;