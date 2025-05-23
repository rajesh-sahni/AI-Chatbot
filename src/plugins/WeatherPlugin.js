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

      const response = await axios.get(url);
      const data = response.data;

      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error(
            "Invalid API key. Please check your OpenWeatherMap API key."
          );
        } else if (error.response.status === 404) {
          throw new Error(
            `City "${city}" not found. Please check the spelling and try again.`
          );
        }
      }
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
  }

  render(data) {
    return {
      type: "weather",
      content: data,
    };
  }
}

const weatherPlugin = new WeatherPlugin();
export default weatherPlugin;
