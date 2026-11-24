import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, ArrowUpRight, Phone, AlertCircle } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';

interface GoogleMapInstance {
  panTo(position: unknown): void;
}
interface GoogleMapMarker {
  position?: unknown;
  addListener(event: string, handler: () => void): unknown;
  setMap?: (map: GoogleMapInstance | null) => void;
  getPosition?: () => unknown;
}
interface GoogleInfoWindow {
  open(options: unknown, marker?: GoogleMapMarker): void;
  close(): void;
}
interface MapEntry {
  marker: GoogleMapMarker;
  infoWindow: GoogleInfoWindow | null;
  areaName: string;
}

declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => GoogleMapInstance;
        MapTypeId: { ROADMAP: string };
        marker?: { AdvancedMarkerElement: new (options: Record<string, unknown>) => GoogleMapMarker };
        Marker: new (options: Record<string, unknown>) => GoogleMapMarker;
        Size: new (width: number, height: number) => unknown;
        Point: new (x: number, y: number) => unknown;
        InfoWindow: new (options: Record<string, unknown>) => GoogleInfoWindow;
        event?: { clearInstanceListeners(instance: unknown): void };
      };
    };
    initializeGoogleMapsCallback: () => void;
  }
}

const serviceAreas = [
  {
    name: 'Beverly Hills',
    slug: 'beverly-hills',
    region: 'Westside',
    description: 'Multi-zone residences, condos, and Golden Triangle commercial spaces',
    coordinates: { lat: 34.0736, lng: -118.4004 },
  },
  {
    name: 'Santa Monica',
    slug: 'santa-monica',
    region: 'Coastal',
    description: 'Coastal bungalows, multi-unit condos, and Silicon Beach workplaces',
    coordinates: { lat: 34.0195, lng: -118.4912 },
  },
  {
    name: 'Pasadena',
    slug: 'pasadena',
    region: 'Foothills',
    description: 'Historic Craftsman homes, foothill properties, and Old Pasadena suites',
    coordinates: { lat: 34.1478, lng: -118.1445 },
  },
  {
    name: 'Sherman Oaks',
    slug: 'sherman-oaks',
    region: 'San Fernando Valley',
    description: 'Hillside split-levels, Valley ranch homes, and Ventura Blvd offices',
    coordinates: { lat: 34.1508, lng: -118.449 },
  },
  {
    name: 'Century City',
    slug: 'century-city',
    region: 'Central & Metro LA',
    description: 'High-rise condominiums, Class-A office towers, and medical suites',
    coordinates: { lat: 34.0556, lng: -118.4174 },
  },
  {
    name: 'Malibu',
    slug: 'malibu',
    region: 'Coastal & Canyons',
    description: 'Beachfront homes and Santa Monica Mountains canyon residences',
    coordinates: { lat: 34.0259, lng: -118.7798 },
  },
];

