import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';

import { agentChatCardStyle } from '../../default/theme';
import AgentChatCardHeader from '../AgentChatCardHeader';
import PRIcon from '../../assets/images/PRIcon';
import ActionsBar from '../../assets/images/ActionsBar.png'
import { ReportTypography } from '../CustomComponents/ReportTypography';

interface Props {
  content: any;
  date: string;
}

const listStyles1 = {
  marginLeft:'60px',
  display: 'flex',
  marginBottom: '0px',
}

const listStyles2 = {
  marginLeft:'10px',
  marginBottom: '8px',
}

const listStyles3 = {
  marginLeft:'40px',
  display: 'flex',
  marginBottom: '0px',
  color: 'rgba(35, 136, 255, 1)',
}

const AgentReportCard1: React.FC<Props> = ({ content, date }) => {
  const firstName = localStorage.getItem('firstName');

  return ( 
    <Card sx={agentChatCardStyle}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <ReportTypography>
        Hi, {firstName}! Thanks for integrating your Jira and GitHub.
      </ReportTypography>
      <ReportTypography>
        {content.averagePullRequestReviewTime.hours}.
      </ReportTypography>
      <ReportTypography>
        {content.issuesWithoutDescription.message}:
      </ReportTypography>
      {content.issuesWithoutDescription.issues.map((issue:any, index:number) => {
        return(
          <Link key={index} target="_blank" rel="noopener noreferrer" to={issue.link}>
            <ReportTypography  sx={listStyles1}>
              <PRIcon />
              <ReportTypography  sx={listStyles2}>
                {issue.title}
              </ReportTypography>
            </ReportTypography>
          </Link>
        );
      })}
      <div style={{marginBottom:'30px'}} />
      <ReportTypography>
        {content.mergedPullRequestsWithoutComments.message}.
      </ReportTypography>
      <ReportTypography>
        {content.pullRequestsPendingReview.message}:
      </ReportTypography>
      <ul>
      {content.pullRequestsPendingReview.pullRequests.map((PR:any, index:number) => {
          return (
            <ReportTypography key={index} sx={listStyles3}>
              <li key={index}>
                <Link target="_blank" rel="noopener noreferrer" to={PR.link}>
                  {PR.title}
                </Link>
              </li>
            </ReportTypography>
          );
          
        })}
      </ul>
      <div style={{marginBottom:'50px'}} />
      <ReportTypography>
        <img src={ActionsBar} alt='ActionsBar' />
      </ReportTypography>
    </Card>
  );
}

export default AgentReportCard1;
