
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LocationData, WeatherData } from "@/types/weather";
import { fetchWeatherData } from "@/services/weatherService";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherPlaceholder from "@/components/WeatherPlaceholder";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-weather-blue-light to-white">
      <div className="container max-w-5xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            ClimaTracker
          </h1>
          <div className="flex justify-center mb-6">
            <SearchBar onLocationSelect={handleLocationSelect} />
          </div>
        </header>

        <main>
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-12 w-12 text-weather-blue animate-spin" />
            </div>
          ) : weatherData && location ? (
            <>
              <CurrentWeather data={weatherData} locationName={location.name} />
              <WeatherForecast data={weatherData} />
            </>
          ) : (
            <WeatherPlaceholder />
          )}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by Open-Meteo API • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
