
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LocationData } from "@/types/weather";
import { searchLocations } from "@/services/weatherService";
import { useToast } from "@/components/ui/use-toast";

interface SearchBarProps {
  onLocationSelect: (location: LocationData) => void;
}

const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const locations = await searchLocations(searchQuery);
      setResults(locations);
      setIsOpen(locations.length > 0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search locations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: LocationData) => {
    onLocationSelect(location);
    setQuery(location.name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative glass-panel">
        <Input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-white/60 h-10 px-10"
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full glass-panel">
          {isLoading ? (
            <div className="p-3 text-center text-sm text-white/70">Loading...</div>
          ) : results.length > 0 ? (
            <ul className="max-h-48 overflow-auto py-1">
              {results.map((location) => (
                <li 
                  key={`${location.id}-${location.name}`}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm text-white"
                  onClick={() => handleSelectLocation(location)}
                >
                  {location.name}
                  {location.admin1 && location.country ? `, ${location.admin1}, ${location.country}` : location.country ? `, ${location.country}` : ''}
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-3 text-center text-sm text-white/70">No locations found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
