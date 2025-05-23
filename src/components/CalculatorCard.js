import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CalculatorCard = ({ data }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Calculation Result
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Expression: {data.expression}
        </Typography>
        <Typography variant="h4" sx={{ mt: 2 }}>
          = {data.result}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CalculatorCard;
