
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LocationData, WeatherData } from "@/types/weather";
import { fetchWeatherData } from "@/services/weatherService";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherPlaceholder from "@/components/WeatherPlaceholder";
import { Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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

  // Load default location on first mount
  useEffect(() => {
    loadWeatherData(DEFAULT_LOCATION);
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
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </header>

        <main className="mt-12">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          ) : weatherData && location ? (
            <div className="animate-fade-in">
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
