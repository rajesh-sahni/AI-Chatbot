import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Paper, Typography } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";
import pluginManager from "../plugins/PluginManager";
import weatherPlugin from "../plugins/WeatherPlugin";
import calculatorPlugin from "../plugins/CalculatorPlugin";
import dictionaryPlugin from "../plugins/DictionaryPlugin";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check API key status
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    console.log("Weather API Key Status:", apiKey ? "Present" : "Missing");

    // Register plugins
    pluginManager.registerPlugin(weatherPlugin);
    pluginManager.registerPlugin(calculatorPlugin);
    pluginManager.registerPlugin(dictionaryPlugin);

    // Load messages from localStorage
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: uuidv4(),
      sender: "user",
      content: input,
      type: "text",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const plugin = pluginManager.getPluginForCommand(input);
      if (plugin) {
        const result = await plugin.execute(input);
        const pluginMessage = {
          id: uuidv4(),
          sender: "assistant",
          content: input,
          type: "plugin",
          pluginData: plugin.render(result),
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, pluginMessage]);
      } else {
        // Handle natural language input (bonus feature)
        const assistantMessage = {
          id: uuidv4(),
          sender: "assistant",
          content:
            "I'm sorry, I don't understand that command. Try using /weather, /calc, or /define followed by your query.",
          type: "text",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: uuidv4(),
        sender: "assistant",
        content: `Error: ${error.message}`,
        type: "text",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box className="chat-container">
      <Paper
        className="chat-header"
        elevation={3}
        sx={{
          background: "linear-gradient(to right, #1a237e, #0d47a1, #1976d2)",
          backgroundSize: "200% 200%",
          animation: "gradient 15s ease infinite",
        }}
      >
        <Typography
          variant="h5"
          className="chat-header-title"
          sx={{ color: "white" }}
        >
          AI Chatbot
        </Typography>
      </Paper>

      <Box className="chat-messages-container">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Paper className="chat-input-container" elevation={3}>
        <Box className="chat-input-wrapper">
          <TextField
            className="chat-input"
            fullWidth
            variant="outlined"
            placeholder="Type a message or use /weather, /calc, or /define..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            InputProps={{
              style: {
                borderRadius: "24px",
                backgroundColor: "#f8f9fa",
                border: "2px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 16px",
                letterSpacing: "0.3px",
              },
            }}
          />
          <IconButton
            className="chat-send-button"
            onClick={handleSend}
            sx={{
              background: "linear-gradient(45deg, #1976d2, #2196f3)",
              color: "white",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #1976d2)",
                transform: "translateY(-2px) scale(1.05)",
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            <SendIcon
              sx={{ fontSize: "1.1rem", display: "flex", alignItems: "center" }}
            />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
