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
    setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
    click: number;
    amhour:number;
    setAmhour:React.Dispatch<React.SetStateAction<number>>;
    amminute:number;
    setAmminute:React.Dispatch<React.SetStateAction<number>>;
}

interface ChildProps2 {
    componentStates:ComponentStates;
    setComponentStates:React.Dispatch<React.SetStateAction<ComponentStates>>;
    click: number;
    pmhour:number;
    setPmhour:React.Dispatch<React.SetStateAction<number>>;
}

interface ChildProps3 {
    componentStates:ComponentStates;
    click: number;
}

export const Reports1: React.FC<ChildProps1> = ({componentStates,setComponentStates, click, amhour, setAmhour, amminute, setAmminute}) => {

  const componentState = componentStates[click];
  const incrementhour = () => {
    amhour < 12 ? setAmhour(amhour + 1) : setAmhour(12);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrementhour = () => {
    amhour > 0 ? setAmhour(amhour - 1) : setAmhour(0);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }

  const incrementminute = () => {
    amminute < 59 ? setAmminute(amminute + 1) : setAmminute(59);
    setComponentStates((prevState) => ({
      ...prevState,
      [click]: !prevState[click],
    }));
  }
  const decrementminute = () => {
    amhour > 0 ? setAmminute(amminute - 1) : setAmminute(0);
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
                  Send me a morning report everyday at&nbsp;
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={incrementhour} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {amhour}
                        </span>
                        {componentState && (
                        <span onClick={decrementhour} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    :
                    <span className={`numberspan ${componentState && 'align-middle'}`}>
                        {componentState && (
                        <span onClick={incrementminute} className="arrowbutton">
                            <img src={up} className="arrowsize1" alt="Up" />
                        </span>
                        )}
                        <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                        {amminute}
                        </span>
                        {componentState && (
                        <span onClick={decrementminute} className="arrowbutton">
                            <img src={down} className="arrowsize2" alt="Down" />
                        </span>
                        )}
                    </span>
                    AM
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};
  
export const Reports2: React.FC<ChildProps2> = ({componentStates,setComponentStates, click, pmhour, setPmhour}) => {
    const componentState = componentStates[click];
  
    const increment = () => {
      pmhour < 12 ? setPmhour(pmhour + 1) : setPmhour(12);
      setComponentStates((prevState) => ({
        ...prevState,
        [click]: !prevState[click],
      }));
    }
    const decrement = () => {
      pmhour > 0 ? setPmhour(pmhour - 1) : setPmhour(0);
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
                    Summerize the day every evening at&nbsp;
                      <span className={`numberspan ${componentState && 'align-middle'}`}>
                          {componentState && (
                          <span onClick={increment} className="arrowbutton">
                              <img src={up} className="arrowsize1" alt="Up" />
                          </span>
                          )}
                          <span className={`pr-1 ${componentState && 'arroundnumber'}`}>
                          {pmhour}
                          </span>
                          {componentState && (
                          <span onClick={decrement} className="arrowbutton">
                              <img src={down} className="arrowsize2" alt="Down" />
                          </span>
                          )}
                      </span>
                      PM
                  </CardTypography>
              </Stack>
          </MainCard>
        </BackCard>
    );
};


  
export const Reports3: React.FC<ChildProps3> = ({componentStates, click}) => {

  const componentState = componentStates[click];
  
  return (
    <BackCard componentState={componentState}>
        <MainCard sx={{bgcolor: componentState ? 'white' : 'rgb(240 249 255)' }}>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                <CardTypography>
                    Summarize the sprint once it's done.
                </CardTypography>
            </Stack>
        </MainCard>
      </BackCard>
  );
};