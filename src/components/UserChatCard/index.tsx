import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import CopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import TagIcon from '@mui/icons-material/Tag';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import AgentChatCardHeader from '../AgentChatCardHeader';
import { agentChatCardStyle } from '../../default/theme';

const iconStyle = {
  marginRight: '5px'
}

interface Props {
  name: string;
  content: string;
  date: string;
}

const UserChatCard: React.FC<Props> = ({ name, content, date }) => {
  return (
    <Card sx={{
      ...agentChatCardStyle,
    }}>
      <AgentChatCardHeader name={name} date={date} />
      <Box sx={{ marginTop: '15px' }}>
        <Typography color='text.secondary'>
          {content}
        </Typography>
      </Box>  
      <Box sx={{ display: 'flex', marginTop: '15px' }}>
        <CopyIcon sx={iconStyle} color='secondary'/>
        <ShareIcon sx={iconStyle} color='secondary'/>
        <TagIcon sx={iconStyle} color='secondary'/>
        <BookmarkIcon sx={iconStyle} color='secondary'/>
      </Box>
    </Card>
  );
}

export default UserChatCard;
