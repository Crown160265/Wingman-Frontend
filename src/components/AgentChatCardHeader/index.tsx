import React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AgentAvatar from '../../assets/images/AgentAvatar.png';
import { Typography } from '@mui/material';

interface Props {
  date: string;
  name: string;
}

const AgentChatCardHeader: React.FC<Props> = ({ name, date }) => { 
  return (
    <Box sx={{ display: 'flex', marginBottom: '15px' }}>
        <Avatar alt={name} src={name === 'Wingman' ? AgentAvatar : ''} sx={{width:'38px', height:'24px'}}>{name[0]}</Avatar>
        <Typography 
          sx={{ marginTop: 'auto', marginBottom: 'auto', fontWeight: '600', marginLeft: '12px' }}
        >
          {name}
        </Typography>
      <Divider orientation="vertical" variant="fullWidth" flexItem sx={{ margin: 'auto 10px', height: '16px' }} />
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '130%',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
        color='text.secondary'
      >
        {dayjs(date).format('H:mm A')}
      </Typography>
    </Box>
  );
}

export default AgentChatCardHeader;
