import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const WeatherCard = ({ data }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weather in {data.city}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
            style={{ width: 50, height: 50 }}
          />
          <Box>
            <Typography variant="h4">{data.temperature}°C</Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Humidity: {data.humidity}%</Typography>
          <Typography variant="body2">
            Wind Speed: {data.windSpeed} m/s
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
