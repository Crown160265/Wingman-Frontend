import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { 
  createProjectManagementIntegration, 
  createCommunicationManagementIntegration, 
  createSoftwareManagementIntegration 
} from '../../services/api';
import { 
  CommunicationManagementProviders,
  ProjectManagementProviders,
  SoftwareManagementProviders
} from '../../default/enums';
import { useUser } from '../../context/UserContext';
import { emptyPageLoaderStyle } from '../../default/theme';

const IntegrationCallbackPage = () => {
  const { search, pathname } = useLocation();
  console.log('pathname: ', pathname);
  const navigate = useNavigate();
  const { user } = useUser();

  const createIntegration = useCallback( async() => {
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('code');

    console.log('code: ', code);

    try {
        
      if(!user) return;
      if (pathname === '/jira-login-callback') {
        await createProjectManagementIntegration(code as string, user.organizationId, user.id, ProjectManagementProviders.JIRA);
        navigate('/onboarding/integrations');
      } else if (pathname === '/slack') {
        await createCommunicationManagementIntegration(code as string, user.organizationId, user.id, CommunicationManagementProviders.SLACK);
        navigate('/onboarding/integrations');
      } else if (pathname === '/github-callback') {
        const installationId = searchParams.get('installation_id');
        await createSoftwareManagementIntegration(code as string, Number(installationId) as number, user.organizationId, SoftwareManagementProviders.GITHUB);
        navigate('/onboarding/integrations');
      } 
    } catch (error) {
      console.error('Create callback error:', error);
    } 
  }, [search, pathname, navigate, user]);

  useEffect(() => {
    createIntegration();
  }, [createIntegration]);

  return (
    <CircularProgress sx={emptyPageLoaderStyle} />
  );
}

export default IntegrationCallbackPage;