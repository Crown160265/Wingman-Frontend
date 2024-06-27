import React from 'react';
import { Stack } from '@mui/material';
import MainCard from '../MainCard';
import { CardTypography } from '../CustomComponents/NotificationTypography';
import { BackCard } from '../CustomComponents/NotificationCard';
import up from '../../assets/images/Up.svg';
import down from '../../assets/images/Down.svg';

type ComponentStates = {
  [componentId: number]: boolean;
};
interface ChildProps1 {
  componentStates:ComponentStates;
  click: number;
}

interface ChildProps2 {
  componentStates:ComponentStates;
  setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
  click: number;
  hours:number;
  setHours:React.Dispatch<React.SetStateAction<number>>;
}
interface ChildProps3 {
  componentStates:ComponentStates;
  setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
  click: number;
  hours1:number;
  setHours1:React.Dispatch<React.SetStateAction<number>>;
}

interface ChildProps4 {
  componentStates:ComponentStates;
  setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
  click: number;
  comments:number;
  setComments:React.Dispatch<React.SetStateAction<number>>;
}
export const GitHub1: React.FC<ChildProps1> = ({componentStates, click}) => {

  const componentState = componentStates[click];
  
  return (
    <BackCard componentState={componentState}>
        <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)'}} >
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <CardTypography>
                    Notify me when a PR with no comments is approved
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};

export const GitHub2: React.FC<ChildProps2> = ({componentStates,setComponentStates, click, hours, setHours}) => {

  const componentState = componentStates[click];
  const increment = () => {
    setHours(hours + 1);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrement = () => {
    hours > 0 ? setHours(hours - 1) : setHours(0);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }

  return (
    <BackCard componentState={componentState}>
        <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <CardTypography>
                  Notify the team when a PR is pending review for over&nbsp;
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={increment} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {hours}
                        </span>
                        {componentState && (
                        <span onClick={decrement} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    hours
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};

export const GitHub3: React.FC<ChildProps3> = ({componentStates,setComponentStates, click, hours1, setHours1}) => {

  const componentState = componentStates[click];
  const increment = () => {
    setHours1(hours1 + 1);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrement = () => {
    hours1 > 0 ? setHours1(hours1 - 1) : setHours1(0);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }

  return (
    <BackCard componentState={componentState}>
        <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <CardTypography>
                Notify when a PR was approved but not merged in over&nbsp;
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={increment} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {hours1}
                        </span>
                        {componentState && (
                        <span onClick={decrement} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    hours
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};

export const GitHub4: React.FC<ChildProps4> = ({componentStates,setComponentStates, click, comments, setComments}) => {

  const componentState = componentStates[click];
  const increment = () => {
    setComments(comments + 1);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrement = () => {
    comments > 0 ? setComments(comments - 1) : setComments(0);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }

  return (
    <BackCard componentState={componentState}>
        <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <CardTypography>
                Notify when when a PR is trending with over&nbsp;
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={increment} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {comments}
                        </span>
                        {componentState && (
                        <span onClick={decrement} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    comments
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};