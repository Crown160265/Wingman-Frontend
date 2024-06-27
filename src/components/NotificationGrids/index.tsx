import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SectionTitleTypography } from '../CustomComponents/NotificationTypography';
import { OverflowBox } from '../CustomComponents/NotificationBox';
import { Button } from '@mui/material';
import { ButtonPositionBox } from '../CustomComponents/NotificationBox';

import { Jira1, Jira2, Jira3, Jira4, Jira5 } from '../Jira';
import { GitHub1, GitHub2, GitHub3, GitHub4 } from '../GitHub';
import { Reports1, Reports2, Reports3 } from '../Reports';
import { alertsNotification, reportsNotification } from '../../services/api';


export default function NotificationGrids() {
  
  const [componentStates, setComponentStates] = useState<Record<number, boolean>>({});
  const [bug, setBug] = useState(0);
  const [tickets, setTickets] = useState(5);
  const [hours, setHours] = useState(5);
  const [hours1, setHours1] = useState(5);
  const [comments, setComments] = useState(5);
  const [amhour, setAmhour] = useState(8);
  const [amminute, setAmminute] = useState(30);
  const [pmhour, setPmhour] = useState(6);

  const navigate = useNavigate();

  const handleClick = (componentId: number) => {
    setComponentStates((prevState) => ({
      ...prevState,
      [componentId]: !prevState[componentId],
    }));
  };

  const handleNotification = async () => {

    let reportsStatus = false;
    let alertsStatus = false;
    
    for(let i=10; i<=12; i++) {if(componentStates[i] === true) { reportsStatus = true; break; }}
    for(let i=1; i<=9; i++) {if(componentStates[i] === true) { alertsStatus = true; break; }}

    const userId = localStorage.getItem('userId') ?? '';
    const organizationId = localStorage.getItem('organizationId') ?? '';

    try {
        
        if (alertsStatus) {
            await alertsNotification(componentStates, bug, tickets, hours, hours1, comments, userId, organizationId);
        }
        if (reportsStatus) {
            await reportsNotification(componentStates, amhour, amminute, pmhour, userId, organizationId);
        }
        
        navigate('/onboarding/integrations');
      
    } catch (error) {
      console.error('Failed to register user', error);
    }
  };

  return (
    <div>
    <Box>
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <SectionTitleTypography>Jira</SectionTitleTypography>
            </Grid>
            <Grid item xs={4}>
                <SectionTitleTypography>GitHub</SectionTitleTypography>
            </Grid>
            <Grid item xs={4}>
                <SectionTitleTypography>Reports</SectionTitleTypography>
            </Grid>
        </Grid>
        <OverflowBox>
            <Grid container spacing={4} >
                <Grid item xs={4}>
                    <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} onClick={()=>handleClick(1)}>
                            <Jira1 componentStates={componentStates} click={1} />
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(2)}>
                            <Jira2 componentStates={componentStates}  setComponentStates={setComponentStates} click={2} bug={bug} setBug={setBug}/>
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(3)}>
                            <Jira3 componentStates={componentStates} click={3} />
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(4)}>
                            <Jira4 componentStates={componentStates} click={4} />
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(5)}>
                            <Jira5 componentStates={componentStates} setComponentStates={setComponentStates} click={5} tickets={tickets} setTickets={setTickets} />
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} onClick={()=>handleClick(6)}>
                            <GitHub1 componentStates={componentStates} click={6} />
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(7)}>
                            <GitHub2 componentStates={componentStates} setComponentStates={setComponentStates} click={7} hours={hours} setHours={setHours}/>
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(8)}>
                            <GitHub3 componentStates={componentStates} setComponentStates={setComponentStates} click={8} hours1={hours1} setHours1={setHours1}/>
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(9)}>
                            <GitHub4 componentStates={componentStates} setComponentStates={setComponentStates} click={9} comments={comments} setComments={setComments}/>
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} onClick={()=>handleClick(10)}>
                            <Reports1 componentStates={componentStates} setComponentStates={setComponentStates} click={10} amhour={amhour} setAmhour={setAmhour} amminute={amminute} setAmminute={setAmminute}/>
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(11)}>
                            <Reports2 componentStates={componentStates} setComponentStates={setComponentStates} click={11} pmhour={pmhour} setPmhour={setPmhour}/>
                        </Grid>
                        <Grid item xs={12} onClick={()=>handleClick(12)}>
                            <Reports3 componentStates={componentStates} click={12} />
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
        </OverflowBox>
    </Box>
    <ButtonPositionBox>
        <Button sx={{ 
        display: 'flex',
        alignItems:'center',
        color: '#ffffff',
        backgroundColor:'#3B82F6',
        paddingY: '0.5rem',
        paddingX: '1.5rem',
        ':hover': {
            backgroundColor : '#0B82F6',
        }
        }}
        variant='contained'
        color='info'
        onClick={handleNotification}
        >
        Next
    </Button>
  </ButtonPositionBox>
  </div>
  );
}