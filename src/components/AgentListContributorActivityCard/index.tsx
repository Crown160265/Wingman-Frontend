import * as React from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { agentChatCardStyle } from '../../default/theme';
import { ListContributorActivity } from '../../default/types';
import AgentChatCardHeader from '../AgentChatCardHeader';

interface Props {
  data: ListContributorActivity[];
  date: string;
}

const AgentListCard: React.FC<Props> = ({ data, date }) => {
   
  return (
    <Card sx={{...agentChatCardStyle, minHeight: '450px', overflowY: 'auto'}}>
      <AgentChatCardHeader name='Wingman' date={date} />
       <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow> 
              <TableCell>Contributor</TableCell>
              <TableCell>Pull requests</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{ row.contributor }</TableCell>
                <TableCell>{ row.activity.pullRequests.length }</TableCell>
                <TableCell>{ row.activity.reviews.length }</TableCell>
                <TableCell>{ row.activity.comments.length }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default AgentListCard;
