
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
    <div className="glass-card rounded-3xl overflow-hidden mb-6 shadow-xl border-[1px] border-white/25">
      <div className="p-6 text-white bg-gradient-to-b from-transparent to-black/10">
        <div className="flex justify-between items-start mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-1">{locationName}</h1>
            <p className="text-white/80 text-sm flex items-center">
              <span className="inline-flex items-center bg-white/10 px-2 py-1 rounded-full mr-2">
                <Cloud size={12} className="mr-1 opacity-70" />
                {formatCoordinates(data.latitude, data.longitude)}
              </span>
              <span className="inline-flex items-center bg-white/10 px-2 py-1 rounded-full">
                <SunMedium size={12} className="mr-1 opacity-70" />
                {formatTime()}
              </span>
            </p>
          </div>
          <div className="text-right animate-fade-in">
            <div className="text-6xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              {formatTemperature(current.temperature_2m)}
            </div>
            <p className="text-white/80 text-sm">
              Feels like {formatTemperature(current.apparent_temperature)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center mb-8 p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
          <WeatherIcon className="mr-3 text-white/90" size={36} />
          <span className="text-xl font-medium">{weather.description}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4 flex flex-col items-center hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02]">
            <Wind className="mb-2 text-white/80" size={22} />
            <p className="text-xl font-medium">{Math.round(current.wind_speed_10m)} km/h</p>
            <p className="text-xs text-white/70 mt-1">{getWindDirection(current.wind_direction_10m)}</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02]">
            <Droplets className="mb-2 text-white/80" size={22} />
            <p className="text-xl font-medium">{current.relative_humidity_2m}%</p>
            <p className="text-xs text-white/70 mt-1">Humidity</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02]">
            <Umbrella className="mb-2 text-white/80" size={22} />
            <p className="text-xl font-medium">{Math.round(current.precipitation * 100)}%</p>
            <p className="text-xs text-white/70 mt-1">Precipitation</p>
          </div>
          
          <div className="glass-panel p-4 flex flex-col items-center hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02]">
            <SunMedium className="mb-2 text-white/80" size={22} />
            <p className="text-xl font-medium">Low</p>
            <p className="text-xs text-white/70 mt-1">UV Index</p>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-white/70 text-center px-3 py-4 border-t border-white/10">
          <p>This scene captures the calm serenity of a {weather.description.toLowerCase()} day with a gentle breeze.</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
