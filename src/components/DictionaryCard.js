import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { FaBook } from "react-icons/fa";
import "./DictionaryCard.css";

const DictionaryCard = ({ data }) => {
  return (
    <Card className="dictionary-card">
      <CardContent>
        <Box className="dictionary-header">
          <FaBook size={24} className="dictionary-icon" />
          <Typography variant="h5" component="div" className="dictionary-word">
            {data.word}
          </Typography>
          {data.phonetic && (
            <Typography variant="subtitle1" className="dictionary-phonetic">
              {data.phonetic}
            </Typography>
          )}
        </Box>
        {data.meanings.map((meaning, index) => (
          <Box key={index} className="dictionary-meaning">
            <Typography
              variant="subtitle1"
              className="dictionary-part-of-speech"
            >
              {meaning.partOfSpeech}
            </Typography>
            {meaning.definitions.map((def, defIndex) => (
              <Box key={defIndex}>
                <Typography variant="body1" className="dictionary-definition">
                  {def.definition}
                </Typography>
                {def.example && (
                  <Typography variant="body2" className="dictionary-example">
                    Example: "{def.example}"
                  </Typography>
                )}
              </Box>
            ))}
            {index < data.meanings.length - 1 && (
              <Divider className="dictionary-divider" />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default DictionaryCard;
