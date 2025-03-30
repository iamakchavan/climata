
import { WeatherData } from "@/types/weather";
import { formatTemperature, getWeatherDescription, getWeatherIcon, getWindDirection } from "@/utils/weatherUtils";
import { Droplets, Thermometer, Wind, Cloud, Umbrella, SunMedium } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName: string;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const { current } = data;
  const weather = getWeatherDescription(current.weather_code);
  const WeatherIcon = getWeatherIcon(current.weather_code);
  const isMobile = useIsMobile();
  
  // Format coordinates for display
  const formatCoordinates = (lat: number, lon: number) => {
    const latDir = lat >= 0 ? "N" : "S";
    const lonDir = lon >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(1)}° ${latDir} ${Math.abs(lon).toFixed(1)}° ${lonDir}`;
  };
  
  // Format current time
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden mb-6 shadow-lg transform transition-all hover:shadow-xl animate-fade-in">
      <div className="p-6 text-white relative">
        {/* Decorative top-right element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 mb-8 relative z-10">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">{locationName}</h1>
            <p className="text-white/80 text-sm flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              {formatCoordinates(data.latitude, data.longitude)} • {formatTime()}
            </p>
          </div>
          <div className="flex items-center md:text-right w-full md:w-auto">
            <WeatherIcon className="mr-3 text-white/90" size={isMobile ? 36 : 48} />
            <div>
              <div className="text-6xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">{formatTemperature(current.temperature_2m)}</div>
              <p className="text-white/80 text-sm">Feels like {formatTemperature(current.apparent_temperature)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center md:justify-start mb-8 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
          <WeatherIcon className="mr-2" size={24} />
          <span className="text-lg font-medium">{weather.description}</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-panel p-4 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <Wind className="mb-1 text-white/80" size={isMobile ? 18 : 22} />
            <p className="text-lg font-medium">{Math.round(current.wind_speed_10m)} km/h</p>
            <p className="text-xs text-white/70">{getWindDirection(current.wind_direction_10m)}</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <Droplets className="mb-1 text-white/80" size={isMobile ? 18 : 22} />
            <p className="text-lg font-medium">{current.relative_humidity_2m}%</p>
            <p className="text-xs text-white/70">Humidity</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <Umbrella className="mb-1 text-white/80" size={isMobile ? 18 : 22} />
            <p className="text-lg font-medium">{Math.round(current.precipitation * 100)}%</p>
            <p className="text-xs text-white/70">Precipitation</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <SunMedium className="mb-1 text-white/80" size={isMobile ? 18 : 22} />
            <p className="text-lg font-medium">Low</p>
            <p className="text-xs text-white/70">UV Index</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 text-sm text-white/90 text-center bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
          <p className="italic">{weather.description.toLowerCase() === "clear sky" ? "Enjoy the beautiful clear skies today!" : 
            `This scene captures the calm serenity of a ${weather.description.toLowerCase()} day with a gentle breeze.`}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
