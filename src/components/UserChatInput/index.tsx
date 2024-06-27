import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import SendIcon from '@mui/icons-material/Send';

import CharLibraryModal from '../ChatLibraryModal';

interface Props {
  handleSendMessage: (content: string) => void;
}

const UserChatInput: React.FC<Props> = ({ handleSendMessage }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const onMessageSend = () => {
    handleSendMessage(content);
    setContent('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && content.length > 0) {
      onMessageSend();
    }
  }

  return (
    <Card sx={{
      position: 'sticky',
      bottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      width: '90%',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)',
      border: '1px solid #F0F2F5',
      minHeight: '160px'
    }}>
      <TextField
        id="standard-helperText"
        placeholder="How can I help you?"
        variant="standard"
        multiline
        rows={2}
        sx={{ width: '100%' }}
        value={content}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
      />
      <Box sx={{ display: 'flex', marginTop: '15px' }}>

        <CharLibraryModal handleSendMessage={handleSendMessage} />

        <IconButton
          color='info'
          disabled={content.length === 0}
          onClick={onMessageSend}
          sx={{ marginLeft: 'auto' }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default UserChatInput;
