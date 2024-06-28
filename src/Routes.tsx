import { Routes, Route, Navigate } from 'react-router-dom';
import ChatsPage from './pages/Chats';
import ConversationPage from './pages/Conversation';
import AlertsPage from './pages/Alerts';
import TeamsPage from './pages/Team';
import IntegrationsPage from './pages/Integrations';
import IntegrationCallbackPage from './pages/IntegrationCallback';
import AuthPage from './pages/Auth';
import OrgRegistrationPage from './pages/OrgRegistration';
import SignUpPage from './pages/SignUp';
import NotificationsPage from './pages/Notifications';

import { useUser } from './context/UserContext';
import { useEffect } from 'react';
import SignInPage from './pages/SignIn';
import ReportPage from './pages/Report';

const AppRoutes = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true' ? true : false;
  const user = {
    id : localStorage.getItem('userId')??'',
    firstName : localStorage.getItem('firstName')??'',
    lastName : localStorage.getItem('lastName')??'',
    organizationId : localStorage.getItem('organizationId')??'',
  };
  const { loginUser } = useUser();

  useEffect(() => {
  loginUser(user);
  },[isAuth]);

  return (
    <Routes>
      {!isAuth && 
          <Route path="/" element={<Navigate to="/onboarding/registration" replace />} /> 
      }
      {
        isAuth &&
          <>
            <Route path="/onboarding/signin" element={<SignInPage />} />
            <Route path="/" element={<ChatsPage />} />
            <Route path="/conversation/:conversationId" element={<ConversationPage />} />
            <Route path="/onboarding/integrations" element={<IntegrationsPage />} />
            <Route path="/onboarding/notifications" element={<NotificationsPage />} />
            <Route path="/onboarding/report" element={<ReportPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/onboarding/teams" element={<TeamsPage />} />
            <Route path="/jira-login-callback" element={<IntegrationCallbackPage />} />
            <Route path="/slack" element={<IntegrationCallbackPage />} />
            <Route path="/github-callback" element={<IntegrationCallbackPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/organization-registration" element={<OrgRegistrationPage />} />
            </>
      }
      <Route path="/onboarding/registration" element={<SignUpPage />} />
    </Routes>
  );
}

export default AppRoutes;
