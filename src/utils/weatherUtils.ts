import { WeatherCodeInfo } from "@/types/weather";
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react";

export const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes (WW)
  switch (true) {
    // Clear sky
    case code === 0:
      return Sun;
    // Partly cloudy
    case code === 1 || code === 2:
      return CloudSun;
    // Cloudy, Overcast
    case code === 3:
      return Cloud;
    // Fog, Depositing rime fog
    case code >= 45 && code <= 49:
      return CloudFog;
    // Drizzle
    case code >= 50 && code <= 59:
      return CloudDrizzle;
    // Rain
    case code >= 60 && code <= 69:
      return CloudRain;
    // Snow
    case code >= 70 && code <= 79:
      return CloudSnow;
    // Thunderstorm
    case code >= 95 && code <= 99:
      return CloudLightning;
    default:
      return Cloud;
  }
};

export const getWeatherDescription = (code: number): WeatherCodeInfo => {
  // WMO Weather interpretation codes (WW)
  switch (true) {
    case code === 0:
      return { code, description: "Clear sky", icon: "sunny" };
    case code === 1:
      return { code, description: "Mainly clear", icon: "partly-cloudy" };
    case code === 2:
      return { code, description: "Partly cloudy", icon: "partly-cloudy" };
    case code === 3:
      return { code, description: "Overcast", icon: "cloudy" };
    case code === 45:
    case code === 48:
      return { code, description: "Fog", icon: "fog" };
    case code >= 51 && code <= 55:
      return { code, description: "Drizzle", icon: "rainy" };
    case code >= 56 && code <= 57:
      return { code, description: "Freezing Drizzle", icon: "rainy" };
    case code >= 61 && code <= 65:
      return { code, description: "Rain", icon: "rainy" };
    case code >= 66 && code <= 67:
      return { code, description: "Freezing Rain", icon: "rainy" };
    case code >= 71 && code <= 77:
      return { code, description: "Snow", icon: "snowy" };
    case code === 80:
    case code === 81:
    case code === 82:
      return { code, description: "Rain showers", icon: "rainy" };
    case code === 85:
    case code === 86:
      return { code, description: "Snow showers", icon: "snowy" };
    case code === 95:
      return { code, description: "Thunderstorm", icon: "stormy" };
    case code === 96:
    case code === 99:
      return { code, description: "Thunderstorm with hail", icon: "stormy" };
    default:
      return { code, description: "Unknown", icon: "cloudy" };
  }
};

export const getBackgroundClass = (weatherCode: number): string => {
  const hour = new Date().getHours();
  const isNightTime = hour < 6 || hour > 18; // Night time between 6PM and 6AM

  // Override with night background during night hours
  if (isNightTime) {
    return "weather-night";
  }

  // WMO Weather interpretation codes
  switch (true) {
    // Clear sky
    case weatherCode === 0:
      return "weather-clear";
    
    // Partly cloudy, Cloudy, Overcast
    case weatherCode >= 1 && weatherCode <= 3:
      return "weather-cloudy";
      
    // Fog
    case weatherCode >= 45 && weatherCode <= 49:
      return "weather-fog";
      
    // Drizzle, Rain
    case (weatherCode >= 50 && weatherCode <= 69) || 
         (weatherCode >= 80 && weatherCode <= 82):
      return "weather-rain";
      
    // Snow
    case (weatherCode >= 70 && weatherCode <= 79) || 
         (weatherCode >= 85 && weatherCode <= 86):
      return "weather-snow";
    
    // Thunderstorm
    case weatherCode >= 95 && weatherCode <= 99:
      return "weather-rain";
      
    default:
      return "weather-default";
  }
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
};
