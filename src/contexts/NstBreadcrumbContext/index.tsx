import React, { createContext, useState, useContext } from 'react';

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type BreadcrumbContextType = {
  items: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  const setBreadcrumb = (newItems: BreadcrumbItem[]) => {
    setItems(newItems);
  };

  return (
    <BreadcrumbContext.Provider value={{ items, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};