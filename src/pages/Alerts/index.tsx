import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import ArrowForward from '@mui/icons-material/ArrowForward';

import Layout from '../../components/Layout';
import { pageHeaderStyle, pageSubHeaderStyle } from '../../default/theme';
import EventAlertAvatar from '../../assets/images/EventAlertAvatar';
import CloclIcon from '../../assets/images/ClockIcon';
import AlertCard from '../../components/AlertCard';

const AlertsPage = () => {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Layout title='Alerts'>
          <Typography
            sx={pageHeaderStyle}
          >
            Explore Alerts
          </Typography>
          <Typography
            sx={pageSubHeaderStyle}
          >
            A list of all the alerts set up
          </Typography>
          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                ...pageHeaderStyle,
                marginTop: '40px',
              }}
            >
              Event based alerts
            </Typography>
            <Button
              color='info'
              endIcon={<ArrowForward />}
            >
              Browse all
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '40px' }}>
            <AlertCard Icon={EventAlertAvatar} name='TBD' description='Show me all the PRs that have not been reviewed in the last 4 hours' />
            <AlertCard Icon={EventAlertAvatar} name='TBD' description='Show me all the bugs that are P1 and have not been updated in the last 24 hours' />
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                ...pageHeaderStyle,
                marginTop: '40px',
              }}
            >
              Event based alerts
            </Typography>
            <Button
              color='info'
              endIcon={<ArrowForward />}
            >
              Browse all
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '40px' }}>
            <AlertCard Icon={CloclIcon} name='Every day at 6PM' description='Show me a summary of all the PRs that were merged today' />
            <AlertCard Icon={CloclIcon} name='Every day at 9AM' description='Show me a summary of my team’s plan for today' />
          </Box>
        </Layout>
      </Box>
    </div>
  );
}

export default AlertsPage;
