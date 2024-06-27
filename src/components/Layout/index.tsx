import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';

import { drawerWidth } from '../../default/theme';
import Sidebar from '../../components/Sidebar';
import { getConversations } from '../../services/api';
import { Conversation } from '../../default/types';
import { useUser } from '../../context/UserContext';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
}


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth+10,
    width: `calc(100% - ${drawerWidth+10}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Layout: React.FC<LayoutProps>  = ({ title, children, containerRef }) => {
  const [open, setOpen] = React.useState(true);
  const [conversationsList, setConversationsList] = useState<Conversation[]>([]);
  const { user, logoutUser } = useUser();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if(!user) return;
        const response = await getConversations(user.id);
        setConversationsList(response);
      } catch (error) {
        console.error('Failed to fetch conversations', error);
      }
    };
    fetchConversations();
  }, [user]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('organizationId');
    localStorage.removeItem('lastName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    localStorage.setItem('isAuth','false');
  }

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              marginLeft: 0,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Chats
          </Typography>
          <IconButton
            color='secondary'
            aria-label="logout"
            edge="end"
            onClick={handleLogout}
            sx={{
              marginLeft: 5,
              marginRight: 0,
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} setOpen={setOpen} conversationsList={conversationsList} />
      <Box 
        ref={containerRef}
        component="main" 
        sx={{ 
          mt: 8,
          width: '100%',
          height: '94vh',
          bgcolor: 'primary.main',
          borderRadius: '0 0 16px 16px',
          padding: '40px 100px 40px 100px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
       >
        {children}
      </Box>
    </>
  );
}

export default Layout;
