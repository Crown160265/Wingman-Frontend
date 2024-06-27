import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import SendIcon from '@mui/icons-material/Send';

import { registerOrganization } from '../../services/api';

const OrgRegistrationPage = () => {
  const [orgName, setOrgName] = useState('');
  const navigate = useNavigate();

  const handleOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(event.target.value);
  };

  const handleOrgRegistration = async () => {
    try {
      const response = await registerOrganization(orgName);
      response && navigate('/user-registration?orgId=' + response.organizationId);
    } catch (error) {
      console.error('Failed to register organization', error);
    }
  };

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '25px',
      width: '300px',
      margin: 'auto',
      marginTop: '30%',
      borderRadius: '16px'
    }}>
      <Box>
        <Typography color='secondary' sx={{ marginBottom: '25px' }}>Provide your organization name</Typography>
        <TextField
          id="org-name"
          label="Organization Name"
          variant="outlined"
          onChange={handleOrgNameChange}
        />

        <IconButton 
          sx={{ marginTop: '2px', marginLeft: '5px' }}
          onClick={handleOrgRegistration}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default OrgRegistrationPage;
