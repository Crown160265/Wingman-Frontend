import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import AgentReportCard1 from '../../components/AgentReportCard1';
import { Box } from '@mui/material';
import  Button from '@mui/material/Button';
import { ButtonPositionBox } from '../../components/CustomComponents/NotificationBox';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { reportData } from '../../services/api';

type ReportDataResponse = {
    components: any;
}

const ReportPage: React.FC = () => {
  
    const navigate = useNavigate();
    const createdAt = new Date().toString();
    
    const [isLoading, setIsLoading] = useState(false);
    const organizationId = localStorage.getItem('organizationId')??'';
    const userId = localStorage.getItem('userId')??'';
   
    const [responseData, setResponseData] = useState<ReportDataResponse>();


    const fetchData = async() => {
        try{
            const data = await reportData(organizationId, userId);
            setResponseData(data);
            setIsLoading(true);
        }catch(error){
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        fetchData();
    },[]);

    const handleReports = () => {
        navigate('/onboarding/teams');
    }
    
  return (
    
    (
        isLoading ?
        (
            <div className='mainlayout'>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Box
                    sx={{ 
                        width: '574px',
                        borderRadius: '0 0 16px 16px',
                        padding: '40px 100px 40px 100px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                    }}>
                        <Divider sx={{marginBottom:'50px', marginTop:'30px'}}>
                            <Typography variant="body1">Today {dayjs(createdAt).format('H:mm A')}</Typography>
                        </Divider>
                        
                        <AgentReportCard1 content={responseData?.components} date={createdAt} />
                    </Box>
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
                        onClick={handleReports}
                        >
                        Next
                    </Button>
                </ButtonPositionBox>
            </div>
        ):(<div></div>)
    )
  );
};

export default ReportPage;