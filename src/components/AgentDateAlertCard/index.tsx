import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { agentChatCardStyle } from '../../default/theme';
import { AlertDateDataObject } from '../../default/types';
import AgentChatCardHeader from '../AgentChatCardHeader';

interface Props {
  content: AlertDateDataObject;
  date: string;
}

const AgentDateAlertCard: React.FC<Props> = ({ content, date }) => {
  return (
    <Card sx={agentChatCardStyle}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <Box sx={{ display: 'flex' }}>
        <Card sx={{
          textAlign: 'center',
          height: '76px',
          fontSize: '26px',
          fontWeight: '500',
          lineHeight: '130%',
        }}>
          <CardHeader
            title={dayjs().format('MMM')}
            sx={{ 
              textAlign: 'center',
              background: 'linear-gradient(180deg, #FF6275 0%, #FF425A 100%)',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '130%',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              height: '24px',
              marginBottom: '4px',
            }}
          />
          {dayjs().format('DD')}
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
          <Typography sx={{
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '130%',
          }}>
            {content.name}
          </Typography>
          <Typography sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '150%',
            color: 'text.secondary',
          }}>
            {content.resource}
          </Typography>
          </Box>
      </Box>

    </Card>
  );
}

export default AgentDateAlertCard;
