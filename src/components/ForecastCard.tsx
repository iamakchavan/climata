
import { formatDate, formatTemperature, getWeatherDescription, getWeatherIcon } from "@/utils/weatherUtils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <WeatherIcon className="text-white" size={22} />
          </div>
          <div>
            <p className={`font-medium ${isToday ? 'text-white' : 'text-white/90'}`}>
              {isToday ? 'Today' : formatDate(date)}
            </p>
            <p className="text-xs text-white/80">{weather.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{formatTemperature(maxTemp)}</span>
          <span className="text-xs text-white/70">{formatTemperature(minTemp)}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center py-2 transition-transform hover:scale-105">
      <p className={`font-medium text-sm mb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${isToday ? 'bg-white/20 px-3 py-0.5 rounded-full' : ''}`}>
        {isToday ? 'Today' : formatDate(date)}
      </p>
      <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
        <WeatherIcon className="text-white" size={26} />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold">{formatTemperature(maxTemp)}</span>
        <span className="text-xs text-white/70 mt-1">{formatTemperature(minTemp)}</span>
      </div>
      <p className="mt-2 text-xs text-white/80 text-center">{weather.description}</p>
    </div>
  );
};

export default ForecastCard;
