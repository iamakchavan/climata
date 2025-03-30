
import { LocationData, WeatherData } from "@/types/weather";

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1";
const GEO_BASE_URL = "https://geocoding-api.open-meteo.com/v1";

export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    // Use both current, hourly and daily data to ensure the app works with both implementations
    const url = `${OPEN_METEO_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,snowfall,showers,precipitation,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const searchLocations = async (query: string): Promise<LocationData[]> => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  try {
    const url = `${GEO_BASE_URL}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};

export const reverseGeocode = async (latitude: number, longitude: number): Promise<LocationData | null> => {
  try {
    const url = `${GEO_BASE_URL}/search?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to reverse geocode");
    }
    
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    throw error;
  }
};
