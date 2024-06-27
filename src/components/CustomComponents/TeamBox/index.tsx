import { Box } from "@mui/system";
import React from "react";

interface TeamSectionTitleBoxProps {
  children: React.ReactNode;
}

export function TeamSectionTitleBox(props: TeamSectionTitleBoxProps) {
  return (
    <Box sx={{
      display:'flex', 
      justifyContent:'center',
      alignItems: 'center',
    }}>
        {props.children}
    </Box>
  );
}

interface TeamSectionBoxProps {
  children: React.ReactNode;
  sx?:React.CSSProperties;
}

export function TeamSectionBox(props: TeamSectionBoxProps) {
  const {sx} = props;
  return (
    <Box sx={{
      display:'flex', 
      justifyContent:'left',
      alignItems: 'center',
      ...sx,
    }}>
        {props.children}
    </Box>
  );
}
interface BoxProps {
  children: React.ReactNode;
}
export function TeamMainBox(props: BoxProps) {
  return (
    <Box sx={{
        // width:'824px',
        paddingLeft:'12rem',
        paddingRight: '12rem',
        paddingTop: '4rem',
      }}>
        {props.children}
    </Box>
  );
}