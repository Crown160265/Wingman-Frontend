import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { appCardStyle } from '../../default/theme';

interface Props {
  Icon: React.FC;
  name: string;
  description: string;
}

const AlertCard: React.FC<Props> = ({ Icon, name, description }) => {
  return (
    <Card sx={appCardStyle}>
      <Icon />
      <Box sx={{ marginLeft: '12px' }}>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '130%',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '150%',
            fontWeight: 400,
            marginTop: '10px',
            color: 'text.secondary'
          }}
        >
          {description}
        </Typography>
      </Box>

    </Card>
  );
}

export default AlertCard;
