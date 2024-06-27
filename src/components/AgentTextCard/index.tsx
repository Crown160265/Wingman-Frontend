import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { agentChatCardStyle } from '../../default/theme';
import AgentChatCardHeader from '../AgentChatCardHeader';
import ActionsPanel from '../ActionsPanel';

interface Props {
  content: string;
  date: string;
}

const AgentTextCard: React.FC<Props> = ({ content, date }) => {
  return (
    <Card sx={agentChatCardStyle}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <Box>
        <Typography color='text.secondary'>
          {content}
        </Typography>
      </Box> 
      <ActionsPanel />
    </Card>
  );
}

export default AgentTextCard;
