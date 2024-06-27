import React from "react";
import { Card } from "@mui/material";

interface SignupCardProps {
  children: React.ReactNode;
}
export default function SignupCard(props: SignupCardProps) {
  return (
    <Card sx={{ 
        display: 'flex',
        alignItems: 'center',
        padding: '0.625rem',
        borderRadius: '9999px',
        border: '1px solid #D1D5DB',
        backgroundColor: '#FFFFFF',
        color: '#111827' }}
    >
        {props.children}
    </Card>
  );
}