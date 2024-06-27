import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: `"Inter", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
   },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          backgroundColor: '#F7F8FA',
          border: 'none',
        },
      },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '16px 16px 0 0 ',
            boxShadow: 'none',
            right: '10px',
            borderBottom: '1px solid #E5E5E5',
            marginTop: '10px',
          },
        },
      },
  },
  palette: {
    text: {
      primary: '#000',
      secondary: '#666F8D',
    },
    primary: {
      main: '#fff',
      dark: '#19213D',
      light: '#F7F8FA',
    },
    secondary: {
      main: '#666F8D',
      light: '#BAC0CC'
    },
    info: {
      main: '#3F92FF',
    },
    background: {
      default: "lightgray",
    }
  },
});

export const agentChatCardStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '40px',
  width: '90%',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)',
  border: '1px solid #F0F2F5',
  // height: '100%',
  overflow: 'visible'
}

export const pageHeaderStyle = {
  fontSize: '22px',
  fontWeight: 500,
  lineHeight: '130%',
  marginBottom: '6px'
}

export const pageSubHeaderStyle = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '150%',
  marginBottom: '40px',
  color: 'text.secondary'
}

export const appCardStyle = {
  display: 'flex',
  padding: '24px 16px',
  marginRight: '20px',
  marginBottom: '20px',
  width: '360px',
  height: '235px',
  border: '1px solid #F0F2F5',
  borderRadius: '10px',
  boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08);',
  backgroundColor: 'primary.main'
}

export const emptyPageLoaderStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export const drawerWidth = 296;
