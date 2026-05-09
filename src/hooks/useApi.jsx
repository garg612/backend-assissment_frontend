import { useState } from 'react';

// Mock data storage to simulate a database for the current session
let mockDatabase = [];

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate a network delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const submitIntake = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await delay(1200); // simulate network request
      
      const newEntry = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        submittedAt: new Date().toISOString()
      };
      
      mockDatabase.push(newEntry);
      
      return { success: true, data: newEntry };
    } catch (err) {
      setError(err.message || 'Failed to submit intake form');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      await delay(800); // simulate network request
      return { success: true, data: [...mockDatabase].reverse() };
    } catch (err) {
      setError(err.message || 'Failed to fetch responses');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitIntake,
    fetchResponses
  };
}
