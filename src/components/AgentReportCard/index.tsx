import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { agentChatCardStyle } from '../../default/theme';
import { ReportDataObject } from '../../default/types';
import AgentChatCardHeader from '../AgentChatCardHeader';
import PRIcon from '../../assets/images/PRIcon';

interface Props {
  content: ReportDataObject;
  date: string;
}

const listStyles = {
  fontWeight: 500, 
  lineHeight: '130%', 
  fontSize: '14px',
  marginBottom: '8px'
}

const AgentReportCard: React.FC<Props> = ({ content, date }) => {
  const bugCount = content.highPriorityBugIssues.length;
  const expectedcount = content.issuesExpected.length;

  return (
    <Card sx={agentChatCardStyle}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <Typography color='text.secondary'>
        {expectedcount > 0 ? `There ${expectedcount} tickets that should be completed today:` : 'No issues are expected to be completed today.'} 
      </Typography>
      <ul>
        {content.issuesExpected.map((issue, index) => {
          return <li key={index}>
            <Link target="_blank" rel="noopener noreferrer" to={issue.link}>
              <Typography
                sx={listStyles}
              >
                {`${issue.name} - Assigned to ${issue.assignee.name}`}
              </Typography>
            </Link>
          </li>
        })}
      </ul>
      <Typography color='text.secondary'>
        There {bugCount > 0 ? bugCount === 1 ? 'is 1 high priority bug' : `are ${bugCount} high priority bugs` : 'is no high priority bugs'} that you might want to be aware of:
      </Typography>
      <ul>
        {content.highPriorityBugIssues.map((issue, index) => {
          return <li key={index}>
            <Link target="_blank" rel="noopener noreferrer" to={issue.link}>
              <Typography
                sx={listStyles}
              >
                {`${issue.name} - Assigned to ${issue.assignee.name}`}
              </Typography>
            </Link>
          </li>
        })}
      </ul>
      <Typography color='text.secondary'>
        These tickets seem to be taking longer than estimated:
      </Typography>
      <ul>
        {content.overdueIssues.map((issue, index) => {
          return <li key={index}>
            <Link target="_blank" rel="noopener noreferrer" to={issue.link}>
              <Typography
                sx={listStyles}
              >
                {`${issue.name} - Assigned to ${issue.assignee.name}`}
              </Typography>
            </Link>
          </li>
        })}
      </ul>
      <Typography color='text.secondary' sx={{ marginBottom: '16px' }}>
        Finally, these PRs are pending:
      </Typography>
      {content.pendingPullRequests.map((pr, index) => {
        return <Link target="_blank" rel="noopener noreferrer" to={pr.link}>
          <Box sx={{ display: 'flex' }}>
            <PRIcon />
            <Typography
              sx={listStyles}
            >
              {`${pr.title} - Assigned to ${pr.contributor.username}`}
            </Typography>
          </Box>
        </Link>
      }
      )}
    </Card>
  );
}

export default AgentReportCard;
