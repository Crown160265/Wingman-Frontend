import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import Pic1 from '../../assets/images/Pic1.svg';
import Pic2 from '../../assets/images/Pic2.svg';
import Pic3 from '../../assets/images/Pic3.svg';
import Bottom1 from '../../assets/images/Bottom1.svg';
import Bottom2 from '../../assets/images/Bottom2.svg';
import { Box } from '@mui/system';
import { LeftBox, SignupMainBox, LogoBox, RightBox, RightMiddleBox } from '../../components/CustomComponents/SignupBox';
import { LeftTitleTypography, LeftDesTypography, EmailTypography, LinkEmailTypography, RightTypography } from '../../components/CustomComponents/SignupTypography';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { registerUser } from '../../services/api';
import { useUser } from '../../context/UserContext';


const SignInPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { loginUser } = useUser();

  const navigate = useNavigate();

   const handleUserRegistration = async () => {
    try {
        const response = await registerUser( email, firstName, lastName,  password, organization);

        if(response?.userId && response.organizationId) {

          loginUser({id:response.userId, firstName:firstName, lastName:lastName, organizationId:response.organizationId});
          
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('userId', response?.userId);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('organizationId', response?.organizationId);

          navigate('/onboarding/notifications');
        }

        else if (response?.userId === null) {
          setError(true); 
          setAlertMessage(response?.message);
        }
      
    } catch (error) {
      console.error('Failed to register user', error);
    }
  };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(event.target.value);
    }

    const handleOrganizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrganization(event.target.value);
      }
  
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    }

  return (
    <SignupMainBox>
      <LogoBox>
        <img src={Logo} alt="Logo" style={{ height: '4rem' }} />
      </LogoBox>

      <LeftBox>
        <LeftTitleTypography>Meet Wingman!</LeftTitleTypography>
        <LeftDesTypography>Sign in and prepare to be amazed.</LeftDesTypography>
        <Box>
          
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="user-email"
                label="Email address"
                variant="outlined"
                color="secondary"
                sx={{ marginBottom: '25px', width:'80%' }}
                onChange={handleEmailChange}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="user-password"
                label="Password"
                type="password"
                variant="outlined"
                color="secondary"
                sx={{ marginBottom: '25px' , width:'80%' }}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
        </Box>
        {error && <Typography component={'div'} color='red' sx={{ marginBottom: '25px' }}>{alertMessage}</Typography>}
        <Button
          sx={{ 
            marginTop: '5px', 
            marginRight: 'auto',
          }}
          variant='contained'
          color='info'
          onClick={handleUserRegistration}
        >
          Login
        </Button>
        <EmailTypography>
          Don't have a user?
          <Link to="/onboarding/registration" className='noneunderline'>
            <LinkEmailTypography>
              Sign up here
            </LinkEmailTypography>
          </Link>
        </EmailTypography>
      </LeftBox>
      
      <RightBox>
        <RightTypography sx={{ marginBottom: '0.5rem' }}>
          Your Engineering Manager
        </RightTypography>
        <RightTypography sx={{ marginBottom: '2rem' }}>
          Assistant
        </RightTypography>
        <RightMiddleBox>
          <img src={Pic1} alt="Award 1" className="h-8 w-20" />
          <img src={Pic2} alt="Award 2" className="h-8 w-32"/>
          <img src={Pic3} alt="Award 3" className="h-8 w-20"/>
        </RightMiddleBox>

        <div className="signupBottomImages">
          <div className="leftbox"></div>
          <div className="rightbox"></div>
          <img src={Bottom1} alt="Bottom1" style={{ width:'30vw', marginBottom: '15px'}}/>
          <img src={Bottom2} alt="Bottom2" style={{ width:'30vw', }}/>
        </div>

      </RightBox>
    </SignupMainBox>
  );
};

export default SignInPage;