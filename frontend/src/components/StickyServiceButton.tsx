import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPhoneCall, trackCTAClick } from '@/utils/analytics';

const StickyServiceButton = () => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
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

      {/* Desktop Aggressive Floating FAB */}
      <div className="hidden md:flex flex-col items-end fixed bottom-8 right-8 z-[100]">
        <Button
          asChild
          className="rounded-full w-20 h-20 bg-brand-600 hover:bg-brand-700 text-white shadow-2xl relative flex items-center justify-center p-0 overflow-visible group"
        >
          <a href="tel:2137924145" onClick={() => trackPhoneCall('desktop_fab')}>
             <div className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-30"></div>
             <motion.div
               animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
             >
               <Phone className="w-8 h-8 relative z-10 fill-current group-hover:scale-110 transition-transform" />
             </motion.div>
             <div className="absolute right-full mr-6 bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-end gap-1 origin-right scale-95 group-hover:scale-100 min-w-max">
                <span className="text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Live Dispatch Serving LA
                </span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">(213) 792-4145</span>
                <span className="text-sm font-medium text-slate-500 mt-1">Tap to claim a same-day slot</span>
             </div>
          </a>
        </Button>
      </div>
    </>
  );
};

export default StickyServiceButton;