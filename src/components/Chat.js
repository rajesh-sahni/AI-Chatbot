import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Paper, Typography } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";
import RichTextMessage from "../features/RichTextMessage";
import MessageStatus from "../features/MessageStatus";
import TypingIndicator from "../features/TypingIndicator";
import naturalLanguageProcessor from "../features/NaturalLanguageProcessor";
import { usePlugins } from "../features/DynamicPluginLoader";
import weatherPlugin from "../plugins/WeatherPlugin";
import calculatorPlugin from "../plugins/CalculatorPlugin";
import dictionaryPlugin from "../plugins/DictionaryPlugin";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);
  const messagesEndRef = useRef(null);
  const { plugins, registerPlugin } = usePlugins();
  const isProcessingRef = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Register default plugins
    try {
      registerPlugin(weatherPlugin);
      registerPlugin(calculatorPlugin);
      registerPlugin(dictionaryPlugin);
    } catch (error) {
      console.error("Error registering plugins:", error);
    }

    // Load messages from localStorage
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateTyping = async (callback) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setIsTyping(true);
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000)
      );
      await callback();
    } finally {
      setIsTyping(false);
      isProcessingRef.current = false;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessingRef.current) return;

    const userMessage = {
      id: uuidv4(),
      sender: "user",
      content: input,
      type: "text",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setMessageStatus({ status: "loading" });

    try {
      // Try natural language processing first
      const nlResult = naturalLanguageProcessor.processInput(input);
      const command = nlResult ? nlResult.fullCommand : input;

      const plugin = plugins.find((p) => command.startsWith(`/${p.name}`));

      if (plugin) {
        await simulateTyping(async () => {
          try {
            const result = await plugin.execute(command);
            const pluginMessage = {
              id: uuidv4(),
              sender: "assistant",
              content: result,
              type: "plugin",
              pluginData: plugin.render(result),
              timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, pluginMessage]);
            setMessageStatus(null);
          } catch (error) {
            // Add an error message to the chat
            const errorMessage = {
              id: uuidv4(),
              sender: "assistant",
              content: error.message || "An error occurred.",
              type: "text",
              timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            setMessageStatus({ status: "error", error: error.message });
          }
        });
      } else {
        await simulateTyping(() => {
          const assistantMessage = {
            id: uuidv4(),
            sender: "assistant",
            content:
              "I'm sorry, I don't understand that command. Try using natural language or commands like /weather, /calc, or /define.",
            type: "text",
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setMessageStatus(null);
        });
      }
    } catch (error) {
      setMessageStatus({ status: "error", error: error.message });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box className="chat-wrapper">
      <Paper className="chat-header" elevation={3}>
        <Typography variant="h5" className="chat-header-title">
          AI Chatbot
        </Typography>
      </Paper>
      <Box className="chat-container">
        <Box className="chat-messages-container">
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              {message.type === "text" ? (
                <Box
                  className={`message-container ${
                    message.sender === "user" ? "user" : "assistant"
                  }`}
                >
                  <RichTextMessage
                    content={message.content}
                    isUser={message.sender === "user"}
                  />
                </Box>
              ) : (
                <Message message={message} isUser={message.sender === "user"} />
              )}
            </React.Fragment>
          ))}
          {messageStatus && <MessageStatus {...messageStatus} />}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </Box>

        <Paper className="chat-input-container" elevation={3}>
          <Box className="chat-input-wrapper">
            <TextField
              className="chat-input"
              fullWidth
              variant="outlined"
              placeholder="Type a message or use natural language (e.g., /calc, /define, /weather)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              disabled={isProcessingRef.current}
            />
            <IconButton
              className="chat-send-button"
              onClick={handleSend}
              disabled={isProcessingRef.current}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat;
