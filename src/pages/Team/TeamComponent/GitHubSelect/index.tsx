import React, {useState} from "react";
import { TeamSectionTitleBox } from "../../../../components/CustomComponents/TeamBox";
import { Select, Divider, MenuItem, TextField, InputAdornment, IconButton } from "@mui/material";
import { TeamSectionTitleTypography } from "../../../../components/CustomComponents/TeamTypography";
import { TeamSectionBox } from "../../../../components/CustomComponents/TeamBox";

import SearchIcon from '../../../../assets/images/SearchIcon.png';
import CancelIcon from '../../../../assets/images/CancelIcon.png';
import CheckIcon from '../../../../assets/images/Check.png';

type HoverState = boolean[][];

type TeamData = {
  avatar:string;
  name:string;
  JiraUser: string;
  SlackUser:string;
  GithubUser: string[];
  team:string[];
  role:string;
}[]

type Props = {
  item:any;
  index:number;
  data:TeamData;
};

export const GitHubSelect: React.FC<Props> = ({item, index, data}) => {
 
  const [selectedOption, setSelectedOption] = useState<string[]>( data.map((item:any) => item.GithubUser[0]));
  
  const handleSelectChange = (Id:number, value:string) => {
    const prevString = [...selectedOption];
    prevString[Id] = value;
    setSelectedOption(prevString);
  };

  const initializeString = () => {
    const initialString: string[] = [];
    for (let i = 0; i <= data.length; i++) {
      initialString[i] = "";
    }
    return initialString;
  };

  const [inputLetter2, setInputLetter2] = useState<string[]>(initializeString());
  const [filteredItemCount, setFilteredItemCount] = useState(false);

  const handleCancelIcon = (Id:number) => {
      setInputLetter2((prevState) => ({
        ...prevState,
        [Id]:"",
        }));
    setFilteredItemCount(false);
  }

  const filter = (Id:number, inputLetter:string, section:string) => {
    if(section === "team"){
      return data[Id].team.filter((item1) =>
        item1.toLowerCase().includes(inputLetter.toLowerCase()));
    }
    else { 
      return data[Id].GithubUser.filter((item1) =>
        item1.toLowerCase().includes(inputLetter.toLowerCase()));
    }
  }

  const handleInputChange2 = (event:React.ChangeEvent<HTMLInputElement>, Id:number,section:string) => {
    event.preventDefault();
    
    setInputLetter2((prevState) => ({
      ...prevState,
      [Id]:event.target.value,
      }));
    
    const filteredItem = filter(Id, event.target.value, section);
    filteredItem.length === 0 ? setFilteredItemCount(true) : setFilteredItemCount(false);
  }

  const handleInputChange1 = (Id:number, section:string) => (e:React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange2(e, Id, section);
  }

  const initializeHoveredState = ():HoverState => {
    const initialHoveredState: HoverState = [];
    for (let i = 0; i < data.length; i++) {
      initialHoveredState[i] = [];
      for(let j = 0; j < 100; j++){
        initialHoveredState[i][j] = false;
      }
    }
    return initialHoveredState;
  };

  const [githubIsHovered,setGithubIsHovered] = useState<HoverState>(() => initializeHoveredState());

  const handleGithubIsHover = (Id1: number, Id2: number) => {
    setGithubIsHovered((prevState) => {
      const newState = prevState.map((row, i) =>
        i === Id1
          ? row.map((value, j) => (j === Id2 ? true : value))
          : row
      );
      return newState;
    });
  };
  const handleGithubNoIsHover = (Id1:number,Id2:number) => {
    setGithubIsHovered((prevState) => {
      const newState = prevState.map((row, i) =>
        i === Id1
          ? row.map((value, j) => (j === Id2 ? false : value))
          : row
      );
      return newState;
    });
  }

    return (
      <TeamSectionTitleBox>
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
              PaperProps : {
                className:'custom-select',  
                style: {
                  height: '250px',
                  borderRadius:'10px',
                  border: '1px solid rgb(191,191,191)',
                  marginTop: '7px',
                  marginLeft: '37px',
                  display:'flex',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'transparent transparent',
                  overflow:'visible',
                },
                sx: {
                  '& .MuiList-root' : {
                    display:'flex',
                    flexDirection: 'column',
                  },
                }
              },
            }}          
          >
              <TeamSectionTitleTypography sx={{paddingLeft:'10px'}}>GITHUB</TeamSectionTitleTypography>
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
                      inputLetter2[index].length !== 0 && (
                        <InputAdornment position="end">
                          <IconButton onClick={()=>handleCancelIcon(index)}>
                            <img src={CancelIcon} alt='CancelIcon'/>
                          </IconButton>
                        </InputAdornment>
                      )
                    ),
                  }}
                  placeholder="Search..."
                  variant="standard"
                  value={inputLetter2[index]}
                  onChange={handleInputChange1(index,"github")}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </MenuItem>
              <Divider 
                sx={{marginTop:'0px !important'}}
              />
              {
                  item.GithubUser.map((item1:any, index1:number) => {
                    if (item1.toLowerCase().includes(inputLetter2[index].toLowerCase())) {
                      return (
                      <MenuItem 
                        key={index1} 
                        value={item1} 
                        sx={{
                          backgroundColor:'white', 
                          height:'25px', 
                          borderRadius:'4px',
                          margin:'0px 5px 4px 5px' ,
                          paddingLeft:'25px',
                          display:'flex',
                          }}
                        onMouseEnter={() => handleGithubIsHover(index,index1)}
                        onMouseLeave={() => handleGithubNoIsHover(index,index1)}
                      > 
                        {
                          githubIsHovered[index][index1] && selectedOption[index] !== item1 &&
                          <img src={CheckIcon} alt="CheckIcon" style={{position:'absolute', marginLeft:'-17px'}}/>
                        }
                        <TeamSectionBox>
                          <TeamSectionTitleTypography>{item1}</TeamSectionTitleTypography>
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
        }
      </TeamSectionTitleBox>
    );
}