import { Box } from "@mui/system";
import React from "react";

interface SignupMainBoxProps {
  children: React.ReactNode;
}

export function SignupMainBox(props: SignupMainBoxProps) {
  return (
    <Box sx = {{
        bgcolor: 'white',
        display: 'flex', 
        height:'100vh', 
        fontFamily:'Mulish-Regular',
    }}>
        {props.children}
    </Box>
  );
}

interface LogoBoxProps {
  children: React.ReactNode;
}

export function LogoBox(props: LogoBoxProps) {
    return (
      <Box  sx = {{position:'absolute', paddingLeft:'7rem', paddingRight:'28px', paddingTop:'10px', paddingBottom:'10px'}}>
          {props.children}
      </Box>
    );
}

interface LeftBoxProps {
  children: React.ReactNode;
}

export function LeftBox(props: LeftBoxProps) {
    return (
      <Box sx = {{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        paddingLeft: '8rem', 
        margin: '1rem',
        marginBottom: '20px',
        }}>
          {props.children}
      </Box>
    );
}

interface RightBoxProps {
  children: React.ReactNode;
}

export function RightBox(props:RightBoxProps) {
    return (
      <Box sx = {{
        flex: 1,
        backgroundImage: 'linear-gradient(to right, rgb(219 234 254), rgb(253 244 255))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px',
        borderRadius: '20px',
        margin: '1rem',
      }}>
          {props.children}
      </Box>
    );
}

interface ButtonBoxProps {
  children: React.ReactNode;
}

export function ButtonsBox(props:ButtonBoxProps) {
    return (
      <Box sx = {{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
          {props.children}
      </Box>
    );
}

interface RightMiddleBoxProps {
  children: React.ReactNode;
}

export function RightMiddleBox(props: RightMiddleBoxProps) {
    return (
      <Box sx={{ display: 'flex', gap: '2rem' }}>
          {props.children}
      </Box>
    );
}
