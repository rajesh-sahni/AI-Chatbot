import React from "react";
import { Box, Typography } from "@mui/material";
import "./TypingIndicator.css";

const TypingIndicator = () => {
  return (
    <Box className="typing-indicator-container">
      <Typography variant="body2" color="text.secondary">
        AI is typing
      </Typography>
      <Box className="typing-indicator-dots">
        <div />
        <div />
        <div />
      </Box>
    </Box>
  );
};

export default TypingIndicator;
