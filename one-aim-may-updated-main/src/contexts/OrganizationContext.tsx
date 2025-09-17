"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchData } from '@/utils/apiUtils';

export interface OrganizationInfo {
  name?: string;
  logo_url?: string;
  phones?: Array<{
    number: string;
  }>;
  emails?: Array<{
    email: string;
  }>;
  addresses?: Array<{
    address: string;
    city?: string;
    state?: string;
    country?: string;
  }>;
  social_media?: {
    facebook_link?: string;
    instagram_link?: string;
    linkedin_link?: string;
    twitter_link?: string;
    youtube_link?: string;
  };
  // Add other organization fields as needed
}

interface OrganizationContextType {
  data: OrganizationInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

interface OrganizationProviderProps {
  children: ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const [data, setData] = useState<OrganizationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const organizationData = await fetchData<OrganizationInfo>("/company");
      if (organizationData) {
        setData(organizationData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organization data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  const value: OrganizationContextType = {
    data,
    loading,
    error,
    refetch: fetchOrganizationData,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = (): OrganizationContextType => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};