
import { Search } from "lucide-react";

const WeatherPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl shadow-sm text-center">
      <Search size={64} className="text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-600 mb-2">Search for a Location</h2>
      <p className="text-gray-500 max-w-md">
        Enter a city name to get the current weather and forecast information.
      </p>
    </div>
  );
};

export default WeatherPlaceholder;
