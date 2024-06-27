import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { appCardStyle } from '../../default/theme';

interface Props {
  title: string;
  description?: string;
  type: string;
  handleSendMessage: (content: string) => void;
  handleLibraryClose: () => void;
}

const LibraryCard: React.FC<Props> = ({ title, description, type, handleSendMessage, handleLibraryClose }) => {

  const handleSendMessageFromLibrary = (title: string) => {
    handleSendMessage(title);
    handleLibraryClose();
  }

  return (
    <Card
      sx={{
        ...appCardStyle,
        flexDirection: 'column',
        height: '180px',
        padding: '16px',
      }}
    >
      <Chip
        sx={{
          marginLeft: 'auto',
          marginBottom: '10px',
          fontWeight: '500',
          borderRadius: '4px',
          padding: '8px 0',
        }}
        label={type}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '130%',
          }}
          component="div"
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '130%',
            color: 'secondary.light',
            marginTop: '5px',
            marginBottom: '10px',
          }}
        >
          {description}
        </Typography>
      </Box>
      <Divider sx={{ marginTop: 'auto' }} />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
      }}>
        <Button
          variant='contained'
          color='info'
          sx={{
            borderRadius: '8px',
            fontSize: '12px',
            width: '130px',
          }}
          onClick={() => handleSendMessageFromLibrary(title)}
        >
          Send message
        </Button>
      </Box>
    </Card>
  )
}

export default LibraryCard;
