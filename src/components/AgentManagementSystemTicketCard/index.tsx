import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import LinkIcon from '@mui/icons-material/Link';
import { agentChatCardStyle } from '../../default/theme';

interface Props {
  data: any;
}

const AgentManagementSystemTicketCard: React.FC<Props> = ({data}) => {
  return (
    <>
    {
      data.map((row:any) => (
        <Card sx={{
          ...agentChatCardStyle,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          padding: '20px',
          width: '280px',
          minHeight: '320px',
        }}>
          <Box
            sx={{
              display: 'flex',
              marginBottom: '25px',
            }}
          >
    
          </Box>
          <Typography
            sx={{
              marginBottom: '25px',
              fontSize: '19.33px',
              fontWeight: 500,
            }}
          >
            {row.name}
          </Typography>
          <Typography
            color='secondary'
            sx={{
              marginBottom: '25px',
              fontSize: '14.498px',
              fontWeight: 400,
              lineHeight: '19.33px',
            }}
          >
            Use link to see more details
          </Typography>
          <IconButton
            sx={{
              marginTop: '2px',
              marginRight: 'auto',
              transform: 'rotate(320deg)',
            }}
            onClick={() => window.open(row.link, '_blank')}
          >
            <LinkIcon />
          </IconButton>
          <Divider orientation='horizontal' sx={{ width: '100%' }} />
    
          <Box
            sx={{
              display: 'flex',
              marginTop: '25px',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{}}
            >
              {row.assignee.name}
            </Typography>
            <Typography
              sx={{}}
            >
              {dayjs(row.createdAt).format('DD MMM')}
            </Typography>
          </Box>
        </Card>
      ))
    }
    </>
  );
}

export default AgentManagementSystemTicketCard;
