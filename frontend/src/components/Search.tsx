import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locations = [
  'Beverly Hills', 'Malibu', 'Century City', 'Hollywood', 'Downtown LA',
  'Ventura', 'Beverly Glen', 'Brentwood', 'Burbank', 'Calabasas',
  // Add more locations as needed
];

const services = [
  'Residential Air Duct Cleaning', 'Commercial Air Duct Cleaning',
  'Residential Dryer Vent Cleaning', 'Commercial Dryer Vent Cleaning',
  'Electrostatic Filter Installation'
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const sanitizedTerm = searchTerm.toLowerCase();
    
    // Check if it's a location
    const locationMatch = locations.find(loc => 
      loc.toLowerCase().includes(sanitizedTerm)
    );
    
    if (locationMatch) {
      navigate(`/locations/${locationMatch.toLowerCase().replace(' ', '-')}`);
      return;
    }
    
    // Check if it's a service
    const serviceMatch = services.find(service => 
      service.toLowerCase().includes(sanitizedTerm)
    );
    
    if (serviceMatch) {
      navigate(`/services/${serviceMatch.toLowerCase().replace(' ', '-')}`);
      return;
    }
    
    // If no match, navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search locations or services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default Search;
