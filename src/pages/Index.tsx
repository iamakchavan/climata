import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LocationData, WeatherData } from "@/types/weather";
import { fetchWeatherData, reverseGeocode } from "@/services/weatherService";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherPlaceholder from "@/components/WeatherPlaceholder";
import { Loader2, MapPin } from "lucide-react";

const DEFAULT_LOCATION = {
  id: 1,
  name: "New York",
  latitude: 40.7143,
  longitude: -74.006,
  country: "United States"
};

const Index = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationPermission, setLocationPermission] = useState<PermissionState | null>(null);
  const { toast } = useToast();

  // Load weather data for the selected location
  const loadWeatherData = async (locationData: LocationData) => {
    setIsLoading(true);
    try {
      const data = await fetchWeatherData(
        locationData.latitude,
        locationData.longitude
      );
      setWeatherData(data);
      setLocation(locationData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load weather data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check and request location permission
  const checkLocationPermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      setLocationPermission(permissionStatus.state);

      // Listen for permission changes
      permissionStatus.addEventListener('change', () => {
        setLocationPermission(permissionStatus.state);
        if (permissionStatus.state === 'granted') {
          getUserLocation();
        }
      });

      return permissionStatus.state;
    } catch (error) {
      console.error('Error checking location permission:', error);
      return 'denied';
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Browser Support Required",
        description: "Your browser doesn't support geolocation. Please search for a location manually.",
        variant: "destructive"
      });
      loadWeatherData(DEFAULT_LOCATION);
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationData = await reverseGeocode(latitude, longitude);
          
          if (locationData) {
            loadWeatherData(locationData);
          } else {
            throw new Error("Could not determine location name");
          }
        } catch (error) {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Couldn't determine your location name. Using coordinates instead.",
            variant: "destructive"
          });
          loadWeatherData({
            id: Date.now(),
            name: "Current Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let message = "Couldn't get your location. Using default location instead.";
        
        if (error.code === 1) {
          message = "Location access denied. Please enable location services for this site.";
        } else if (error.code === 2) {
          message = "Location service is unavailable. Please check your device settings.";
        } else if (error.code === 3) {
          message = "Location request timed out. Please try again.";
        }
        
        toast({
          title: "Location Error",
          description: message,
          variant: "destructive"
        });
        
        loadWeatherData(DEFAULT_LOCATION);
        setIsGettingLocation(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Initialize location services
  useEffect(() => {
    const initializeLocation = async () => {
      const permissionState = await checkLocationPermission();
      
      if (permissionState === 'granted') {
        getUserLocation();
      } else if (permissionState === 'prompt') {
        // Show a toast to inform the user about location access
        toast({
          title: "Location Access",
          description: "Please allow location access to get weather for your current location.",
          duration: 5000
        });
        getUserLocation(); // This will trigger the browser's permission prompt
      } else {
        // Permission denied, use default location
        loadWeatherData(DEFAULT_LOCATION);
      }
    };

    initializeLocation();
  }, []);

  // Handle location selection from search
  const handleLocationSelect = (locationData: LocationData) => {
    loadWeatherData(locationData);
  };

  return (
    <div className="weather-background">
      <div className="container max-w-lg px-4 py-8 mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex-1" />
          <SearchBar onLocationSelect={handleLocationSelect} />
          <div className="flex-1" />
        </header>

        <main className="mt-12">
          {isLoading || isGettingLocation ? (
            <div className="flex flex-col items-center justify-center p-12 text-white">
              <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
              <p>{isGettingLocation ? "Getting your location..." : "Loading weather data..."}</p>
            </div>
          ) : weatherData && location ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-1 text-white/80 text-sm mb-2 justify-center">
                <MapPin size={14} />
                <span>Using weather for {location.name}</span>
              </div>
              <CurrentWeather data={weatherData} locationName={location.name} />
              <WeatherForecast data={weatherData} />
            </div>
          ) : (
            <WeatherPlaceholder />
          )}
        </main>

        <footer className="mt-20 text-center text-sm text-white/70">
          <p>Powered by Open-Meteo API • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
