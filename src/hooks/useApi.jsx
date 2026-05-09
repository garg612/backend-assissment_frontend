import { useState } from 'react';
import api from '../utils/api';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitIntake = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === 'description') {
          formData.append('projectDescription', data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
      const response = await api.post('/intake/intake', formData);
      return { success: true, data: response.data.data || response.data };
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit intake form');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const fetchMyResponse = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/intake/my-response');
      return { success: true, data: response.data.data || response.data };
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch your response');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/intake/intakes');
      return { success: true, data: response.data.data || response.data };
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch responses');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitIntake,
    fetchResponses,
    fetchMyResponse
  };
}
