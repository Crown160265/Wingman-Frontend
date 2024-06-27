import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import JiraAvatar from '../../assets/images/JiraAvatar.svg';
import GitHubAvatar from '../../assets/images/GitHubAvatar.svg';
import SlackAvatar from '../../assets/images/SlackAvatar.svg';
import AppAvatar from '../../assets/images/AppAvatar.svg';
import { appCardStyle } from '../../default/theme';
import { useUser } from '../../context/UserContext';
interface AppProps {
  index: number;
  name: string;
  description: string;
  link: string;
  checkIntegration: (organizationId: string) => Promise<any>;
  isOneConnected: boolean;
  setIsOneConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const buttonStyle = {
  marginTop: 'auto',
  borderRadius: '8px',
  fontSize: '12px',
}

const AvatarList = [JiraAvatar, GitHubAvatar, SlackAvatar, AppAvatar];

const AppCard: React.FC<AppProps> = ({ index, name, description, link, checkIntegration, isOneConnected, setIsOneConnected }) => {

  const [isConnected, setIsConnected] = useState(false);
  const { user } = useUser();

  const onConnectClick = () => {
    window.open(link, "_blank", "noreferrer")
  }

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        if (!user) return;
        const response = await checkIntegration(user.organizationId);
        if(response.length > 0){setIsConnected(true); setIsOneConnected(true);}
      } catch (error) {
        setIsConnected(false);
      }
    }
    fetchIntegrations();
  }, [checkIntegration, user]);

  return (
    <Card sx={appCardStyle}>
      <img src={AvatarList[index]} alt='Avatar' width='42px' height='42px' />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
        <Box sx={{
          display: 'flex',
        }}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '130%',
            }}
            component="div"
          >
            {name}
          </Typography>
          {isConnected && <CheckCircleIcon
            sx={{
              color: '#4AD562',
              widht: '16px',
              height: '16px',
              marginLeft: '40px'
            }}
          />}
        </Box>
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '150%',
            fontWeight: 400,
            marginTop: '10px'
          }}
          color='secondary'
          component="div"
        >
          {description}
        </Typography>
        
        {
        isConnected && link.length !==0 && <Button
            variant="contained"
            sx={{
              ...buttonStyle,
              width: '144px',
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }}
            startIcon={<SettingsIcon />}
          >
            Disconnect
          </Button>
          }
          {!isConnected && link.length !==0 &&
           <Button
            variant="contained"
            sx={{
              ...buttonStyle,
              width: '104px',
              backgroundColor: 'info.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
            startIcon={<SettingsIcon />}
            onClick={onConnectClick}
          >
            Connect
          </Button>
        }
      </Box>
    </Card>
  );
}

export default AppCard;