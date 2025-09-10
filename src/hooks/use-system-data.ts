"use client"

import { useState, useEffect, useCallback } from 'react';

interface SystemData {
  cpuTemp: number;
  cpuUsage: string[];
  memoryUsage: {
    total: number;
    used: number;
    free: number;
  };
  storage: {
    total: string;
    used: string;
    available: string;
    usagePercent: string;
    mountPoint: string;
  };
  uptime: string;
  loadAverage: {
    oneMin: number;
    fiveMin: number;
    fifteenMin: number;
  };
  cpuCount: number;
  platform: string;
  arch: string;
  hostname: string;
  release: string;
}

interface UseSystemDataReturn {
  data: SystemData | null;
  isConnected: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

export function useSystemData(interval: number = 5000): UseSystemDataReturn {
  const [data, setData] = useState<SystemData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const connect = useCallback(() => {
    try {
      console.log('Attempting to connect to WebSocket...');
      const eventSource = new EventSource(`/api/ws?interval=${interval}`);
      
      eventSource.onopen = () => {
        console.log('WebSocket connection opened');
        setIsConnected(true);
        setError(null);
      };

      eventSource.onmessage = (event) => {
        try {
          console.log('WebSocket message received:', event.data);
          const message = JSON.parse(event.data);
          
          if (message.type === 'system-update') {
            setData(message.data);
            setLastUpdate(new Date());
            setError(null);
          } else if (message.type === 'error') {
            setError(message.message);
          }
        } catch (parseError) {
          console.error('Error parsing WebSocket message:', parseError);
          setError('Failed to parse system data');
        }
      };

      eventSource.onerror = (error) => {
        console.error('WebSocket error:', error);
        console.log('EventSource readyState:', eventSource.readyState);
        setIsConnected(false);
        setError('Connection lost. Attempting to reconnect...');
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          console.log('Attempting to reconnect...');
          eventSource.close();
          connect();
        }, 3000);
      };

      return eventSource;
    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError('Failed to connect to system data stream');
      setIsConnected(false);
      return null;
    }
  }, [interval]);

  useEffect(() => {
    const eventSource = connect();
    
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [connect]);

  return { data, isConnected, error, lastUpdate };
}
