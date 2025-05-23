import React from "react";
import ReactMarkdown from "react-markdown";
import { Paper, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "./RichTextMessage.css";

const RichTextMessage = ({ content, isUser }) => {
  return (
    <Paper
      elevation={1}
      className={`rich-text-message ${isUser ? "user" : "assistant"}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p: ({ children }) => (
            <Typography variant="body1" component="p">
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography variant="h4" component="h1">
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" component="h2">
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" component="h3">
              {children}
            </Typography>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Paper>
  );
};

export default RichTextMessage;
