import axios, { AxiosResponse } from 'axios';
import { 
  CommunicationManagementProviders,
  ProjectManagementProviders,
  SoftwareManagementProviders 
} from '../default/enums';
import { Conversation, Message, User } from '../default/types';
import { API_URL } from '../default/config';
import { alertsData, reportsData } from './data';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

interface ConversationResponse {
  conversations: Conversation[];
}

interface RegisterOrgResponse {
  organizationId: string;
  organizationName: string;
}


interface CreateOrganizationResponse {
  id: string;
}

interface CreateUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  organizationId: string;
}

interface MessagesReposnse {
  messages: Message[];
  count: number;
}

interface RegisterUserResponse {
  userId: string;
  organizationId: string;
  message: string;
}

interface MatchTeamMembersResponse {
  atlassianTeamMembers: any;
  count:number;

  githubTeamMembers:[
    id: string,
    link: string,
    username: string,
  ];

  matchedTeamMembers:[
    atlassianUsername: string,
    atlassianUserId: string,
    atlassianUserLink: string,
    email: string,
    githubUsername: string,
    githubUserLink: string,
    githubUserId: string,
    name: string,
    score?: number,
  ]
}

interface reportDataResponse {
  // conversationId:string;
  components:any;
}

export async function reportData(organizationId: string, userId:string) {
  try {
    const response: AxiosResponse<reportDataResponse> = await axiosInstance.post('/onboarding/report', {
      organizationId,
      userId,
    });

    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}

export async function matchTeamMembers(userId: string, organizationId: string) {
  try {
    const response: AxiosResponse<MatchTeamMembersResponse> = await axiosInstance.post('/onboarding/team/match-team-members', {
      organizationId,
      userId,
    });

    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}

export async function registerUser( email: string, firstName: string, lastName: string, password: string, organizationName: string) {
  try {
    const response: AxiosResponse<RegisterUserResponse> = await axiosInstance.post('/registration', {
      email, 
      firstName,
      lastName,
      password,
      organizationName,
    });

    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}

type ComponentStates = {
  [componentId: number]: boolean;
};
interface ReportsNotificationResponse {
   message: string[];
   error: string;
   statusCode: number;
}

export async function reportsNotification(componentStates:ComponentStates, amhour:number, amminute:number, pmhour:number, userId:string, organizationId:string ) {
  try {
    const CurrentTime = new Date();
    const differenceTime = (CurrentTime.getUTCDate()-CurrentTime.getDate())*24 + (CurrentTime.getUTCHours()-CurrentTime.getHours());
    const utcYear = CurrentTime.getUTCFullYear();
    const utcMonth = CurrentTime.getUTCMonth() + 1;
    const utcAmdate = Math.floor(CurrentTime.getUTCDate() + (amhour + differenceTime)/24);
    const utcAmhour = (amhour + differenceTime)%24;
    const utcAmminute = CurrentTime.getMinutes();
    const utcPmdate = Math.floor(CurrentTime.getUTCDate() + (pmhour + 12 + differenceTime)/24);
    const utcPmhour = (pmhour + 12 + differenceTime)%24;

    const data = reportsData(utcYear, utcMonth, utcAmdate, utcAmhour, utcAmminute, utcPmdate, utcPmhour, userId, organizationId);
    const selectedReports = data.reports.filter((report, index) => {
      return componentStates[index+10] === true;
    });
    console.log("selectedReports: ", selectedReports);
    const response: AxiosResponse<ReportsNotificationResponse> = await axiosInstance.post('/onboarding/schedule-report', {
      reports: selectedReports,
      isOnboarding : data.isOnboarding,
      organizationId: data.organizationId,
      userId : data.userId,
    });

    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}

interface AlertsNotificationResponse {
  message: string[];
  error: string;
  statusCode: number;
}

export async function alertsNotification(  componentStates:ComponentStates, bug:number, tickets:number, hours:number, hours1:number, comments:number, userId: string, organizationId:string ) {
  const data = alertsData(bug, tickets, hours, hours1, comments, userId, organizationId);
  
  const selectedAlerts1 = data.jira.filter((jira, index) => {
    return componentStates[index+1] === true;
  });

  const selectedAlerts2 = data.github.filter((github, index) => {
    return componentStates[index+1] === true;
  });
  
  let selectedAlerts = selectedAlerts1.concat(selectedAlerts2);

  console.log("selectedAlerts: ", selectedAlerts);

  try {
    const response: AxiosResponse<AlertsNotificationResponse> = await axiosInstance.post('/onboarding/schedule-alert', {
      alerts: selectedAlerts,
      isOnboarding:data.isOnboarding,
      organizationId: data.organizationId,
      userId: data.userId,
    });

    return response.data;

  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  try {
    const response: AxiosResponse<ConversationResponse> = await axiosInstance.get(`/conversation`, {
      params: {
        userId
      }
    });
    return response.data.conversations;
  } catch (error) {
    throw new Error('Failed to fetch conversations');
  }
}

export async function createConversation(userId: string, name: string): Promise<Conversation> {
  try {
    const response: AxiosResponse<Conversation> = await axiosInstance.post('/conversation', {
      userId,
      name
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create conversation');
  }
}

export async function getMessages(conversationId: string, limit?: number, startAt?: number): Promise<MessagesReposnse> {
  try {
    const response: AxiosResponse<MessagesReposnse> = await axiosInstance.get(`/message`, {
      params: {
        conversationId,
        limit,
        startAt,
        order: 'DESC'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch messages');
  }
}

export async function createMessage(conversationId: string, userId: string, content: string, author: string = 'USER', category: string = 'TEXT', subCategory = 'TEXT_PLAIN'): Promise<Message> {
  try {
    const response: AxiosResponse<Message> = await axiosInstance.post('/message', {
      conversationId,
      userId,
      content,
      author,
      category,
      subCategory
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create message');
  }
}

export async function getAgentResponse(conversationId: string, userId: string): Promise<Message> {
  try {
    const response: AxiosResponse<Message> = await axiosInstance.post('/agent-processing', {
      conversationId,
      userId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get agent response');
  }
}

export async function createCommunicationManagementIntegration(accessCode: string, organizationId: string, userId: string, provider: CommunicationManagementProviders) {
  try {
    const response = await axiosInstance.post('/communication-management-integration', {
      accessCode,
      organizationId,
      userId,
      provider
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getCommunicationManagementIntegration(organizationId: string) {
  try {
    const response = await axiosInstance.get('/communication-management-integration/', {
      params: {
        organizationId
      }
    });

    console.log("CommunicationManagementIntegration: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function createProjectManagementIntegration(accessCode: string, organizationId: string, userId: string, provider: ProjectManagementProviders) {

console.log(`Create project management integration called !!!`)
  try {
    const response = await axiosInstance.post('/project-management-integration', {
      accessCode,
      organizationId,
      userId,
      provider
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project management integration:', error);
  }
}

export async function getProjectManagementIntegration(organizationId: string) {
  try {
    const response = await axiosInstance.get('/project-management-integration/', {
      params: {
        organizationId
      }
    });
    console.log("ProjectManagementIntegration: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function createSoftwareManagementIntegration(accessCode: string, installationId: number, organizationId: string, provider: SoftwareManagementProviders) {
  try {
    const response = await axiosInstance.post('/software-management-integration', {
      accessCode,
      organizationId,
      installationId,
      provider
    });
    console.log("Software: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getSoftwareManagementIntegration(organizationId: string) {
  try {
    const response = await axiosInstance.get('/software-management-integration/', {
      params: {
        organizationId
      }
    });

    console.log("SoftwareManagementIntegration: ", response.data);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function registerOrganization(name: string) {
  try {
    const response: AxiosResponse<RegisterOrgResponse> = await axiosInstance.post('/registration/organization', {
      name
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getUser(email: string) {
  try {
    const response: AxiosResponse<User[]> = await axiosInstance.get('/user', {
      params: {
        email
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function createOrganization(name: string) {
  try {
    const response: AxiosResponse<CreateOrganizationResponse> = await axiosInstance.post('/organization', {
      name,
      website: 'https://www.example.com'
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function createUser(email: string, organizationId: string, firstName: string, lastName: string) {
  try {
    const response: AxiosResponse<CreateUserResponse> = await axiosInstance.post('/user', {
      firstName,
      lastName,
      email,
      organizationId
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}
