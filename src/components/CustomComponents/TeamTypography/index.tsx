import React from 'react';
import { Typography } from '@mui/material';


interface TeamSectionTitleTypographyProps {
  children? : React.ReactNode;
  sx? : React.CSSProperties;
}

export function TeamSectionTitleTypography(props: TeamSectionTitleTypographyProps) {
  const { sx } = props;
  return (
    <Typography component={'div'}
      sx={{
        fontFamily: 'Inter-Regular',
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '24px',
        ...sx,
      }}
    >
      {props.children}
    </Typography>
  );
}
