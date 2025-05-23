import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./DictionaryCard.css";

const DictionaryCard = ({ data }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {data.word}
          {data.phonetic && (
            <Typography
              component="span"
              variant="subtitle1"
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              {data.phonetic}
            </Typography>
          )}
        </Typography>
        {data.meanings.map((meaning, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontStyle: "italic" }}
            >
              {meaning.partOfSpeech}
            </Typography>
            {meaning.definitions.map((def, defIndex) => (
              <Box key={defIndex} sx={{ mt: 1 }}>
                <Typography variant="body1">
                  {defIndex + 1}. {def.definition}
                </Typography>
                {def.example && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, ml: 2 }}
                  >
                    Example: {def.example}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default DictionaryCard;
