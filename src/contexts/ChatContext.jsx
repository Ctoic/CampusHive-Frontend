import React, { createContext, useContext, useState, useCallback } from 'react';
import apiClient from '../lib/api';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load chat sessions
  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const sessionsData = await apiClient.getChatSessions();
      setSessions(sessionsData);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new chat session
  const createSession = useCallback(async (sessionName = 'New Chat') => {
    try {
      setLoading(true);
      const newSession = await apiClient.createChatSession(sessionName);
      setSessions(prev => [newSession, ...prev]);
      return newSession;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load specific chat session with messages
  const loadSession = useCallback(async (sessionId) => {
    try {
      setLoading(true);
      const sessionData = await apiClient.getChatSession(sessionId);
      setCurrentSession(sessionData);
      setMessages(sessionData.messages || []);
      return sessionData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update session name
  const updateSession = useCallback(async (sessionId, sessionData) => {
    try {
      const updatedSession = await apiClient.updateChatSession(sessionId, sessionData);
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionId ? updatedSession : session
        )
      );
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(updatedSession);
      }
      return updatedSession;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [currentSession]);

  // Delete chat session
  const deleteSession = useCallback(async (sessionId) => {
    try {
      await apiClient.deleteChatSession(sessionId);
      setSessions(prev => prev.filter(session => session.id !== sessionId));
      
      // If we're deleting the current session, clear it
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(null);
        setMessages([]);
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [currentSession]);

  // Send message and handle streaming response
  const sendMessage = useCallback(async (message, sessionId = null) => {
    let targetSessionId = sessionId || currentSession?.id || null;
    
    try {
      setLoading(true);
      setError(null);

      // If a specific sessionId is provided, load that session first
      if (sessionId && sessionId !== currentSession?.id) {
        await loadSession(sessionId);
        targetSessionId = sessionId;
      }
      // Ensure we have a concrete session (avoid using a shared 'default')
      else if (!targetSessionId) {
        const created = await createSession('New Chat');
        targetSessionId = created?.id;
        if (targetSessionId) {
          await loadSession(targetSessionId);
        } else {
          throw new Error('Failed to create a new chat session');
        }
      }

      // Add user message immediately
      const userMessage = {
        id: Date.now(),
        message_type: 'user',
        content: message,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Send message to multiagent endpoint
      const response = await apiClient.sendChatMessage(message, targetSessionId, true);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let agentMessage = {
        id: Date.now() + 1,
        message_type: 'agent',
        content: '',
        created_at: new Date().toISOString(),
        agent_type: 'supervisor',
      };

      // Add empty agent message that we'll update
      setMessages(prev => [...prev, agentMessage]);

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.response) {
                  // Update the agent message content
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === agentMessage.id 
                        ? { ...msg, content: data.response }
                        : msg
                    )
                  );
                } else if (data.error) {
                  setError(data.error);
                } else if (data.event === 'title' && data.title) {
                  // Update session title if provided
                  if (currentSession && currentSession.id === targetSessionId) {
                    setCurrentSession(prev => ({ ...prev, display_title: data.title }));
                  }
                }
              } catch (parseError) {
                console.warn('Failed to parse SSE data:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      // Reload sessions to get updated data
      await loadSessions();

    } catch (error) {
      setError(error.message);
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 2,
        message_type: 'agent',
        content: 'Sorry, I encountered an error. Please try again.',
        created_at: new Date().toISOString(),
        agent_type: 'error',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [currentSession, loadSessions, loadSession, createSession]);

  // Clear current session
  const clearCurrentSession = useCallback(() => {
    setCurrentSession(null);
    setMessages([]);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    sessions,
    currentSession,
    messages,
    loading,
    error,
    loadSessions,
    createSession,
    loadSession,
    updateSession,
    deleteSession,
    sendMessage,
    clearCurrentSession,
    clearError,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
