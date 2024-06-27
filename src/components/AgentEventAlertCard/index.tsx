import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';

import { agentChatCardStyle } from '../../default/theme';
import { AlertEventDataObject } from '../../default/types';
import AgentChatCardHeader from '../AgentChatCardHeader';

interface Props {
  content: AlertEventDataObject[];
  title: string;
  date: string;
}

const AgentEventAlertCard: React.FC<Props> = ({ content, title, date }) => {
  return (
    <Card sx={agentChatCardStyle}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
        <Typography sx={{
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '130%',
          marginBottom: '15px'
        }}>
          {title}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#PR</TableCell>
                <TableCell>Open For</TableCell>
                <TableCell>Opened By</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell key={row.link}>
                    {row.pullRequest.number}
                  </TableCell>
                  <TableCell key={row.contributor}>
                    {row.pullRequest.title}
                  </TableCell>
                  <TableCell key={row.contributor}>
                    {row.contributor}
                  </TableCell>
                  <TableCell key={row.size}>
                    {row.size}
                  </TableCell>
                  <TableCell key={row.link}>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}

export default AgentEventAlertCard;
