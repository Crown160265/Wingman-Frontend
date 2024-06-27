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
import { ListDataObject } from '../../default/types';
import AgentChatCardHeader from '../AgentChatCardHeader';

interface Props {
  data: ListDataObject[];
  date: string;
}

const AgentListCard: React.FC<Props> = ({ data, date }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
   
    const normalizeColumnNames = (column: string) =>{
        if (!column){
            return 'N/A';
        }
        const title = column.replace(/_/g, ' ');

        return title.replace(/\b\w/g, char => char.toUpperCase());
    }
  // TODO: fix possible issue with nested objects
  return (
    <Card sx={{...agentChatCardStyle, minHeight: '450px', overflowY: 'auto'}}>
      <AgentChatCardHeader name='Wingman' date={date} />
       <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{normalizeColumnNames(column)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {typeof row[column] === 'object' && row[column] !== null ? JSON.stringify(row[column]) : row[column] }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default AgentListCard;
