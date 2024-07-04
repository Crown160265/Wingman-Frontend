import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { TeamMainBox } from '../../components/CustomComponents/TeamBox';
import { TeamSectionTitleBox, TeamSectionBox } from '../../components/CustomComponents/TeamBox';
import { HelloTypography, TitleTypography, DesTypography } from '../../components/CustomComponents/NotificationTypography';
import { TeamSectionTitleTypography } from '../../components/CustomComponents/TeamTypography';
import { OverflowBox } from '../../components/CustomComponents/NotificationBox';
import { TeamData } from '../../services/data';
import { IOSSwitch } from '../../components/CustomComponents/IOSSwitch';
import  Button from '@mui/material/Button';
import { ButtonPositionBox } from '../../components/CustomComponents/NotificationBox';
import { matchTeamMembers } from '../../services/api';
import { GitHubSelect } from './TeamComponent/GitHubSelect';
import { TeamSelect } from './TeamComponent/TeamSelect';

import avatar1 from '../../assets/images/Avatar1.svg';
import avatar2 from '../../assets/images/Avatar2.png';
import avatar3 from '../../assets/images/Avatar3.png';
import avatar4 from '../../assets/images/Avatar4.svg';
import avatar5 from '../../assets/images/Avatar5.svg';
import avatar6 from '../../assets/images/Avatar6.svg';
import slackIcon from '../../assets/images/Slack.svg';

type TeamDataResponse = {
  atlassianTeamMembers: any;
  count:number;
  githubTeamMembers:[
    id:string,
    link:string,
    username:string,
  ];
  matchedTeamMembers:[
    atlassianUsername: string,
    atlassianUserId: string,
    atlassianUserLink: string,
    email: string,
    githubUsername: string,
    githubUserLink: string,
    githubUserId: string,
    name: string,
    score?: number,
  ]
}

