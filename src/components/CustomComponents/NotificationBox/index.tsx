import React from "react";
import { Box } from "@mui/system";

interface OverflowBoxProps {
  children: React.ReactNode;
}

export function OverflowBox(props: OverflowBoxProps) {
  return (
    <Box sx={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 400px)',
        scrollbarWidth: 'none',
      }}>
        {props.children}
    </Box>
  );
}

interface BoxProps {
  children: React.ReactNode;
}

export function MainBox(props: BoxProps) {
  return (
    <Box sx={{
        width:'824px',
        paddingTop: '4rem',
      }}>
        {props.children}
    </Box>
  );
}

interface ButtonPositionBoxProps {
  children: React.ReactNode;
}

export function ButtonPositionBox(props: ButtonPositionBoxProps) {
  return (
    <Box sx={{
        position: 'absolute',
        right: '12rem',
        bottom: '4rem',
      }}>
        {props.children}
    </Box>
  );
}