import React, {useState} from "react";
import { TeamSectionTitleBox } from "../../../../components/CustomComponents/TeamBox";
import { 
  Select, 
  Divider, 
  MenuItem, 
  TextField, 
  InputAdornment, 
  IconButton,
  MenuList, 
} from "@mui/material";
import { TeamSectionTitleTypography } from "../../../../components/CustomComponents/TeamTypography";
import { TeamSectionBox } from "../../../../components/CustomComponents/TeamBox";

import SearchIcon from '../../../../assets/images/SearchIcon.png';
import CancelIcon from '../../../../assets/images/CancelIcon.png';
import CheckIcon from '../../../../assets/images/Check.png';

type HoverState = boolean[];

type GitHubTeamDataType = {
  id:string,
  link:string,
  username:string,
}[];

type GithubProps = {
  item:any;
  githubData:GitHubTeamDataType;
};


export const GitHubSelect: React.FC<GithubProps> = ({item, githubData}) => {
 
  const [selectedOption, setSelectedOption] = useState<string>(item.GithubUser);
  const [inputLetter, SetInputLetter] = useState<string>("");
  const [filteredItemCount, setFilteredItemCount] = useState(false);

  const handleCancelIcon = () => {
    SetInputLetter("");
    setFilteredItemCount(false);
  }

  const filter = (inputLetter:string) => {
    return githubData.filter((githubItem:any) =>
      githubItem.username.toLowerCase().includes(inputLetter.toLowerCase()));
  }
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    SetInputLetter(event.target.value);
    const filteredItem = filter(event.target.value);
    filteredItem.length === 0 ? setFilteredItemCount(true) : setFilteredItemCount(false);
  }

  const initializeHoveredState = ():HoverState => {
    const initialHoveredState: HoverState = [];
      for(let i = 0; i < githubData.length; i++){
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
    return (
      <TeamSectionTitleBox>
        <Select
          value={selectedOption} 
          onChange={(event) => setSelectedOption(event.target.value)}
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
                display:'flex',
                overflow:'visible',
              },
              sx: {
                '& .MuiList-root' : {
                  display:'flex',
                  flexDirection: 'column',
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
          <TeamSectionTitleTypography sx={{paddingLeft:'10px',fontWeight:'600'}}>GITHUB</TeamSectionTitleTypography>
          <Divider/>
          <MenuItem>
            <TextField 
              sx={{
                paddingLeft:'10px', 
                width:'150px', 
                '& .MuiInputBase-input' : {
                  fontSize:'12px'
                }
              }}
              InputProps={{
                disableUnderline:true,
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchIcon} alt="SearchIcon" />
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
            githubData.map((githubItem:any, githubIndex:number) => {
              if (githubItem.username.toLowerCase().includes(inputLetter.toLowerCase())) {
                return (
                  <MenuItem 
                    key={githubIndex} 
                    value={githubItem.username} 
                    sx={{
                      backgroundColor:'white', 
                      height:'25px', 
                      borderRadius:'4px',
                      margin:'0px 5px 4px 5px',
                      paddingLeft:'25px',
                      display:'flex',
                      }}
                    onMouseEnter={()=>handleIsHover(githubIndex)}
                    onMouseLeave={()=>handleNoIsHover(githubIndex)}
                    onClick={() => setSelectedOption(githubItem.username)}
                  > 
                    {
                      isHovered[githubIndex] && selectedOption !== githubItem.username &&
                      <img src={CheckIcon} alt="CheckIcon" style={{position:'absolute', marginLeft:'-17px'}}/>
                    }
                    <TeamSectionBox>
                      <TeamSectionTitleTypography>{githubItem.username}</TeamSectionTitleTypography>
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
        </Select>
      </TeamSectionTitleBox>
    );
}