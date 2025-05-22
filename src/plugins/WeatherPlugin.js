import BasePlugin from "./BasePlugin";
import axios from "axios";

class WeatherPlugin extends BasePlugin {
  constructor() {
    super("weather", "/weather");
    this.apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  }

  async process(city) {
    if (!this.apiKey) {
      throw new Error(
        "Weather API key not found. Please add REACT_APP_WEATHER_API_KEY to your .env file"
      );
    }

    if (!city || city.trim() === "") {
      throw new Error("Please provide a city name");
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${this.apiKey}&units=metric`;
      console.log("Making request to:", url); // Debug log

      const response = await axios.get(url);
      console.log("Response:", response.data); // Debug log

      return response.data;
    } catch (error) {
      console.error(
        "Weather API Error:",
        error.response?.data || error.message
      ); // Debug log

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          throw new Error(
            "Invalid API key. Please check your OpenWeatherMap API key."
          );
        } else if (error.response.status === 404) {
          throw new Error(
            `City "${city}" not found. Please check the spelling and try again.`
          );
        } else {
          throw new Error(
            `Weather API error: ${
              error.response.data.message || "Unknown error"
            }`
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          "No response from weather service. Please check your internet connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Error: ${error.message}`);
      }
    }
  }

  render(data) {
    return {
      type: "weather",
      content: {
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      },
    };
  }
}

export default new WeatherPlugin();
