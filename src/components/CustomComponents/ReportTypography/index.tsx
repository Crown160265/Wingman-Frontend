import React from 'react';
import { Typography } from '@mui/material';


interface TeamSectionTitleTypographyProps {
  children? : React.ReactNode;
  sx? : React.CSSProperties;
}

export function ReportTypography(props: TeamSectionTitleTypographyProps) {
  const { sx } = props;
  return (
    <Typography component={'div'}
      sx={{
        lineHeight: '200%', 
        fontSize: '14px',
        marginLeft:'40px',
        marginBottom: '8px',
        ...sx,
      }}
    >
      {props.children}
    </Typography>
  );
}
