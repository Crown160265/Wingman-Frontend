import React from "react";
import { Box } from "@mui/system";

interface AppBoxProps {
    children: React.ReactNode;
}
export function AppBox(props: AppBoxProps) {
    return (
      <Box sx={{
          minWidth: '1400px',
        }}>
          {props.children}
      </Box>
    );
  }