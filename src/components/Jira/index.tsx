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
interface ChildProps {
  componentStates:ComponentStates;
  click: number;
}
interface ChildProps2 {
  componentStates:ComponentStates;
  setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
  click: number;
  bug:number;
  setBug:React.Dispatch<React.SetStateAction<number>>;
}
interface ChildProps5 {
  componentStates:ComponentStates;
  setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
  click: number;
  tickets:number;
  setTickets:React.Dispatch<React.SetStateAction<number>>;
}

export const Jira1: React.FC<ChildProps> = ({componentStates, click}) => {

  const componentState = componentStates[click];
  
  return (
    <BackCard componentState={componentState}>
        <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <CardTypography>
                    Notify me when a ticket is at risk for the current sprint
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};



export const Jira2: React.FC<ChildProps2> = ({componentStates,setComponentStates, click, bug, setBug}) => {

  const componentState = componentStates[click];
  const increment = () => {
    setBug(bug + 1);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrement = () => {
    bug > 0 ? setBug(bug - 1) : setBug(0);
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
                    Notify me when a P
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={increment} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {bug}
                        </span>
                        {componentState && (
                        <span onClick={decrement} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    bug is exceeding its SLA
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};



export const Jira3: React.FC<ChildProps> = ({componentStates, click}) => {

const componentState = componentStates[click];

return (
  <BackCard componentState={componentState}>
      <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
              <CardTypography>
                  Notify me when a ticket is blocked
              </CardTypography>
          </Stack>
      </MainCard>
    </BackCard>
);
};


export const Jira4: React.FC<ChildProps> = ({componentStates, click}) => {

const componentState = componentStates[click];

return (
  <BackCard componentState={componentState}>
      <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
              <CardTypography>
                  Notify me when a ticket in-progress is trending with too many comments
              </CardTypography>
          </Stack>
      </MainCard>
    </BackCard>
);
};

export const Jira5: React.FC<ChildProps5> = ({componentStates,setComponentStates, click, tickets, setTickets}) => {

  const componentState = componentStates[click];
  const increment = () => {
    setTickets(tickets + 1);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrement = () => {
    tickets > 0 ? setTickets(tickets - 1) : setTickets(0);
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
                    Notify when a developer has more than&nbsp;
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={increment} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {tickets}
                        </span>
                        {componentState && (
                        <span onClick={decrement} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    tickets in-progress
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};