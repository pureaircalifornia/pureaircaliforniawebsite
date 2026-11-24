import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    handleDrag(e.clientX);
  };

  const onTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    handleDrag(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) handleDrag(e.clientX);
    };
    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (isDragging) handleDrag(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize shadow-2xl border-4 border-white"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt={afterLabel} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        width={1200}
        height={800}
      />
      <div className="absolute top-4 right-4 bg-brand-600 text-white font-bold px-4 py-1 rounded-full shadow-lg z-10 text-sm">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay) */}
      <div 
        className="absolute inset-0 w-full h-full pb-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={beforeLabel} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          width={1200}
          height={800}
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-1 rounded-full shadow-lg z-10 text-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 pointer-events-none drop-shadow-xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-auto">
          <div className="flex gap-1">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-gray-400">
              <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-gray-400">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
