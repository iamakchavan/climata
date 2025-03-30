
import { WeatherData } from "@/types/weather";
import { formatTemperature, getWeatherDescription, getWeatherIcon, getWindDirection } from "@/utils/weatherUtils";
import { Droplets, Thermometer, Wind, Cloud, Umbrella, SunMedium } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName: string;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const { current } = data;
  const weather = getWeatherDescription(current.weather_code);
  const WeatherIcon = getWeatherIcon(current.weather_code);
  
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
    <div className="glass-card rounded-3xl overflow-hidden mb-6">
      <div className="p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{locationName}</h1>
            <p className="text-white/80 text-sm">
              {formatCoordinates(data.latitude, data.longitude)} • {formatTime()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{formatTemperature(current.temperature_2m)}</div>
            <p className="text-white/80 text-sm">Feels like {formatTemperature(current.apparent_temperature)}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <WeatherIcon className="mr-2" size={24} />
          <span className="text-lg">{weather.description}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel p-4 flex flex-col items-center">
            <Wind className="mb-1 text-white/80" size={20} />
            <p className="text-lg font-medium">{Math.round(current.wind_speed_10m)} km/h</p>
            <p className="text-xs text-white/70">{getWindDirection(current.wind_direction_10m)}</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center">
            <Droplets className="mb-1 text-white/80" size={20} />
            <p className="text-lg font-medium">{current.relative_humidity_2m}%</p>
            <p className="text-xs text-white/70">Humidity</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center">
            <Umbrella className="mb-1 text-white/80" size={20} />
            <p className="text-lg font-medium">{Math.round(current.precipitation * 100)}%</p>
            <p className="text-xs text-white/70">Precipitation</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center">
            <SunMedium className="mb-1 text-white/80" size={20} />
            <p className="text-lg font-medium">Low</p>
            <p className="text-xs text-white/70">UV Index</p>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-white/70 text-center">
          <p>This scene captures the calm serenity of a {weather.description.toLowerCase()} day with a gentle breeze.</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
