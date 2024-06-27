import React from 'react';
import { Typography } from '@mui/material';

interface CardTypographyProps {
  children: React.ReactNode;
}

export function CardTypography(props: CardTypographyProps) {
  return (
    <Typography component={'div'}
      sx={{
        color: 'rgb(55 65 81)',
        fontFamily: 'Inter-Regular',
        fontSize: '14px',
        fontWeight: '400',
        padding: '0.6rem',
      }}
    >
      {props.children}
    </Typography>
  );
}

interface DesTypographyProps {
  children: React.ReactNode;
}

export function DesTypography(props: DesTypographyProps) {
  return (
    <Typography component={'div'}
      sx={{
        color: '#718096',
        fontFamily: 'Mulish-SemiBold',
        fontSize: '15px',
        paddingBottom: '2rem',
      }}
    >
      {props.children}
    </Typography>
  );
}

interface HelloTypographyProps {
  children: React.ReactNode;
}
export function HelloTypography(props: HelloTypographyProps) {
  return (
    <Typography component={'div'}
      sx={{
        color: '#718096',
        fontFamily: 'Inter-Regular',
        fontSize: '22px',
        fontWeight: '600',
        paddingBottom: '2rem',
      }}
    >
      {props.children}
    </Typography>
  );
}

interface SectionTitleTypographyProps {
  children: React.ReactNode;
}

export function SectionTitleTypography(props: SectionTitleTypographyProps) {
  return (
    <Typography component={'div'}
      sx={{
        color: '#565A97',
        fontFamily: 'Mulish-SemiBold',
        fontSize: '18px',
        fontWeight: '400',
        padding: '20px',
      }}
    >
      {props.children}
    </Typography>
  );
}

interface TitleTypographyProps {
  children: React.ReactNode;
}

export function TitleTypography(props: TitleTypographyProps) {
  return (
    <Typography component={'div'}
      sx={{
        fontFamily: 'Mulish-Regular',
        fontSize: '30px',
        fontWeight: '600',
        backgroundClip: 'text',
        color: 'transparent',
        backgroundImage: 'linear-gradient(to right, #565A97, #FF7BAC)',
      }}
    >
      {props.children}
    </Typography>
  );
}