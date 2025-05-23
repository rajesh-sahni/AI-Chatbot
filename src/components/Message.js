import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import WeatherCard from "./WeatherCard";
import CalculatorCard from "./CalculatorCard";
import DictionaryCard from "./DictionaryCard";
import "./Message.css";

const Message = ({ message, isUser }) => {
  const renderContent = () => {
    if (message.type === "text") {
      return (
        <Typography variant="body1" className="message-content">
          {message.content}
        </Typography>
      );
    }

    if (message.type === "plugin" && message.pluginData) {
      switch (message.pluginData.type) {
        case "weather":
          return <WeatherCard data={message.pluginData.content} />;
        case "calculator":
          return <CalculatorCard data={message.pluginData.content} />;
        case "dictionary":
          return <DictionaryCard data={message.pluginData.content} />;
        default:
          return (
            <Typography variant="body1" className="message-content">
              {message.content}
            </Typography>
          );
      }
    }

    return (
      <Typography variant="body1" className="message-content">
        {message.content}
      </Typography>
    );
  };

  return (
    <Box className={`message-container ${isUser ? "user" : "assistant"}`}>
      <Paper className={`message-paper ${isUser ? "user" : "assistant"}`}>
        {renderContent()}
        <Typography variant="caption" className="message-timestamp">
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Message;