const GoogleMap = ({ selectedArea }: { selectedArea: string | null }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const mapInstanceRef = useRef<GoogleMapInstance | null>(null);
  const markersRef = useRef<MapEntry[]>([]);
  const centerPointRef = useRef({ lat: business.geo.latitude, lng: business.geo.longitude });
  const scriptElementRef = useRef<HTMLScriptElement | null>(null);
  const scriptLoadedRef = useRef<boolean>(false);

  const cleanupMapResources = useCallback(() => {
    if (markersRef.current.length > 0 && window.google?.maps) {
      markersRef.current.forEach((m) => {
        try {
          if (m.marker && typeof m.marker.setMap === 'function') {
            m.marker.setMap(null);
          }
          if (m.marker && window.google?.maps?.event?.clearInstanceListeners) {
            window.google.maps.event.clearInstanceListeners(m.marker);
          }
          if (m.infoWindow) {
            m.infoWindow.close();
          }
        } catch {
          // Ignore cleanup errors
        }
      });
    }
    markersRef.current = [];
    mapInstanceRef.current = null;
  }, []);

  const initializeMap = useCallback(() => {
    if (!window.google?.maps || !mapContainerRef.current) {
      setLoadError(true);
      return;
    }

    try {
      mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
        zoom: 10,
        center: centerPointRef.current,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
      });

      const useAdvancedMarker = !!window.google.maps.marker?.AdvancedMarkerElement;

      serviceAreas.forEach((area) => {
        let marker: GoogleMapMarker;
        if (useAdvancedMarker && window.google.maps.marker) {
          const el = document.createElement('div');
          el.innerHTML =
            '<div style="width:26px;height:26px;background:#135778;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.25)"></div>';
          marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: area.coordinates,
            map: mapInstanceRef.current,
            content: el,
            title: area.name,
          });
        } else {
          marker = new window.google.maps.Marker({
            position: area.coordinates,
            map: mapInstanceRef.current,
            title: area.name,
          });
        }

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding:6px 10px;max-width:210px"><strong style="display:block;margin-bottom:4px">${area.name}</strong><p style="font-size:12px;margin:0">${area.description}</p></div>`,
        });

        marker.addListener('click', () => {
          markersRef.current.forEach((m) => m.infoWindow?.close());
          if (useAdvancedMarker && 'position' in marker) {
            infoWindow.open({ anchor: marker, map: mapInstanceRef.current });
          } else {
            infoWindow.open(mapInstanceRef.current, marker);
          }
        });

        markersRef.current.push({ marker, infoWindow, areaName: area.name });
      });

      setMapLoaded(true);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (window.google?.maps) {
      initializeMap();
      return cleanupMapResources;
    }
    if (!apiKey || scriptLoadedRef.current) {
      setLoadError(true);
      return cleanupMapResources;
    }

    scriptLoadedRef.current = true;
    const callbackName = 'initializeGoogleMapsCallback';
    window[callbackName] = initializeMap;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&loading=async`;
    script.async = true;
    script.defer = true;
    script.id = 'google-maps-api-script';
    script.crossOrigin = 'anonymous';
    script.onerror = () => setLoadError(true);

    scriptElementRef.current = script;
    document.head.appendChild(script);

    return () => {
      cleanupMapResources();
      if (scriptElementRef.current && document.head.contains(scriptElementRef.current)) {
        document.head.removeChild(scriptElementRef.current);
      }
    };
  }, [initializeMap, cleanupMapResources]);

  useEffect(() => {
    if (!selectedArea || !mapInstanceRef.current || !window.google?.maps) return;
    const selectedMarker = markersRef.current.find((m) => m.areaName === selectedArea);
    if (!selectedMarker) return;
    markersRef.current.forEach((m) => m.infoWindow?.close());
    const { marker, infoWindow } = selectedMarker;
    if (infoWindow) {
      if (typeof marker.getPosition === 'function') {
        infoWindow.open(mapInstanceRef.current, marker);
        mapInstanceRef.current.panTo(marker.getPosition());
      } else {
        infoWindow.open({ anchor: marker, map: mapInstanceRef.current });
        mapInstanceRef.current.panTo(marker.position);
      }
    }
  }, [selectedArea]);

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-lg p-6 text-center">
        <AlertCircle className="w-10 h-10 text-brand-700 mb-3" aria-hidden="true" />
        <h3 className="text-lg font-semibold mb-2 text-slate-900">Greater Los Angeles Service-Area Dispatch</h3>
        <p className="text-gray-600 mb-4 max-w-sm text-sm">
          Pure Air California serves residential and commercial properties across Los Angeles County and Ventura.
        </p>
        <a
          href={business.phoneHref}
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 transition-colors text-sm font-semibold"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call {business.phone}
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainerRef} className="h-full w-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/90">
          <p className="text-gray-700 text-sm font-medium">Loading Greater Los Angeles map...</p>
        </div>
      )}
    </div>
  );
};

const ServiceAreaMap = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Greater Los Angeles Service Area</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Select a Los Angeles hub below or explore all 54 local service guides across the Westside, Central LA, San
          Fernando Valley, and San Gabriel foothills.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[350px] sm:h-[400px] lg:h-[480px] relative shadow-lg order-2 lg:order-1">
            <GoogleMap selectedArea={selectedArea} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
            {serviceAreas.map((area) => {
              const isSelected = selectedArea === area.name;
              return (
                <div
                  key={area.slug}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50 shadow-md'
                      : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/40'
                  }`}
                  onClick={() => setSelectedArea(area.name)}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1">
                    {area.region}
                  </span>
                  <h3 className="text-lg font-semibold mb-2 flex items-center text-slate-900">
                    <MapPin
                      className={`w-4 h-4 mr-2 flex-shrink-0 ${isSelected ? 'text-brand-600' : 'text-gray-400'}`}
                      aria-hidden="true"
                    />
                    {area.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{area.description}</p>
                  <Link
                    to={`/locations/${area.slug}/`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline underline-offset-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View {area.name} guide <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
          <Link
            to="/locations/"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Browse All 54 LA Areas
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2 border border-brand-600 text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Confirm Your ZIP: {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
