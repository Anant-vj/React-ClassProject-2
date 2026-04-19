import React, { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchDummyJobs } from '../services/api';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('job-applications', []);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useLocalStorage('app-initialized', false);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!isInitialized && applications.length === 0) {
        setIsLoading(true);
        const mockJobs = await fetchDummyJobs();
        setApplications(mockJobs);
        setIsInitialized(true);
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [isInitialized, applications.length, setApplications, setIsInitialized]);

  const addApplication = (newApp) => {
    setApplications([newApp, ...applications]);
  };

  const updateApplication = (id, updatedApp) => {
    setApplications(applications.map(app => (app.id === id ? updatedApp : app)));
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
    ));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      isLoading,
      addApplication,
      updateApplication,
      deleteApplication,
      toggleBookmark
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};
