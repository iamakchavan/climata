
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
    <div className="flex flex-col items-center">
      <p className="font-medium text-sm mb-2">{isToday ? 'Today' : formatDate(date)}</p>
      <WeatherIcon className="mb-2" size={24} />
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold">{formatTemperature(maxTemp)}</span>
        <span className="text-xs text-white/70">{formatTemperature(minTemp)}</span>
      </div>
    </div>
  );
};

export default ForecastCard;
