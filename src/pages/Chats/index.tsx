import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

import Layout from '../../components/Layout';
import { createConversation } from '../../services/api';
import { useUser } from '../../context/UserContext';

const ChatsPage = () => {
  const [chatName, setChatName] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  const handleCreateConversation = async () => {
    try {
      if(!user) return;
      const response = await createConversation(user.id, chatName);
      console.log('Conversation created', response);
      navigate(`/conversation/${response.id}?message=${chatName}`);
    } catch (error) {
      console.error('Failed to create conversation', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Layout title='Chats'>
        <Card sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '20ch',
          width: '90%',
          padding: '48px 150px',
          borderRadius: '16px',
          boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)',
          border: '1px solid #F0F2F5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <Typography 
              component="div" 
              sx={{
                marginBottom: '6px',
                fontSize: '22px',
                fontWeight: 500,
                lineHeight: '130%',
              }}
            >
              Welcome back, {user?.firstName ? user.firstName : 'User'}
            </Typography>
            <Typography 
              component="div" 
              color='secondary'
              sx={{
                marginBottom: '24px',
                fontSize: '14px',
                lineHeight: '150%',
                fontWeight: 400,
              }}
            >
              Engineering Intelligence at the Tip of Your Fingers
            </Typography>
            <Box sx={{
              display: 'flex',
              width: '90%',
              padding: '16px',
              borderRadius: '16px',
              boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)',
            }}>
              <TextField
                id="standard-helperText"
                placeholder="How can I help you?"
                variant="standard"
                color='primary'
                sx={{width: '100%'}}
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <IconButton 
                color='info' 
                onClick={handleCreateConversation}
                disabled={chatName.length === 0}
              >
                <SendIcon />
              </IconButton>
            </Box>
            </Card>
      </Layout>
    </Box>
  );
}

export default ChatsPage;