const TeamsPage : React.FC = () => {
  
  const navigate = useNavigate();
  const organizationId = localStorage.getItem('organizationId')??"";
  const userId = localStorage.getItem('userId')??"";
  const firstName = localStorage.getItem('firstName');
  const [responseTeamData, setResponseTeamData] = useState<TeamDataResponse>();
  const [isLoading, setIsLoading] = useState(false);

  let MatchedTeamMembers = TeamData().matchedTeamMembers;
  const [data, setData] = useState(MatchedTeamMembers);
  const GithubTeamMembers = TeamData().githubTeamMembers;
  const [githubData, setGithubData] = useState(GithubTeamMembers);
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];


  /* Check States and Functions */

  const initializeCheckedState = () => {
    const initialCheckedState: Record<number, boolean> = {};
    for (let i = 0; i <= data.length; i++) {
      initialCheckedState[i] = false;
    }
    return initialCheckedState;
  };

  const [checked, setChecked] = useState<Record<number, boolean>>(initializeCheckedState());

  let len = 0;
  for(let i = 1; i <= data.length; i++) if(checked[i] === false) { len = i; break;}
  if( len===0 ) checked[0]=true; 
  else checked[0]=false;
  
  const handleChange = (Id:number) => {
    setChecked((prevState) => ({
      ...prevState,
      [Id]:!prevState[Id],
      }))
  }
  
  const handleChangeAll = () => {
    let bool = true;
    if (checked[0]===true) bool = false; else bool = true;
    const updatedCheckedState: Record<number, boolean> = {};
    Object.keys(checked).forEach((key) => {
      updatedCheckedState[parseInt(key)] = bool;
    });
    setChecked(updatedCheckedState);
  }
  
  /* Role Switch States */

  const [switchChecked, setSwitchChecked] = useState<Record<number, boolean>>(initializeCheckedState());

  const handleSwitchChange = (Id:number) => {
    setSwitchChecked((prevState) => ({
      ...prevState,
      [Id]:!prevState[Id],
      }))
  }

  /* Next Button Function */

  const handleTeams = async () => {
      navigate('/');
  };

  /* FetchData */

  const fetchData = async() => {
    try{
        const responseData = await matchTeamMembers(organizationId, userId);
        setResponseTeamData(responseData);
        setIsLoading(true);
    }catch(error){
        console.error('Error fetching data:', error);
        setIsLoading(false);
    }
  }

  useEffect(()=> {
    fetchData();
  },[]);


  return (
    (
      isLoading ? (

      <div className='mainlayout'>
        <TeamMainBox>
          <HelloTypography>Hello, {firstName}</HelloTypography>
          <TitleTypography>Tell me more about your team</TitleTypography>
          <DesTypography >
            Mark the individuals you care about and want me to assist them
          </DesTypography>
          <Box sx={{
            padding: '10px', 
            border:'1px solid rgba(0,0,0,0.25)', 
            boxShadow:'0px 2px 4px rgba(0, 0, 0, 0.25)'}}>
            <Grid container alignItems={'center'}>
                <Grid item xs={0.9}>
                  <TeamSectionTitleBox>
                    <Checkbox 
                      key={0}
                      checked={checked[0]}
                      onChange={handleChangeAll} 
                      size="small" 
                      color="info"
                    />
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                  <TeamSectionTitleBox >
                    <TeamSectionTitleTypography>NAME</TeamSectionTitleTypography>
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                  <TeamSectionTitleBox>
                    <TeamSectionTitleTypography>JIRA USER</TeamSectionTitleTypography>
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                  <TeamSectionTitleBox>
                    <TeamSectionTitleTypography>SLACK USER</TeamSectionTitleTypography>
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                  <TeamSectionTitleBox >
                    <TeamSectionTitleTypography>GITHUB USER</TeamSectionTitleTypography>
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                  <TeamSectionTitleBox>
                    <TeamSectionTitleTypography>TEAM</TeamSectionTitleTypography>
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7} justifyContent="left">
                  <TeamSectionTitleBox>
                    <TeamSectionTitleTypography>ROLE</TeamSectionTitleTypography>
                  </TeamSectionTitleBox>
                </Grid>
            </Grid>
          </Box>
          <OverflowBox>
            {data.map((item:any, index:number) => (
              <Box key={index} sx={{
              display:'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px' }}>
                <Grid container alignItems="center">
                  <Grid item xs={0.9}>
                    <TeamSectionTitleBox>
                      <Checkbox 
                        key={index+1}
                        checked={checked[index+1]} 
                        onChange={() => handleChange(index+1)} 
                        size="small" 
                        color='info'
                      />
                    </TeamSectionTitleBox>
                  </Grid>
                  <Grid item xs={1.7}>
                    <TeamSectionBox>
                      <img src={avatars[index]} alt={`Avatar${index}`} width="28px" height="25px" style={{paddingRight:'16px'}}/>
                      {checked[index+1] ?
                        <TeamSectionTitleTypography sx={{color: 'rgba(58, 53, 65, 0.87)'}} >{item.name}</TeamSectionTitleTypography>
                        :
                        <TeamSectionTitleTypography sx={{color: 'rgba(180, 180, 180, 0.87)'}} >{item.name}</TeamSectionTitleTypography>
                      }
                    </TeamSectionBox>
                  </Grid>
                  <Grid item xs={1.7}>
                    <TeamSectionBox>
                      {checked[index+1] ?
                        <TeamSectionTitleTypography sx={{color: 'rgba(0, 71, 255, 0.43)'}}>{item.JiraUser}</TeamSectionTitleTypography>
                        :
                        <TeamSectionTitleTypography sx={{color: 'rgba(180, 180, 180, 0.87)'}} >{item.JiraUser}</TeamSectionTitleTypography>
                      }
                    </TeamSectionBox>
                  </Grid>
                  <Grid item xs={1.7}>
                    <TeamSectionTitleBox>
                      {item.SlackUser && <img src={slackIcon} alt="SlackIcon" width="16px" height="16px" style={{paddingRight:'10px'}}/>}
                      <TeamSectionTitleTypography>{item.SlackUser}</TeamSectionTitleTypography>
                    </TeamSectionTitleBox>
                  </Grid>

                  <Grid item xs={1.7}>
                    <GitHubSelect item={item} githubData={githubData}/>
                  </Grid>

                  <Grid item xs={1.7}>
                    <TeamSelect index={index} data={data} setData={setData}/>
                  </Grid>

                  <Grid item xs={1.7}>
                    {item.role.length!==0 && 
                      <TeamSectionTitleBox>
                        <IOSSwitch
                          checked={switchChecked[index]} 
                          onChange={() => handleSwitchChange(index)}
                          sx={{m:1}} 
                        />
                        <TeamSectionTitleTypography>{item.role}</TeamSectionTitleTypography>
                      </TeamSectionTitleBox>
                    }
                  </Grid>
                </Grid>
              </Box>
            ))} 
          </OverflowBox>

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
              onClick={handleTeams}
              >
              Next
            </Button>
          </ButtonPositionBox>
        </TeamMainBox>
      </div>):(<div></div>)
    )
  );
}

export default TeamsPage;