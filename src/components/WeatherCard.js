import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from "react-icons/wi";
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01": <WiDaySunny size={50} />,
      "02": <WiCloudy size={50} />,
      "03": <WiCloudy size={50} />,
      "04": <WiCloudy size={50} />,
      "09": <WiRain size={50} />,
      10: <WiRain size={50} />,
      13: <WiSnow size={50} />,
    };
    return iconMap[iconCode.slice(0, 2)] || <WiDaySunny size={50} />;
  };

  return (
    <Card className="weather-card">
      <CardContent>
        <Box className="weather-header">
          {getWeatherIcon(data.icon)}
          <Typography variant="h5" component="div" className="weather-city">
            {data.city}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" className="weather-temperature">
          {data.temperature}°C
        </Typography>
        <Typography color="text.secondary" className="weather-description">
          {data.description}
        </Typography>
        <Box className="weather-details">
          <Typography variant="body2" className="weather-detail">
            Humidity: {data.humidity}%
          </Typography>
          <Typography variant="body2" className="weather-detail">
            Wind: {data.windSpeed} m/s
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
