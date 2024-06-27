import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { TeamMainBox } from '../../components/CustomComponents/TeamBox';
import { TeamSectionTitleBox, TeamSectionBox } from '../../components/CustomComponents/TeamBox';
import { HelloTypography, TitleTypography, DesTypography } from '../../components/CustomComponents/NotificationTypography';
import { TeamSectionTitleTypography } from '../../components/CustomComponents/TeamTypography';
import { OverflowBox } from '../../components/CustomComponents/NotificationBox';
import { personalData } from '../../services/data';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IOSSwitch } from '../../components/CustomComponents/IOSSwitch';
import  Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ButtonPositionBox } from '../../components/CustomComponents/NotificationBox';
import { matchTeamMembers } from '../../services/api';

import avatar1 from '../../assets/images/Avatar1.svg';
import avatar2 from '../../assets/images/Avatar2.png';
import avatar3 from '../../assets/images/Avatar3.png';
import avatar4 from '../../assets/images/Avatar4.svg';
import avatar5 from '../../assets/images/Avatar5.svg';
import avatar6 from '../../assets/images/Avatar6.svg';
import slackIcon from '../../assets/images/Slack.svg';
import github from '../../assets/images/Github.svg';

import { Link } from 'react-router-dom';

const TeamsPage : React.FC = () => {
  const firstName = localStorage.getItem('firstName');
  const location = useLocation();
  const response = location.state.responseData;
  console.log("response: ", response);

  let PersonalData = personalData().personalData;
  const [data, setData] = useState(PersonalData);
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [open, setOpen] = useState(false);
  const [indexNumber, setIndexNumber] = useState(0);

  const initializeCheckedState = () => {
    const initialCheckedState: Record<number, boolean> = {};
    for (let i = 0; i <= PersonalData.length; i++) {
      initialCheckedState[i] = false;
    }
    return initialCheckedState;
  };
  const [checked, setChecked] = useState<Record<number, boolean>>(initializeCheckedState());
  
  const [switchChecked, setSwitchChecked] = useState<Record<number, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string[]>( PersonalData.map((item:any) => item.GithubUser[0]) );
  const [selectedTeamOption, setSelectedTeamOption] = useState<string[]>( PersonalData.map((item:any) => item.team[0]) );

  let len = 0;
  for(let i = 1; i <= PersonalData.length; i++) if(checked[i] === false) { len = i; break;}
  if( len===0 ) checked[0]=true; 
  else checked[0]=false;

  const handleClickOpen = (Id:number) => {
    setIndexNumber(Id);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  
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


  const handleSwitchChange = (Id:number) => {
    setSwitchChecked((prevState) => ({
      ...prevState,
      [Id]:!prevState[Id],
      }))
  }
  
  const handleSelectChange = (Id:number, value:string) => {
    const prevString = [...selectedOption];
    prevString[Id] = value;
    setSelectedOption(prevString);
  };
 
  const handleSelectTeamChange = (Id:number, value:string) => {
    if(value) {
    const prevString = [...selectedTeamOption];
    prevString[Id] = value;
    setSelectedTeamOption(prevString);
    }
  };

  const handleTeams = async () => {
  };
  
  return (
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
                  <TeamSectionTitleBox >
                    <div>
                    {
                      item.GithubUser.length!==0 && 
                      <Select 
                        value={selectedOption[index]} 
                        onChange={(event) => handleSelectChange(index, event.target.value)}
                        sx={{
                          width:'120px', 
                          height: '25px',
                          borderRadius: '20px', 
                          backgroundColor:'white', 
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'blue'
                          },
                          '& .Mui-selected': {
                            backgroundColor: 'white',
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              marginTop: '10px',
                              backgroundColor: 'rgba(240, 242, 245, 1)',
                              borderRadius:'20px',
                              '& .MuiMenuItem-root.Mui-selected': {
                                  backgroundColor: 'white',
                              }
                            }
                          }
                        }}
                      >
                        {
                          item.GithubUser.map((item1:any, index1:number) => (
                          <MenuItem key={index1} value={item1}
                            sx={{
                              backgroundColor:'white', 
                              height:'25px', 
                              borderRadius:'10px',
                              margin:'0px 10px 4px 10px' 
                            }}
                          > 
                            <TeamSectionBox>
                              <img src={github} alt="GitHub" style={{marginLeft:'-6px',paddingRight:'6px'}} />
                              <TeamSectionTitleTypography>{item1}</TeamSectionTitleTypography>
                            </TeamSectionBox>
                          </MenuItem>
                          
                        ))}
                        
                      </Select>
                    }
                    </div>
                  </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                <TeamSectionTitleBox >
                  <div>
                  {
                    item.team.length!==0 && 
                    <Select 
                      value={selectedTeamOption[index]} 
                      onChange={(event) => handleSelectTeamChange(index, event.target.value)}
                      sx={{
                          width:'120px', 
                          height: '25px', 
                          borderRadius: '20px',
                          backgroundColor:'white', 
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'blue'
                          },
                          '& .Mui-selected': {
                            backgroundColor: 'white',
                          },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            marginTop: '10px',
                            backgroundColor: 'rgba(240, 242, 245, 1)',
                            borderRadius:'20px',
                            '& .MuiMenuItem-root.Mui-selected': {
                                backgroundColor: 'white',
                            }
                          }
                        }
                      }}
                    >
                      {
                        item.team.map((item1:any, index1:number) => ( 
                        <MenuItem key={index1} value={item1} 
                          sx={{
                            backgroundColor:'white', 
                            height:'25px', 
                            borderRadius:'10px',
                            margin:'0px 10px 4px 10px' 
                            }}
                        > 
                          <TeamSectionBox>
                            <TeamSectionTitleTypography>{item1}</TeamSectionTitleTypography>
                          </TeamSectionBox>
                        </MenuItem>
                      ))}
                      <MenuItem onClick={()=> handleClickOpen(index)} key={item.team.length} 
                        value={item.team[item.team.length]} 
                        sx={{
                          backgroundColor:'white', 
                          height:'25px', 
                          borderRadius:'10px',
                          margin:'0px 10px 4px 10px'
                          }}
                      >
                        <TeamSectionTitleTypography>+ New Team</TeamSectionTitleTypography>
                      </MenuItem>
                    </Select>
                  }
                    <Dialog 
                      open={open} 
                      onClose={handleClose}
                      hideBackdrop={true}
                      PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          const formJson = Object.fromEntries((formData as any).entries());
                          const teamName = formJson.teamName;
                          let len = data[indexNumber].team.length;
                          data[indexNumber].team[len] = teamName;
                          setData(data);
                          handleSelectTeamChange(indexNumber, teamName);
                          handleClose();
                        },
                      }}
                    >
                      <DialogTitle>Add Team</DialogTitle>
                      <DialogContent>
                        <DialogContentText>Please enter the team name here.</DialogContentText>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="teamName"
                            name="teamName"
                            label="Team Name"
                            type="text"
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <button onClick={handleClose}>Cancel</button>
                          <button type="submit">Create</button>
                        </DialogActions>
                    </Dialog>
                  </div>
                </TeamSectionTitleBox>
                </Grid>
                <Grid item xs={1.7}>
                  {item.role.length!==0 && 
                    <TeamSectionTitleBox>
                      <IOSSwitch
                        checked={switchChecked[index]} 
                        onChange={() => handleSwitchChange(index)}
                        sx={{m: 1}} 
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
          <Link to='/'>
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
            // onClick={handleTeams}
            >
            Next
          </Button>
          </Link>
        </ButtonPositionBox>
      </TeamMainBox>
    </div>
  );
}

export default TeamsPage;