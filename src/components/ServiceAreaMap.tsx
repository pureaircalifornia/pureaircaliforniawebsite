import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Car, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the interface for Google Maps objects
declare global {
  interface Window {
    google: any;
    googleMapsCallback: () => void;
  }
}

// Define service areas
const serviceAreas = [
  {
    name: 'Beverly Hills',
    travelTime: '15-20 minutes',
    description: 'Premium residential and commercial services',
    coordinates: { lat: 34.0736, lng: -118.4004 }
  },
  {
    name: 'Santa Monica',
    travelTime: '20-25 minutes',
    description: 'Beachfront properties and commercial spaces',
    coordinates: { lat: 34.0195, lng: -118.4912 }
  },
  {
    name: 'Malibu',
    travelTime: '30-35 minutes',
    description: 'Luxury homes and estates',
    coordinates: { lat: 34.0259, lng: -118.7798 }
  },
  {
    name: 'West Hollywood',
    travelTime: '10-15 minutes',
    description: 'Commercial and residential services',
    coordinates: { lat: 34.0900, lng: -118.3617 }
  },
  {
    name: 'Century City',
    travelTime: '15-20 minutes',
    description: 'Commercial office buildings and high-rises',
    coordinates: { lat: 34.0556, lng: -118.4174 }
  }
];

// Create a separate Map component to handle Google Maps integration
const GoogleMap = ({ selectedArea }: { selectedArea: string | null }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const officeLocationRef = useRef({ lat: 34.0984, lng: -118.3301 }); // LA center
  
  // Function to initialize map
  const initializeMap = () => {
    if (!window.google?.maps || !mapContainerRef.current) return;
    
    try {
      // Create map
      const mapOptions = {
        zoom: 10,
        center: officeLocationRef.current,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }]
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
      
      // Create map instance
      mapInstanceRef.current = new window.google.maps.Map(
        mapContainerRef.current,
        mapOptions
      );
      
      // Add office marker
      new window.google.maps.Marker({
        position: officeLocationRef.current,
        map: mapInstanceRef.current,
        icon: {
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32' fill='%23B45309'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
          scaledSize: new window.google.maps.Size(32, 32),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(16, 32)
        },
        animation: window.google.maps.Animation.DROP,
        title: "Pure Air California Office"
      });
      
      // Add area markers
      serviceAreas.forEach(area => {
        const marker = new window.google.maps.Marker({
          position: area.coordinates,
          map: mapInstanceRef.current,
          icon: {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='28' height='28' fill='%232563EB'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
            scaledSize: new window.google.maps.Size(28, 28),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(14, 28)
          },
          animation: window.google.maps.Animation.DROP,
          title: area.name
        });
        
        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 5px 10px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${area.name}</h3>
              <p style="font-size: 12px; margin-bottom: 5px;">${area.description}</p>
              <div style="font-size: 11px; color: #666;">
                ${area.travelTime} from our office
              </div>
            </div>
          `
        });
        
        // Add click listener
        marker.addListener('click', () => {
          // Close all other info windows
          markersRef.current.forEach(m => {
            if (m.infoWindow) m.infoWindow.close();
          });
          
          infoWindow.open(mapInstanceRef.current, marker);
        });
        
        // Store marker reference
        markersRef.current.push({ 
          marker, 
          infoWindow, 
          areaName: area.name 
        });
      });
      
      setMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoadError(true);
    }
  };
  
  // Function to load Google Maps API
  const loadGoogleMapsAPI = () => {
    if (window.google?.maps) {
      initializeMap();
      return;
    }
    
    // Create a unique callback name
    const callbackName = 'googleMapsCallback';
    window[callbackName] = initializeMap;
    
    // Create script element
    const script = document.createElement('script');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.id = 'google-maps-api-script';
    
    script.onerror = () => {
      setLoadError(true);
      // Clean up callback
      if (window[callbackName]) delete window[callbackName];
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up script
      const scriptElement = document.getElementById('google-maps-api-script');
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
      
      // Clean up callback
      if (window[callbackName]) delete window[callbackName];
    };
  };
  
  // Effect to load map
  useEffect(() => {
    const cleanup = loadGoogleMapsAPI();
    
    return () => {
      if (cleanup) cleanup();
      
      // Clean up markers
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(m => {
          if (m.marker) {
            m.marker.setMap(null);
            // Remove all event listeners
            window.google?.maps?.event.clearInstanceListeners(m.marker);
          }
          if (m.infoWindow) {
            m.infoWindow.close();
          }
        });
      }
      
      markersRef.current = [];
      mapInstanceRef.current = null;
    };
  }, []);
  
  // Effect to update selected area
  useEffect(() => {
    if (selectedArea && mapInstanceRef.current) {
      const selectedMarker = markersRef.current.find(
        m => m.areaName === selectedArea
      );
      
      if (selectedMarker) {
        // Close all info windows
        markersRef.current.forEach(m => {
          if (m.infoWindow) m.infoWindow.close();
        });
        
        // Open selected info window
        selectedMarker.infoWindow.open(
          mapInstanceRef.current,
          selectedMarker.marker
        );
        
        // Pan to marker
        mapInstanceRef.current.panTo(selectedMarker.marker.getPosition());
        
        // Bounce animation
        selectedMarker.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          if (selectedMarker.marker) {
            selectedMarker.marker.setAnimation(null);
          }
        }, 700);
      }
    }
  }, [selectedArea]);
  
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-6">
        <AlertCircle className="w-12 h-12 text-amber-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Map Unavailable</h3>
        <p className="text-gray-600 text-center mb-4">
          We couldn't load the map. This may be due to an ad blocker or network issue.
        </p>
        <a 
          href="tel:2137924145" 
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Contact Us Directly
        </a>
      </div>
    );
  }
  
  return (
    <div className="relative h-full">
      <div ref={mapContainerRef} className="h-full w-full" />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component
const ServiceAreaMap = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Service Area</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We proudly serve the greater Los Angeles area, with special focus on high-end residential
          and commercial properties. Our team is ready to provide exceptional service throughout
          these premium locations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Container */}
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px] relative shadow-lg">
            <GoogleMap selectedArea={selectedArea} />
          </div>

          {/* Area Information */}
          <div className="space-y-6">
            {serviceAreas.map((area) => (
              <motion.div
                key={area.name}
                className={`p-6 rounded-lg border ${
                  selectedArea === area.name
                    ? 'border-brand-600 bg-brand-50 shadow-md'
                    : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/50'
                } transition-all duration-200 cursor-pointer`}
                onClick={() => setSelectedArea(area.name)}
                whileHover={{ y: -3 }}
                animate={{ 
                  scale: selectedArea === area.name ? 1.02 : 1,
                  transition: { duration: 0.2 } 
                }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <MapPin className={`w-5 h-5 mr-2 ${selectedArea === area.name ? 'text-brand-600' : 'text-gray-400'}`} />
                  {area.name}
                </h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{area.travelTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>From our location</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Don't see your area? Contact us to check availability
          </p>
          <motion.a
            href="tel:2137924145"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-full hover:bg-brand-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-5 h-5" />
            Check Your Area
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap; 