
import { WeatherData } from "@/types/weather";
import { formatTemperature, getWeatherDescription, getWeatherIcon, getWindDirection } from "@/utils/weatherUtils";
import { Droplets, Thermometer, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName: string;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const { current } = data;
  const weather = getWeatherDescription(current.weather_code);
  const WeatherIcon = getWeatherIcon(current.weather_code);
  
  // Apply animation classes based on weather
  const getWeatherClass = () => {
    switch (weather.icon) {
      case 'sunny':
        return 'bg-gradient-to-br from-weather-blue-light to-white';
      case 'partly-cloudy':
        return 'bg-gradient-to-br from-weather-blue-light to-white';
      case 'cloudy':
        return 'bg-gradient-to-br from-weather-cloudy/30 to-white';
      case 'rainy':
        return 'bg-gradient-to-br from-weather-rainy/30 to-white';
      case 'snowy':
        return 'bg-gradient-to-br from-weather-snowy to-white';
      case 'stormy':
        return 'bg-gradient-to-br from-weather-stormy/30 to-white';
      default:
        return 'bg-gradient-to-br from-weather-blue-light to-white';
    }
  };

  return (
    <div className={`rounded-xl shadow-md overflow-hidden ${getWeatherClass()} animate-fade-in`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{locationName}</h2>
            <p className="text-gray-600 mt-1">{weather.description}</p>
          </div>
          <div className="flex flex-col items-center">
            <WeatherIcon size={48} className="text-gray-700" />
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <Thermometer className="text-gray-600 mb-1" size={24} />
              <p className="text-4xl font-bold text-gray-800">{formatTemperature(current.temperature_2m)}</p>
              <p className="text-sm text-gray-600">Feels like {formatTemperature(current.apparent_temperature)}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Droplets className="text-weather-rainy mb-1" size={24} />
              <p className="text-xl font-medium text-gray-800">{current.relative_humidity_2m}%</p>
              <p className="text-sm text-gray-600">Humidity</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Wind className="text-gray-600 mb-1" size={24} />
              <p className="text-xl font-medium text-gray-800">{Math.round(current.wind_speed_10m)} km/h</p>
              <p className="text-sm text-gray-600">{getWindDirection(current.wind_direction_10m)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
