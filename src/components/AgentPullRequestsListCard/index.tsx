import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';

import { agentChatCardStyle } from '../../default/theme';
import AgentChatCardHeader from '../AgentChatCardHeader';
import { PullRequest } from '../../default/types';

interface Props {
  data: PullRequest[];
  date: string;
}

const AgentPullRequestsListCard: React.FC<Props> = ({ data, date }) => {
  return (
    <Card sx={{...agentChatCardStyle, minHeight: '400px', overflowY: 'auto'}}>
      <AgentChatCardHeader name='Wingman' date={date} />
       <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow> 
              <TableCell>Contributor</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex: number) => (
              <TableRow key={rowIndex}>
                <TableCell>{ row.contributor.username }</TableCell>
                <TableCell>{ row.title }</TableCell>
                <TableCell>{ row.description }</TableCell>
                <TableCell>
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
                <TableCell>{ row.number }</TableCell>
                <TableCell>
                  <ul>
                    { 
                      row.reviews.map((review, index) => (
                        <li key={index}>{review.body}</li>
                      ))
                    }
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default AgentPullRequestsListCard;
