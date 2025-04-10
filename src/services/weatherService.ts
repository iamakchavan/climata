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
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
    
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Climata Weather App'
      }
    });
    
    if (!response.ok) {
      throw new Error("Failed to reverse geocode");
    }
    
    const data = await response.json();
    
    if (data.address) {
      // Try to get the most specific location name possible
      let locationName = data.address.city || 
                        data.address.town || 
                        data.address.village || 
                        data.address.suburb ||
                        data.address.neighbourhood ||
                        data.address.county ||
                        data.address.state ||
                        data.address.country;

      // If we have multiple parts, combine them for better context
      if (data.address.city || data.address.town || data.address.village) {
        if (data.address.state) {
          locationName = `${locationName}, ${data.address.state}`;
        } else if (data.address.country) {
          locationName = `${locationName}, ${data.address.country}`;
        }
      }

      return {
        id: Date.now(),
        name: locationName,
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
        country: data.address.country,
        admin1: data.address.state
      };
    }
    
    // If we still don't have a location name, try a second API call with different parameters
    const backupUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
    const backupResponse = await fetch(backupUrl, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Climata Weather App'
      }
    });
    
    if (backupResponse.ok) {
      const backupData = await backupResponse.json();
      if (backupData.address) {
        const locationName = backupData.address.state || 
                           backupData.address.country || 
                           `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
        
        return {
          id: Date.now(),
          name: locationName,
          latitude: parseFloat(backupData.lat),
          longitude: parseFloat(backupData.lon),
          country: backupData.address.country,
          admin1: backupData.address.state
        };
      }
    }
    
    // If all else fails, use coordinates as the name
    return {
      id: Date.now(),
      name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
      latitude,
      longitude
    };
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    throw error;
  }
};
