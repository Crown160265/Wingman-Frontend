import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { agentChatCardStyle } from '../../default/theme';
import AgentChatCardHeader from '../AgentChatCardHeader';
import ActionsPanel from '../ActionsPanel';

interface Props {
  content: string;
  date: string;
}

const AgentTextCard: React.FC<Props> = ({ content, date }) => {
  const navigate = useNavigate();

  return (
    <Card sx={agentChatCardStyle}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <Box>
        <Typography color='text.secondary'>
          {content}
        </Typography>
      </Box>
      <Button 
        variant='contained' 
        color='info'
        onClick={() => navigate('/integrations')}
        sx={{
          marginTop: '15px',
          marginBottom: '5px',
          borderRadius: '8px',
          fontSize: '12px',
          width: '204px',
        }}
      >
        Connect Integration
      </Button>
      <ActionsPanel />
    </Card>
  );
}

export default AgentTextCard;
