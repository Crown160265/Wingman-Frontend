import React, {useState} from "react";
import { TeamSectionTitleBox } from "../../../../components/CustomComponents/TeamBox";
import { Select, Divider, MenuItem, TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { TeamSectionTitleTypography } from "../../../../components/CustomComponents/TeamTypography";
import { TeamSectionBox } from "../../../../components/CustomComponents/TeamBox";

import SearchIcon from '../../../../assets/images/SearchIcon.png';
import CancelIcon from '../../../../assets/images/CancelIcon.png';
import CheckIcon from '../../../../assets/images/Check.png';

type HoverState = boolean[];

type MatchedTeamDataType = {
    avatar:string;
    name:string;
    JiraUser: string;
    SlackUser:string;
    GithubUser: string;
    team:string[];
    role:string;
}[]

type TeamProps = {
  index:number;
  data:MatchedTeamDataType;
  setData:Function;
};

export const TeamSelect: React.FC<TeamProps> = ({index, data, setData}) => {

  let item = data[index];

  const [inputLetter, setInputLetter] = useState<string>("");
  const [filteredItemCount, setFilteredItemCount] = useState(false);

  const handleCancelIcon = () => {
    setInputLetter("");
    setFilteredItemCount(false);
  }

  const filter = (inputLetter:string) => {
      return item.team.filter((teamItem:any) =>
        teamItem.toLowerCase().includes(inputLetter.toLowerCase()));
  }

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    setInputLetter(event.target.value);
    
    const filteredItem = filter(event.target.value);
    filteredItem.length === 0 ? setFilteredItemCount(true) : setFilteredItemCount(false);
  }

  const initializeHoveredState = ():HoverState => {
    const initialHoveredState: HoverState = [];
      for(let i = 0; i < item.team.length; i++){
        initialHoveredState[i] = false;
      }
    return initialHoveredState;
  };

  const [isHovered, setIsHovered] = useState<HoverState>(() => initializeHoveredState());

  const handleIsHover = (Id: number) => {
    setIsHovered((prevState) => ({
      ...prevState,
      [Id]:true,
    }));
  };
  const handleNoIsHover = (Id:number) => {
    setIsHovered((prevState) => ({
      ...prevState,
      [Id]:false,
    }));
  }

  const [selectedOption, setSelectedOption] = useState<string>(item.team[0]);
  const handleSelectTeamChange = (value:string) => {
    setSelectedOption(value);
  };

  const handleAddTeams = (team:string) => {

    let len = item.team.length;
    data[index].team[len] = team;
    setData(data);
    setInputLetter("");
    setFilteredItemCount(false);
    setIsHovered((prevState) => ({
      ...prevState,
      [len]:false,
    }));
  }

    return (
      <TeamSectionTitleBox >
      {
        item.team.length!==0 && 
        <Select 
          value={selectedOption} 
          onChange={(event) => handleSelectTeamChange(event.target.value)}
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
            PaperProps : {
              className:'custom-select',
              style: {
                height: '250px',
                borderRadius:'10px',
                border: '1px solid rgb(191,191,191)',
                marginTop: '7px',
                marginLeft: '37px',
                paddingBottom:'10px',
                scrollbarColor: 'transparent transparent',
                display:'flex',
                overflow:'visible',
              },
              sx: {
                '& .MuiList-root': {
                  display:'flex !important',
                  flexDirection: 'column !important',
                  paddingBottom: '0px !important'
                },
              }
            },
            MenuListProps: {
              style:{
                overflow:'scroll',
                scrollbarWidth:'none',
                scrollbarColor:'transparent transparent',
              }
            }
          }}          
        >
            <TeamSectionTitleTypography sx={{paddingLeft:'10px', fontWeight:'600'}}>TEAM</TeamSectionTitleTypography>
            <Divider/>
            <MenuItem>
              <TextField 
                sx={{paddingLeft:'10px', width:'150px', '& .MuiInputBase-input' : {fontSize:'12px'}}}
                InputProps={{
                  disableUnderline:true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={SearchIcon} alt='SearchIcon'/>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    inputLetter.length !== 0 && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleCancelIcon}>
                          <img src={CancelIcon} alt='CancelIcon'/>
                        </IconButton>
                      </InputAdornment>
                    )
                  ),
                }}
                placeholder="Search..."
                variant="standard"
                value={inputLetter}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </MenuItem>
            <Divider 
              sx={{marginTop:'0px !important'}}
            />
            {
                item.team.map((teamItem:any, teamIndex:number) => {
                  if (teamItem.toLowerCase().includes(inputLetter.toLowerCase())) {  
                    return (   
                      
                    <MenuItem 
                      key={teamIndex} 
                      value={teamItem} 
                      sx={{
                        backgroundColor:'white', 
                        height:'25px', 
                        borderRadius:'4px',
                        margin:'0px 5px 4px 5px' ,
                        paddingLeft:'25px',
                        position:'relative',
                        }}
                      onMouseEnter={() => handleIsHover(teamIndex)}
                      onMouseLeave={() => handleNoIsHover(teamIndex)}
                    > 
                      {
                        isHovered[teamIndex] && selectedOption !== teamItem &&
                            <img src={CheckIcon} alt="CheckIcon" style={{position:'absolute', marginLeft:'-17px'}}/>
                      }  
                      <TeamSectionBox>
                        <TeamSectionTitleTypography>{teamItem}</TeamSectionTitleTypography>
                      </TeamSectionBox>
                    </MenuItem>
                  )}
                  else return null;
                }
              )
            }
            {
              filteredItemCount &&
                <TeamSectionBox sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <TeamSectionTitleTypography>No results found</TeamSectionTitleTypography>
                </TeamSectionBox>
            }
            <Box onMouseDown={() => handleAddTeams(inputLetter)} sx={{marginTop:'auto'}}>
              {filteredItemCount && 
                <>
                <Divider />
                <TeamSectionTitleTypography 
                  sx={{
                    paddingLeft:'10px', 
                    paddingTop:'5px', 
                    marginBottom:'-11px', 
                    overflowX:'scroll', 
                    width:'170px'
                  }}>
                    Create Team <span style={{fontWeight:'600'}}>{inputLetter}</span></TeamSectionTitleTypography>
                </>
              }
            </Box>
        </Select>
      }
    </TeamSectionTitleBox>
    );
}