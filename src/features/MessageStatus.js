import React from "react";
import { CircularProgress, Alert, Box } from "@mui/material";
import "./MessageStatus.css";

const MessageStatus = ({ status, error }) => {
  if (status === "loading") {
    return (
      <Box className="message-status-container">
        <CircularProgress size={20} />
        <span>Processing...</span>
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Alert severity="error" className="message-status-error">
        {error || "An error occurred while processing your request."}
      </Alert>
    );
  }

  return null;
};

export default MessageStatus;
