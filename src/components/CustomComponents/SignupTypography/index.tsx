import React from "react";
import { Typography } from "@mui/material";

interface LeftTitleTypographyProps {
  children: React.ReactNode;
}

export function LeftTitleTypography(props: LeftTitleTypographyProps) {
    return (
      <Typography component={'div'} sx={{fontSize: '2.441rem', fontWeight: 'normal', color: '#111827', marginBottom: '2px'}}>
          {props.children}
      </Typography>
    );
}

interface LeftDesTypographyProps {
  children: React.ReactNode;
}
export function LeftDesTypography(props: LeftDesTypographyProps) {
    return (
      <Typography component={'div'} sx={{fontSize: '1rem', color: '#9CA3AF', marginBottom: '6px', paddingBottom: '2rem' }}>
          {props.children}
      </Typography>
    );
}
interface SocialTypographyProps {
  children: React.ReactNode;
}

export function SocialTypography(props: SocialTypographyProps) {
    return (
      <Typography component={'div'} sx={{ fontSize: '0.875rem', fontWeight: '600' }}>
          {props.children}
      </Typography>
    );
}

interface EmailTypographyProps {
  children: React.ReactNode;
}

export function EmailTypography(props: EmailTypographyProps) {
    return (
      <Typography component={'div'} sx={{ fontSize: '0.875rem', color: '#4B5563', marginTop: '1.5rem', display:'inline' }}>
          {props.children}
      </Typography>
    );
}

interface LinkEmailTypographyProps {
  children: React.ReactNode;
}

export function LinkEmailTypography(props: LinkEmailTypographyProps) {
    return (
      <Typography component={'div'} sx={{ fontSize: '0.875rem', color: '#6f42c1', marginLeft: '0.25rem', display:'inline' }}>
          {props.children}
      </Typography>
    );
}

interface RightTypographyProps {
  children: React.ReactNode;
  sx?: React.CSSProperties;
}
export function RightTypography(props: RightTypographyProps) {
    const {sx} = props;
    return (
      <Typography component={'div'} sx={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'light',
        color: 'transparent',
        backgroundImage: 'linear-gradient(to bottom right, #ff38ca, #005eff)',
        WebkitBackgroundClip: 'text',
        ...sx,
      }} 
      >
          {props.children}
      </Typography>
    );
}
