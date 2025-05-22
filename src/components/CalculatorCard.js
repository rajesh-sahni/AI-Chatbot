import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { FaCalculator } from "react-icons/fa";

const CalculatorCard = ({ data }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FaCalculator size={24} />
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            Calculator Result
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Expression: {data.expression}
        </Typography>
        <Typography variant="h5" color="primary">
          = {data.result}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CalculatorCard;
