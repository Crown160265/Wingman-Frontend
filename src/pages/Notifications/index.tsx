import React from 'react';
import { MainBox } from '../../components/CustomComponents/NotificationBox';
import { HelloTypography, TitleTypography, DesTypography } from '../../components/CustomComponents/NotificationTypography';
import NotificationGrids from '../../components/NotificationGrids';

const NotificationsPage : React.FC = () => {

  const firstName = localStorage.getItem('firstName');
  
  return (
    
    <div className='mainlayout' style={{display: 'flex', justifyContent:'center'}}>
      <MainBox>
        <HelloTypography>Hello, {firstName}</HelloTypography>
        <TitleTypography>How can I help you today?</TitleTypography>
        <DesTypography >
          Stay on top of Jira and Github. Tap to set the notifications you and your team cares about.
        </DesTypography>

        <NotificationGrids />

      </MainBox>
    </div>
  );
}

export default NotificationsPage;