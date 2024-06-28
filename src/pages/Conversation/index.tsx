import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from '../../components/Layout';
import UserChatCard from '../../components/UserChatCard';
import AgentTextCard from '../../components/AgentTextCard';
//import AgentTextIntegrationCard from '../../components/AgentTextIntegrationCard';
import AgentListCard from '../../components/AgentListCard';
//import AgentListContributorActivityCard from '../../components/AgentListContributorActivityCard';
//import AgentPullRequestsListCard from '../../components/AgentPullRequestsListCard';
import AgentDateAlertCard from '../../components/AgentDateAlertCard';
import AgentEventAlertCard from '../../components/AgentEventAlertCard';
import AgentChartCard from '../../components/AgentChartCard';
import UserChatInput from '../../components/UserChatInput';
import AgentReportCard1 from '../../components/AgentReportCard1';

import { getMessages, createMessage, getAgentResponse } from '../../services/api';
import { Message } from '../../default/types';
import MessageLoader from '../../components/MessageLoader';
import { useUser } from '../../context/UserContext';

const ConversationPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesStartAt, setMessagesStartAt] = useState(0);
  const [messageCount, setMessageCount] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const { conversationId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const containerRef = useRef<null | HTMLDivElement>(null);
  const messagesLimit = 50;
  
  const fetchMessages = async (startAt: number) => {
    try {
      if(conversationId === undefined) return;
      const data = await getMessages(conversationId, messagesLimit, startAt);
      // reverse the messages to display them in the correct order since we using DESC order in the API
      setMessages([ ...data.messages.reverse(), ...messages,]);
      setMessagesStartAt(startAt + messagesLimit);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }

  const fetchInitialMessages = async () => {
    try {
      if(conversationId === undefined) return;
      const data = await getMessages(conversationId, messagesLimit);
      setMessageCount(data.count);
      // reverse the messages to display them in the correct order since we using DESC order in the API
      setMessages(data.messages.reverse());
      setMessagesStartAt(messagesLimit);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }

  const handleAgentResponse = useCallback(async (messages: Message[]) => {
    if (conversationId && user) {
      try {
        setLoading(true);
        const newMessage = await getAgentResponse(conversationId, user.id);
        messages.push(newMessage);
        setLoading(false);
        setMessages([...messages]);
      } catch (error) {
        console.error('Failed to get agent response', error);
      }
    }
  }, [conversationId, user]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (conversationId && user) {
      try {
        const newMessage = await createMessage(conversationId, user.id, content);
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        await handleAgentResponse(newMessages);
      } catch (error) {
        console.error('Failed to send message', error);
      }
    } 
  }, [conversationId, messages, user, handleAgentResponse]);

  useEffect(() => {
    setMessages([]);
    setMessagesStartAt(0);
    setMessageCount(null);
    const firstMessage = searchParams.get('message');
    if(firstMessage) {
      handleSendMessage(firstMessage);
      searchParams.delete('message');
    } else {
      conversationId && fetchInitialMessages();
    }
    // eslint-disable-next-line
  }, [conversationId]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollTop === 0 && !loading && (messageCount && messageCount > messagesStartAt)) {
      conversationId && fetchMessages(messagesStartAt);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (containerRef && container) {
      container.addEventListener('scroll', handleScroll);
    
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
    // eslint-disable-next-line
  }, [messagesStartAt])


  const renderMessages = () => {
    return messages.map((message, index) => {
      if (message.author === 'USER') {
        return <UserChatCard key={index} name={user?.firstName ? user.firstName : ''} content={message.content as string} date={message.createdAt} />
      } else {
        switch (message.category) {
          case 'TEXT': {
            /*
            if (
              message.subCategory === 'TEXT_ERROR_MISSING_COMMUNICATION_MANAGEMENT_INTEGRATION' 
              || message.subCategory === 'TEXT_ERROR_MISSING_PROJECT_MANAGEMENT_INTEGRATION' 
              || message.subCategory === 'TEXT_ERROR_MISSING_SOFTWARE_MANAGEMENT_INTEGRATION'
              ) {
              return <AgentTextIntegrationCard key={index} content={message.content as string} date={message.createdAt} />
            }
            */
            return <AgentTextCard key={index} content={message.content as string} date={message.createdAt} />
          }
          // TODO : move the message json parsing to a layer with error handeling
          case 'LIST': {
          /*
            if (message.subCategory === 'LIST_CONTRIBUTOR_ACTIVITY') {
              return <AgentListContributorActivityCard key={index} data={JSON.parse(message.content)} date={message.createdAt} />
            }
            if (message.subCategory === 'LIST_PULL_REQUESTS') {
              return <AgentPullRequestsListCard key={index} data={JSON.parse(message.content)} date={message.createdAt} />
            }
            */
            return <AgentListCard key={index} data={JSON.parse(message.content)} date={message.createdAt} />
          }
          case 'ALERT': {
            if (message.subCategory === 'ALERT_TRIGGER_PULL_REQUEST_SIZE') {
              return <AgentEventAlertCard key={index} title='These Pull Requests are too big' content={JSON.parse(message.content)} date={message.createdAt} />
            }
            if (message.subCategory === 'ALERT_TRIGGER_PULL_REQUEST_PENDING_REVIEW') {
              return <AgentEventAlertCard key={index} title='These Pull Requests are pending review' content={JSON.parse(message.content)} date={message.createdAt} />
            }
            return <AgentDateAlertCard key={index} content={JSON.parse(message.content)} date={message.createdAt} />
          }
          case 'CHART': return <AgentChartCard key={index} data={JSON.parse(message.content)} date={message.createdAt} />
          case 'RECORD': return <AgentListCard key={index} data={JSON.parse(message.content)} date={message.createdAt} />
          case 'REPORT': return <AgentReportCard1 key={index} content={JSON.parse(message.content)} date={message.createdAt} />
          default: return null;
        }
      }
    });
  };

  // TODO: check if we need it when user is waiting for message from agent
  // const scrollToBottom = () => {
  //   inputRef!.current!.scrollIntoView({ behavior: 'smooth' });
  // };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<null | HTMLDivElement>();
    useEffect(() => elementRef!.current!.scrollIntoView({ behavior: 'smooth' }));
    // @ts-ignore
    return <div ref={elementRef} />;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Layout containerRef={containerRef} title='Chats'>
        {renderMessages()}

        {loading && <MessageLoader />}

        <UserChatInput handleSendMessage={handleSendMessage} />
        <AlwaysScrollToBottom />
        </Layout>
      </Box>
  );
}

export default ConversationPage;
