
import { WeatherData } from "@/types/weather";
import ForecastCard from "./ForecastCard";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeatherForecastProps {
  data: WeatherData;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const { daily } = data;
  const isMobile = useIsMobile();
  
  return (
    <div className="glass-card rounded-3xl overflow-hidden mt-4 shadow-lg transform transition-all hover:shadow-xl animate-fade-in">
      <div className="p-6 text-white">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="bg-white/20 w-8 h-8 flex items-center justify-center rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </span>
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">5-Day Forecast</span>
        </h2>
        
        {isMobile ? (
          <div className="space-y-4">
            {daily.time.slice(0, 5).map((date, index) => (
              <div key={date} className="glass-panel p-3 transform transition-all duration-300 hover:bg-white/20">
                <ForecastCard
                  date={date}
                  maxTemp={daily.temperature_2m_max[index]}
                  minTemp={daily.temperature_2m_min[index]}
                  weatherCode={daily.weather_code[index]}
                  isToday={index === 0}
                  layout="horizontal"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {daily.time.slice(0, 5).map((date, index) => (
              <div key={date} className={`${index !== 0 ? 'relative' : ''}`}>
                {index !== 0 && (
                  <div className="absolute left-0 -ml-1.5 top-0 h-full">
                    <Separator orientation="vertical" className="bg-white/10 h-full" />
                  </div>
                )}
                <ForecastCard
                  date={date}
                  maxTemp={daily.temperature_2m_max[index]}
                  minTemp={daily.temperature_2m_min[index]}
                  weatherCode={daily.weather_code[index]}
                  isToday={index === 0}
                  layout="vertical"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
