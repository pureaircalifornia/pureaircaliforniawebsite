import React, { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeSrcSet?: string;
  afterSrcSet?: string;
  sizes?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  caption?: string;
  initialPosition?: number;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeSrcSet,
  afterSrcSet,
  sizes = '(max-width: 760px) 100vw, 960px',
  beforeLabel = 'Buildup before cleaning',
  afterLabel = 'Clean metal air path',
  beforeAlt,
  afterAlt,
  caption,
  initialPosition = 50,
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 15 : 5;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSliderPosition((pos) => Math.max(0, pos - step));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSliderPosition((pos) => Math.min(100, pos + step));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setSliderPosition(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setSliderPosition(100);
    }
  };

  const rounded = Math.round(sliderPosition);

  return (
    <figure className="pac-ba-figure">
      <div
        ref={containerRef}
        className={'pac-ba-stage' + (isDragging ? ' is-dragging' : '')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={afterImage}
          srcSet={afterSrcSet}
          sizes={afterSrcSet ? sizes : undefined}
          alt={afterAlt || afterLabel}
          className="pac-ba-img"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="pac-ba-badge pac-ba-badge--after" aria-hidden="true">
          {afterLabel}
        </span>

        <div
          className="pac-ba-before-layer"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            srcSet={beforeSrcSet}
            sizes={beforeSrcSet ? sizes : undefined}
            alt={beforeAlt || beforeLabel}
            className="pac-ba-img"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <span className="pac-ba-badge pac-ba-badge--before" aria-hidden="true">
            {beforeLabel}
          </span>
        </div>

        <div
          className="pac-ba-divider"
          style={{ left: `${sliderPosition}%` }}
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-valuetext={`${rounded}% showing ${beforeLabel}, ${100 - rounded}% showing ${afterLabel}`}
          onKeyDown={onKeyDown}
        >
          <span className="pac-ba-knob" aria-hidden="true">
            <MoveHorizontal size={18} strokeWidth={2.2} />
          </span>
        </div>
      </div>
      {caption && <figcaption className="pac-ba-caption">{caption}</figcaption>}
    </figure>
  );
};

export default BeforeAfterSlider;
