
import { formatDate, formatTemperature, getWeatherDescription, getWeatherIcon } from "@/utils/weatherUtils";

interface ForecastCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  isToday?: boolean;
}

const ForecastCard = ({ date, maxTemp, minTemp, weatherCode, isToday = false }: ForecastCardProps) => {
  const weather = getWeatherDescription(weatherCode);
  const WeatherIcon = getWeatherIcon(weatherCode);
  
  return (
    <div className="rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition-shadow flex flex-col items-center animate-fade-in">
      <p className="font-medium text-gray-700 mb-1">{isToday ? 'Today' : formatDate(date)}</p>
      <WeatherIcon className="my-2 text-gray-700" size={32} />
      <p className="text-xs text-gray-600 mb-2">{weather.description}</p>
      <div className="flex justify-between w-full">
        <span className="text-sm font-bold text-gray-900">{formatTemperature(maxTemp)}</span>
        <span className="text-sm text-gray-500">{formatTemperature(minTemp)}</span>
      </div>
    </div>
  );
};

export default ForecastCard;
