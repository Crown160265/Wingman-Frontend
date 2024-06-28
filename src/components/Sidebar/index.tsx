import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChatIcon from '@mui/icons-material/Textsms';
import IconButton from '@mui/material/IconButton';
import CommandIcon from '@mui/icons-material/KeyboardCommandKey';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import BookIcon from '@mui/icons-material/Book';
import ClockIcon from '@mui/icons-material/Schedule';
import DotsIcon from '@mui/icons-material/Apps';
import LinkIcon from '@mui/icons-material/Mediation';

import { drawerWidth } from '../../default/theme';
import { Conversation } from '../../default/types';
import { useUser } from '../../context/UserContext';

const icons = [
  <ChatIcon />,
  <BookIcon />,
  <ClockIcon />,
  <DotsIcon />,
  <LinkIcon />
];

const links = [
  '/',
  '/library',
  '/alerts',
  '/integrations',
  '/organization',
];

interface SidebarProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  conversationsList: Conversation[];
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar: React.FC<SidebarProps> = ({ setOpen, open, conversationsList }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { user } = useUser();
  

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <Drawer variant="permanent" open={open} sx={{padding: '24px'}}>
        <DrawerHeader sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', marginLeft: '20px', marginTop: '24px' }}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.firstName[0]}</Avatar>
            <Typography 
              variant="body1" 
              sx={{ 
                marginTop:'5px', 
                marginLeft: '8px', 
                fontWeight: 600, 
                width: '150px',
                overflow: 'hidden'
              }} 
              component="div"
            >
              {user?.firstName}
            </Typography>
            <IconButton sx={{ marginLeft: '5px' }} >
              <SettingsIcon color='secondary' />
            </IconButton>

            <IconButton onClick={handleDrawerClose}  >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          </Box>
          
          {/* {open && <SearchInput />} */}
        </DrawerHeader>
        <List sx={{ marginTop: '20px' }}>
          {['Chats', 'Library', 'Alerts', 'Integration', 'Organization'].map((text, index) => (
            <ListItem 
              key={text} 
              disablePadding 
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  marginRight: '15px',
                  marginLeft: '15px',
                  "&.Mui-selected": {
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    color: 'primary.dark',
                    boxShadow: '0px 1px 3px 0px rgba(25, 33, 61, 0.10)'
                  },
                }}
                selected={links.includes(pathname) ? pathname === links[index] : links[index] === '/'}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icons[index]}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Link to={links[index]}>
                      {<Typography color={`${pathname === links[index] ? 'primary.dark' : 'secondary' }`}>
                        {text}
                      </Typography>}
                    </Link>} 
                  sx={{ opacity: open ? 1 : 0 }} 
                />
                {open && <Box sx={{ 
                  backgroundColor: '#F7F8FA', 
                  display: 'flex',
                  padding: '6px',
                  borderRadius: '4px',
                  boxShadow: '0px 1px 3px 0px rgba(25, 33, 61, 0.10);'
                }}>
                  <CommandIcon sx={{ height: '22px', width: '22px', paddingTop: '3px' }} />
                  <Typography variant="body1" sx={{ marginLeft: '2px', paddingTop: '1px' }} component="div">
                    {index+1}
                  </Typography>
                </Box>}
              </ListItemButton> 
            </ListItem>
          ))}
        </List>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          marginLeft: '16px',
          marginBottom: '24px',
          height: '57%',
          overflowY: 'auto',
          overflowX: 'hidden',
          }}>
        <List>
          {open && 
          <Typography 
            variant="body2" 
            sx={{ 
              marginLeft: '16px', 
              marginTop: '24px', 
              marginBottom: '12px',
              color: '#BAC0CC',
              fontSize: '12px',
              lineHeight: '130%',
              letterSpacing: '1.2px',
            }} 
            component="div"
          >
            PINNED
          </Typography>}
         
          {conversationsList
            // TODO: uncomment when we have page for all chats
            //.slice(Math.max(conversationsList.length - 5, 0))
            .map((converstation, index) => (
            <ListItem 
              key={converstation.id} 
              disablePadding 
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  marginRight: '15px',
                  "&.Mui-selected": {
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    color: 'primary.dark'
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Link to={`/conversation/${converstation.id}`}>
                    {/* <Link to={`/onboarding/report`}> */}

                      <Tooltip 
                        title={converstation.name} 
                        placement='right' 
                        arrow  
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, 15],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        {
                          <Typography 
                            color='secondary'
                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {converstation.name}
                          </Typography>}
                      </Tooltip>
                    </Link>} 
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Box>
        {open && <Button color='info' variant='contained' sx={{ margin: 'auto 24px  24px 24px' }}>
          <Link to='/'>
            + New Chat
          </Link>
        </Button>}
      </Drawer>
  );
};

export default Sidebar;