
import { WeatherData } from "@/types/weather";
import ForecastCard from "./ForecastCard";

interface WeatherForecastProps {
  data: WeatherData;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const { daily } = data;
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {daily.time.slice(0, 5).map((date, index) => (
          <ForecastCard
            key={date}
            date={date}
            maxTemp={daily.temperature_2m_max[index]}
            minTemp={daily.temperature_2m_min[index]}
            weatherCode={daily.weather_code[index]}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
