import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ButtonPositionBox } from '../../components/CustomComponents/NotificationBox';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';

import AppCard from '../../components/AppCard';
import { appTexts } from '../../default/appTexts';
import { pageHeaderStyle, pageSubHeaderStyle } from '../../default/theme';
import { 
  getCommunicationManagementIntegration,
  getSoftwareManagementIntegration,
  getProjectManagementIntegration,
} from '../../services/api';

const IntegrationsPage = () => {

  const checkIntegrationFunctions = [
    getProjectManagementIntegration,
    getSoftwareManagementIntegration,
    getCommunicationManagementIntegration,
  ];

  const navigate = useNavigate();
  const [isOneConnected, setIsOneConnected] = useState(false);

  const handleIntegrations = async () => {
      console.log("isOneConnected: ", isOneConnected);
      if(isOneConnected === true) {
        navigate('/onboarding/report')
      };
  };

  return (
    <div className='mainlayout'>
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <CssBaseline />
        <Box
          sx={{ 
            width: '1134px',
            borderRadius: '0 0 16px 16px',
            padding: '40px 100px 40px 100px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}>
          <Typography 
            sx={pageHeaderStyle}
          >
            Explore Integrations
          </Typography>
          <Typography 
            sx={pageSubHeaderStyle}
          >
            Connect and disconnect any platform
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '40px' }}>
            {
              appTexts.map((app, index) => {
                return <AppCard 
                  key={index} 
                  index={index}
                  name={app.name} 
                  description={app.description} 
                  link={app.integrationLink} 
                  checkIntegration={checkIntegrationFunctions[index]}
                  isOneConnected={isOneConnected}
                  setIsOneConnected={setIsOneConnected}
                />
              })
            }
          </Box>
        </Box>
        <ButtonPositionBox>
          <Button sx={{ 
            display: 'flex',
            alignItems:'center',
            color: '#ffffff',
            backgroundColor:'#3B82F6',
            paddingY: '0.5rem',
            paddingX: '1.5rem',
            ':hover': {
                backgroundColor : '#0B82F6',
            }
            }}
            variant='contained'
            color='info'
            onClick={handleIntegrations}
            >
            Next
          </Button>
        </ButtonPositionBox>
      </Box>
    </div>
  );
}

export default IntegrationsPage;