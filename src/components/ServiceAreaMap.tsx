import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Car, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the interface for Google Maps objects
declare global {
  interface Window {
    google: any;
    initializeGoogleMapsCallback: () => void;
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
  const scriptElementRef = useRef<HTMLScriptElement | null>(null);
  const scriptLoadedRef = useRef<boolean>(false);
  
  // Function to initialize map
  const initializeMap = () => {
    if (!window.google?.maps || !mapContainerRef.current) {
      setLoadError(true);
      return;
    }
    
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
      
      // Check if AdvancedMarkerElement is available - preferred method
      const useAdvancedMarker = !!window.google.maps.marker?.AdvancedMarkerElement;
      
      // Add office marker
      if (useAdvancedMarker) {
        try {
          const markerElement = document.createElement('div');
          markerElement.innerHTML = `
            <div style="width: 32px; height: 32px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#B45309">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `;
          
          const officeMarker = new window.google.maps.marker.AdvancedMarkerElement({
            position: officeLocationRef.current,
            map: mapInstanceRef.current,
            content: markerElement,
            title: "Pure Air California Office"
          });
          
          // Store marker reference for cleanup
          markersRef.current.push({ 
            marker: officeMarker, 
            infoWindow: null,
            areaName: "office" 
          });
        } catch (error) {
          console.error('Error creating AdvancedMarkerElement:', error);
          // Fallback to regular marker
          const officeMarker = new window.google.maps.Marker({
            position: officeLocationRef.current,
            map: mapInstanceRef.current,
            icon: {
              url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32' fill='%23B45309'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
              scaledSize: new window.google.maps.Size(32, 32),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(16, 32)
            },
            title: "Pure Air California Office"
          });
          
          // Store marker reference for cleanup
          markersRef.current.push({ 
            marker: officeMarker, 
            infoWindow: null,
            areaName: "office" 
          });
        }
      } else {
        // Fallback to regular marker
        const officeMarker = new window.google.maps.Marker({
          position: officeLocationRef.current,
          map: mapInstanceRef.current,
          icon: {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32' fill='%23B45309'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32)
          },
          title: "Pure Air California Office"
        });
        
        // Store marker reference for cleanup
        markersRef.current.push({ 
          marker: officeMarker, 
          infoWindow: null,
          areaName: "office" 
        });
      }
      
      // Add area markers
      serviceAreas.forEach(area => {
        let marker;
        
        if (useAdvancedMarker) {
          try {
            const markerElement = document.createElement('div');
            markerElement.innerHTML = `
              <div style="width: 28px; height: 28px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#2563EB">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            `;
            
            marker = new window.google.maps.marker.AdvancedMarkerElement({
              position: area.coordinates,
              map: mapInstanceRef.current,
              content: markerElement,
              title: area.name
            });
          } catch (error) {
            console.error('Error creating AdvancedMarkerElement:', error);
            // Fallback to regular marker if advanced marker fails
            marker = new window.google.maps.Marker({
              position: area.coordinates,
              map: mapInstanceRef.current,
              icon: {
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='28' height='28' fill='%232563EB'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
                scaledSize: new window.google.maps.Size(28, 28),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(14, 28)
              },
              title: area.name
            });
          }
        } else {
          // Fallback to regular marker
          marker = new window.google.maps.Marker({
            position: area.coordinates,
            map: mapInstanceRef.current,
            icon: {
              url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='28' height='28' fill='%232563EB'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
              scaledSize: new window.google.maps.Size(28, 28),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(14, 28)
            },
            title: area.name
          });
        }
        
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
        
        // Add click listener (works for both marker types)
        try {
          marker.addListener('click', () => {
            // Close all other info windows
            markersRef.current.forEach(m => {
              if (m.infoWindow) m.infoWindow.close();
            });
            
            // Open the info window - handle differences between marker types
            if (useAdvancedMarker && 'position' in marker) {
              infoWindow.open({
                anchor: marker,
                map: mapInstanceRef.current
              });
            } else {
              infoWindow.open(mapInstanceRef.current, marker);
            }
          });
        } catch (error) {
          console.error('Error adding marker click listener:', error);
        }
        
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
    try {
      // If Google Maps is already loaded, initialize the map
      if (window.google?.maps) {
        initializeMap();
        return () => {
          // Cleanup function in case we already had Google Maps loaded
          cleanupMapResources();
        };
      }
      
      // Already attempted to load script but failed
      if (scriptLoadedRef.current) {
        setLoadError(true);
        return;
      }
      
      // Set script as loaded to prevent duplicate attempts
      scriptLoadedRef.current = true;
      
      // Create a unique callback name
      const callbackName = 'initializeGoogleMapsCallback';
      window[callbackName] = initializeMap;
      
      // Get API key from environment variable
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        console.error('Google Maps API key is missing');
        setLoadError(true);
        return;
      }
      
      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      script.loading = 'async'; // Add loading attribute
      script.id = 'google-maps-api-script';
      script.crossOrigin = 'anonymous'; // Add crossOrigin attribute
      
      script.onerror = (error) => {
        console.error('Google Maps script failed to load:', error);
        setLoadError(true);
        // Clean up callback
        if (window[callbackName]) delete window[callbackName];
      };
      
      // Store reference to the script element for cleanup
      scriptElementRef.current = script;
      document.head.appendChild(script);
      
      return () => {
        cleanupMapResources();
        
        // Clean up script and globals
        if (scriptElementRef.current && document.head.contains(scriptElementRef.current)) {
          document.head.removeChild(scriptElementRef.current);
        }
        
        // Clean up callback
        if (window[callbackName]) delete window[callbackName];
      };
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
      setLoadError(true);
      return undefined;
    }
  };
  
  // Helper function to clean up map resources
  const cleanupMapResources = () => {
    // Clean up markers and listeners
    if (markersRef.current.length > 0 && window.google?.maps) {
      markersRef.current.forEach(m => {
        try {
          if (m.marker) {
            // Different cleanup method depending on marker type
            if (typeof m.marker.setMap === 'function') {
              m.marker.setMap(null);
            }
            
            // Remove all event listeners
            if (window.google?.maps?.event?.clearInstanceListeners) {
              window.google.maps.event.clearInstanceListeners(m.marker);
            }
          }
          
          // Close and clean up info windows
          if (m.infoWindow) {
            m.infoWindow.close();
            if (window.google?.maps?.event?.clearInstanceListeners) {
              window.google.maps.event.clearInstanceListeners(m.infoWindow);
            }
          }
        } catch (error) {
          console.error('Error cleaning up map resources:', error);
        }
      });
    }
    
    // Clear marker references
    markersRef.current = [];
    
    // Clear map instance
    mapInstanceRef.current = null;
  };
  
  // Effect to load map
  useEffect(() => {
    // Create and store a cleanup function
    let cleanup: (() => void) | undefined;
    
    try {
      cleanup = loadGoogleMapsAPI();
    } catch (e) {
      console.error('Failed to load Google Maps:', e);
      setLoadError(true);
    }
    
    // Return cleanup function
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      } else {
        cleanupMapResources();
      }
    };
  }, []);
  
  // Effect to update selected area
  useEffect(() => {
    if (!selectedArea || !mapInstanceRef.current || !window.google?.maps) return;
    
    const selectedMarker = markersRef.current.find(
      m => m.areaName === selectedArea
    );
    
    if (selectedMarker) {
      try {
        // Close all info windows
        markersRef.current.forEach(m => {
          if (m.infoWindow) m.infoWindow.close();
        });
        
        // Handle both marker types
        const marker = selectedMarker.marker;
        const infoWindow = selectedMarker.infoWindow;
        
        if (infoWindow) {
          // Check if it's a regular marker or advanced marker
          if (typeof marker.getPosition === 'function') {
            // Regular Marker
            infoWindow.open(mapInstanceRef.current, marker);
            
            // Pan to marker
            mapInstanceRef.current.panTo(marker.getPosition());
            
            // Bounce animation if supported
            if (window.google.maps.Animation && typeof marker.setAnimation === 'function') {
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
              setTimeout(() => {
                if (marker) {
                  marker.setAnimation(null);
                }
              }, 700);
            }
          } else {
            // Advanced Marker Element
            infoWindow.open({
              anchor: marker,
              map: mapInstanceRef.current
            });
            
            // Pan to marker
            mapInstanceRef.current.panTo(marker.position);
          }
        }
      } catch (error) {
        console.error('Error highlighting selected area:', error);
      }
    }
  }, [selectedArea]);
  
  // Render fallback UI if map fails to load
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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